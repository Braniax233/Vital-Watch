require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const authenticateToken = require('./middleware/auth');

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};

// Initialize Firebase Admin with error handling
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
  
  const db = admin.database();
  console.log('Firebase Admin SDK initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
  process.exit(1);
}

const db = admin.database();

// Apply authentication middleware to all routes
app.use(authenticateToken);

// GET /vitals - Get latest 50 vital records
app.get('/vitals', async (req, res) => {
  try {
    const vitalsRef = db.ref('vitals');
    const snapshot = await vitalsRef.limitToLast(50).once('value');
    const vitals = [];
    
    snapshot.forEach((childSnapshot) => {
      vitals.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    
    res.json(vitals);
  } catch (error) {
    console.error('Error fetching vitals:', error);
    res.status(500).json({ error: 'Failed to fetch vitals' });
  }
});

// GET /vitals/:userId - Get all records for a specific user
app.get('/vitals/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const vitalsRef = db.ref('vitals');
    const snapshot = await vitalsRef.orderByChild('userId').equalTo(userId).once('value');
    const userVitals = [];
    
    snapshot.forEach((childSnapshot) => {
      userVitals.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    
    res.json(userVitals);
  } catch (error) {
    console.error('Error fetching user vitals:', error);
    res.status(500).json({ error: 'Failed to fetch user vitals' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});