const validator = require('validator')


const validateSignUpData = (req)=>{
    const {username , email , password , confirmPassword} = req.body; 

    if(!username || !email || !password || !confirmPassword)
    {
        throw new Error("All fields are required!")
    }

    if(password !== confirmPassword){
        throw new Error("Passwords do not match!")
    }

    if(!validator.isEmail(email)){
        throw new Error("Email is not valid!.")
    }

    if(!validator.isStrongPassword(password)){
        throw new Error(
         "password is not strong enough.");
    }
}

const validateUpdateProfileData = (req) => {
  const ALLOWED_UPDATES = ["contactNumber", "displayName"];
  const updates = Object.keys(req.body);

  const isValidUpdate = updates.every((key) =>
    ALLOWED_UPDATES.includes(key)
  );

  if (!isValidUpdate) {
    throw new Error("Invalid fields in profile update!");
  }

  if (req.body.contactNumber) {
    if (!validator.isMobilePhone(req.body.contactNumber.toString(), 'any')) {
            throw new Error("Invalid contact number!");
        }
        req.body.contactNumber = parseInt(req.body.contactNumber);
    }
};


const getFileType = (mimeType) =>{
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("audio/")) return "audio";
  return "document";
}



module.exports = {
    validateSignUpData, 
    validateUpdateProfileData,
    getFileType
}