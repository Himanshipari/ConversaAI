import "./Sidebar.css";
import {useContext, useEffect} from "react";
import {MyContext} from "./MyContext.jsx";
import {v1 as uuidv1} from "uuid";
import logo from "./assets/ChatGPT-Logo-scaled.png";

function Sidebar(){
  
    const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId,setPrevChats} = useContext(MyContext);

    const getallThreads = async () =>{
        try{
            const response = await fetch("http://localhost:8080/api/thread");
            const res= await response.json();
            const filteredData = res.map(thread => ({threadId: thread.threadId, title:thread.title}));
            setAllThreads(filteredData);
            console.log(res);
        }catch(err){
            console.log(err);
        }
    };

    // useEffect(()=>{
    //     getallThreads();
    // }, [currThreadId])

    const createNewChat = () =>{
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

    const changeThread = async (newThreadId) =>{
        setCurrThreadId(newThreadId);
        try{
            const response = await fetch(`https://conversaai-yvmt.onrender.com${newThreadId}`);
            const res= await response.json();
            console.log(res);
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        }catch(err){
            console.log(err);
        }
    }

    const deleteThread = async (threadId) =>{
        try{
            const response = await fetch(`https://conversaai-yvmt.onrender.com${threadId}`, {method:"DELETE"});
            const res= await response.json();
            console.log(res);
            setAllThreads(prev=> prev.filter(thread => thread.threadId !== threadId));
            if(threadId ===  currThreadId){
                createNewChat();
            }
        }catch(err){
            console.log(err);
        }
    }

    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
    };

    return(
        <section className="sidebar">
            <button onClick={createNewChat}>
                <img src={logo} alt="gpt logo" className="logo" />
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>
           
           <ul className="history">
            {
                allThreads?.map((thread, idx)=>(
                    <li key={idx}
                    onClick={() => changeThread(thread.threadId)}
                    className={thread.threadId === currThreadId ? "highlighted": " "}
                    >{thread.title}
                    <i className="fa-solid fa-trash"
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteThread(thread.threadId);
                    }}></i>
                    </li>
                ))
            }
           </ul>

          <div className="sign">
            <p>By Himanshi &hearts;</p>
          </div>

         
          <button onClick={handleLogout} className="logout-btn">
            <svg xmlns="http://w3.org" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{marginRight: '8px'}}>
                <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
            </svg>
            Logout
          </button>

         </section>
    )
}
export default Sidebar;
