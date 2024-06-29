const { json } = require('express');
const fs = require('fs');
const { SourceTextModule } = require('vm');
var mil, lon, lat, quizScore, id;
var strongResults, weakResults;
// Strong results: the possible results that are given first.
// Weak results: all the possible results. does not contain any of Strong results 


setParameters(2, 37.362760, -122.023660);


// NOTE: change the fetch of getting exampleQuizScore.json to passing it through as an argument in setParameters()
function setParameters(mil_, lon_, lat_) {
    mil=mil_; lon=lon_; lat=lat_; getJSONS();
}

async function getJSONS() {
    // id = await fetch('./idjson.json').then((data)=>data.json()).then((json)=>JSON.parse(json)); 
    id = require('./idjson.json');
    // quizScore = await fetch('./exampleQuizScore.json').then((data)=>data.json()).then((json)=>JSON.parse(json));
    quizScore = require('./exampleQuizScore.json');
    console.log("got jsons");
    run();
}

async function run() {
    fs.readFile('companynamelist.txt', 'utf-8', async (err, data) => {
    if (err) { console.error(err); return; }
    return new JSON.parse(`{ "strong" : ${await createAPICommand(strongResults)}, "weak" : ${await createAPICommand(weakResults)}`);    
})};

async function createAPICommand(list) {
    let apicmd = "[out:json][timeout:100];(\n";
    var m = mil * 1609;
    list.forEach(brand => {
        apicmd += `nwr["brand"="${brand}"](around:${m},${lon},${lat});\n`;
    }); apicmd += `);out geom;`;
    
    console.error(apicmd);
    console.error(encodeURIComponent(apicmd))
    return await locate(apicmd);
}

function withinRange(value, target, range) {
    return value+range>target && value-range<target; 
}

function underThreshold(value, target) {
    return value<target;
}

function cutout(a1, a2) {
    return a1.filter((v) => a2.includes(v));
}
function filterOut(a1, a2) {
    return a1.filter((v) => !a2.includes(v));
}
function removeDuplicates(a) {
    return [...new Set(a)];
}

function xor(a1, a2) {
    return a1.filter(value => !a2.includes(value)).concat(a2.filter(value => !a1.includes(value)));
}

