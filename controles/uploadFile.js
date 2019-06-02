'use strict'

const path=require('path')
const File=require('../modelos/file')
const multer=require('multer')


//--------------configuracion de mulkter para que reciba archivos----------------------
    const storage = multer.diskStorage({
        destination: "./public/video",
        filename:function(req, file, cb){
            var extencionArchivo=path.extname(file.originalname)   
            console.log(extencionArchivo)
            cb(null, "FILE__"+Date.now()+extencionArchivo) 
        }
    })

    var upload = multer({
        storage:storage
    }).single("file");



//function of multer
function uploadFile(req,res){
       
        upload(req, res, (err) => {
            // console.log(req.file)
           if(err){
               res.status(500).json({
                   "message":"No se pude guadar el archivo"
               })
           }else{
               var ruta = req.file.path.substr(6, req.file.path.length);   //estraea la ruta, quita public   y solo queda \video\VIDEO_1558896752374.MP4
               console.log(ruta)
    
               var filedata = {
                   originalname:req.file.originalname,
                   filename: req.file.filename,
                   Physicalpath: req.file.path,
                   relativepath: 'http://localhost:7777',
                   linkfile:'http://localhost:7777'+ruta,
                   size: req.file.size
               }
    
               //guarda el archivo el la base de datos y reorna la id del archivo guardao
               var file=new File(filedata);
               file.save().then((infofile)=>{
                   console.log(infofile);
                   console.log(infofile._id);
                   console.log(infofile.linkfile)
                   
               })
               
           };
           
           res.status(200).send(file)
           
        })

}



module.exports={
    uploadFile
}