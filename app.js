"use strict";

var securty = require("helmet");
var path = require("path");
var express = require("express");
var compression = require("compression");
var logger = require("morgan");
var FileStreamRotator = require("file-stream-rotator");
var fs = require("fs");
var app = express();
var resources = require("./config/resources");
var serverConfig = require("./config/serverConfig");
var moment = require("moment");
var bodyParser = require("body-parser");
var https = require("https");
var options = require('crypto');

app.use(securty.frameguard({ action: "sameorigin" }));
app.use(securty.hsts({ maxAge: 123456, includeSubDomains: false }));
app.use(securty.hidePoweredBy());
app.use(securty.xssFilter());
app.use(securty.noSniff());

app.set("env", process.env.NODE_ENV);
//app.use(helmet());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
var logDirectory = path.join(__dirname, "log");
//ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// interceptor added by me

app.get("/master/*", function (req, res, next) {
  //return next();
  let token = req.headers["authorization"] || req.headers["x-access-token"];
  if (token && token.startsWith("Bearer ")) {
    next();
  } else {
    res.redirect("/#login");
  }
});

// interceptor ends here
//create a rotating write stream

var accessLogStream = FileStreamRotator.getStream({
  date_format: "DD-MMM-YYYY",
  filename: path.join(logDirectory, "Error-%DATE%.log"),
  frequency: "daily",
  verbose: false,
});

logger.format("custom", function (tokens, req, res) {
  return JSON.stringify({
    Method: tokens.method(req, res),
    Response_content_length: tokens.res(req, res, "content-length"),
    Response_Time: tokens["response-time"](req, res) + "ms",
    Url: tokens.url(req, res),
    Status: tokens.status(req, res),
    StatusMessage: res.statusMessage,
  });
});

app.use(
  logger("custom", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
    stream: accessLogStream,
  })
);

var credentials = {
	key: fs.readFileSync(path.join(__dirname,'SSL','server.key')),
	cert: fs.readFileSync(path.join(__dirname,'SSL','server.crt')),
  secureOptions: options.constants.SSL_OP_NO_TLSv1 | options.constants.SSL_OP_NO_TLSv1_1
};

var httpsServer = https.createServer(credentials, app);

if (app.get("env") == "staging") {
  console.log(__dirname);
  console.log(process.env.NODE_ENV);
  app.use(compression());
  app.use(express.static(__dirname + "/dist", { index: ["index.html"] }));
  app.set("port", serverConfig.staging.port);
} else if (app.get("env") == "development") {
  console.log(__dirname);
  console.log(process.env.NODE_ENV);
  app.use(compression());
  app.use(express.static(__dirname + "/app", { index: ["index.html"] }));
  app.set("port", serverConfig.development.port);
}

require("./routes/routes.js")(app);

app.get("*", function (req, res) {
  res.redirect("/#" + req.originalUrl);
});

httpsServer.listen(app.get("port"), function () {
  console.log("Express server listening on port with https :" + JSON.stringify(app.get("port")));
});
