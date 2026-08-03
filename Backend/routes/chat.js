// import express from "express";
// import Thread from "../models/Thread.js";
// import getOpenAIAPIResponse from "../utils/openai.js";
// import authMiddleware from "../utils/authMiddleware.js";


// const router = express.Router();

// //test:we are just testing to see its work or not
// router.post("/test",authMiddleware, async(req,res) => {
//     try{
//         const thread = new Thread({
//             threadId: "abc",
//             title: "Testing New Thread2"
//         });

//         const response = await thread.save();
//         res.send(response);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: "Failed to save in DB"});
//     }
// });

// //Get all threads   
// router.get("/thread", authMiddleware, async(req, res)=>{
//     try{
//         const threads = await Thread.find({}).sort({updatedAt:-1});
//         //descending order of updatedAt...most recent data on top
//         res.json(threads);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: "Failed to fetch threads"});
//     }
// });

// //particular thread ke mssg ke liye cretae kiya tha
// router.get("/thread/:threadId", authMiddleware, async(req,res)=>{
//     const {threadId} = req.params;
//     try{
//         const thread = await Thread.findOne({threadId});

//         if(!thread){
//             res.status(404).json({error:"Thread not found"});
//         }

//         res.json(thread.messages);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: "Failed to fetch chat"});
//     }
// });

// //particular thread ko delete krne ke liye create kiya
// router.delete("/thread/:threadId", authMiddleware, async(req,res)=>{
//     const {threadId} = req.params;

//     try{
//         const deletedThread = await Thread.findOneAndDelete({threadId});

//         if(!deletedThread){
//             res.status(404).json({error:"Thread not found"});
//         }
//         res.status(200).json({success:"Thread deleted successfuly"});
//     }catch(err){
//          console.log(err);
//         res.status(500).json({error: "Failed to delete thread"});
//     }
// });

// //IMP: create a new with mssg+reply we created this
// router.post("/chat", authMiddleware, async(req,res)=>{
//     const {threadId, message} = req.body;

//     if(!threadId || !message){
//         res.status(400).json({error:"missing required fields"});
//     }
//     try{
//         let thread = await Thread.findOne({threadId});

//         if(!thread){
//             //create a new thread in Db
//             thread =new Thread({
//                 threadId,
//                 title:message,
//                 messages: [{role: "user", content: message}]
//             });
//         }else{
//             thread.messages.push({role: "user", content:message});
//         }

//         const assistantReply = await getOpenAIAPIResponse(message);

//         thread.messages.push({role: "assistant", content:assistantReply});
//         thread.updatedAt = new Date();

//         await thread.save(); 
//         res.json({reply: assistantReply});
//     }catch(err){
//         console.log("Error", err);
//         res.status(500).json({error: "something went wrong"});
//     }
// });
// export default router;

// //backend completely ready 
// //now we setup the frontend



// import express from "express";
// import Thread from "../models/Thread.js";
// import getOpenAIAPIResponse from "../utils/openai.js";
// import authMiddleware from "../utils/authMiddleware.js";

// const router = express.Router();

// router.post("/test", authMiddleware, async(req,res) => {
//     try{
//         const thread = new Thread({
//             threadId: "abc",
//             title: "Testing New Thread2"
//         });
//         const response = await thread.save();
//         res.send(response);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: "Failed to save in DB"});
//     }
// });

// router.get("/thread", authMiddleware, async(req, res)=>{
//     try{
//         const threads = await Thread.find({}).sort({updatedAt:-1});
//         res.json(threads);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: "Failed to fetch threads"});
//     }
// });

// router.get("/thread/:threadId", authMiddleware, async(req,res)=>{
//     const {threadId} = req.params;
//     try{
//         const thread = await Thread.findOne({threadId});
//         if(!thread){
//             return res.status(404).json({error:"Thread not found"});
//         }
//         res.json(thread.messages);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: "Failed to fetch chat"});
//     }
// });

// router.delete("/thread/:threadId", authMiddleware, async(req,res)=>{
//     const {threadId} = req.params;
//     try{
//         const deletedThread = await Thread.findOneAndDelete({threadId});
//         if(!deletedThread){
//             return res.status(404).json({error:"Thread not found"});
//         }
//         res.status(200).json({success:"Thread deleted successfuly"});
//     }catch(err){
//          console.log(err);
//         res.status(500).json({error: "Failed to delete thread"});
//     }
// });

// router.post("/chat", authMiddleware, async(req,res)=>{
//     const {threadId, message} = req.body;
//     if(!threadId || !message){
//         return res.status(400).json({error:"missing required fields"});
//     }
//     try{
//         let thread = await Thread.findOne({threadId});
//         if(!thread){
//             thread = new Thread({
//                 threadId,
//                 title: message,
//                 messages: [{role: "user", content: message}]
//             });
//         }else{
//             thread.messages.push({role: "user", content: message});
//         }

//         const openAIResponse = await getOpenAIAPIResponse(message);
        
//         let assistantReply = "";
//         if (typeof openAIResponse === "string") {
//             assistantReply = openAIResponse;
//         } else if (openAIResponse?.choices?.[0]?.message?.content) {
//             assistantReply = openAIResponse.choices[0].message.content;
//         } else {
//             assistantReply = "Sorry, I couldn't get a proper response from the AI model.";
//         }

//         thread.messages.push({role: "assistant", content: assistantReply});
//         thread.updatedAt = new Date();

//         await thread.save(); 
//         res.json({reply: assistantReply});
//     }catch(err){
//         console.log("Error", err);
//         res.status(500).json({error: "something went wrong"});
//     }
// });

// export default router;



import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";
import authMiddleware from "../utils/authMiddleware.js";
import { io } from "../server.js";

const router = express.Router();

router.post("/test", authMiddleware, async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "abc",
      title: "Testing New Thread2",
    });

    const response = await thread.save();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save in DB" });
  }
});

router.get("/thread", authMiddleware, async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

router.get("/thread/:threadId", authMiddleware, async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findOne({ threadId });

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.json(thread.messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

router.delete("/thread/:threadId", authMiddleware, async (req, res) => {
  const { threadId } = req.params;

  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId });

    if (!deletedThread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.status(200).json({ success: "Thread deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete thread" });
  }
});

router.post("/chat", authMiddleware, async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        messages: [],
      });
    }

    // Save user message
    const userMessage = {
      role: "user",
      content: message,
    };

    thread.messages.push(userMessage);

    // AI Response
    const openAIResponse = await getOpenAIAPIResponse(message);

    let assistantReply = "";

    if (typeof openAIResponse === "string") {
      assistantReply = openAIResponse;
    } else if (openAIResponse?.choices?.[0]?.message?.content) {
      assistantReply = openAIResponse.choices[0].message.content;
    } else {
      assistantReply =
        "Sorry, I couldn't get a proper response from the AI model.";
    }

    const assistantMessage = {
      role: "assistant",
      content: assistantReply,
    };

    thread.messages.push(assistantMessage);
    thread.updatedAt = new Date();

    await thread.save();

    // ================= SOCKET.IO =================

    io.to(threadId).emit("receive_message", {
      threadId,
      role: "user",
      content: message,
    });

    io.to(threadId).emit("receive_message", {
      threadId,
      role: "assistant",
      content: assistantReply,
    });

    // =============================================

    res.json({
      reply: assistantReply,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

export default router;