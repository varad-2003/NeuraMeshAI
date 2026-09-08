import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from "./router.js";
import { chat } from "../agents/chat.agent.js";
import { search } from "../agents/search.agent.js";
import { pdf } from "../agents/pdf.agent.js";
import { ppt } from "../agents/ppt.agent.js";
import { coding } from "../agents/coding.agent.js";
import { imageGen } from "../agents/imageGen.agent.js";
import { pdfRag } from "../agents/pdfRag.agent.js";
import { imgAnalyzer } from "../agents/imgAnalyzer.agent.js";

const workflow = new StateGraph(agentState)

workflow.addNode("router", router)
workflow.addNode("chat", chat)
workflow.addNode("search", search)
workflow.addNode("pdf", pdf)
workflow.addNode("ppt", ppt)
workflow.addNode("coding", coding)
workflow.addNode("imagegen", imageGen)
workflow.addNode("pdfRag", pdfRag)
workflow.addNode("imgAnalyzer", imgAnalyzer)

workflow.addEdge("__start__", "router");
workflow.addConditionalEdges("router", (state) => {
    console.log("🔥 GRAPH RECEIVED AGENT:", state.agent); 
    switch (state.agent) {
        case "chat":
            return "chat"

        case "coding":
            return "coding"  
        
        case "ppt":
            return "ppt"  
            
        case "pdf":
            return "pdf"  
        
        case "search":
            return "search"   
        
        case "imagegen":
            return "imagegen" 
        
        case "pdfRag":
            return "pdfRag"
            
        case "imgAnalyzer":
            return "imgAnalyzer"    
        
        default:
            return "chat"
    }
}, {
    chat: "chat",
    search: "search",
    pdf: "pdf",
    ppt: "ppt",
    coding: "coding",
    imagegen: "imagegen",
    pdfRag: "pdfRag",
    imgAnalyzer: "imgAnalyzer"

})
workflow.addEdge("search", "chat")

workflow.addEdge("chat", "__end__")
workflow.addEdge("coding", "__end__")
workflow.addEdge("ppt", "__end__")
workflow.addEdge("pdf", "__end__")
workflow.addEdge("imagegen", "__end__")
workflow.addEdge("pdfRag", "__end__")
workflow.addEdge("imgAnalyzer", "__end__")

export const graph = workflow.compile()
