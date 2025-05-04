
import React from "react";
import { Button } from "@/components/ui/button";
import { BrainIcon, Compass } from "lucide-react";

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  url: string;
}

interface SuggestionsProps {
  suggestions: Suggestion[];
  searchQuery: string;
  onSelect: (suggestion: Suggestion) => void;
}

const Suggestions: React.FC<SuggestionsProps> = ({ 
  suggestions, 
  searchQuery, 
  onSelect 
}) => {
  if (!searchQuery || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-xs lg:max-w-md">
      <div className="bg-card/80 backdrop-blur-md rounded-xl border border-aibrowser-border p-4 shadow-lg">
        <div className="flex items-center space-x-2 mb-4">
          <Compass className="h-5 w-5 text-aibrowser-accent" />
          <h3 className="font-medium">Related Suggestions</h3>
        </div>
        
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id}
              className="bg-black/10 rounded-lg p-3 hover:bg-black/20 transition-colors cursor-pointer"
              onClick={() => onSelect(suggestion)}
            >
              <h4 className="font-medium mb-1">{suggestion.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {suggestion.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-aibrowser-border flex items-center justify-center">
          <Button 
            variant="ghost" 
            size="sm"
            className="w-full text-xs text-muted-foreground"
          >
            <BrainIcon className="h-3 w-3 mr-2" />
            Powered by AI Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
