'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import type { ChatMessage, DiagnosisResult } from '@/types';
import { cn } from '@/lib/utils';

export default function DiagnosePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting
    setMessages([
      {
        id: 'initial',
        role: 'assistant',
        content: 'Hello! I am AutoAid AI, your intelligent roadside assistant. Please describe the issue with your vehicle. Try to include the **brand**, **year**, and any **symptoms** you are experiencing.',
        timestamp: new Date(),
        type: 'text'
      }
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Create context of all messages
      const conversationContext = [...messages, newUserMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationContext }),
      });

      const data = await res.json();
      
      const newAssistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'I processed that information.',
        timestamp: new Date(),
        type: data.type || 'text',
        data: data.result // The DiagnosisResult if provided
      };

      setMessages(prev => [...prev, newAssistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error connecting to my diagnostic servers. Please try again.',
        timestamp: new Date(),
        type: 'text'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-10 bg-surface dark:bg-primary">
      <div className="container-custom max-w-4xl flex flex-col h-[calc(100vh-8rem)]">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-heading font-bold mb-2">AutoAid <span className="text-secondary dark:text-accent">AI Chat</span></h1>
          <p className="text-sm text-text-muted">Describe your vehicle issue and I will help you diagnose it.</p>
        </div>

        {/* Chat Area */}
        <GlassCard className="flex-1 flex flex-col overflow-hidden shadow-2xl border-white/20 dark:border-white/10">
          
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn('flex flex-col max-w-[85%] md:max-w-[75%]', msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start')}
                >
                  <div className={cn(
                    'px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm',
                    msg.role === 'user' 
                      ? 'bg-secondary text-white rounded-br-sm' 
                      : 'bg-white dark:bg-white/10 border border-gray-100 dark:border-white/5 rounded-bl-sm text-text-primary dark:text-text-dark-primary'
                  )}>
                    {msg.content}
                  </div>

                  {/* Diagnosis Result Rendering */}
                  {msg.type === 'diagnosis-result' && msg.data && (
                    <div className="mt-4 w-full">
                      <DiagnosisCard result={msg.data as DiagnosisResult} />
                    </div>
                  )}

                  <span className="text-[10px] text-text-muted mt-1.5 px-1 opacity-70">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 p-4 items-center">
                <div className="w-2 h-2 rounded-full bg-secondary dark:bg-accent animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-secondary dark:bg-accent animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-secondary dark:bg-accent animate-bounce" style={{ animationDelay: '0.4s' }} />
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-black/20">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="E.g., 'My 2024 Toyota is making a knocking sound...'"
                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full pl-6 pr-14 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-accent transition-all shadow-inner"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-2 p-2.5 rounded-full bg-secondary text-white hover:bg-secondary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}

// Subcomponent to render diagnosis results beautifully within the chat
function DiagnosisCard({ result }: { result: DiagnosisResult }) {
  if (!result || !result.possibleFaults || result.possibleFaults.length === 0) {
    return <div className="p-4 bg-white/5 border rounded-xl text-sm">No specific faults could be diagnosed. Please provide more details or consult a mechanic.</div>;
  }

  return (
    <div className="w-full sm:min-w-[350px] max-w-full space-y-4">
      {result.possibleFaults.slice(0, 2).map((fault, idx) => (
        <div key={idx} className="bg-white dark:bg-[#1a1a24] border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-bold text-text-primary dark:text-text-dark-primary">{fault.faultName}</h4>
            <span className={cn('px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider', 
              fault.confidence > 70 ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning'
            )}>
              {fault.confidence}% Match
            </span>
          </div>
          <p className="text-xs text-text-muted mb-4 leading-relaxed">{fault.description}</p>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
            <div>
              <span className="block text-[10px] text-text-muted uppercase">Est. Cost</span>
              <span className="font-bold text-sm">Rs. {fault.estimatedCost.min.toLocaleString()} - Rs. {fault.estimatedCost.max.toLocaleString()}</span>
            </div>
            <Link href={`/faults/${fault.faultSlug}`}>
              <Button size="sm" variant="secondary" className="rounded-xl text-xs py-1.5 h-auto">View Fix</Button>
            </Link>
          </div>
        </div>
      ))}

      <div className={cn('p-4 rounded-xl border', result.canDrive ? 'bg-success/5 border-success/20 text-success' : 'bg-danger/5 border-danger/20 text-danger')}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{result.canDrive ? '✅' : '🚫'}</span>
          <span className="font-bold text-sm">{result.canDrive ? 'Safe to Drive (Carefully)' : 'Do NOT Drive'}</span>
        </div>
        <p className="text-xs mt-1 opacity-80 pl-8">{result.canDriveNote}</p>
      </div>
      
      {!result.canDrive && (
        <Link href="/assistance" className="block mt-2">
          <Button variant="danger" className="w-full shadow-glow-red rounded-xl">🚨 Find Emergency Towing</Button>
        </Link>
      )}
    </div>
  );
}
