export const filterPDF = (
    req: Express.Request, 
    file: Express.Multer.File,
    callback,
) => {
    //si el archivo no existe o no viene entonces:
    if(!file) return callback (new Error ('Archivo vacio'), false);

   // llegamos hasta el mimetype y tomamoa laextension del archivo 
   const fileExtension = file.mimetype.split('/')[1];

   //estas serian las extensiones validas para los archivos
   const validExtension = [ 'pdf'];

   
  //si las extensiones validas incluyen la extension del archivo
   if(validExtension.includes(fileExtension)) {
    return callback(null, true);
   }
   callback(null, false);
};
