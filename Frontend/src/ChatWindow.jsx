// import "./ChatWindow.css";
// import Chat from "./Chat.jsx";
// import {MyContext} from "./MyContext.jsx";
// import {useContext, useState, useEffect} from "react";
// import {ScaleLoader} from "react-spinners";

// function ChatWindow(){
//     const {prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats, setNewChat} = useContext(MyContext);
//     const [loading, setLoading] = useState(false);
//     const [isOpen, setIsOpen] = useState(false); 

//     const getReply = async () => {
//         setLoading(true);
//         setNewChat(false);
//         console.log("message", prompt, "threadId", currThreadId);

//         const token = localStorage.getItem("token");

//         const options = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}` 
//             },
//             body: JSON.stringify({
//                 message: prompt,
//                 threadId: currThreadId
//             })
//         };

//         try {
//             const response = await fetch("http://localhost:8080/api/chat", options);
//             const res = await response.json();
//             console.log(res);
//             setReply(res.reply);
//         } catch (err) {
//             console.log(err);
//         }
//         setLoading(false); 
//     };

//     useEffect(()=>{
//         if(prompt && reply){
//             setPrevChats(prevChats=>{
//                 [...prevChats, {
//                     role:"user",
//                     content: prompt
//                 },{
//                     role:"assistant",
//                     content:reply
//                 }]
//             });
//         }
//         setPrompt("");
//     }, [reply]);

//     const handleProfileClick=() =>{
//         setIsOpen(!isOpen);
//     }


//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         window.location.reload();
//     };

//     return(
//         <div className="chatWindow">
//             <div className="navbar">
//                 <span>ConversaAI <i className="fa-solid fa-chevron-down"></i></span>
//                 <div className="userIconDiv" onClick={handleProfileClick}>
//                     <span className="userIcon"><i className="fa-solid fa-user"></i></span>
//                 </div>
//             </div>

//             {
//                 isOpen &&
//                 <div className="dropDown">
//                     <div className="dropDownItem"><i className="fa-solid fa-gear"></i>Settings</div>
//                     <div className="dropDownItem"><i className="fa-solid fa-cloud-arrow-up"></i>Upgrade plan</div>
                    
                   
//                     <div className="dropDownItem" onClick={handleLogout} style={{ cursor: 'pointer' }}>
//                         <i className="fa-solid fa-arrow-right-from-bracket"></i>Logout
//                     </div>
//                 </div>
//             }
//             <Chat></Chat>

//             <ScaleLoader color="#fff" loading={loading}> 
//             </ScaleLoader>

//             <div className="chatInput">
//                 <div className="inputBox">
//                    <input placeholder="Ask anything"
//                    value={prompt}
//                    onChange={(e)=> setPrompt(e.target.value)}
//                    onKeyDown={(e) => e.key == 'Enter' ? getReply(): ''}
//                     >
//                    </input>

//                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div> 
//                 </div>

//                 <p className="info">
//                     ConversaAI can make mistakes. Check important info. See Cookie Preferences.
//                 </p>
                
//             </div>
//         </div>
//     )
// }
// export default ChatWindow;


// import "./ChatWindow.css";
// import Chat from "./Chat.jsx";
// import {MyContext} from "./MyContext.jsx";
// import {useContext, useState, useEffect} from "react";
// import {ScaleLoader} from "react-spinners";

// function ChatWindow(){
//     const {prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats, setNewChat} = useContext(MyContext);
//     const [loading, setLoading] = useState(false);
//     const [isOpen, setIsOpen] = useState(false); 

//     const getReply = async () => {
//         setLoading(true);
//         setNewChat(false);
//         console.log("message", prompt, "threadId", currThreadId);

//         const token = localStorage.getItem("token");

//         const options = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}` 
//             },
//             body: JSON.stringify({
//                 message: prompt,
//                 threadId: currThreadId
//             })
//         };

//         try {
//             const response = await fetch("https://onrender.com", options);
//             const res = await response.json();
//             console.log(res);
//             setReply(res.reply);
//         } catch (err) {
//             console.log(err);
//         }
//         setLoading(false); 
//     };

//     useEffect(()=>{
//         if(prompt && reply){
//             setPrevChats(prev => {
//                 // Yahan humne explicit return aur sahi brackets laga diye hain
//                 return [
//                     ...prev, 
//                     { role: "user", content: prompt },
//                     { role: "assistant", content: reply }
//                 ];
//             });
//         }
//         setPrompt("");
//     }, [reply]);

//     const handleProfileClick=() =>{
//         setIsOpen(!isOpen);
//     }


//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         window.location.reload();
//     };

//     return(
//         <div className="chatWindow">
//             <div className="navbar">
//                 <span>ConversaAI <i className="fa-solid fa-chevron-down"></i></span>
//                 <div className="userIconDiv" onClick={handleProfileClick}>
//                     <span className="userIcon"><i className="fa-solid fa-user"></i></span>
//                 </div>
//             </div>

//             {
//                 isOpen &&
//                 <div className="dropDown">
//                     <div className="dropDownItem"><i className="fa-solid fa-gear"></i>Settings</div>
//                     <div className="dropDownItem"><i className="fa-solid fa-cloud-arrow-up"></i>Upgrade plan</div>
                    
                   
//                     <div className="dropDownItem" onClick={handleLogout} style={{ cursor: 'pointer' }}>
//                         <i className="fa-solid fa-arrow-right-from-bracket"></i>Logout
//                     </div>
//                 </div>
//             }
//             <Chat></Chat>

//             <ScaleLoader color="#fff" loading={loading}> 
//             </ScaleLoader>

