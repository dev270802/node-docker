const express=require("express");
const redis=require("redis")
const cors=require("cors")
const db=require("./db")
const {REDIS_URL,REDIS_PORT,SESSION_SECRET} = require("./config/config")
const postRouter=require("./routes/postRouter")
const userRouter=require("./routes/userRoutes");
const session = require("express-session");
const RedisStore=require("connect-redis").default;

const redisClient=redis.createClient({url:`redis://${REDIS_URL}:${REDIS_PORT}`})

redisClient.connect().catch(console.error)


const app=express();




app.enable("trust proxy")
app.use(cors({}));
app.use(session({
    proxy:true,
    store: new RedisStore({client: redisClient}),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized:true,
    cookie: {
        secure:false,
        httpOnly: true,
        maxAge: 6000000

    }
}))
const port=process.env.PORT || 3000;
app.use(express.json());
app.get("/api/v1",(req,res)=>{
    res.send("<h2>Hii There!!!</h2>");
    console.log("hii its ran")
})
app.use("/api/v1/posts",postRouter)
app.use("/api/v1/users",userRouter)

db().then(()=>{app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})})