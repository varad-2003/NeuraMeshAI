import axios from "axios"
export const getMessages = async(conversationId) => {
    try {
        console.log(process.env.CHAT_SERVICE);
        
        const {data} = await axios.get(`${process.env.CHAT_SERVICE}/get-messages/${conversationId}`,)
        return data
    } catch (error) {
        console.log(error);
        return []
    }
}