import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, User, BarChart3, Settings, BookOpen, FileText } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            {/* Replace text logo with SVG logo */}
            <div className="flex items-center">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 32 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-accent"
              >
                <path 
                  d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2Z" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  fill="none"
                />
                <path 
                  d="M16 7V16L22 20" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M8 13H12" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                />
                <path 
                  d="M8 19H10" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                />
              </svg>
              <div className="ml-2 flex flex-col">
                <span className="font-bold text-lg text-white leading-none">SHL</span>
                <span className="text-primary text-xs font-medium">Finder</span>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Rest of the navbar remains unchanged */}
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/" className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link to="/products" className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors">
            Products
          </Link>
          <Link to="/categories" className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors">
            Categories
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-foreground/70 hover:text-foreground"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search size={20} />
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-foreground/70 hover:text-foreground">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-background border-r border-border">
              <div className="flex flex-col space-y-4 mt-8">
                <Link to="/" className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-primary/10">
                  <BookOpen size={18} className="text-primary" />
                  <span>Home</span>
                </Link>
                <Link to="/dashboard" className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-primary/10">
                  <BarChart3 size={18} className="text-primary" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/products" className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-primary/10">
                  <FileText size={18} className="text-primary" />
                  <span>Products</span>
                </Link>
                <Link to="/categories" className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-primary/10">
                  <Settings size={18} className="text-primary" />
                  <span>Categories</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          
          <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground">
            <User size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;