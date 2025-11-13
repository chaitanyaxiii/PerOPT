import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCapability } from '@/contexts/CapabilityContext';
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react';

const Home = () => {
  const { isSlimMode } = useCapability();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`py-20 px-4 ${isSlimMode ? 'bg-background' : 'bg-gradient-hero'}`}>
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className={`font-bold mb-6 ${isSlimMode ? 'text-3xl' : 'text-5xl md:text-6xl'} ${!isSlimMode && 'slide-up'}`}>
            Experience Adaptive Performance Shopping
          </h1>
          <p className={`text-muted-foreground mb-8 ${isSlimMode ? 'text-base' : 'text-lg md:text-xl'}`}>
            Our intelligent platform adapts to your device capabilities, delivering the perfect shopping experience whether you're on a budget phone or a high-end device.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/products">
              <Button size={isSlimMode ? 'default' : 'lg'} variant={isSlimMode ? 'outline' : 'default'}>
                Browse Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/admin">
              <Button size={isSlimMode ? 'default' : 'lg'} variant="outline">
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className={`text-center font-bold mb-12 ${isSlimMode ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
            Optimized for Every Device
          </h2>
          
          <div className={`grid ${isSlimMode ? 'grid-cols-1 gap-6' : 'md:grid-cols-3 gap-8'}`}>
            <div className={`p-6 rounded-lg border ${!isSlimMode && 'hover-scale bg-card'}`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${isSlimMode ? 'bg-muted' : 'bg-primary/10'}`}>
                <Zap className={`w-6 h-6 ${isSlimMode ? 'text-foreground' : 'text-primary'}`} />
              </div>
              <h3 className={`font-semibold mb-2 ${isSlimMode ? 'text-lg' : 'text-xl'}`}>
                Adaptive Performance
              </h3>
              <p className="text-muted-foreground">
                Automatically adjusts image quality, animations, and features based on your device capabilities.
              </p>
            </div>

            <div className={`p-6 rounded-lg border ${!isSlimMode && 'hover-scale bg-card'}`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${isSlimMode ? 'bg-muted' : 'bg-secondary/10'}`}>
                <Shield className={`w-6 h-6 ${isSlimMode ? 'text-foreground' : 'text-secondary'}`} />
              </div>
              <h3 className={`font-semibold mb-2 ${isSlimMode ? 'text-lg' : 'text-xl'}`}>
                Smart Caching
              </h3>
              <p className="text-muted-foreground">
                Service worker caching ensures fast load times and offline capability for better experience.
              </p>
            </div>

            <div className={`p-6 rounded-lg border ${!isSlimMode && 'hover-scale bg-card'}`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${isSlimMode ? 'bg-muted' : 'bg-accent/10'}`}>
                <TrendingUp className={`w-6 h-6 ${isSlimMode ? 'text-foreground' : 'text-accent'}`} />
              </div>
              <h3 className={`font-semibold mb-2 ${isSlimMode ? 'text-lg' : 'text-xl'}`}>
                Real-time Monitoring
              </h3>
              <p className="text-muted-foreground">
                Track device performance metrics and capability detection in real-time with our monitoring widget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 px-4 ${isSlimMode ? 'bg-muted' : 'bg-primary/5'}`}>
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className={`font-bold mb-4 ${isSlimMode ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
            Ready to Experience Adaptive Shopping?
          </h2>
          <p className={`text-muted-foreground mb-8 ${isSlimMode ? 'text-sm' : 'text-lg'}`}>
            Browse our collection of 100+ products, optimized for your device.
          </p>
          <Link to="/products">
            <Button size={isSlimMode ? 'default' : 'lg'} variant={isSlimMode ? 'outline' : 'default'}>
              Start Shopping Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
