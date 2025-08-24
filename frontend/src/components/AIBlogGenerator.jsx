import React, { useState } from 'react';
import { API_BASE_URL } from "../config.js";

async function AIBlogGenerator(title) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/ai/generate-blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: title }),
    });
    const data = await response.json();
    if (response.ok && data.blogPost) {
      return {
        title,
        content: data.blogPost,
        isAI: true,
      };
    } else {
      throw new Error(data.error || 'Failed to generate blog post.');
    }
  } catch (err) {
    throw new Error('Server error.');
  }
}

export default AIBlogGenerator;
