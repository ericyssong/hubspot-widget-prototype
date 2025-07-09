import React, { useState } from 'react';
import { MessageCircle, Minus, X, Search, ChevronRight, BookOpen, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type WidgetState = 'minimized' | 'initial' | 'expanded' | 'help';
type HelpState = 'catalog' | 'article';

interface HelpArticle {
  id: string;
  title: string;
  category: string;
  content: string;
}

const mockHelpArticles: HelpArticle[] = [
  {
    id: '1',
    title: 'Getting Started with Our Platform',
    category: 'Getting started',
    content: 'Learn the basics of using our platform to manage your business. This comprehensive guide will walk you through setting up your account, creating your first projects, and understanding the core features that make our platform powerful.'
  },
  {
    id: '2',
    title: 'Customizing Your Dashboard',
    category: 'Getting started',
    content: 'Personalize your dashboard to show the metrics that matter most to your business. You can add, remove, and rearrange widgets to create the perfect view of your data.'
  },
  {
    id: '3',
    title: 'Managing User Access',
    category: 'Troubleshooting',
    content: 'Learn how to create, edit, and manage user permissions in our platform. User access controls help you organize your team and control who can see what information.'
  },
  {
    id: '4',
    title: 'Integration Best Practices',
    category: 'Best Practices',
    content: 'Discover proven strategies for integrating our platform with your existing tools and workflows. From API connections to data synchronization, we cover it all.'
  }
];

const promptSuggestions = [
  "What are your pricing plans?",
  "How do I get started with a free trial?"
];

export function ChatWidget() {
  const [widgetState, setWidgetState] = useState<WidgetState>('initial');
  const [helpState, setHelpState] = useState<HelpState>('catalog');
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [conversation, setConversation] = useState<Array<{type: 'user' | 'ai', message: string}>>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = (message: string) => {
    setConversation(prev => [...prev, { type: 'user', message }]);
    setWidgetState('expanded');
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      setConversation(prev => [...prev, { 
        type: 'ai', 
        message: `Thanks for your question about "${message}". I'm here to help! Our platform offers comprehensive solutions for your business needs. Would you like me to provide more specific information about any particular feature?`
      }]);
    }, 1000);
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const filteredArticles = mockHelpArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(mockHelpArticles.map(article => article.category))];

  // Minimized State
  if (widgetState === 'minimized') {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div 
          className="bg-white border border-border rounded-full px-4 py-[14px] shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200 ease-in-out"
          onClick={() => setWidgetState('initial')}
        >
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Ask me anything...</span>
          </div>
        </div>
      </div>
    );
  }

  // Initial State
  if (widgetState === 'initial') {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col items-end">
          {/* Floating prompts above input */}
          <div className="mb-4 space-y-2 w-80 transition-all duration-200 ease-in-out">
            {promptSuggestions.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="w-full text-left p-3 rounded-lg bg-white/90 backdrop-blur-sm border border-border/50 hover:bg-white hover:border-border hover:shadow-md transition-all text-sm"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Minimal input container with gradient border */}
          <div className="relative">
            {/* Gradient border background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-sm"></div>
            <div 
              className="relative bg-white border border-border rounded-full shadow-lg w-80 px-4 py-[14px] group hover:shadow-xl transition-all duration-200 ease-in-out cursor-pointer"
              onClick={() => setWidgetState('expanded')}
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground flex-1">Ask me anything...</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setWidgetState('minimized');
                  }}
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Expanded State (Modal)
  if (widgetState === 'expanded') {
    return (
      <Dialog open={true} onOpenChange={() => setWidgetState('initial')}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              HubSpot Assistant
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto max-h-96 space-y-4 pr-2">
            {conversation.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}>
                  {msg.type === 'ai' && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <MessageCircle className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm font-medium">Assistant</span>
                    </div>
                  )}
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="relative">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && inputValue.trim()) {
                    handleSendMessage(inputValue);
                  }
                }}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Help State
  if (widgetState === 'help') {
    return (
      <Dialog open={true} onOpenChange={() => setWidgetState('initial')}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Help Center
            </DialogTitle>
          </DialogHeader>

          {helpState === 'catalog' && (
            <div className="space-y-6">
              <div className="relative">
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>

              <div>
                <h3 className="font-medium mb-3 text-muted-foreground">Browse Categories</h3>
                <div className="space-y-1">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent cursor-pointer">
                      <span className="font-medium">{category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {mockHelpArticles.filter(article => article.category === category).length} articles
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 text-muted-foreground">Popular Articles</h3>
                <div className="space-y-2">
                  {filteredArticles.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => {
                        setSelectedArticle(article);
                        setHelpState('article');
                      }}
                      className="p-3 rounded-lg border border-border hover:bg-accent cursor-pointer"
                    >
                      <h4 className="font-medium mb-1">{article.title}</h4>
                      <p className="text-sm text-muted-foreground">{article.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {helpState === 'article' && selectedArticle && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <button
                  onClick={() => setHelpState('catalog')}
                  className="hover:text-foreground"
                >
                  Help Center
                </button>
                <ChevronRight className="h-4 w-4" />
                <span>{selectedArticle.category}</span>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">{selectedArticle.title}</h2>
                <div className="prose max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedArticle.content}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-4">Was this article helpful?</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Yes</Button>
                  <Button variant="outline" size="sm">No</Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
