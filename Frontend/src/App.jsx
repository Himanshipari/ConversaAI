// import './App.css';
// import Sidebar from "./Sidebar.jsx";
// import ChatWindow from "./ChatWindow.jsx";
// import { MyContext } from "./MyContext.jsx";
// import { useState, useEffect } from 'react';
// import { v1 as uuidv1 } from 'uuid';
// import Auth from "./Auth.jsx";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const [prompt, setPrompt] = useState("");
//   const [reply, setReply] = useState(null);
//   const [currThreadId, setCurrThreadId] = useState(uuidv1());
//   const [prevChats, setPrevChats] = useState([]); 
//   const [newChat, setNewChat] = useState(true);
//   const [allThreads, setAllThreads] = useState([]);

//   const providerValues = {
//     prompt,
//     setPrompt,
//     reply,
//     setReply,
//     currThreadId,
//     setCurrThreadId,
//     newChat,
//     setNewChat,
//     prevChats,
//     setPrevChats,
//     allThreads,
//     setAllThreads
//   };

//   return (
//     <div className='app'>
//       {!isAuthenticated ? (
//         <Auth onLoginSuccess={() => setIsAuthenticated(true)} />
//       ) : (
//         <MyContext.Provider value={providerValues}>
//           <Sidebar />
//           <ChatWindow />
//         </MyContext.Provider>
//       )}
//     </div>
//   );
// }

// export default App;


import "./App.css";
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import Auth from "./Auth.jsx";
import { MyContext } from "./MyContext.jsx";

import { useState, useEffect } from "react";
import { v1 as uuidv1 } from "uuid";
import { io } from "socket.io-client";

// const socket = io("http://localhost:8080");
const socket = io();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt,
    setPrompt,

    reply,
    setReply,

    currThreadId,
    setCurrThreadId,

    newChat,
    setNewChat,

    prevChats,
    setPrevChats,

    allThreads,
    setAllThreads,

    socket,
  };

  return (
    <div className="app">
      {!isAuthenticated ? (
        <Auth
          onLoginSuccess={() => setIsAuthenticated(true)}
        />
      ) : (
        <MyContext.Provider value={providerValues}>
          <Sidebar />
          <ChatWindow />
        </MyContext.Provider>
      )}
    </div>
  );
}

export default App;