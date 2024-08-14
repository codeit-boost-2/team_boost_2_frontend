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

// 그룹 생성
groupRouter.post('/', asyncHandler(async (req, res) => {
  const group = await prisma.group.create({
    data: req.body,
  });
  res.status(201).send(group);
}));

// 그룹 수정
app.patch('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const group = await prisma.group.update({
    where: { id },
    data: req.body,
  });
  res.send(group);
}));

// 그룹 삭제
app.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.group.delete({
    where: { id },
  });
  res.sendStatus(204);
}));

export default groupRouter;