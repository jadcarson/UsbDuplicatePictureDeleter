const express = require('express');
const http = require('http');
const bodyParser = require('body-parser')
const fs = require('file-system')
const app = express();


app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended:false}))

var sizes = [];
var badFiles = [];
var totalDistance = 0;

app.get('/', (req,res) => {
    console.log("here now")
    var names = getFiles('D:/pictures')
    console.log(badFiles.length)
    deleteFiles('D:/pictures',names)
    res.send(badFiles)
})

function getFiles (dir, files_) {
    files_ = files_ || [];
    let files = fs.readdirSync(dir);
    let oldName = "";
    for (var i in files){
        totalDistance++;
        let name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            sizes.push(fs.statSync(name)['size'])
            if(totalDistance > 0 && oldName !== "" && fs.statSync(oldName)['size'] === fs.statSync(name)['size']){
                badFiles.push(name);
            }else {
                files_.push(name);    
            }
            oldName = dir + '/' + files[i];
        }
    }
    return files_;
}

function deleteFiles (dir, fileArray) {
    console.log(badFiles)
    for( var i = 0; i< badFiles.length; i++) {
        fs.unlinkSync(badFiles[i])
    }
}


app.listen(3000);