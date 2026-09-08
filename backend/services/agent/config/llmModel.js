import { ChatGroq } from "@langchain/groq";
import { ChatOpenRouter } from "@langchain/openrouter";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

const groq = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
});


const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash",
})


const openRouter = new ChatOpenRouter({
  model: "deepseek/deepseek-chat",
  temperature: 0,
  maxTokens:2500,
});

export const getModel = async (agent) => {
  switch (agent) {
    case "chat":
      return groq;

    case "coding":
      return openRouter;

    case "imgAnalyzer":
      return gemini;  

    default:
      return groq;
  }
};
