import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.js';
import { getCommentList } from './commentRouter.js';
import { upload } from '../utils/multer.js';

const prisma = new PrismaClient();
const memoryRouter = express.Router();
memoryRouter.use(express.json());

// 추억 목록 조회 (그룹 상세 정보 조회를 위해 함수로 분리)
export async function getMemoryList({ groupId, page, pageSize, sortBy, keyword, isPublic }) {
  const where = {
    groupId: Number(groupId),
    isPublic: isPublic === 'true',
    title: {
      contains: keyword === 'null' ? '' : keyword,
      mode: 'insensitive'
    },
  };

  let orderBy;
  switch (sortBy) {
    case 'mostCommented':
      orderBy = { _count: { comments: 'desc' } };
      break;
    case 'mostLiked':
      orderBy = { likeCount: 'desc' };
      break;
    default: // latest
      orderBy = { createdAt: 'desc' };
  }

  const [totalItemCount, posts] = await Promise.all([
    prisma.memory.count({ where }),
    prisma.memory.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: Number(pageSize),
      orderBy,
      select: {
        id: true,
        nickname: true,
        title: true,
        image: true,
        location: true,
        moment: true,
        isPublic: true,
        likeCount: true,
        _count: { select: { comments: true } },
        createdAt: true,
      },
    }),
  ]);

  const data = posts.map(post => ({
    id: post.id,
    nickname: post.nickname,
    title: post.title,
    image: post.image,
    location: post.location,
    moment: post.moment,
    isPublic: post.isPublic,
    likeCount: post.likeCount,
    commentCount: post._count.comments,
    createdAt: post.createdAt,
  }));

  return {
    totalItemCount,
    data,
  };
};
  
memoryRouter.route('/groups/:groupId/posts')

  // 추억 등록
  .post(asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    const { nickname, title, content, password, image, location, moment, isPublic } = req.body;

    if (!nickname || !title || !content || isPublic === undefined || !password) {
      return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    const newMemory = await prisma.memory.create({
      data: {
        groupId: Number(groupId),
        nickname,
        title,
        content,
        image,
        location,
        isPublic,
        password,
        moment: new Date(moment),
      }
    });

    res.status(200).json({
      id: newMemory.id,
      groupId: newMemory.groupId,
      nickname: newMemory.nickname,
      title: newMemory.title,
      content: newMemory.content,
      image: newMemory.image,
      location: newMemory.location,
      moment: newMemory.moment.toISOString(),
      isPublic: newMemory.isPublic,
      likeCount: newMemory.likeCount,
      commentCount: 0,
      createdAt: newMemory.createdAt.toISOString()
    });
  }));

memoryRouter.route('/posts/:id/verifyPassword')  

  // 추억 조회 권한 확인
  .post(asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    const post = await prisma.memory.findUnique({
      where: { id },
      select: {
        password: true,
      }
    });

    if (post.password === password) {
      return res.status(200).json({ message: '비밀번호가 확인되었습니다' });
    } else {
      return res.status(401).json({ message: '비밀번호가 틀렸습니다' });
    }
  }));

memoryRouter.route('/posts/:id/like')

  // 추억 공감하기
  .post(asyncHandler(async (req, res) => {
    const { id } = req.params;

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

memoryRouter.route('/posts/:id/isPublic')

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

memoryRouter.route('/posts/:id')

  // 추억 수정
  .put(asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { nickname, title, content, password, image, location, moment, isPublic } = req.body;

    if (!nickname || !title || !content || !password) {
      return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    const post = await prisma.memory.findUnique({
      where: { id },
      select: {
        password: true,
      }
    });

    if (!post) {
      return res.status(404).json({ message: '존재하지 않습니다' });
    }

    if (post.password !== password) {
      return res.status(403).json({ message: '비밀번호가 틀렸습니다' });
    }

    const updatedPost = await prisma.memory.update({
      where: { id },
      data: {
        nickname,
        title,
        content,
        image,
        location,
        moment: new Date(moment),
        isPublic
      }
    });

    return res.status(200).json(updatedPost);
  }))

  // 추억 삭제
  .delete(asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    const post = await prisma.memory.findUnique({
      where: { id },
      select: {
        password: true,
      }
    });

    if (!post) {
      return res.status(404).json({ message: '존재하지 않습니다' });
    }

    if (post.password !== password) {
      return res.status(403).json({ message: '비밀번호가 틀렸습니다' });
    }

    await prisma.memory.delete({
      where: { id },
    });

    return res.status(200).json({ message: '게시글 삭제 성공' });
  }));

memoryRouter.route('/posts/:id/comments/:page/:pageSize')

  // 추억 상세 정보 조회 
  .get(asyncHandler(async (req, res) => {
    const { id, page, pageSize } = req.params
    
    if ( !id || !page || !pageSize) {
      return res.status(400).send({ message: "잘못된 요청입니다" });
    };

    const memory = await prisma.memory.findUniqueOrThrow({
      where: { id },
    });

    const commentResult = await getCommentList({
      commentId: id
    });

    res.status(200).send({
      memory,
      comments: {
        currentPage: Number(page),
        totalPages: Math.ceil(commentResult.totalCommentCount / Number(pageSize)),
        totalcommentCount: commentResult.totalCommentCount,
        data: commentResult.data,
      },
    });
  }));
  
export default memoryRouter;