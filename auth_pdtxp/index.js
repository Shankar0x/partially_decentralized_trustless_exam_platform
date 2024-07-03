const config = require("config");
const express = require("express");
const connect = require("./utils/db.util");
const userRoute = require("./routes/user.route")

const port = config.get("port");

const app = express();

app.use(express.json());
app.use(express.urlencoded({limit: "100mb", extended: true}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type, authorization");

    console.log(`${new Date().toString()} => ${req.originalUrl}`);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).jsonp("Internal Server Error!");
});

app.listen(process.env.PORT || port, async () => {
    console.log(`Server Running on PORT: ${port}`);
    await connect();
    await userRoute(app);
});