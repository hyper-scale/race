import { getSession } from "next-auth/react";
import nextConnect from "next-connect";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { v4 as uuidv4 } from "uuid";
const { getStorage } = require("firebase-admin/storage");
const multer = require("multer");

const { GOOGLE_CLOUD_PROJECT, FIREBASE_STORAGE_BUCKET_URL } = process.env;

if (!global.firebaseApp) {
  const firebaseConfig = {
    projectId: GOOGLE_CLOUD_PROJECT,
    storageBucket: FIREBASE_STORAGE_BUCKET_URL,
  };
  if (process.env.FIREBASE_APPLICATION_CREDENTIALS) {
    //const serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_APPLICATION_CREDENTIALS, "base64").toString());
    const serviceAccount = JSON.parse(process.env.FIREBASE_APPLICATION_CREDENTIALS);
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
    firebaseConfig.credential = cert(serviceAccount);
  }
  global.firebaseApp = initializeApp(firebaseConfig);
}

const storage = getStorage(global.firebaseApp);

// Add file to Storage and return the file path
const uploadFile = async (req, res) => {
  // Grab the file
  const timestamp = Date.now();
  const fileName = `applications-uploads/${timestamp}_${req.file.originalname}`;
  const bucket = storage.bucket();
  const file = bucket.file(fileName);
  let uuid = uuidv4();
  const fileStream = file.createWriteStream({
    metadata: {
      metadata: {
        originalName: req.file.originalname,
        firebaseStorageDownloadTokens: uuid,
      },
    },
    resumable: false,
  });
  // This is here in case any errors occur
  fileStream.on("error", (err) => {
    console.error(err);
  });
  fileStream.on("finish", (data) => {
    const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
      file.name
    )}?alt=media&token=${uuid}`;
    console.log(`${req.file.originalname} uploaded to ${bucket.name}`);
    res.status(200).send({ filename: req.file.originalname, url: fileUrl, size: req.file.size });
  });
  fileStream.end(req.file.buffer);
};

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });
const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not supported` });
  },
});

apiRoute.post("/api/uploads", upload.single("file"), async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    if (!req.file) {
      res.status(400).send("Error: No files found");
    } else {
      uploadFile(req, res);
    }
  } else {
    res.status(401).json({ error: "Unauthorized", success: false });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
