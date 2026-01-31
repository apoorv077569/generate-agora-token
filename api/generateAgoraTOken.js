import express from "express";
import { RtcTokenBuilder,RtcRole } from "agora-access-token";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const appId = process.env.APP_ID;
const appCert = process.env.APP_CERT;

app.post("/token",(req,res) =>{
    const {channel,uid} = req.body;
    const role = RtcRole.PUBLISHER;

    const expireTime = 3600;
    const currentTime = Math.floor(Date.now()/1000);
    const privilegeExpireTime = currentTime + expireTime;

    const token = RtcTokenBuilder.buildTokenWithUid(
        appId,
        appCert,
        channel,
        uid,
        role,
        privilegeExpireTime
    );
    res.json({token});
});
app.listen(5000)