const express = require("express");
const app = express();

// make express backend run on port 3000 or localhost:3000
app.listen(3000, () => {
    console.log("server is running on port 3000");
});

app.get("/", (req, res) => {
    res.send("Hello from Node API. Location: Home");
});

app.get("/contact_us", (req, res) => {
    res.send("Hello from Node API. Location: Contact Us Page");
});

app.get("/about_us", (req, res) => {
    res.send("Hello from Node API. Location: About Us Page");
});
