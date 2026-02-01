import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pkg from "agora-access-token";

dotenv.config();
const{RtcTokenBuilder,RtcRole} = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const APP_ID = process.env.APP_ID;
const APP_CERT = process.env.APP_CERT;

app.get("/agora/token",(req,res) =>{
    const channel = req.query.channel;
    const uid = req.query.uid || 0;

    if(!channel){
        return res.status(400).json({error:"Channel Required"});
    }
    const role = RtcRole.PUBLISHER;

    const expireTime = 3600;
    const currentTime = Math.floor(Date.now()/1000);
    const privillegeExpireTime = currentTime + expireTime;

    const token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID,
        APP_CERT,
        channel,
        uid,
        role,
        privillegeExpireTime
    );
    console.log("Token generated for: ",channel);
    return res.json({token});
});
app.listen(process.env.PORT,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`)
});