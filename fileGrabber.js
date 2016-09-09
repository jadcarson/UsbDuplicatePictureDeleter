const express = require('express');
const http = require('http');
const bodyParser = require('body-parser')
const fs = require('file-system')
const app = express();


app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', (req,res) => {
    console.log("here now")
    var names = getFiles('D:/pictures')
    console.log(names)
    res.send(names)
})

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}


app.listen(3000);