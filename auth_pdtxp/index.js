const config = require("config");
const express = require("express");
const connect = require("./utils/db.util");

const port = config.get("port");

const app = express();

app.listen(process.env.PORT || port, async () => {
    console.log(`Server Running on PORT: ${port}`);
    await connect();
});