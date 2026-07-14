import cloudinary from "../config/cloudinary.js";

const upload= (
  fileBuffer,
  folder
) => {
  return new Promise(
    (resolve, reject) => {
      const stream =
        cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: "auto",
          },
          (error, result) => {
            if (error)
              reject(error);

            resolve(result);
          }
        );

      stream.end(fileBuffer);
    }
  );
};

export default upload;