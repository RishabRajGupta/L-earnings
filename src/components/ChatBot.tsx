
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Bot, MessageCircle } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m here to help you with any questions about your courses or general queries. How can I assist you today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simple response logic - in a real app, you'd want to connect this to an AI service
      const botResponse = await generateResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again.'
      }]);
    }
    setIsLoading(false);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90%] sm:w-[440px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Course Assistant
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-[calc(100vh-8rem)]">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4 mt-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-4 py-2">
                    Thinking...
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !inputMessage.trim()}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Send
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Simple response generation logic - replace with actual AI service integration
const generateResponse = async (message: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simple keyword-based responses
  const messageLower = message.toLowerCase();
  
  if (messageLower.includes('refund')) {
    return "You can get a refund based on your test performance! Score 90% or higher on the final test to receive a 90% refund of your course fee.";
  }
  
  if (messageLower.includes('test') || messageLower.includes('exam')) {
    return "Each course has a final test that you can take once you feel ready. Your performance on this test determines your refund amount - the higher your score, the higher your refund!";
  }
  
  if (messageLower.includes('course') && (messageLower.includes('start') || messageLower.includes('begin'))) {
    return "You can start your enrolled courses immediately! Just navigate to 'My Courses' and click on the course you want to begin. Each course includes detailed materials and a final test.";
  }
  
  if (messageLower.includes('price') || messageLower.includes('cost')) {
    return "Our courses range from ₹5,000 to ₹10,000. Remember, you can earn a refund based on your performance in the final test!";
  }

  return "I'm here to help with any questions about courses, tests, refunds, or general information. Could you please be more specific about what you'd like to know?";
};

export default ChatBot;
