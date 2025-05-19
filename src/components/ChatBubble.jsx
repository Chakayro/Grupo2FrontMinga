import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleChat, setInput, sendMessage } from '../store/actions/chatAction.js';

export default function ChatBubble() {
  const dispatch = useDispatch();
  const open = useSelector(state => state.chat.open);
  const messages = useSelector(state => state.chat.messages);
  const input = useSelector(state => state.chat.input);
  const loading = useSelector(state => state.chat.loading);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = () => {
    if (input.trim()) {
      dispatch(sendMessage(input.trim()));
      dispatch(setInput(''));
    }
  };

  return (
    <>
      <div
        onClick={() => dispatch(toggleChat())}
        className="fixed bottom-4 right-4 w-14 h-14 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-orange-700 transition z-[9999]"
      >
        💬
      </div>

      {open && (
        <div className="fixed bottom-24 right-4 w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden transition-transform duration-300 transform z-[9999] scale-100">
          <div className="p-3 border-b font-bold text-orange-700 bg-blue-50">
            Minga Sensei
          </div>

          <div className="flex-1 p-3 overflow-y-auto">
            {messages.length === 0 && !loading && (
              <p className="text-center text-gray-400 italic">
                Type something to start the chat...
              </p>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 text-sm flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] px-3 py-1 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-orange-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <span className="font-semibold">
                    {msg.sender === 'user' ? 'You' : 'Minga'}:
                  </span>{' '}
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && <p className="text-sm text-gray-400">Typing...</p>}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-2">
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-orange-400 text-sm"
              placeholder="Type a message..."
              value={input}
              onChange={e => dispatch(setInput(e.target.value))}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
          </div>
        </div>
      )}
    </>
  );
}
