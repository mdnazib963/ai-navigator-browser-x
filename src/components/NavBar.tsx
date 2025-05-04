
import React from "react";
import { Button } from "@/components/ui/button";
import { Home, Settings, Globe } from "lucide-react";

interface NavBarProps {
  currentUrl: string;
  onNavigate: (url: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ currentUrl, onNavigate }) => {
  return (
    <div className="flex items-center justify-between p-2 bg-card/80 backdrop-blur-md border-b border-aibrowser-border">
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onNavigate("home")}
        >
          <Home className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 max-w-xl mx-4">
        <div className="bg-muted rounded-md px-3 py-1.5 text-sm truncate">
          {currentUrl || "New Tab"}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="icon"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
