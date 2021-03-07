const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 9999;

let contents = fs.readFileSync("./uploads/data.json");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/", express.static(__dirname + "../../frontend/public"));

app.get("/uploads", express(), (req, resp) => {
    resp.status(200).send("ok");
});

app.use(fileUpload());

app.post("/upload", function (req,res) {
    if(!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send("No files uploaded!");
        return;
    }

    console.log("req.files>>>", req.files);

    let incomingFile = req.files.userFile;
    let uploadPath = __dirname + "/uploads/" + incomingFile.name;
    let incomingText = req.body.userData;
    let reqObject = JSON.parse(incomingText);
    let filename = reqObject.userName;

    console.log("Filename:", filename);

    fs.writeFile(`./uploads/${filename}.json`, incomingText, (err) => {
        if (err) throw err;
        console.log("The file has benn saved!");
    });

    incomingFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200);
        console.log("File uploaded!");
    });

});

/* app.post("/upload", function (req, res) {
    let sampleFile;
    let uploadPath;
    let newWednesday = {
        uName: req.body.uName,
        uEmail: req.body.uEmail,
        pCode: req.body.pCode,
        uCity: req.body.uCity,
        uStreet: req.body.uStreet,
        uHouseNr: req.body.uDoorNr,
    };

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send("No files were uploaded.");
        return;
    }

    sampleFile = req.files.userFile;

    uploadPath = __dirname + "/uploads/" + sampleFile.name;

    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(269).json({ newWednesday });
        res.end("\n");
    });
}); */

//
app.listen(PORT, function () {
    console.log("Express server listening on port ", PORT);
});