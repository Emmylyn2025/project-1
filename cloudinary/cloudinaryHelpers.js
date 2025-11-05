const cloudinary = require('./cloudinary');

const uploadToCloudinary = async (filePath) => {
  try{

    const result = await cloudinary.uploader.upload(filePath);

    return {
      imageUrl: result.secure_url,
      imagePublicId: result.public_id
    }

  } catch(error) {
    console.log('error While uploading to cloudinary', error);
    throw new Error('error While uploading to cloudinary');
  }
}

module.exports = {
  uploadToCloudinary
};