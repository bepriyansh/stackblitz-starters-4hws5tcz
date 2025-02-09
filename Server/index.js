import mongoose from 'mongoose';
import express from 'express';
import routes from './routes.js';

let uri = 'mongodb+srv://ashutosh:ashutosh@cluster0.bppcfxz.mongodb.net/';
(() => mongoose.connect(uri))();

let app = express(); // TODO: cors
app.use('/api/', routes);
app.listen(2025, () => console.log('hail satya prakash!'));
