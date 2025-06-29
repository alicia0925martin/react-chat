const cloudinary = require('cloudinary').v2;

exports.uploadFileToCloudinary = async(file , folder , quality , height)=>{
    const options = {folder}
    options.resource_type = "auto";
    if(quality){
        options.quality = quality;
    }
    else{
        options.quality = "auto"; 
    }
    if(height){
        options.height = height;
    }

    return await cloudinary.uploader.upload(file.tempFilePath , options )
}

exports.validateFileType = (validFileTypes , fileType)=>{
    return validFileTypes.includes(fileType);
}