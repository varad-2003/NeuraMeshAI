import { getModel } from "../config/llmModel.js";

export const router = async (state) => {
  console.log("router called");
  
  if (state.agent && state.agent !== "auto") {
    return {
      ...state,
      agent: state.agent,
    };
  }

  if(state.file){
    if(state.file?.mimetype === "application/pdf"){
      console.log("pdf analyzer called");
      
      return {
        ...state,
        agent:"pdfRag"
      }
    }
  
  
  
    if(state.file?.mimetype?.startsWith("image/")){
      return {
        ...state,
        agent:"imgAnalyzer"
      }
    }
    
  }



  const llm = await getModel("router");
  const prompt = `You are an agent router.
    Available agents:
    
    - chat
    - search
    - pdf
    - ppt
    - search
    - image
    
    Rules:
    
    chat:
    General conversations
    explainations,
    learning,
    questions.
    
    search:
    Current events,
    latest information,
    news,
    recent developments,
    internet lookup.
    
    coding:
    Generate code,
    debug code,
    build projects,
    architecture,
    API design.
    
    pdf:
    Questions about generate PDFs or document context.
    
    ppt:
    Questions about generate PPTs or PPT context.

    imagegen:
    Generate or create image,
    edit image.
    
    Return ONLY one word
    
    chat
    search
    coding
    pdf
    ppt
    imagegen
    
    User Query: 
    ${state.prompt}
    `;

  const response = await llm.invoke(prompt);

  
 console.log("🔥 ROUTER RESPONSE:", response.content);
console.log("🔥 ROUTER SELECTED:", response.content.trim().toLowerCase());

  return {
    ...state,
    agent: response.content.trim().toLowerCase(),
  };
};
