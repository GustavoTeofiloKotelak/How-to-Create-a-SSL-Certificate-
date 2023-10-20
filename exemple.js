//Imports
const https = require('https');
const fs = require('fs');


//Paste the Path to your certificate
//Cole o caminho do seu certificado

const options = {
    key: fs.readFileSync('C:/Users/Dev/ProjectFolder/ProjectWithHTTPS/certificateFolder/certificate.key'),
    cert: fs.readFileSync('C:/Users/Dev/ProjectFolder/ProjectWithHTTPS/certificateFolder/certificate.crt')
};

///Your code

https.createServer(options, app).listen(443, () => {
    console.log('Server is Running in 443');
});


///Your code
