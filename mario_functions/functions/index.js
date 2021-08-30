const projectRoutes = require("./src/routes/projectRoutes");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({ origin: true }));
var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(projectRoutes);
exports.app = functions.https.onRequest(app);
