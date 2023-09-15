import express from "express";
import path from "path";
import fs from "node:fs";

const USERNAME = "ifitsasian"
const PASSWORD = "callross"

const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.redirect("/public");
});

Date.now()
app.get("/public", (req, res) => {
    res.sendFile(path.join(__dirname, "public.html"));
});

app.get("/latest_info", (req, res) => {

    let latest = fs.readFileSync(path.join(__dirname, "bars_latest.json"));
    latest = JSON.parse(latest);

    res.send(latest);
});

app.get("/private", (req, res) => {

    const reject = () => {
        res.setHeader("www-authenticate", "Basic");
        res.sendStatus(401);
    };

    const authorization = req.headers.authorization;

    if (!authorization) {
        return reject();
    }

    const [username, password] = Buffer.from(
        authorization.replace("Basic ", ""),
        "base64"
    )
    .toString()
    .split(":");

    if (!(username === USERNAME && password === PASSWORD)) {
        return reject();
    }


    res.sendFile(path.join(__dirname, "private.html"))
});

app.post("/new_info", (req, res) => {
    let latest = fs.readFileSync(path.join(__dirname, "bars_latest.json"))
    latest = JSON.parse(latest)

    let bar = req.headers.bar
    let timestamp = Number(req.headers.timestamp)
    let people = Number(req.headers.people)

    latest[bar] = {timestamp: timestamp, people: people}

    fs.writeFileSync(path.join(__dirname, "bars_latest.json"), JSON.stringify(latest))
    fs.appendFileSync(path.join(__dirname, "csv", `${bar}.csv`), `${timestamp}, ${people}\n`)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});