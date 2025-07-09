import React, { useState } from 'react';
import { MessageCircle, Minus, X, Search, ChevronRight, BookOpen, HelpCircle, ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type WidgetState = 'minimized' | 'initial' | 'expanded' | 'help' | 'chat' | 'tabbed';
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
    title: 'Data Not Saving Correctly',
    category: 'Troubleshooting',
    content: 'Learn how to troubleshoot data saving issues in your application. This guide covers common causes and solutions for data persistence problems.'
  },
  {
    id: '2',
    title: 'Customizing Your App\'s Design',
    category: 'Getting started',
    content: 'Personalize your app\'s appearance to match your brand. You can customize colors, layouts, and components to create a unique user experience.'
  },
  {
    id: '3',
    title: 'Creating Your First App',
    category: 'Getting started',
    content: 'Get started with building your first application. This comprehensive guide walks you through the initial setup and basic configuration steps.'
  },
  {
    id: '4',
    title: 'Integration Best Practices',
    category: 'Best Practices',
    content: 'Discover proven strategies for integrating with external services and APIs. From authentication to data synchronization, we cover it all.'
  }
];

const promptSuggestions = [
  "What services do you offer?",
  "How can I get started with digital marketing?"
];

// Mock past chats data
const pastChats = [
  {
    id: '1',
    title: 'Digital Marketing Strategy',
    lastMessage: 'Thanks for the detailed explanation about SEO...',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    title: 'Website Design Questions',
    lastMessage: 'Could you help me understand the pricing...',
    timestamp: 'Yesterday'
  },
  {
    id: '3',
    title: 'Social Media Marketing',
    lastMessage: 'What platforms would you recommend...',
    timestamp: '3 days ago'
  }
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
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      let aiResponse = '';
      if (message.includes('services')) {
        aiResponse = "We offer comprehensive digital marketing services including web design, SEO, social media marketing, and brand strategy. Our team helps businesses grow their online presence and reach their target audience effectively.";
      } else if (message.includes('get started') || message.includes('digital marketing')) {
        aiResponse = "Getting started with digital marketing is easy! We begin with a free consultation to understand your business goals, then create a customized strategy that fits your budget and timeline. Would you like to schedule a consultation?";
      } else {
        aiResponse = `Thanks for your question about "${message}". I'm here to help! Our digital marketing agency specializes in helping businesses grow online. Would you like me to provide more specific information about any particular service?`;
      }
      setConversation(prev => [...prev, { type: 'ai', message: aiResponse }]);
    }, 1000);
  };

  const handlePromptClick = (prompt: string) => {
    setConversation([
      { type: 'ai', message: "Got any questions? I'm happy to help." },
      { type: 'user', message: prompt }
    ]);
    setWidgetState('chat');
    
    // Generate AI response for the prompt
    setTimeout(() => {
      let aiResponse = '';
      if (prompt.includes('services')) {
        aiResponse = "We offer comprehensive digital marketing services including web design, SEO, social media marketing, and brand strategy. Our team helps businesses grow their online presence and reach their target audience effectively.";
      } else if (prompt.includes('get started') || prompt.includes('digital marketing')) {
        aiResponse = "Getting started with digital marketing is easy! We begin with a free consultation to understand your business goals, then create a customized strategy that fits your budget and timeline. Would you like to schedule a consultation?";
      } else {
        aiResponse = `Thanks for your question about "${prompt}". I'm here to help! Our digital marketing agency specializes in helping businesses grow online. Would you like me to provide more specific information about any particular service?`;
      }
      setConversation(prev => [...prev, { type: 'ai', message: aiResponse }]);
    }, 1000);
  };

  const handleInputClick = () => {
    setConversation([{ type: 'ai', message: "Got any questions? I'm happy to help." }]);
    setWidgetState('chat');
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
          className="bg-white border border-border rounded-full px-4 py-[14px] shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200 ease-in-out w-80"
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
          <div className="mb-4 space-y-2 w-[462px] transition-all duration-200 ease-in-out">
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
              className="relative bg-white border border-border rounded-full shadow-lg w-[462px] px-4 py-[14px] group hover:shadow-xl transition-all duration-200 ease-in-out cursor-pointer"
              onClick={handleInputClick}
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

  // Tabbed State
  if (widgetState === 'tabbed') {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white border border-border rounded-2xl shadow-xl w-96 h-[500px] flex flex-col">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
            <div className="w-6"></div> {/* Spacer for center alignment */}
            <h2 className="font-medium">Assistant</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setWidgetState('initial')}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="chat" className="flex flex-col flex-1 min-h-0">
            <TabsContent value="chat" className="flex-1 p-4 flex flex-col min-h-0">
              <div className="flex-1 flex flex-col min-h-0">
                <div className="text-center mb-6">
                  <h3 className="font-medium mb-2">Got any questions? I'm happy to help.</h3>
                  <p className="text-sm text-muted-foreground mb-4">Start a conversation</p>
                  
                  {/* Prompt suggestions */}
                  <div className="space-y-2 mb-4">
                    {promptSuggestions.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => handlePromptClick(prompt)}
                        className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-all text-sm"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => {
                      setConversation([{ type: 'ai', message: "Got any questions? I'm happy to help." }]);
                      setWidgetState('chat');
                    }}
                    className="w-full mb-6"
                  >
                    Start Chat
                  </Button>
                </div>

                {/* Past Chats Section */}
                <div className="flex-1 overflow-y-auto min-h-0">
                  <h4 className="font-medium text-sm text-muted-foreground mb-3">Past Chats</h4>
                  <div className="space-y-2">
                    {pastChats.map((chat) => (
                      <div
                        key={chat.id}
                        className="p-3 rounded-lg border border-border hover:bg-accent cursor-pointer transition-all"
                        onClick={() => {
                          // Load past chat logic here
                          setWidgetState('chat');
                        }}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <h5 className="font-medium text-sm truncate">{chat.title}</h5>
                          <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{chat.timestamp}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="help" className="flex-1 p-4 flex flex-col min-h-0">
              <div className="mb-4 flex-shrink-0">
                <div className="relative">
                  <Input
                    placeholder="Search articles"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 min-h-0">
                <div>
                  <h3 className="font-medium mb-3 text-muted-foreground">Trending Articles</h3>
                  <div className="space-y-2">
                    {filteredArticles.slice(0, 3).map((article) => (
                      <div
                        key={article.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer"
                      >
                        <BookOpen className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate">{article.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
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
              </div>
            </TabsContent>

            {/* Tabs moved to bottom */}
            <div className="flex justify-center px-4 mb-2 border-t border-border pt-2 flex-shrink-0">
              <TabsList className="grid grid-cols-2 w-[80%]">
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="help" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Help
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
      </div>
    );
  }

  // Chat State
  if (widgetState === 'chat') {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white border border-border rounded-2xl shadow-xl w-96 h-[500px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setWidgetState('tabbed')}
                className="h-8 w-8 p-0 mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium">Chat</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setWidgetState('initial')}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                      <span className="text-sm font-medium">Gigi</span>
                    </div>
                  )}
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}

            {/* Show prompt suggestions at bottom if only welcome message */}
            {conversation.length === 1 && (
              <div className="space-y-2 pt-4">
                {promptSuggestions.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-all text-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 flex-shrink-0">
            <div className="relative flex items-center gap-2">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && inputValue.trim()) {
                    handleSendMessage(inputValue);
                  }
                }}
                className="flex-1"
              />
              <Button
                size="sm"
                onClick={() => {
                  if (inputValue.trim()) {
                    handleSendMessage(inputValue);
                  }
                }}
                disabled={!inputValue.trim()}
                className="h-10 w-10 p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Expanded State (Widget instead of modal)
  if (widgetState === 'expanded') {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white border border-border rounded-2xl shadow-xl w-96 h-[500px] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium">Digital Marketing Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setWidgetState('initial')}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
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

          {/* Input */}
          <div className="border-t border-border p-4">
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
        </div>
      </div>
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
