const Post=require("../models/postModel");


exports.getAllPosts=async (req,res,next)=>{
    try {
        const posts=await Post.find()

        res.status(200).json({
            status:"success",
            results: posts.length,
            data:{
                posts
            }
        });
    } catch (error) {
        res.status(404).json({
            status: "fail"
        });
    }
};

exports.getOnePost=async (req,res,next)=>{
    try {
        const post=await Post.findById(req.params.id);

        res.status(200).json({
            staus: "success",
            data: {
                post
            }
        });  
    } catch (error) {
        res.status(404).json({
            status:"fail"
        });
    }
    
}
exports.createPost=async (req,res,next)=>{
    try {
        console.log(req.user)
        req.body.username=req.user.username
        const post=await Post.create(req.body);
        
       

        res.status(201).json({
            status: "success",
            data:{
                post
            }
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: "fail"
        });
    }
}
exports.updatePost=async (req,res,next)=>{
    try {
        const post=await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
      
          // Check if the username in the request matches the username associated with the post
        if (req.user.username !== post.username) {
            return res.status(403).json({ error: 'Unauthorized - Invalid username' });
        }
        const allowedUpdates = {
            title: req.body.title,
            body: req.body.body,
            // Exclude 'username' from the update
          };
        await Post.findByIdAndUpdate(req.params.id, allowedUpdates, { new: true });

        // Optionally, you can fetch the updated post and send it in the response
        const updatedPost = await Post.findById(req.params.id);
    
        res.status(200).json({
            status: "success",
            data : {
                updatedPost
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "fail"
        });
    }
}
exports.deletePost=async (req,res,next)=>{
    try {
        const post=await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
      
          // Check if the username in the request matches the username associated with the post
        if (req.user.username !== post.username) {
            return res.status(403).json({ error: 'Unauthorized - Invalid username' });
        }

        res.status(201).json({
            status: "success",
        }).end();
    } catch (error) {
        res.status(400).json({
            status: "fail"
        });
    }
}