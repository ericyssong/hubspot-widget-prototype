

import { ChatWidget } from "@/components/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Transform Your Digital Presence
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            We're a full-service digital marketing agency that helps businesses grow online. 
            From stunning websites to data-driven marketing campaigns, we deliver results 
            that matter to your bottom line.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Get Free Consultation
            </button>
            <button className="border border-border px-8 py-3 rounded-lg font-medium hover:bg-accent transition-colors">
              View Our Work
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-purple-500 rounded"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Web Design</h3>
            <p className="text-muted-foreground">
              Beautiful, responsive websites that convert visitors into customers and reflect your brand perfectly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-indigo-500 rounded"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Digital Marketing</h3>
            <p className="text-muted-foreground">
              Data-driven marketing strategies that increase your online visibility and drive qualified leads.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-pink-500 rounded"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Brand Strategy</h3>
            <p className="text-muted-foreground">
              Comprehensive brand development that sets you apart from competitors and resonates with your audience.
            </p>
          </div>
        </div>

        {/* Trust Section */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-8">Trusted by 500+ businesses worldwide</p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="w-24 h-8 bg-muted rounded"></div>
            <div className="w-24 h-8 bg-muted rounded"></div>
            <div className="w-24 h-8 bg-muted rounded"></div>
            <div className="w-24 h-8 bg-muted rounded"></div>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;

