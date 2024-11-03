/*-- express start --*/
 import express from "express";
 const app = express();
/*-- express end --*/

/*-- dotenv start --*/
 import dotenv from "dotenv";
 dotenv.config();

 const port = process.env.PORT || 9000;
/*-- dotenv end --*/

/*-- middleware imports start --*/
 import cors from "cors";
 import morgan from "morgan";

 app.use(cors());
 app.use(express.json({limit: "12mb"}));
 app.use(morgan("dev"));
 /*-- middleware imports end --*/

/* Test the server start */
 app.get("/api/v1", (req, res) =>{
      res.send('API is up & running!');
      console.log('API is up & running!');
 });   
 app.get('/favicon.ico', (req, res) => res.status(204));
/* Test the server end */

/* import all routes & pass in middleware */
 import productRoute from "./routes/products.js";
 app.use("/api/v1/products", productRoute);

 import authRoute from "./routes/users.js";
 app.use("/api/v1/users", authRoute);

 import orderRoutes from "./routes/orders.js";
 app.use("/api/v1/orders", orderRoutes);

 import stripeRoute from "./routes/stripe.js";
 app.use("/api/v1/payments", stripeRoute);

/*-- start the server (start)  --*/
 app.listen(port, ()=>{
     console.log(`express server is running on http://localhost:${port}/api/v1`);
 });
/*-- start the server (end) --*/        

/*-- DB Connection (start)  --*/
 import dbconnect from "./config/dbconfig.js";
 dbconnect();
/*-- DB Connection (end)  --*/