import fetch from 'node-fetch';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const urlRoot = `https://api.openai.com/v1`;

function constructURL(endpoint) {
  return `${urlRoot}${endpoint}`;
}

export async function generateImageFromPrompt(prompt) {
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: '1024x1024',
  });
  return await response;
}

export async function postData(endpoint, data) {
  const result = await fetch(constructURL(endpoint), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const res = await result.json();
  return res;
}

export async function updateData(endpoint, data) {
  const result = await fetch(constructURL(endpoint), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const res = await result.json();
  return res;
}

export async function deleteData(endpoint, data) {
  const result = await fetch(constructURL(endpoint), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const res = await result.json();
  return res;
}
