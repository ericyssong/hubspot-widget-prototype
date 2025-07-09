
import { ChatWidget } from "@/components/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Grow Better with HubSpot
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Software that's powerful alone, and better together. HubSpot's connected platform 
            enables you to grow your traffic, convert more visitors, and run complete inbound 
            marketing campaigns at scale.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Get Started Free
            </button>
            <button className="border border-border px-8 py-3 rounded-lg font-medium hover:bg-accent transition-colors">
              Book a Demo
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-orange-500 rounded"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Marketing Hub</h3>
            <p className="text-muted-foreground">
              Attract visitors, convert leads, and prove ROI with HubSpot's marketing software.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Sales Hub</h3>
            <p className="text-muted-foreground">
              Connect with leads, book meetings, and close deals with HubSpot's sales CRM.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Service Hub</h3>
            <p className="text-muted-foreground">
              Support customers and grow your business with HubSpot's service software.
            </p>
          </div>
        </div>

        {/* Trust Section */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-8">Trusted by 100,000+ businesses worldwide</p>
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
