
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrainIcon, ExternalLinkIcon, Star } from "lucide-react";

export interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
  confidence: "high" | "medium" | "low";
  relevanceScore: number;
  snippet?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  onSelectResult: (result: SearchResult) => void;
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  onSelectResult, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4 w-full max-w-4xl mx-auto mt-8 p-4">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="ai-results-card p-6 animate-pulse"
          >
            <div className="h-6 bg-white/10 rounded-md w-3/4 mb-4"></div>
            <div className="h-4 bg-white/10 rounded-md w-full mb-2"></div>
            <div className="h-4 bg-white/10 rounded-md w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto mt-8 p-4 animate-fade-in">
      <div className="flex items-center space-x-2 text-muted-foreground mb-2">
        <BrainIcon className="h-5 w-5 text-aibrowser-accent" />
        <p>AI analyzed results, sorted by relevance</p>
      </div>
      
      {results.map((result) => (
        <div 
          key={result.id}
          className="ai-results-card p-6 animate-slide-up"
          onClick={() => onSelectResult(result)}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-medium">{result.title}</h3>
            <Badge 
              variant="outline" 
              className={`
                ai-confidence-${result.confidence} text-white px-3
                flex items-center space-x-1 shadow-sm
              `}
            >
              <Star className="h-3 w-3 mr-1" fill="currentColor" />
              <span>{Math.round(result.relevanceScore * 100)}%</span>
            </Badge>
          </div>
          
          <p className="text-muted-foreground text-sm mb-3 truncate">
            {result.url}
          </p>
          
          <p className="mb-4">{result.description}</p>
          
          {result.snippet && (
            <div className="bg-black/20 p-3 rounded-md text-sm mb-4 border-l-2 border-aibrowser-accent">
              {result.snippet}
            </div>
          )}
          
          <Button 
            variant="outline"
            size="sm"
            className="text-aibrowser-accent hover:text-aibrowser-highlight hover:bg-aibrowser-accent/10 border-aibrowser-border"
          >
            <ExternalLinkIcon className="h-4 w-4 mr-2" />
            Visit Site
          </Button>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
