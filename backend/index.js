import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Group from './models/Group.js';
import { DATABASE_URL } from './env.js';

const app = express();

// body-parser 미들웨어
app.use(bodyParser.json());

// MongoDB 연결
mongoose.connect(DATABASE_URL)
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log('DB connection failed:', err));

// 그룹 등록 엔드포인트
app.post('/api/groups', async (req, res) => {
  const { name, password, imageUrl, isPublic, introduction } = req.body;

  // 요청 양식 오류 확인
  if (!name || !password || !imageUrl || typeof isPublic !== 'boolean' || !introduction) {
    return res.status(400).json({ message: '잘못된 요청입니다' });
  }

  const group = new Group({
    name,
    password,
    imageUrl,
    isPublic,
    introduction,
    createdAt: new Date()
  });

  const savedGroup = await group.save();

  // 등록 성공
  res.status(201).json({
    id: savedGroup._id,
    name: savedGroup.name,
    imageUrl: savedGroup.imageUrl,
    isPublic: savedGroup.isPublic,
    likeCount: savedGroup.likeCount,
    badges: savedGroup.badges,
    postCount: savedGroup.postCount,
    createdAt: savedGroup.createdAt,
    introduction: savedGroup.introduction
  });
});

// 그룹 수정 엔드포인트
app.put('/api/groups/:groupId', async (req, res) => {
  const { groupId } = req.params;
  const { name, password, imageUrl, isPublic, introduction } = req.body;

  // 요청 양식 오류 확인
  if (!name || !password || !imageUrl || typeof isPublic !== 'boolean' || !introduction) {
    return res.status(400).json({ message: '잘못된 요청입니다' });
  }

  const group = await Group.findById(groupId);

  // 그룹 존재 여부 확인
  if (!group) {
    return res.status(404).json({ message: '존재하지 않습니다' });
  }

  // 비밀번호 오류
  if (group.password !== password) {
    return res.status(403).json({ message: '비밀번호가 틀렸습니다' });
  }

  // 그룹 정보 수정
  group.name = name;
  group.password = password;
  group.imageUrl = imageUrl;
  group.isPublic = isPublic;
  group.introduction = introduction;

  const updatedGroup = await group.save();

  res.status(200).json({
    id: updatedGroup._id,
    name: updatedGroup.name,
    imageUrl: updatedGroup.imageUrl,
    isPublic: updatedGroup.isPublic,
    likeCount: updatedGroup.likeCount,
    badges: updatedGroup.badges,
    postCount: updatedGroup.postCount,
    createdAt: updatedGroup.createdAt,
    introduction: updatedGroup.introduction
  });
});

// 그룹 삭제 엔드포인트
app.delete('/api/groups/:groupId', async (req, res) => {
  const { groupId } = req.params;
  const { password } = req.body;

  // 요청 양식 오류 확인
  if (!password) {
    return res.status(400).json({ message: '잘못된 요청입니다' });
  }

  // 그룹 찾기
  const group = await Group.findById(groupId);

  // 그룹 존재 여부 확인
  if (!group) {
    return res.status(404).json({ message: '존재하지 않습니다' });
  }

  // 비밀번호 검증
  if (group.password !== password) {
    return res.status(403).json({ message: '비밀번호가 틀렸습니다' });
  }

  // 그룹 삭제
  await Group.findByIdAndDelete(groupId);
  res.status(200).json({ message: '그룹 삭제 성공' });
});


// 그룹 공감 엔드포인트
app.post('/api/groups/:groupId/like', async (req, res) => {
  const { groupId } = req.params;

  const group = await Group.findById(groupId);

  // 그룹 존재 여부 확인
  if (!group) {
    return res.status(404).json({ message: '존재하지 않습니다' });
  }

  // 그룹 공감 증가
  group.likeCount += 1;

  await group.save();

  res.status(200).json({ message: '그룹 공감하기 성공' });
});

app.listen(3000, () => {
  console.log(`Server started`);
});