
import React, { useState } from "react";
import NavBar from "./NavBar";
import AISearch from "./AISearch";
import SearchResults, { SearchResult } from "./SearchResults";
import WebView from "./WebView";
import Suggestions, { Suggestion } from "./Suggestions";
import { searchWithAI } from "@/services/aiSearchService";
import { useToast } from "@/components/ui/use-toast";

const AIBrowser: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState<"search" | "web">("search");
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    setActiveView("search");
    setSearchResults([]);
    setSuggestions([]);
    
    try {
      const { results, suggestions } = await searchWithAI(query);
      setSearchResults(results);
      setSuggestions(suggestions);
    } catch (error) {
      console.error("Search failed:", error);
      toast({
        title: "Search Failed",
        description: "Unable to complete your search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectResult = (result: SearchResult) => {
    setCurrentUrl(result.url);
    setActiveView("web");
    setIsLoading(true);
    
    // Simulate page loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleSelectSuggestion = (suggestion: Suggestion) => {
    setCurrentUrl(suggestion.url);
    setActiveView("web");
    setIsLoading(true);
    
    // Simulate page loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleNavigate = (url: string) => {
    if (url === "home") {
      setCurrentUrl("");
      setActiveView("search");
      return;
    }
    
    setIsLoading(true);
    // Simulate page loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-aibrowser-background to-black text-aibrowser-text">
      <NavBar currentUrl={currentUrl} onNavigate={handleNavigate} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="p-6">
          <AISearch onSearch={handleSearch} isSearching={isSearching} />
        </div>
        
        <div className="flex-1 overflow-hidden">
          {activeView === "search" ? (
            <div className="flex h-full overflow-auto">
              <div className="flex-1 overflow-auto p-4">
                <SearchResults 
                  results={searchResults} 
                  onSelectResult={handleSelectResult} 
                  isLoading={isSearching}
                />
              </div>
              
              <div className="p-4 hidden md:block">
                <Suggestions 
                  suggestions={suggestions} 
                  searchQuery={searchQuery}
                  onSelect={handleSelectSuggestion} 
                />
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-hidden">
              <WebView 
                url={currentUrl} 
                onNavigate={handleNavigate}
                isLoading={isLoading} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIBrowser;
