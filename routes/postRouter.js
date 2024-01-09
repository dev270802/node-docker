const express=require("express");
const protect=require("../middleware/authMiddleware");
const postController=require("../controllers/postControlller");

const router=express.Router()


router.route("/")
.get(postController.getAllPosts)
.post(protect,postController.createPost);

router.route("/:id")
.get(postController.getOnePost)
.delete(protect,postController.deletePost)
.patch(protect,postController.updatePost);

module.exports=router;