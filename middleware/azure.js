const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  newPipeline,
} = require("@azure/storage-blob");

const AzureAccountName = process.env.AZURE_STORAGE_ACCOUNT_NAME || "hillzimage";
const AzureAccessKey =
  process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY ||
  "/3N7mr9p8zx4aGDv0rgQLY/BFxUPMt9/FL5dCYe1JRgKNWu7iqnnsJZZv5xAMnX9SY3gAvkq8IK2/yyFjl8pQQ==";

const sharedKeyCredential = new StorageSharedKeyCredential(
  AzureAccountName,
  AzureAccessKey
);
const pipeline = newPipeline(sharedKeyCredential);

const blobServiceClient = new BlobServiceClient(
  `https://${AzureAccountName}.blob.core.windows.net`,
  pipeline
);

const getBlobName = (originalName) => {
  const identifier = Math.random().toString().replace(/0\./, "");
  return `${identifier}-${originalName}`;
};

exports.uploadImageToAzure = (containerName) => {
  return async (req, res, next) => {
    if (!req.file) return next();

    const blobName = getBlobName(req.file.originalname);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
      await blockBlobClient.uploadData(req.file.buffer, {
        blobHTTPHeaders: { blobContentType: `${req.file.mimetype}` },
      });

      req.body.image_file = `/${containerName}/${blobName}`;

      next();
    } catch (err) {
      next(err);
    }
  };
};

exports.uploadImageToAzure2 = (containerName) => {
  return async (req, res, next) => {
    if (!req.files["icon"] && !req.files["image"]) {
      return next();
    }

    if (req.files["icon"] && !req.files["image"]) {
      const blobName2 = getBlobName(req.files["icon"][0].originalname);
      const containerClient2 = blobServiceClient.getContainerClient(
        containerName
      );
      const blockBlobClient2 = containerClient2.getBlockBlobClient(blobName2);
      try {
        await blockBlobClient2.uploadData(req.files["icon"][0].buffer, {
          blobHTTPHeaders: {
            blobContentType: `${req.files["icon"][0].mimetype}`,
          },
        });

        req.body.icon = `/${containerName}/${blobName2}`;
        next();
      } catch (err) {
        next(err);
      }
    }
    if (!req.files["icon"] && req.files["image"]) {
      const blobName = getBlobName(req.files["image"][0].originalname);
      const containerClient = blobServiceClient.getContainerClient(
        containerName
      );
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      try {
        await blockBlobClient.uploadData(req.files["image"][0].buffer, {
          blobHTTPHeaders: {
            blobContentType: `${req.files["image"][0].mimetype}`,
          },
        });

        req.body.image = `/${containerName}/${blobName}`;

        next();
      } catch (err) {
        next(err);
      }
    }
    if (req.files["icon"] && req.files["image"]) {
      const blobName = getBlobName(req.files["image"][0].originalname);
      const containerClient = blobServiceClient.getContainerClient(
        containerName
      );
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const blobName2 = getBlobName(req.files["icon"][0].originalname);
      const containerClient2 = blobServiceClient.getContainerClient(
        containerName
      );
      const blockBlobClient2 = containerClient2.getBlockBlobClient(blobName2);

      try {
        console.log("good boy");
        await blockBlobClient.uploadData(req.files["image"][0].buffer, {
          blobHTTPHeaders: {
            blobContentType: `${req.files["image"][0].mimetype}`,
          },
        });
        await blockBlobClient2.uploadData(req.files["icon"][0].buffer, {
          blobHTTPHeaders: {
            blobContentType: `${req.files["icon"][0].mimetype}`,
          },
        });
        req.body.image = `/${containerName}/${blobName}`;
        req.body.icon = `/${containerName}/${blobName2}`;
        next();
      } catch (err) {
        next(err);
      }
    }
  };
};
exports.uploadImageToAzure44 = (containerName) => {
  return async (req, res, next) => {
    if (!req.files.length) return next();
    console.log(req.files);

    const arr = [];

    await Promise.all(
      req.files.map(async (itm, indx) => {
        const blobName = getBlobName(itm.originalname);
        const containerClient = blobServiceClient.getContainerClient(
          containerName
        );
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        try {
          console.log("mahdad is a good boy");
          await blockBlobClient.uploadData(itm.buffer, {
            blobHTTPHeaders: { blobContentType: `${itm.mimetype}` },
          });

          arr.push(`/${containerName}/${blobName}`);

          // req.body.image_file = `/${containerName}/${blobName}`;
        } catch (err) {
          next(err);
        }

        req.tickets = arr;
        console.log(req.tickets);
        next();
      })
    );

    // const blobName = getBlobName(req.file.originalname);
    // const containerClient = blobServiceClient.getContainerClient(containerName);
    // const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // try {
    //   Promise.all(req.files.map((itm) => {}));
    //   await blockBlobClient.uploadData(req.file.buffer, {
    //     blobHTTPHeaders: { blobContentType: `${req.file.mimetype}` },
    //   });

    //   req.body.image_file = `/${containerName}/${blobName}`;

    //   next();
    // } catch (err) {
    //   next(err);
    // }
  };
};
