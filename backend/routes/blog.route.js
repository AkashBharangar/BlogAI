import express from "express"

import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { singleUpload } from "../middleware/multer.js"
import {createBlog, deleteBlog, dislikeBlog, getAllBlogs, getMyTotalBlogLikes, getOwnBlogs, getPublishedBlog, likeBlog, togglePublishBlog, updateBlog, getBlogById } from "../controllers/blog.controller.js"

const router = express.Router()

// Specific routes first
router.route("/get-all-blogs").get(getAllBlogs)
router.route("/get-published-blogs").get(getPublishedBlog)
router.route("/get-own-blogs").get(isAuthenticated, getOwnBlogs)
router.route("/delete/:id").delete(isAuthenticated, deleteBlog)
router.get('/my-blogs/likes', isAuthenticated, getMyTotalBlogLikes)

// Blog CRUD and actions
router.route("/").post(isAuthenticated, singleUpload, createBlog)
router.route("/:blogId").put(isAuthenticated, singleUpload, updateBlog)
router.route("/:blogId").patch(togglePublishBlog)
router.get("/:blogId", getBlogById)
router.get("/:id/like", isAuthenticated, likeBlog)
router.get("/:id/dislike", isAuthenticated, dislikeBlog)

export default router;