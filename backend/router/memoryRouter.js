import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.js';

const prisma = new PrismaClient();
const memoryRouter = express.Router();
memoryRouter.use(express.json());

memoryRouter.route('/:id')
  // 추억 상세 정보 조회
  .get(asyncHandler(async (req, res) => {
    const { id } = req.params
    const memory = await prisma.memory.findUniqueOrThrow({
      where: { id },
    });

    res.status(200).send(memory);
  }));

memoryRouter.route('/:id/isPublic')
  .get(asyncHandler(async (req, res) => {
    const { id } = req.params;
    const memory = prisma.memory.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        isPublic: true,
      },
    });

    res.status(200).send(memory)
  }));

export default memoryRouter;