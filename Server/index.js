import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import routes from "./routes.js";

let uri = "mongodb+srv://ashutosh:ashutosh@cluster0.bppcfxz.mongodb.net/";
(() => mongoose.connect(uri))();

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", routes);
app.listen(2025, () => console.log("hail satya prakash!"));
