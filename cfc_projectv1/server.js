// const http = require('http');
// const java = require('java');
// const fs = require('fs');
// const app = express();

// const hostname = '127.0.0.1';
// const port = 3000;
// const server = http.createServer( (req, res) => {
    
//     let filePath = __dirname + '/public/index.html';
//     console.log(req.url);

//     switch (req.url) {
//         case '/aboutus': filePath = __dirname + '/public/about.html'; break;
//         default: __dirname + '/public/index.html';
//     }

//     fs.readFile(filePath, (err, data) => {
//         res.statusCode=200;
//         res.setHeader('Content-Type', 'text/html');
//         res.end(data, 'utf8');
//     });
// });

// server.listen(port, hostname, () => {
//     console.log(`Server is running at https://${hostname}:${port}`);
// });

// const express = require('express');
// const java = require('java');
// const javaLangSystem = java.import('java.lang.System');
// const app = express();
// const port = 3000;

// app.use(express.json());

// app.get('/callJavaMethod', (req , res) => {
//     java.classpath.push('"C:\\Users\\leafar\\Downloads\\cfc_project\\apisignal\\Main.class"');
//     const MyClass = java.import()
// });

// const exec = require('child_process').exec;
const java = require('java');
// java.import('C:\\Users\\leafar\\Downloads\\cfc_project\\apisignal\\hobonohomo.jar');


child = exec('C:\\Users\\leafar\\Downloads\\cfc_project\\apisignal\\hobonohomo',
    (error, stdout, stderr) => {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error != null) {
            console.log('exec error: ' + error);
        }
    }
);