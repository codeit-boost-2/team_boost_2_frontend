import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.js';

const prisma = new PrismaClient();
const commentRouter = express.Router();
commentRouter.use(express.json());

commentRouter.route('/:commentId')
  // 댓글 수정
  .put(asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { nickname, content, password } = req.body;
    const comment = await prisma.comment.findUniqueOrThrow({
      where: { 
        id : commentId 
      },
    });

    if (!comment) {
      res.status(404).send({ message: "존재하지 않습니다"})
    }

    if (!nickname || !content || !password) {
      res.status(400).send({ message: "잘못된 요청입니다"});
    };

    if (password === comment.password) {
      const updatedComment = await prisma.comment.update({
        where: { 
          id : commentId,
        },
        data : req.body,
      });
      res.status(200).send(updatedComment);
    } else {
      res.status(403).send({ message: "비밀번호가 틀렸습니다" });
    };
  }))
  // 댓글 삭제
  .delete(asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { password } = req.body;

    const comment = await prisma.comment.findUniqueOrThrow({
      where: {
        id : commentId,
      },
    });

    if (!comment) {
      res.status(404).send({ message: "존재하지 않습니다" });
    };

    if (password !== comment.password) {
      res.status(403).send({ message: "비밀번호가 틀렸습니다" });
    };

    if (!password) {
      res.status(400).send({ message: "잘못된 요청입니다" });
    };

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    res.status(200).send({ message: "답글 삭제 성공" });
  }));

export default commentRouter;