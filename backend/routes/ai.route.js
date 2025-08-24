import express from 'express';
const router = express.Router();
import { generateBlogPost } from '../controllers/ai.controller.js';

// POST /api/ai/generate-blog
router.post('/generate-blog', generateBlogPost);

export default router;
