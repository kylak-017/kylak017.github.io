const express = require('express');
const path = require('path');
const cors = require('cors');
const admin = require("firebase-admin");
const app = express();

const PORT = process.env.PORT || 3000;

// --- Middleware ---
const corsOptions = {
  origin: 'http://127.0.0.1:5174', // For local dev, change/remove in production!
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());

// --- Serve static files from dist ---
app.use(express.static(path.join(__dirname, 'dist')));

// --- Firebase/Secret Manager Initialization ---
const oauth2Credentials = JSON.parse(process.env.GOOGLE_OAUTH2_CLIENT_JSON);
const { OAuth2Client } = require('google-auth-library');
const client2 = new OAuth2Client(
  oauth2Credentials.web.client_id,
  oauth2Credentials.web.client_secret,
  oauth2Credentials.web.redirect_uris[0]
);

const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
const client = new SecretManagerServiceClient({
  credentials: serviceAccount,
  projectId: serviceAccount.project_id,
});

async function getServiceAccountKey() {
  const name = 'projects/gems-350b8/secrets/my-service-account-key/versions/latest';
  const [version] = await client.accessSecretVersion({ name });
  console.log("Accessed Secret Manager version:", version.name);

  const payload = version.payload.data.toString('utf8');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://xxxxx.firebaseio.com' // Replace with your database URL
  });

  console.log("Firebase Admin initialized using Secret Manager.");
}

getServiceAccountKey().then(() => {

  // --- API Routes ---
  app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
  });

  app.get('/api/model', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/models/bottle.gltf'));
  });

  app.post('/api/save-scene', (req, res) => {
    const sceneData = req.body;
    console.log('Scene data saved:', sceneData);
    res.status(200).json({ message: 'Scene data saved successfully!' });
  });

  app.post('/verify-token', async (req, res) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      return res.status(401).json({ error: 'No token provided' });
    }
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const userRecord = await admin.auth().getUser(decodedToken.uid);
      res.json({ message: 'Token is valid', user: decodedToken, userData: userRecord });
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(401).json({ error: 'Unauthorized', details: error.message });
    }
  });

  app.use(express.static(path.join(__dirname, 'dist')));



  // --- Start server ---
  app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
  });

});
