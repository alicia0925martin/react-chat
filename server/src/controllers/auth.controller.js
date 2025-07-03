const { validateSignUpData } = require("../helpers");
const bcrypt = require('bcrypt');
const User = require("../models/User");

const otpGenerator = require('otp-generator');
const OTP = require("../models/Otp");



exports.signup = async(req ,res)=>{
    try{
        // fetch the user details: 
        const {username , email , password} = req.body;

        // validate the details:

        validateSignUpData(req);

        // check if the user already exists: 
        const existingUser = await User.findOne({$or:[{username: username.toLowerCase()},{email: email.toLowerCase()}]})

        if(existingUser){
            return res.status(401).json({
                success: false,message: "User already exists. Please login."
            })
        }

        // now hash the password: 
        const hashedPassword = await bcrypt.hash(password , 10);

        const profilePic = `https://tse4.mm.bing.net/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3`


        // now create the user: 
        const userPayload = await User.create({
            username: username.toLowerCase(), 
            profilePic, 
            email: email.toLowerCase(), 
            password: hashedPassword
        })


        const token = await userPayload.getJWT();

        userPayload.password = undefined; 

        const options = {
                maxAge : 24 * 60 * 60 * 1000,
                httpOnly: true, 
                sameSite: "none",
                secure: process.env.NODE_ENV === "production"
        }
        return res.cookie("token" , token , options).json({
            success: true, 
            token: token, 
            user: userPayload,
            message: "sign up successful", 
        }) 
      

    }
    catch(err){
        console.log(err);
        console.error(err); 
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error", 
            error: err.message
        })
    }
}


exports.login = async(req , res)=>{
    try{
        // fetch the user details: 
        const {username , email , password} = req.body;

        // validate the details:
        if((!username && !email) || !password){
            return res.status(404).json({
                success: false, 
                message: "all fields are required!"
            })
        }
        
        // check what is present if 

        // check if the user already exists: 
        const existingUser = await User.findOne({
            $or: [
                { email: email?.toLowerCase() },
                { username: username?.toLowerCase() }
            ]
            });

        if (!existingUser) {
        return res.status(401).json({
            success: false,
            message: "User doesn't exist. Please signup."
        });
        }

        // now validate the password: 

        if(await existingUser.validatePassword(password)){
            const token = await existingUser.getJWT();

            existingUser.password = undefined; 

            const options = {
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                    httpOnly: true, 
                    sameSite: "none",
                    secure: process.env.NODE_ENV === "production"
                    
            }
            return res.cookie("token" , token , options).status(200).json({
                success: true, 
                token: token, 
                user: existingUser,
                message: "login successful", 
            }) 
        }
        else{
            throw new Error("wrong password, please try again!")
        }

    }
    catch(err){
        console.log(err);
        console.error(err); 
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error", 
            error: err.message
        })
    }
}

exports.logout = async(req , res)=>{
    try{
        return res.cookie("token" , null, {
            expires: new Date(Date.now()),
            httpOnly: true
        }).status(200).json({
            success: true, 
            message: "logged out successfully!"
        })
    }
    catch(err){
        console.log(err);
        console.error(err); 
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error", 
            error: err.message
        })
    }
}

exports.checkUsername = async(req , res)=>{
    try{
        // fetch the username from req.body: 
        const {username} = req.body; 

        
        // check the regex here: 
        if(!/^(?!.*\.\.)(?!.*\.$)[a-zA-Z0-9._]{1,30}$/.test(username)){
            return res.status(401).json({
                success: false, 
                message: "username not valid"
            })
        }

        if(!username?.trim()){
            return res.status(404).json({
                success: false, 
                message: "username not valid"
            })
        }

        const existingUsername = await User.findOne({username}).select("username");

        if(existingUsername){
            return res.status(404).json({
                success: false, 
                message: "username already exists."
            })
        }

        return res.status(200).json({
            success: true, 
            message: "username is valid."
        })

    }
    catch(err){
        console.log(err);
        console.error(err); 
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error", 
            error: err.message
        })
    }
}

exports.sendOtp = async(req ,res)=>{
    try{
        // fetch the email from req.body: 
        const {email} = req.body; 
        
        // if email nto found: 
        if(!email){
            return res.status(404).json({
                success: false, 
                message: "email not found!"
            })
        }

        // check if the user exists with this email: 
        const existingUser = await User.findOne({email: email})

        if(existingUser){
            return res.status(400).json({
                success: false, 
                message: "user already exists. Please login"
            })
        }

        let otp = otpGenerator.generate(6 , {specialChars: false, 
            lowerCaseAlphabets: false, 
            upperCaseAlphabets: false
        })

        let existingOtp  = await OTP.findOne({otp})
        while(existingOtp){
            otp = otpGenerator.generate(6 ,{specialChars: false, 
            lowerCaseAlphabets: false, 
            upperCaseAlphabets: false
        } )

            existingOtp = await OTP.findOne({otp})
        }

        const otpPayload = await OTP.create({
            otp , email
        })

        return res.status(200).json({
            success: true, 
            data: otpPayload,
            message: "otp sent successfully"
        })
    }
    catch(err){
        console.log(err);
        console.error(err); 
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error", 
            error: err.message
        })
    }
}

exports.verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!otp || !email) {
      return res.status(404).json({
        success: false,
        message: "otp or email not found!",
      });
    }

    if (otp.toString().length !== 6) {
      throw new Error("Otp should be of 6 digits");
    }

    // Fix: use find() with sort + limit
    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    const otpDoc = recentOtp[0];

    if (!otpDoc || !otpDoc.otp) {
      return res.status(404).json({
        success: false,
        message: "OTP not found or expired. Please request a new OTP.",
      });
    }

    const storedOtp = otpDoc.otp.toString();
    const enteredOtp = otp.toString();

    if (storedOtp !== enteredOtp) {
      return res.status(401).json({
        success: false,
        message: "OTPs do not match! Please try again!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

