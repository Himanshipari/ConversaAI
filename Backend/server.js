import express from "express";


import path from "path";
import { fileURLToPath } from "url";


import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express(); 
const PORT = 8080;



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




app.use(express.json());//use for parse incoming request ye 2 line frontend ke saath backend ko use krege
app.use(cors());

app.use("/api", chatRoutes);



app.use(express.static(path.join(__dirname, "../Frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});





app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
  connectDB();
});

const connectDB = async() => {
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database!");
  }catch(err){
    console.log("Failed to connect with Db", err);
  }
}

// app.post("/test", async(req, res)=>{//query frontend se
//   const options={
//     method:"POST",
//     headers: {
//       "Content-Type":"application/json",
//       "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//     },
//     body: JSON.stringify({
//       model: "gpt-4o-mini",
//       messages: [{
//         role:"user",
//         content: req.body.message
//       }]
//     })
//   };
//        try{
//         const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//         const data=await response.json();
//        // console.log(data.choices[0].message.content);//reply
//         res.send(data.choices[0].message.content);
//        } catch(err){
//         console.log(err);
//        }                        
// }); 