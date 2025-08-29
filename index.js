import express from 'express';
import connectDB from './src/setup/dbconnection';


connectDB();
const app = express();
