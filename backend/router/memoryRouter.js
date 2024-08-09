import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.js';

const prisma = new PrismaClient();
const memoryRouter = express.Router();
memoryRouter.use(express.json());

// 전체 추억 조회
memoryRouter.get('/', asyncHandler(async (req, res) => {
  const memories = await prisma.memory.findMany();
  res.send(memories);
}));