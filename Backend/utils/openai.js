// import "dotenv/config";

// const getOpenAIAPIResponse = async(message) =>{
//    const options={
//        method:"POST",
//        headers: {
//          "Content-Type":"application/json",
//          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//        },
//        body: JSON.stringify({
//          model: "gpt-4o-mini",
//          messages: [{
//            role:"user",
//            content: message
//          }]
//        })
//      };
//           try{
//            const response = await fetch("https://api.aicredits.in/v1/chat/completions", options);
//            const data=await response.json();
//            return data.choices[0].message.content;//reply
//           } catch(err){
//            console.log(err);
//           } 
// }

// export default getOpenAIAPIResponse;

import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: message
      }]
    })
  };

  try {
    const response = await fetch("https://api.aicredits.in/v1/chat/completions", options);
    const data = await response.json();
    
    console.log("AICredits Response:", data); // ताकि लॉग्स में डेटा दिखे

    // यहाँ हमने हर संभव तरीका लगा दिया है ताकि डेटा सही से निकले
    if (data?.choices?.[0]?.message?.content) {
      return data.choices[0].message.content;
    } else if (data?.reply) {
      return data.reply;
    } else if (data?.error?.message) {
      return `API Error: ${data.error.message}`;
    }
    
    return null;
  } catch (err) {
    console.log("Fetch Error:", err);
    return null;
  } 
}

export default getOpenAIAPIResponse;
