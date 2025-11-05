const jwt = require('jsonwebtoken');

const homeMiddleware = (req, res, next) => {
  const headers = req.headers['authorization'];

  const token = headers && headers.split(" ")[1];

  if(!token) {
    res.status(401).json({
      success: false,
      message: "please provide the token"
    });
  }

  try{

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.userInfo = decodedToken;

  next();

  } catch(err) {
    console.log('error', err);

    res.status(500).json({
      success: false,
      message: "something went wrong please try again later"
    });
  }
}

const adminMiddleware = (req, res, next) => {
  try{

    if(req.userInfo.role !== "admin"){
      return res.status(401).json({
        success: false,
        message: "Admin right required"
      });
    }

    next();

  } catch(error) {
    console.log('error', error);

    res.status(500).json({
      success: false,
      message: "something went wrong please try again later"
    });
  }
}

module.exports = {
  homeMiddleware,
  adminMiddleware
}