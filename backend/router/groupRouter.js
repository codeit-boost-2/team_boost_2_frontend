import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.js';

const prisma = new PrismaClient();
const groupRouter = express.Router();
groupRouter.use(express.json());

// 전체 그룹 조회
groupRouter.get('/', asyncHandler(async (req, res) => {
  const groups = await prisma.group.findMany();
  res.send(groups);
}));

export default groupRouter;