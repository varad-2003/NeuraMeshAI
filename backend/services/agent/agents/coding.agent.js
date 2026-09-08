import { getModel } from "../config/llmModel.js";
import { deductCredits } from "../utils/deductCredits.js";
import { checkAgentLimit } from "../config/agentLimit.js";

export const coding = async (state) => {
  await checkAgentLimit(state.userId, "coding")
  console.log("🔥 CODING AGENT CALLED");
  console.log("PROMPT:", state.prompt);
  const intentLLM = await getModel("intent");
  const llm = await getModel("coding");
  const intentResponse = await intentLLM.invoke(`
        You are an intent classifier.

        Return ony one of these values.

        CODE_GENERATION
        CODE_REVIEW
        CODE_EXPLANATION
        DEBUGGING
        OPTIMIZATION
        CONVERSION
        DOCUMENTATION

        User request:
        ${state.prompt}
        `);

  const intent = intentResponse.content;
  if (intent == "CODE_GENERATION") {
    const prompt = `
            You are CortexAI Coding Agent.

Generate the requested project.

Default stack:
- HTML
- CSS
- JavaScript

Use React / Next.js / Vue ONLY if explicitly requested.

Rules:

- Responsive
- Modern UI
- CSS Variables
- Flexbox/Grid
- Smooth Scroll
- Hover Effects
- Beautiful spacing
- Single page unless user asks otherwise.

IMAGES
==========================

Always use real, working Unsplash images.

NEVER use:
- source.unsplash.com
- via.placeholder.com
- placeholder images
- fake image URLs
- invented Unsplash URLs

IMPORTANT:
source.unsplash.com is deprecated and must NEVER be used.

If using Unsplash, use a valid image URL from images.unsplash.com.


Return ONLY valid JSON.


IMPORTANT JSON RULES:

- Every value of "content" must be a valid JSON string.
- Escape every double quote inside HTML, CSS, and JavaScript content as \".
- Escape every backslash as \\.
- Use \n for new lines inside content strings.
- Never use invalid escapes such as \<, \>, \:, or \&.
- Do not use Markdown links inside file content.
- Do not wrap the JSON in a Markdown code fence.
- The entire response must be directly parseable using JSON.parse().


Schema:

{
  "files": [
    {
      "name": "index.html",
      "content": "..."
    },
    {
      "name": "style.css",
      "content": "..."
    },
    {
      "name": "script.js",
      "content": "..."
    }
  ]
}

Rules:

- Output must start with {
- Output must end with }
- No markdown
- No explanation
- No extra text
- Never mention intent

User Request:
${state.prompt}
`;

    const res = await llm.invoke(prompt)

    console.log("🔥 RAW CODING RESPONSE:", res.content);
    
    
    const content = JSON.parse(
  res.content
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim()
);
await deductCredits(state.userId, "coding")

console.log(content);


    return{
        ...state,
        aiResponse:"Code Generated Successfully",
        artifacts:[
            {
                id:Date.now(),
                type:"Project",
                files:content.files || [],
                title:state.prompt
            }
        ]
    }
    
  }

  const res = await llm.invoke(`
        The User's request is :

${intent}

Return Markdown only.

Never generate project files.

Use headings like:

# Overview

## Explanation

## Problems

## Improvements

## Best Practices

## Optimized Code (if needed)

User Request:
${state.prompt}
    `)

    const content = res.content
    await deductCredits(state.userId, "coding")

    return {
        ...state,
        aiResponse:content,
        artifacts:[]
    }
};
