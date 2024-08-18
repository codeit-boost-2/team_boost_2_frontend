import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isPublic: { type: Boolean, required: true },
  introduction: { type: String, required: true },
  likeCount: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  postCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Group = mongoose.model('Group', groupSchema);

export default Group;
