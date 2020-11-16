const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const sls = require("serverless-http");
const app = express();
const axios = require("axios");

app.use(bodyParser.json());
const port = process.env.PORT || 5000;

app.locals.appName = "Our Application";

app.get("/api/hello", (req, res) => {
    res.send({ express: "Hello From Express" });
});

// app.post('/api/blah', verifyToken, (req, res) => {
//   jwt.verify(req.token, 'secretkey', (err, authData) => {
//     if(err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: "BLAH",
//         authData
//       });
//     }
//   });
// });

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// set up the set the routes defined in /server/routers to be endpoint
// require("./server/routes")(app);

// default file to send if none of our other router handlers catch the request
// app.get("*", (req, res) => {
//     res.sendFile(__dirname + "/client/index.html");
// });

// Redirect everything to https://coinbay.vinsonly.me
app.use("*", async (req, res) => {
    try {
        // Extract HTTP method and endpoint url
        const { method, originalUrl } = req;
        const axiosConfig = {
            method,
            url: `https://coinbay.vinsonly.me${originalUrl}`,
        };
        // Make request to https://coinbay.vinsonly.me/<whatever endpoint>
        const { data } = await axios(axiosConfig);
        return res.send(data);
    } catch (err) {
        return res.status(500).send(err);
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports.handler = sls(app);
