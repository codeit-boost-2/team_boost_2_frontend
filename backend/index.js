import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

import groupRouter from './router/groupRouter.js';
import memoryRouter from './router/memoryRouter.js';
import commentRouter from './router/commentRouter.js';

// 라우트 설정
app.use('/group', groupRouter);
app.use('/memory', memoryRouter);
app.use('/comment', commentRouter);

// 서버 시작
app.listen(3000, () => console.log(`http://localhost:${process.env.PORT}`));