//             <div className="chatInput">
//                 <div className="inputBox">
//                    <input placeholder="Ask anything"
//                    value={prompt}
//                    onChange={(e)=> setPrompt(e.target.value)}
//                    onKeyDown={(e) => e.key == 'Enter' ? getReply(): ''}
//                     >
//                    </input>

//                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div> 
//                 </div>

//                 <p className="info">
//                     ConversaAI can make mistakes. Check important info. See Cookie Preferences.
//                 </p>
                
//             </div>
//         </div>
//     )
// }
// export default ChatWindow;




// import "./ChatWindow.css";
// import Chat from "./Chat.jsx";
// import {MyContext} from "./MyContext.jsx";
// import {useContext, useState, useEffect} from "react";
// import {ScaleLoader} from "react-spinners";

// function ChatWindow(){
//     const {prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats, setNewChat} = useContext(MyContext);
//     const [loading, setLoading] = useState(false);
//     const [isOpen, setIsOpen] = useState(false); 

//     const getReply = async () => {
//         setLoading(true);
//         setNewChat(false);
//         console.log("message", prompt, "threadId", currThreadId);

//         const token = localStorage.getItem("token");

//         const options = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}` 
//             },
//             body: JSON.stringify({
//                 message: prompt,
//                 threadId: currThreadId
//             })
//         };

//         try {
//             // यहाँ हमने बिल्कुल सही URL पाथ जोड़ दिया है ताकि एरर न आए
//            const response = await fetch("/api/chat", options);
//             const res = await response.json();
//             console.log(res);
//             setReply(res.reply);
//         } catch (err) {
//             console.log(err);
//         }
//         setLoading(false); 
//     };

//     useEffect(()=>{
//         if(prompt && reply){
//             setPrevChats(prev => {
//                 return [
//                     ...prev, 
//                     { role: "user", content: prompt },
//                     { role: "assistant", content: reply }
//                 ];
//             });
//         }
//         setPrompt("");
//     }, [reply]);

//     const handleProfileClick=() =>{
//         setIsOpen(!isOpen);
//     }


//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         window.location.reload();
//     };

//     return(
//         <div className="chatWindow">
//             <div className="navbar">
//                 <span>ConversaAI <i className="fa-solid fa-chevron-down"></i></span>
//                 <div className="userIconDiv" onClick={handleProfileClick}>
//                     <span className="userIcon"><i className="fa-solid fa-user"></i></span>
//                 </div>
//             </div>

//             {
//                 isOpen &&
//                 <div className="dropDown">
//                     <div className="dropDownItem"><i className="fa-solid fa-gear"></i>Settings</div>
//                     <div className="dropDownItem"><i className="fa-solid fa-cloud-arrow-up"></i>Upgrade plan</div>
                    
                   
//                     <div className="dropDownItem" onClick={handleLogout} style={{ cursor: 'pointer' }}>
//                         <i className="fa-solid fa-arrow-right-from-bracket"></i>Logout
//                     </div>
//                 </div>
//             }
//             <Chat></Chat>

//             <ScaleLoader color="#fff" loading={loading}> 
//             </ScaleLoader>

//             <div className="chatInput">
//                 <div className="inputBox">
//                    <input placeholder="Ask anything"
//                    value={prompt}
//                    onChange={(e)=> setPrompt(e.target.value)}
//                    onKeyDown={(e) => e.key == 'Enter' ? getReply(): ''}
//                     >
//                    </input>

//                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div> 
//                 </div>

//                 <p className="info">
//                     ConversaAI can make mistakes. Check important info. See Cookie Preferences.
//                 </p>
                
//             </div>
//         </div>
//     )
// }
// export default ChatWindow;




import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    setReply,
    currThreadId,
    setPrevChats,
    setNewChat,
    socket,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Join current room
  useEffect(() => {
    if (!socket) return;

    socket.emit("join_room", currThreadId);

    return () => {
      socket.emit("leave_room", currThreadId);
    };
  }, [currThreadId, socket]);

  // Listen for realtime messages
  useEffect(() => {
    if (!socket) return;

    const receiveMessage = (message) => {
      setPrevChats((prev) => {
        // Duplicate user message ko ignore karo
        if (
          message.role === "user" &&
          prev.length > 0 &&
          prev[prev.length - 1].role === "user" &&
          prev[prev.length - 1].content === message.content
        ) {
          return prev;
        }

        return [...prev, message];
      });

      if (message.role === "assistant") {
        setReply(message.content);
        setLoading(false);
      }
    };

    socket.on("receive_message", receiveMessage);

    return () => {
      socket.off("receive_message", receiveMessage);
    };
  }, [socket, setPrevChats, setReply]);

  const getReply = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setNewChat(false);

    const userPrompt = prompt;
    const token = localStorage.getItem("token");

    // User message turant dikhao
    setPrevChats((prev) => [
      ...prev,
      {
        role: "user",
        content: userPrompt,
      },
    ]);

    setPrompt("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          threadId: currThreadId,
          message: userPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          ConversaAI <i className="fa-solid fa-chevron-down"></i>
        </span>

        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem">
            <i className="fa-solid fa-gear"></i> Settings
          </div>

          <div className="dropDownItem">
            <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan
          </div>

          <div
            className="dropDownItem"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
          </div>
        </div>
      )}

      <Chat />

      <ScaleLoader color="#fff" loading={loading} />

      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getReply();
              }
            }}
          />

          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>

        <p className="info">
          ConversaAI can make mistakes. Check important info. See Cookie
          Preferences.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;