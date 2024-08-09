import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';

const app = express();

app.use(express.json());

// 서버 시작
app.listen(3000, () => console.log('http://localhost:3000'));