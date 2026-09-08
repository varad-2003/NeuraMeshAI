import { checkAgentLimit } from "../config/agentLimit.js";
import { searchTool } from "../config/tavily.js"
import { deductCredits } from "../utils/deductCredits.js";

export const search = async (state) => {
     try {
        await checkAgentLimit(state.userId, "search")
        console.log("search agent called");
        
        const results = await searchTool.invoke({
            query: state.prompt
        })
        await deductCredits(state.userId, "search")
        console.log(results);
        return{
            ...state,
            searchResults:results,
            images:results.images
        }
     } catch (error) {
         return{
            ...state,
            searchResults:[],
            images:[],
            aiResponse:error?.data?.message || 'Failed To Generate Response'
        }
     }
}