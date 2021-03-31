var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

const webCookieConfig = require('./configs/web/cookiesConfig');
const webSessionConfig = require('./configs/web/sessionConfig');

const webSearchRouter = require("./routes/web/search");
const webPromoteRouter = require("./routes/web/promote");
const webMemberRouter = require("./routes/web/member");


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(
    session({
      secret: webSessionConfig.key,
      saveUninitialized: true,
      resave: false,
    })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieParser(webCookieConfig.key));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/api/web/search", webSearchRouter);
app.use("/api/web/promote", webPromoteRouter);
app.use("/api/web/member", webMemberRouter);



module.exports = app;
