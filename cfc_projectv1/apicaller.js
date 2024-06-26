// // var dist, long, lat;

// // var exec = require('child_process').exec, child;
// // child = exec('hobonohomo.jar',
// //   function (error, stdout, stderr){
// //     console.log('stdout: ' + stdout);
// //     console.log('stderr: ' + stderr);
// //     if(error !== null){
// //       console.log('exec error: ' + error);
// //     }
// // });

// var java = require("java");
// var jarfile = "hobonohomo.jar";
// java.classpath.push(jarPath);
// java.import('Main.class');
const fs = require('fs');
var mil, lon, lat;

function setParameters(mil_, lon_, lat_) {
    mil=mil_; lon=lon_; lat=lat_;
}

var apicmd = fs.readFile('companynamelist.txt', 'utf-8', (err, data) => {
    if (err) { console.error(err); return; }
    
    let fintxt = "[out:json][timeout:100];(\n";
    console.log(fintxt);
    var nameArray = nameList(data);
    var m = mil * 1609;
    nameArray.forEach(brand => {
        fintxt += `nwr["brand"="${brand}"](around:${m},${lon},${lat});\n`;
    }); fintxt += `);out geom;`; return fintxt;
});

var nameList = (data) => {
    return data.split("\r\n");
};



setParameters(2, 37.362760, -122.023660);
console.log(apicmd);








