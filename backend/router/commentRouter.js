import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.js';

const prisma = new PrismaClient();
const commentRouter = express.Router();
commentRouter.use(express.json());

commentRouter.route('/posts/:memoryId/comments')

  // 댓글 목록 조회 - 수정 필요
  .get(asyncHandler(async (req, res) => {
    const { memoryId } = req.params;
    const { page = 1, pageSize = 20 } = req.query;

    if (page <= 0 || pageSize <= 0) {
      return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    const [totalCount, comments] = await Promise.all([
      prisma.comment.count({ where: { memoryId } }),
      prisma.comment.findMany({
        where: { memoryId },
        skip: (page - 1) * pageSize,
        take: Number(pageSize),
        select: {
          id: true,
          nickname: true,
          content: true,
          createdAt: true
        }
      })
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return res.status(200).json({
      currentPage: Number(page),
      totalPages,
      totalItemCount: totalCount,
      data: comments
    });
  }))

  // 댓글 등록
  .post(asyncHandler(async (req, res) => {
    const { memoryId } = req.params;
    const { nickname, content, password } = req.body;

    if (!nickname || !content || !password) {
      return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    const newComment = await prisma.comment.create({
      data: {
        memoryId,
        nickname,
        content,
        password
      },
      select: {
        id: true,
        nickname: true,
        content: true,
        createdAt: true
      }
    });

    return res.status(200).json(newComment);
  })); 

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