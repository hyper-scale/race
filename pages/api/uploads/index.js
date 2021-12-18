import nextConnect from "next-connect";
import { getApps, initializeApp } from "firebase-admin/app";
import { v4 as uuidv4 } from "uuid";
const { getStorage, uploadBytes, getDownloadURL } = require("firebase-admin/storage");
const multer = require("multer");

const { GOOGLE_CLOUD_PROJECT, FIREBASE_STORE_URL, FIREBASE_STORAGE_BUCKET_URL, FIREBASE_APP_ID } = process.env;

const firebaseConfig = {
  projectId: GOOGLE_CLOUD_PROJECT,
  databaseURL: FIREBASE_STORE_URL,
  storageBucket: FIREBASE_STORAGE_BUCKET_URL,
  appId: FIREBASE_APP_ID,
};

if (!global.firebaseApp) {
  global.firebaseApp = initializeApp(firebaseConfig);
}
const storage = getStorage(global.firebaseApp);

// Add file to Storage and return the file path
const uploadFile = async (req, res) => {
  // Grab the file
  const timestamp = Date.now();
  const fileName = `${timestamp}_${req.file.originalname}`;
  const bucket = storage.bucket();
  const file = bucket.file(fileName);

  let uuid = uuidv4();
  const fileStream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
      metadata: {
        firebaseStorageDownloadTokens: uuid,
      },
    },
    resumable: false,
  });
  fileStream.end(req.file.buffer);
  console.log(`${fileName} uploaded to ${bucket.name}`);
  const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileName}?alt=media&token=${uuid}`;
  return fileUrl;
};

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });
const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `something went wrong ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not supported` });
  },
});
apiRoute.post("/api/uploads", upload.single("file"), async (req, res) => {
  const url = await uploadFile(req, res);
  res.status(200).json({ url: url });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
