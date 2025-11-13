import { Link } from 'react-router-dom';
import { ShoppingCart, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useCapability } from '@/contexts/CapabilityContext';

export const Header = () => {
  const { totalItems } = useCart();
  const { isSlimMode } = useCapability();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className={`font-bold text-xl ${isSlimMode ? 'text-foreground' : 'text-primary'}`}>
            ⚡ PerformanceShop
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size={isSlimMode ? 'sm' : 'default'}>
              Home
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="ghost" size={isSlimMode ? 'sm' : 'default'}>
              Products
            </Button>
          </Link>
          <Link to="/admin">
            <Button variant="ghost" size={isSlimMode ? 'sm' : 'icon'}>
              <LayoutDashboard className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant={isSlimMode ? 'outline' : 'default'} size={isSlimMode ? 'sm' : 'default'} className="relative">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  variant={isSlimMode ? 'secondary' : 'default'}
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};
