
import { useState, useRef, useEffect } from 'react';
import { Send, ChevronDown, Download, X, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'system';
  timestamp: Date;
}

const demoMessages: Message[] = [
  {
    id: '1',
    content: "Hello! I'm your SHL product recommendation assistant. How can I help you find the right assessment solutions today?",
    sender: 'system',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  }
];

const suggestedPrompts = [
  "What's the best assessment for technical roles?",
  "I need to evaluate leadership potential",
  "Which products help with graduate recruitment?",
  "Recommend tools for assessing remote workers"
];

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      const response = await fetch('https://backend-rag-tq97.onrender.com/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_question: inputValue }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'success') {
        const systemMessage: Message = {
          id: Date.now().toString(),
          content: data.result,
          sender: 'system',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, systemMessage]);
        
        // Show success toast for product recommendation
        toast({
          title: "Product Recommendation Ready",
          description: "We've found some perfect matches for your needs",
          variant: "default",
        });
      } else {
        throw new Error('Failed to get a valid response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "I'm sorry, I couldn't retrieve assessment recommendations at the moment. Please try again later.",
        sender: 'system',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Recommendation Error",
        description: "There was a problem retrieving assessment recommendations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleSuggestedPrompt = (prompt: string) => {
    setInputValue(prompt);
  };
  
  const exportConversation = () => {
    try {
      const conversationText = messages
        .map(msg => `[${formatTime(msg.timestamp)}] ${msg.sender === 'user' ? 'You' : 'SHL Assistant'}: ${msg.content}`)
        .join('\n\n');
      
      const blob = new Blob([conversationText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `shl-chat-${new Date().toISOString().split('T')[0]}.txt`;
      link.click();
      
      toast({
        title: "Conversation Exported",
        description: "Your conversation has been downloaded as a text file",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was a problem exporting your conversation",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat bubble toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white shadow-lg hover:bg-opacity-90 transition-colors duration-200"
        >
          <Sparkles className="h-7 w-7" />
        </button>
      )}
      
      {/* Chat panel */}
      {isOpen && (
        <div className="bg-card rounded-lg shadow-xl flex flex-col w-full max-w-md h-[550px] border border-border overflow-hidden">
          {/* Chat header */}
          <div className="flex justify-between items-center p-4 border-b border-border bg-gradient-to-r from-shl-gray to-shl-dark-gray text-white">
            <div className="flex items-center">
              <div className="bg-primary/10 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-primary mr-3">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">SHL AI Advisor</h3>
                <p className="text-xs text-blue-100">Personalized assessment recommendations</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-blue-100">
              <X size={20} />
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-muted/10">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-card border border-border shadow-sm text-foreground'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <p className="text-sm">{message.content}</p>
                    ) : (
                      <div className="text-sm prose prose-invert max-w-none">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    )}
                    <span className={`text-xs mt-1 block ${message.sender === 'user' ? 'text-blue-100' : 'text-muted-foreground'}`}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-card rounded-lg p-3 max-w-[80%] border border-border shadow-sm">
                    <div className="flex space-x-2 items-center">
                      <div className="text-xs text-muted-foreground">SHL's AI is searching for the perfect match</div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Suggested prompts */}
          {messages.length < 3 && !isLoading && (
            <div className="px-4 py-3 border-t border-border bg-muted">
              <p className="text-xs text-muted-foreground mb-2">Try asking about:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedPrompt(prompt)}
                    className="text-xs bg-card px-3 py-1.5 rounded-full border border-border text-primary hover:bg-primary/10 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Chat input */}
          <form onSubmit={handleSubmit} className="border-t border-border p-4 bg-card">
            <div className="flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe what you're looking for..."
                className="flex-1 border border-border rounded-l-lg py-3 px-4 bg-muted text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className={`bg-primary text-white rounded-r-lg p-3 ${
                  isLoading || !inputValue.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'
                } transition-colors`}
              >
                <Send size={20} />
              </button>
            </div>
            <div className="mt-2 text-xs text-muted-foreground flex justify-between items-center">
              <span>AI-powered by SHL's product expertise</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={exportConversation}>
                      <Download size={14} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Export conversation</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
