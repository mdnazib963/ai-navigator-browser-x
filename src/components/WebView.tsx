
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, RefreshIcon } from "lucide-react";

interface WebViewProps {
  url: string;
  onNavigate: (url: string) => void;
  isLoading: boolean;
}

const WebView: React.FC<WebViewProps> = ({ url, onNavigate, isLoading }) => {
  // Mock iframe content for demonstration
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-2 bg-card/50 backdrop-blur-sm border-b border-aibrowser-border">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            disabled={!url} 
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            disabled={!url}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            disabled={!url || isLoading}
            onClick={() => url && onNavigate(url)}
          >
            <RefreshIcon className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        
        <div className="flex-1 max-w-xl mx-4">
          <div className="bg-muted rounded-md px-3 py-1.5 text-xs truncate">
            {url || "No page loaded"}
          </div>
        </div>
      </div>
      
      <div className="flex-1 bg-white">
        {url ? (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            {/* In a real browser, this would be an iframe showing the actual website */}
            {/* For demo purposes, we show a placeholder */}
            <div className="text-center p-8 text-black">
              <h2 className="text-lg font-semibold mb-2">Demo Mode</h2>
              <p>
                In a real implementation, this area would display the website:<br/>
                <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">{url}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-black">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold mb-2">Ready to explore</h2>
            <p className="text-gray-600 max-w-md text-center">
              Use the AI search above to find what you're looking for
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebView;
