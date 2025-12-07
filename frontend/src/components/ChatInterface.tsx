import { useState, useRef, useEffect } from 'react';
import { Send, FileText, ArrowLeft, Loader2 } from 'lucide-react';
import { askPdf, askYoutube } from '../../services/api';

interface ChatInterfaceProps {
  type: 'pdf' | 'youtube';
  Name?: string;
  onReset: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function ChatInterface({ Name, onReset, type }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: `I've analyzed "${Name}". Feel free to ask me any questions about the ${type === 'pdf' ? 'documnet' : 'video'}!`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAnswerGenerating, setIsAnswerGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    setIsAnswerGenerating(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    let answer = '';
    if (type === 'pdf') {
      const result = await askPdf(userMessage.content);
      answer = result.answer;
    } else {
      const result = await askYoutube(userMessage.content);
      answer = result.answer;
    }
    setIsAnswerGenerating(false);
    setInputValue('');
    setIsTyping(true);


    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: answer,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);

  };

  return (
    <div className="flex flex-col text-white h-screen">
      {/* Header */}
      <header className="bg-neutral-900 rounded-2xl border-b border-slate-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onReset}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-red-50 rounded-lg">
                <FileText className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-slate-200 text-2xl">{Name}</p>
                <p className="text-slate-300">Ask questions about this {type === "pdf" ? 'document' : 'video'}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3 ${message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-800 border border-slate-900 text-slate-300'
                  }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p
                  className={`mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-slate-400'
                    }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
          {
            isAnswerGenerating && <div className="flex justify-start">
              <div className=" px-5 py-3">
                <div className="flex items-center gap-2">
                  <span>AI is typing... </span>
                </div>
              </div>
            </div>
          }


          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-neutral-900 rounded-2xl border-t border-slate-800 px-6 py-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex gap-3 items-end bg-gray-900 rounded-2xl p-2 border border-neutral-800 focus-within:border-blue-500 transition-colors">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Ask a question about your ${type === "pdf" ? 'document' : 'video'}...`}
              className="flex-1 bg-transparent px-3 py-2 outline-none text-slate-100 placeholder:text-slate-500"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 disabled:cursor-not-allowed text-blue p-3 rounded-xl transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
