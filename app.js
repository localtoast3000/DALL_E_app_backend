#!/usr/bin/env node
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '.env') });
import debug from 'debug';
debug('backend:server');
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import logger from 'morgan';
import chalk from 'chalk';
// import connectToDatbase from './db/mongo_db_connector.js';

// ROUTER IMPORTS
import indexRouter from './routes/index.js';

const PORT = process.env.PORT || '3000';
const STATIC = path.join(__dirname, 'public');
const app = express();

// DATABASE CONNECTOR
// connectToDatbase().catch((err) => console.log(err));

// EXPRESS MIDDLEWARE CONFIG
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(STATIC));

// ROUTERS MIDDLEWARE
app.use('/', indexRouter);

// PORT LISTENER
app.listen(PORT, () => {
  console.log(`
${chalk.cyanBright('SERVER LISTENING ON PORT:')} ${chalk.whiteBright(PORT)}
`);
});
