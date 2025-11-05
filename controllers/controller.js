const User = require('../Schema/userSchema');
const Product = require('../Schema/productSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {uploadToCloudinary} = require('../cloudinary/cloudinaryHelpers');

const registerUser = async(req, res) => {
  try{

    const {username, email, password} = req.body;

    //Check if username or email exist in database
    const checkUser = await User.findOne({$or:[{username}, {email}]});

    if(checkUser) {
      return res.status(400).json({
        success: false,
        message: "The current username or email already exist"
      });
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Save user in database
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(200).json({
      success: true,
      message: "User registered Successfully",
      data: newUser
    });

  } catch(error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again later"
    });

    
   console.log(error);
  }
}

const loginUser = async (req, res) => {
  try{
    //Data from the frontend
    const {username, password} = req.body;

    //Check if the username is in the database
    const user = await User.findOne({username});

    //If username is not in the databse
    if(!user) {
      return res.status(401).json({
        success: false,
        message: "The username is not registered"
      });
    }

    //Compare the passward from the frontend
    const comparePass = await bcrypt.compare(password, user.password);

    if(!comparePass) {
       return res.status(401).json({
        success: false,
        message: "The password is invalid"
      });
    }

    //Create the user token
    const token = jwt.sign({
      userId: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }, process.env.JWT_SECRET, {expiresIn: '30m'});

    //Response when login is successful
    res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });


  } catch(error) {
    console.log(error);

      res.status(500).json({
      success: false,
      message: "Something went wrong please try again later"
    });
  }
}

const homeController = async (req, res) => {
  try{

    const {username, email, role} = req.userInfo;

    res.status(200).json({
      success: true,
      message: "Welcome to home page",
      data: {
        username,
        email,
        role
      }
    });

  } catch(error) {
     console.log(error);

      res.status(500).json({
      success: false,
      message: "Something went wrong please try again later"
    });
  }
}

const adminController = async (req, res) => {
  try{
    const {username, email, role} = req.userInfo;

    res.status(200).json({
      success: true,
      message: "Welcome admin user",
      data: {
        username,
        email,
        role
      }
    });

  } catch(error) {
     console.log(error);

      res.status(500).json({
      success: false,
      message: "Something went wrong please try again later"
    });
  }
}

const uploadProductController = async (req, res) => {
  try{
    const { productName, productPrice, productDescription } = JSON.parse(req.body.details);

    if(!req.file) {
      return res.status(400).json({
        success: false,
        message: "An image needs to be uploaded"
      });
    }

    //Upload to cloudinary
    const {imageUrl, imagePublicId} = await uploadToCloudinary(req.file.path);

    //Save product data in database
    const savedImage = await Product.create({
      imageUrl,
      imagePublicId,
      productName,
      productPrice,
      productDescription,
      uploadedBy: req.userInfo.userId
    });

    if(!savedImage) {
      return res.status(400).json({
        success: false,
        message: "something went wrong while uploading the product"
      })
    }

    //Product uploaded
    res.status(201).json({
      success: true,
      message: "Product uploaded successfully"
    });


  } catch(error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong please try again later"
    });
  }
}

const changePassword = async (req, res) => {
  try{
    const userId = req.userInfo.userId;

    //Get data from the frontend
    const {oldPassword, newPassword} = req.body;

    //Check if user exists
    const user = await User.findById({userId});

    if(!user) {
      return res.status(400).json({
        success: false,
        message: "User is not valid"
      });
    }

    //Check if the old password is correct
    const confirmOldPass = await bcrypt.compare(oldPassword, user.password);

    if(!confirmOldPass) {
      return res.status(400).json({
        success: false,
        message: "The old password is incorrect"
      });
    }

    //Hash the new password
    const hashedNewPass = await bcrypt.hash(newPassword, 10);

    //Update password
    user.password = hashedNewPass
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully"
    });

  } catch(e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again later'
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  homeController,
  adminController,
  uploadProductController,
  changePassword
}