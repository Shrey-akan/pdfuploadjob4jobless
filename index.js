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
    credentials: true,
    origin: [
        "http://localhost:3000",
        "https://rocknwoods.website",
        "https://job4jobless.com",
    ],
};

app.use(cors(corsOptions));

app.get("/test", (req, res) => {
    res.status(200).send("Welcome");
});
app.use("/api", apiset);
;
dbconnect();

app.listen(4000, () => {
    console.log("listening on port:4000");
});
