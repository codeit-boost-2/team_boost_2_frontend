import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.js';

const prisma = new PrismaClient();
const groupRouter = express.Router();
groupRouter.use(express.json());

groupRouter.route('/')
// 그룹 목록 조회
  .get(asyncHandler(async (req, res) => {
    const groups = await prisma.group.findMany();

    res.send(groups);
  }))
// 그룹 생성
  .post(asyncHandler(async (req, res) => {
    const group = await prisma.group.create({
      data: req.body,
    });
    res.status(201).send(group);
  }));

groupRouter.route('/:id')
// 그룹 수정
  .patch('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const group = await prisma.group.update({
      where: { id },
      data: req.body,
    });
    res.send(group);
  }))
// 그룹 삭제
  .delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.group.delete({
      where: { id },
    });
    res.sendStatus(204);
  }))
// 그룹 상세 정보 조회
  .get(asyncHandler(async (req, res) => {
    const { id } = req.params;
    const group = await prisma.group.findUniqueOrThrow({
      where: { id },
      include: {
        memories: true,
      },
    });

    res.send(group);
  }));

groupRouter.route('/:id/:password')
// 그룹 조회 권한 확인
  .post(asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { password } = req.params;
    const group = await prisma.group.findUniqueOrThrow({
      where: { id },
      select: {
        password: true,
      },
    });

    if (group.password === password) {
      res.send({ message: "비밀번호가 확인되었습니다" });
    } else {
      res.status(401).send({ message: "비밀번호가 틀렸습니다" });
    };
  }));

groupRouter.route('/:id/:is_Public')
// 그룹 공개 여부 확인
  .get(asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { is_public } = req.params;
    const group = await prisma.group.findUnique({
      where: { id },
      select: {
        id: true,
        isPublic: true,
      },
    });

    res.send(group);
  }));

export default groupRouter;