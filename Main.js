/* eslint-disable */
import React from 'react';
const { Configuration, OpenAIApi } = require('openai');

// async function allows us to use await inside the function body
const ChatBotResponseSetup = () => {
  const [messages, setMessages] = useRecoilState(messageState);
  const ChatBot = async () => {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const history = [];
    const person = `Snoop Dog`;
    const state = `Act as an EXTREMIFIED PERSONAL+(that can curse)) version of ${person} and respond to any input with their qualities and emotions. ONLY RESPOND TO USER INPUT...`;
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: state }],
    });
    const user_input = '';
    for (let i = messages.length - 1; i >= 0; i--)
      if (messages[i].sender !== 'bot') {
        user_input = messages[i].content;
        break;
      }
    if (user_input.trim() === '') return;

    for (const [input_text, completion_text] of history) {
      messages.push({ role: 'user', content: input_text });
      messages.push({ role: 'assistant', content: completion_text });
    }
    messages.push({ role: 'user', content: user_input });
    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
      });
      const completion_text = completion.data.choices[0].message.content;
      setMessages([...messages, completion_text]);
      console.log(completion_text);
      history.push([user_input, completion_text]);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  };

  return <></>;
};

export default ChatBotResponseSetup;
