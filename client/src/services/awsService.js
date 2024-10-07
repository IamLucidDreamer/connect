import axios from "axios";
import server from "../helpers/apiCall";

export const getPresignedUrl = async (file) => {
  return new Promise((resolve, reject) => {
    server
      .get(`/aws/get-presigned-url?fileName=${file.name}&fileType=${file.type}`)
      .then((res) => {
        resolve(res.data.presignedUrl);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const uploadFileToS3 = async (file, presignedUrl) => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };
    axios
      .put(presignedUrl, file, options)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