function createDataset(data) {
    var list = data.split("\r\n");
    
    // Legal Severity
    var len = id['leniency'];
    if (quizScore.legalSeverity < 100) {
        strongResults = len.high.concat(len.med);
        weakResults = len.med.concat(len.low);
    } else if (quizScore.legalSeverity < 600) {
        strongResults = len.med.concat(len.med);
        weakResults = len.med.concat(len.low);
    } else {
        strongResults = list;
        weakResults = list;  
    }
    
    console.log("outputting leniency");
    console.log(strongResults);
    console.log(weakResults);

    // Qualifications (expertise, education, labor)
    var edu = id['education'], exp = id['expertise'], lab = id['labor'];
    
    var strongEduCutout, weakEduCutout;
    if (quizScore.education < 10) { 
        strongEduCutout = edu.none; 
        weakEduCutout = edu.none; 
    } else if (quizScore.education < 20) { 
        strongEduCutout = edu.none; 
        weakEduCutout = edu.high.concat(edu.none); 
    } else if (quizScore.education < 40) { 
        strongEduCutout = edu.high.concat(edu.none); 
        weakEduCutout = edu.high.concat(edu.none); 
    } else if (quizScore.education < 65) {
        strongEduCutout = edu.high.concat(edu.none);
        weakEduCutout = edu.ax.concat(edu.high.concat(edu.none)); 
    } else if (quizScore.education < 80) {
        strongEduCutout = edu.ax.concat(edu.high.concat(edu.none));
        weakEduCutout = edu.ax.concat(edu.high); 
    } else {
        strongEduCutout = edu.bx.concat(edu.ax.concat(edu.high));
        weakEduCutout = edu.ax.concat(edu.high.concat(edu.none)); 
    }

    strongResults = cutout(strongResults, strongEduCutout);
    weakResults = cutout(weakResults, weakEduCutout);

    console.log("outputting education");
    console.log(strongResults);
    console.log(weakResults);

    var strongExpCutout, weakExpCutout;
    if (quizScore.expertise < 60) {
        strongExpCutout = exp.low;
        weakExpCutout = exp.high.concat(exp.med);
    } else if (quizScore.expertise < 85) {
        strongExpCutout = exp.med.concat(exp.low);
        weakExpCutout = list;
    } else {
        strongExpCutout = list;
        weakExpCutout = exp.med.concat(exp.low);
    }

    strongResults = cutout(strongResults, strongExpCutout);
    weakResults = cutout(weakResults, weakExpCutout);

    console.log("outputting experience");
    console.log(strongResults);
    console.log(weakResults);

    var strongLabFilter, weakLabFilter;
    if (withinRange(quizScore.manualLabor, 50, 25)) { 
        strongLabFilter = lab.lots; 
        weakLabFilter = [];
    } else if (quizScore <= 25) {
        strongLabFilter = lab.lots.concat(lab.med);
        weakLabFilter = lab.lots;
    } else {
        strongLabFilter = [];
        weakLabFilter = []
    }

    strongResults = filterOut(strongResults,strongLabFilter);
    weakResults = filterOut(weakResults,weakLabFilter);

    console.log("outputting labor");
    console.log(strongResults);
    console.log(weakResults);

    // Easiness (work schedule, working style, accommodation)
    var sch = id['schedule'], sty = id['style'], acc = id['acc'];
    var flxExtract, indExtract;
    
    if (quizScore.flexibility > 120)  {
        flxExtract = sch.set.concat(acc.low.concat(acc.high));
    } else if (quizScore.flexibility > 80) {
        flxExtract = sch.set.concat.acc.low;
    } else {
        flxExtract = [];
    }
    
    if (quizScore.independence < 30) indExtract = sty.self;
    else if (quizScore.independence > 60) indExtract = sty.team;
    else indExtract = [];

    var easeExtract = flxExtract.concat(indExtract)
    // weakResults.; weakResults = removeDuplicates(weakResults);
    // strongResults.remove(easeExtract); strongResults = removeDuplicates(strongResults);

    weakResult = weakResults.concat(cutout(strongResults, easeExtract)); weakResults=removeDuplicates(weakResults);
    strongResults = filterOut(strongResults, easeExtract); strongResults=removeDuplicates(strongResults);

    console.log("outputting independence");
    console.log(strongResults);
    console.log(weakResults);
    

    // Preferences (industry, working environment, compatability)

    if (strongResults.length > 10) {
        var skl = id['skills'];
        
        var skillExtract=[];
        if (quizScore.customerService < 75) {
            skillExtract = skillExtract.concat(skl.cust.concat(skl.admn));
        }
        if (quizScore.manufacturing < 75) skillExtract = skillExtract.concat(skl.manu);
        if (quizScore.technology < 75) skillExtract = skillExtract.concat(skl.tech);
        if (quizScore.food < 75) skillExtract = skillExtract.concat(skl.food);
        if (quizScore.retail < 75) skillExtract = skillExtract.concat(skl.sale);

        tempWeak = weakResult.concat(cutout(strongResults, skillExtract)); weakResults=removeDuplicates(weakResults);
        tempStrong = filterOut(strongResults, skillExtract); strongResults=removeDuplicates(strongResults);

        if (tempWeak.length != 0 || tempStrong.length != 0) {
            weakResults = tempWeak; strongResult = tempStrong;
        }

        console.log("outputting skills");
        console.log(strongResults);
        console.log(weakResults);
    }

    if (strongResults.length > 10) {
        if (!withinRange(quizScore.indoorPref, 50, 60)) {
            var env = id['environment'];
            var envExtract;
            if (quizScore.indoorPref<50) envExtract=env.in; 
            else envExtract=env.out;

            weakResults = weakResult.concat(cutout(strongResults, skillExtract)); weakResults=removeDuplicates(weakResults);
            strongResults = filterOut(strongResults, skillExtract); strongResults=removeDuplicates(strongResults);

            if (tempWeak.length != 0 || tempStrong.length != 0) {
                weakResults = tempWeak; strongResult = tempStrong;
            }

            console.log("outputting environment");
            console.log(strongResults);
            console.log(weakResults);
        }
    }
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
