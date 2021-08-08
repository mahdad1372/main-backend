const express = require("express");

// process.on("uncaughtException", (err) => {
//   console.log("uncaughtException => " + err);
//   process.exit(1);
// });

const sequelize = require("./db/db");

const metaTagCategoryRouter = require("./router/metaTagCategory");
const categoryRouter = require("./router/category");
const postRouter = require("./router/post");

const globalErrHandler = require("./appError/globalErrHandler");
const featureRoute = require("./router/features");
const optionRoute = require("./router/option");

const packageRouter = require("./router/package");

const productRoute = require("./router/product");
const productcategory = require("./router/product_category");
const contactusRoute = require("./router/contactus");
const serviceusRoute = require("./router/service");
const subscribeusRoute = require("./router/subscribe");
const ticketRoute = require("./router/ticket");
const ticketreplyRoute = require("./router/replyticket");
const aboutusRoute = require("./router/about");
const reqfordemoRoute = require("./router/reqfordemo");

const userRoute = require("./router/user");
const dealershipRoute = require("./router/dealership");
const port = 8000;

const app = express();

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
  res.append("Access-Control-Allow-Headers", ["*"]);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(metaTagCategoryRouter);
app.use(categoryRouter);
app.use(postRouter);
app.use(featureRoute);
app.use(packageRouter);
app.use(optionRoute);
app.use(globalErrHandler);
app.use(productRoute);
app.use(productcategory);
app.use(contactusRoute);
app.use(serviceusRoute);
app.use(subscribeusRoute);
app.use(ticketRoute);
app.use(aboutusRoute);
app.use(reqfordemoRoute);
app.use(ticketreplyRoute);

app.use(userRoute);
app.use(dealershipRoute);
let server;

sequelize
  .sync({
    logging: console.log,
    // force: true,
    // alter: true,
  })
  .then(() => {
    app.listen(port, "192.168.1.101");
  })
  .catch((err) => {
    console.log("errroorrr" + err);
  });

// process.on("unhandledRejection", (err) => {
//   console.log("unhandledRejection => " + err);
//   server.close(() => {
//     process.exit(1);
//   });
// });

// app.listen(port, "192.168.1.113");
