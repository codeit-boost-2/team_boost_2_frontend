import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.js';

const prisma = new PrismaClient();
const commentRouter = express.Router();
commentRouter.use(express.json());

// 전체 댓글 조회
commentRouter.get('/', asyncHandler(async (req, res) => {
  const comments = await prisma.comment.findMany();
  res.send(comments);
}));

export default commentRouter;