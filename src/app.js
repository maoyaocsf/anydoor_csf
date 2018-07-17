const http = require('http');
const chalk = require('chalk');
const path = require('path');

const conf = require('./config/defaultConfig');
const route = require('./helper/route');
const openUrl = require('./helper/openUrl');
class Server {
    constructor(config){
        this.conf = Object.assign({},conf,config);
    }
    start(){

        const server = http.createServer((req, res)=>{
    
            const filePath = path.join(this.conf.root,req.url);
            // console.log(filePath);
            route(req,res,filePath,this.conf);
            // fs.stat(filePath,(err,stats)=>{
            //     if(err){
            //         res.statusCode = 404;
            //         res.setHeader('Content-Type','text/plain');
            //         res.end(`${filePath} is not a directory or file`);
            //         return;
            //     }
            //     if(stats.isFile()){
            //         res.statusCode=200;
            //         res.setHeader('Content-Type','text/plain');
            //         // fs.readFile(filePath,(err,data)=>{
            //         //     if(err) throw err;
            //         //     res.end(data);
            //         // });
            //         fs.createReadStream(filePath).pipe(res);
            //     }else if(stats.isDirectory()){
            //         fs.readdir(filePath,(err,files)=>{
            //             res.statusCode=200;
            //             res.setHeader('Content-Type','text/plain');
            //             res.end(files.join(','));
            //         });
            //     }
            //})
            // res.statusCode = 200;
            // res.setHeader('Content-Type','text/plain');
            // res.end(filePath);
        });
        
        server.listen(this.conf.port,this.conf.hostname,()=>{
            const addr = `http://${this.conf.hostname}:${this.conf.port}`;
            console.log(`Server started at ${chalk.green(addr)}`);
            openUrl(addr);
        })
        
    }
}

module.exports = Server;
