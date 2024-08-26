import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.js';

const prisma = new PrismaClient();
const memoryRouter = express.Router();
memoryRouter.use(express.json());

memoryRouter.route('/')

  // 전체 추억 조회
  .get(asyncHandler(async (req, res) => {
    const memories = await prisma.memory.findMany();
    res.send(memories);
  }));

memoryRouter.route('/groups/:groupId/posts')

  // 게시글 등록
  .post(asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    const { nickname, title, content, password, imageUrl, location, moment, isPublic } = req.body;

    // 요청 양식 오류 확인
    if (!nickname || !title || !content || (isPublic === false && !password)) {
      return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    // 게시글 생성
    const newMemory = await prisma.memory.create({
      data: {
        groupId,
        nickname,
        title,
        content,
        image: imageUrl,
        location,
        isPublic,
        password: isPublic ? null : password, // 비공개일 때만 비밀번호 설정
        moment: new Date(moment),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });

    res.status(200).json({
      id: newMemory.id,
      groupId: newMemory.groupId,
      nickname: newMemory.nickname,
      title: newMemory.title,
      content: newMemory.content,
      imageUrl: newMemory.image,
      location: newMemory.location,
      moment: newMemory.moment.toISOString(),
      isPublic: newMemory.isPublic,
      likeCount: newMemory.likeCount,
      commentCount: 0,
      createdAt: newMemory.createdAt.toISOString()
    });
  }));

memoryRouter.route('/posts/:id/verify-password')  

  // 비공개 게시글 비밀번호 확인
  .post(asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    // 게시글 조회
    const post = await prisma.memory.findUnique({
      where: { id },
      select: {
        password: true,
      }
    });

    // 비밀번호 확인
    if (post.password === password) {
      return res.status(200).json({ message: '비밀번호가 확인되었습니다' });
    } else {
      return res.status(401).json({ message: '비밀번호가 틀렸습니다' });
    }
  }));

memoryRouter.route('/posts/:id/like')

  // 게시글 공감하기
  .post(asyncHandler(async (req, res) => {
    const { id } = req.params;

    // 게시글 존재 여부 확인
    const post = await prisma.memory.findUnique({
      where: { id },
    });

    if (!post) {
      return res.status(404).json({ message: '존재하지 않습니다' });
    }

    await prisma.memory.update({
      where: { id },
      data: {
        likeCount: {
          increment: 1
        }
      }
    });

    return res.status(200).json({ message: '게시글 공감하기 성공' });
  }));

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
  // 추억 공개 여부 확인
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