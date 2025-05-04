
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AISearchProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

const AISearch: React.FC<AISearchProps> = ({ onSearch, isSearching }) => {
  const [query, setQuery] = useState("");
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast({
        title: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }
    onSearch(query);
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="ai-search-bar px-4 py-3"
    >
      <Search className="h-5 w-5 text-muted-foreground mr-2" />
      <input
        type="text"
        placeholder="Search anything or ask AI to find it for you..."
        className="flex-1 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button 
        type="submit" 
        variant="ghost" 
        size="icon"
        className="ml-2 text-aibrowser-accent hover:text-aibrowser-highlight hover:bg-aibrowser-accent/10"
        disabled={isSearching}
      >
        <Zap className={`h-5 w-5 ${isSearching ? 'animate-pulse-subtle' : ''}`} />
      </Button>
    </form>
  );
};

export default AISearch;
