const express = require("express");
const dbconnect = require("./dbconnect");
const apiset = require("./routes/cloudinaryroute")
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const cloudinary=require("cloudinary");

const app = express();
app.use(express.json({ limit: "10mb" }));

cloudinary.config({ 
    cloud_name: 'daedd1zfw', 
    api_key: '955338942139359', 
    api_secret: 'ip8Slb3geFBQHVUH8VqdF3PUj8s' 
  });
app.use(morgan("common"));


const corsOptions = {
    origin: ['https://rocknwoods.website','https://storage.job4jobless.com','http://localhost:3000'], // Set the allowed origin (the URL of your React frontend)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
    preflightContinue: false, // Disable preflight requests
    optionsSuccessStatus: 204, // Set the status code for successful preflight requests
    allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
    credential:true
  };
  
app.use(cors(corsOptions));

app.get("/test", (req, res) => {
    res.status(200).send("Welcome");
});
app.use("/api", apiset);
;
dbconnect();
const privateKey = fs.readFileSync('/etc/letsencrypt/live/storage.job4jobless.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/storage.job4jobless.com/fullchain.pem', 'utf8');
const credentials = {
  key: privateKey,
  cert: certificate,
};

// Create an HTTPS server using Express app and SSL credentials
const httpsServer = https.createServer(app);

httpsServer.listen(4000, () => {
    console.log("listening on port:4000");
});
