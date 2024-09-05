import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.js';
import { getMemoryList } from './memoryRouter.js';
import { upload } from '../utils/multer.js';
import fs from 'fs';
import FormData from 'form-data';
import path from 'path';

const prisma = new PrismaClient();
const groupRouter = express.Router();
groupRouter.use(express.json());

groupRouter.route('/:page/:pageSize')

  // 그룹 목록 조회
  .get(asyncHandler(async (req, res) => {
    try{
      const page = Number(req.params.page);
      const pageSize = Number(req.params.pageSize);
      const { sortBy, isPublic, keyword } = req.query;

      const where = {
        isPublic: isPublic === 'true',
        name: {
          contains: keyword === 'null' ? '' : keyword,
        },
      };

      let orderBy;
      switch (sortBy) {
        case 'mostPosted':
          orderBy = { _count: { memories: 'desc' } };
          break;
        case 'mostLiked':
          orderBy = { likeCount: 'desc' };
          break;
        default: // latest
          orderBy = { createdAt: 'desc' };
      }

      const [totalItemCount, groups] = await Promise.all([
        prisma.group.count({ where }),
        prisma.group.findMany({
          where,
          skip: (page - 1) * pageSize,
          take: Number(pageSize),
          orderBy,
          select: {
            id: true,
            name: true,
            image: true,
            isPublic: true,
            likeCount: true,
            _count: { select: { memories: true } },
            createdAt: true,
            description: true,
          },
        }),
      ]);

      const form = new FormData();
      form.append('currentPage', Number(page));
      form.append('totalPages', Math.ceil(totalItemCount / pageSize));
      form.append('totalItemCount', totalItemCount);

      groups.forEach((group, index) => {
        form.append(`data[${index}][id]`, group.id);
        form.append(`data[${index}][name]`, group.name);
        form.append(`data[${index}][isPublic]`, group.isPublic);
        form.append(`data[${index}][likeCount]`, group.likeCount);
        form.append(`data[${index}][postCount]`, group._count.memories);
        form.append(`data[${index}][createdAt]`, group.createdAt.toISOString());
        form.append(`data[${index}][introduction]`, group.description);

        console.log(`${process.env.IMAGE_DIR}`);
        console.log(group.image);

        const imagePath = path.join(`${process.env.IMAGE_DIR}/`, group.image);
        console.log(imagePath);

        if (fs.existsSync(imagePath)) {
          form.append(`data[${index}][image]`, fs.createReadStream(imagePath));
        } else {
          form.append(`data[${index}][image]`, '');  // If image not found, send empty string
        }
      });

      if (!res.headersSent) {
        res.set('Content-Type', 'multipart/form-data');
        form.pipe(res);
      }
    } catch (error) {
      // 에러가 발생하면 500 응답을 보내고 로깅
      if (!res.headersSent) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
    }
  }));

groupRouter.route('')

  // 그룹 등록
  .post(upload.single("image"), asyncHandler(async (req, res) => {
    const { groupName, groupDescription, password } = req.body;
    let isPublic = req.body.isPublic;
    if (isPublic === 'true') isPublic = true;
    else isPublic = false;

    console.log(req.body);
    console.log(req.file);

    const image = `${req.file.filename}`;

    if (!groupName  || !groupDescription || isPublic === undefined || !password) {
      return res.status(400).send({ message: "잘못된 요청입니다" });
    };

    const group = await prisma.group.create({
      data: {
        name: groupName,
        image,
        description: groupDescription,
        isPublic,
        password,
      },
    });
    return res.status(201).send(group);
  }));
  
groupRouter.route('/:id')

  // 그룹 수정
  .put(asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, password, image, isPublic, description } = req.body;

    if (!password) {
      return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    const group = await prisma.group.findUnique({
      where: { id },
      select: {
        password: true,
      }
    });

    if (!group) {
      return res.status(404).json({ message: '존재하지 않습니다' });
    }

    if (group.password !== password) {
      return res.status(403).json({ message: '비밀번호가 틀렸습니다' });
    }

    const updatedGroup = await prisma.group.update({
      where: { id },
      data: { name, image, isPublic, description },
    });

    return res.status(200).json(updatedGroup);
  }))

  // 그룹 삭제
  .delete(asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    if (fs.existsSync("/backend/images/" + file_name)) {
      try {
        fs.unlinkSync("/images" + file_name);
        console.log("image delete")
      } catch (error) {
        console.log(error)
      }
    }

    if (!password) {
      return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    const group = await prisma.group.findUniqueOrThrow({
      where: { id },
    });

    if (!group) {
      return res.status(404).send({ message: "존재하지 않습니다 "});
    };

    if (group.password !== password) {
      return res.status(403).send({ message: "비밀번호가 틀렸습니다" });
    };

    await prisma.group.delete({
      where: { id },
    });

    return res.status(200).send({ message: "그룹 삭제 성공" });
  }));

groupRouter.route('/:id/isPublic')

  // 그룹 공개 여부 확인
  .get(asyncHandler(async (req, res) => {
    const { id } = req.params;
    const group = await prisma.group.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        isPublic: true,
      },
    });

    return res.status(200).send(group);
  }));

groupRouter.route('/:id/like')

  // 그룹 공감하기
  .post(asyncHandler(async (req, res) => {
    const { id } = req.params;

    const group = await prisma.group.findUniqueOrThrow({
      where: { id },
    });

    if (!group) {
      return res.status(404).send({ message: "존재하지 않습니다" });
    };
    
    await prisma.group.update({
      where: { id },
      data: {
        likeCount: {
          increment: 1,
        },
      },
    });

    return res.status(200).send({ message: "그룹 공감하기 성공" });
  }));

groupRouter.route('/:id/verifyPassword')

  // 그룹 조회 권한 확인
  .post(asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    const group = await prisma.group.findUniqueOrThrow({
      where: { id },
      select: {
        password: true,
      },
    });

    if (group.password === password) {
      return res.status(200).send({ message: "비밀번호가 확인되었습니다" });
    } else {
      return res.status(401).send({ message: "비밀번호가 틀렸습니다" });
    };
  }));

groupRouter.route('/:id/:page/:pageSize')

  // 그룹 상세 정보 조회 (추억 목록 조회)
  .get(asyncHandler(async (req, res) => {
    const { id } = req.params;
    const page = Number(req.params.page);
    const pageSize = Number(req.params.pageSize);
    const { sortBy, isPublic, keyword } = req.query;

    if (!id || !page || !pageSize) {
      return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    const group = await prisma.group.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const memoriesResult = await getMemoryList({
      id: id,
      page: Number(page),
      pageSize: Number(pageSize),
      sortBy: sortBy,
      keyword: keyword === 'null' ? '' : keyword,
      isPublic: isPublic === 'true',
    });

    return res.status(200).json({
      group,
      memories: {
        currentPage: Number(page),
        totalPages: Math.ceil(memoriesResult.totalItemCount / Number(pageSize)),
        totalItemCount: memoriesResult.totalItemCount,
        data: memoriesResult.data,
      },
    }); 
  }));

groupRouter.route('/:groupId/posts')

  // 추억 등록
  .post(asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    const { nickname, title, content, password, location, moment } = req.body;
    let isPublic = req.body.isPublic;
    if (isPublic === 'true') isPublic = true;
    else isPublic = false;

    if (!nickname || !title || !content || isPublic === undefined || !password) {
      return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    const newMemory = await prisma.memory.create({
      data: {
        groupId,
        nickname,
        title,
        image,
        content,
        location,
        isPublic,
        password,
        moment: new Date(moment),
      }
    });

    return res.status(201).send(newMemory);
  }));

export default groupRouter;