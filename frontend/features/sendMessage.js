import React from 'react'
import api from '../utils/axios';

async function sendMessage(payload) {
  try {
    const {data} = await api.post("/agent/chat", payload)
    return data
  } catch (error) {
    console.log(error.response?.data || error.message);
    return null
    
  }
}

export default sendMessage