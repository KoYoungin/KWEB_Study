const fs = require('fs');
const util = require('util');
const path = require('path');

function readDirectory(tmpDir){
    fs.readdir(tmpDir,(err,FileList)=>{
        // console.log(`name = ${FileList}, ext = ${path.extname(tmpFile)}`);
        for(let i=0;i<FileList.length;i++){
            const tmpFile = path.join(tmpDir,FileList[i]);
            fs.stat(tmpFile,(err,stats)=>{
                if(stats.isDirectory()){
                    readDirectory(tmpFile);
                }
                else{
                    if(path.extname(tmpFile)=='.js')
                    console.log(tmpFile);
                }
            });
        }
    });
}

const testDir = './test';
readDirectory(testDir);