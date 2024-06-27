const fs = require('fs');
const query = require('query-overpass');
const { sourceMapsEnabled } = require('process');
var mil, lon, lat;

// setParameters(2, 37.362760, -122.023660);

function setParameters(mil_, lon_, lat_) {
    mil=mil_; lon=lon_; lat=lat_;
    run();
}

async function run() {
    fs.readFile('companynamelist.txt', 'utf-8', (err, data) => {
    if (err) { console.error(err); return; }

    let apicmd = "[out:json][timeout:100];(\n";
    var nameArray = nameList(data);
    var m = mil * 1609;
    nameArray.forEach(brand => {
        apicmd += `nwr["brand"="${brand}"](around:${m},${lon},${lat});\n`;
    }); apicmd += `);out geom;`;
    console.error(apicmd);
    console.error(encodeURIComponent(apicmd))
    locate(apicmd);
})};

var nameList = (data) => {
    return data.split("\r\n");
};

async function locate(cmd) {
    var mapData = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
            method: "POST",
            body: `data=${encodeURIComponent(cmd)}`
        }
    ).then((data) => data.json());

    console.log("Finished grabbing JSON data");
    console.log(JSON.stringify(mapData,null,2));

    // calls "getLocationsData" method
}
