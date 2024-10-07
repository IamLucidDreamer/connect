const {
  STATUS_SERVER_ERROR,
  STATUS_SUCCESS,
} = require("../config/constants");
const logger = require("../utils/logger");
const AWS = require("aws-sdk");
const dotenv = require('dotenv');

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION || 'ap-south-1',
});

const getPresignedUrl = async (req, res) => {
  const { fileName, fileType } = req.query;

  const s3Params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME || "user-upload-media",
    Key: fileName || Math.random().toString(36).substring(7),
    Expires: 60,
    ContentType: fileType,
    ACL: "public-read",
  };

  try {
    const presignedUrl = await s3.getSignedUrlPromise("putObject", s3Params);
    res
      .status(STATUS_SUCCESS)
      .json({ message: "Presigned URL generated Successfully", presignedUrl });
  } catch (error) {
    logger.error("Error generating presigned URL", error);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ error: "Error generating presigned URL" });
  } finally {
    logger.info("Presigned URL generat API called");
  }
};

module.exports = {
  getPresignedUrl,
};
