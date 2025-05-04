
import React, { useState } from "react";
import NavBar from "./NavBar";
import AISearch from "./AISearch";
import SearchResults, { SearchResult } from "./SearchResults";
import WebView from "./WebView";
import Suggestions, { Suggestion } from "./Suggestions";
import { searchWithAI } from "@/services/aiSearchService";
import { useToast } from "@/components/ui/use-toast";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Tab {
  id: string;
  url: string;
  title: string;
}

const AIBrowser: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([{ id: "home", url: "", title: "New Tab" }]);
  const [activeTabId, setActiveTabId] = useState<string>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState<"search" | "web">("search");
  const { toast } = useToast();

  const currentTab = tabs.find(tab => tab.id === activeTabId) || tabs[0];

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
    // Update current tab with the selected result
    const updatedTabs = tabs.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, url: result.url, title: result.title || "Web Page" } 
        : tab
    );
    
    setTabs(updatedTabs);
    setActiveView("web");
    setIsLoading(true);
    
    // Simulate page loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleSelectSuggestion = (suggestion: Suggestion) => {
    // Update current tab with the selected suggestion
    const updatedTabs = tabs.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, url: suggestion.url, title: suggestion.title || "Web Page" } 
        : tab
    );
    
    setTabs(updatedTabs);
    setActiveView("web");
    setIsLoading(true);
    
    // Simulate page loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleNavigate = (url: string) => {
    if (url === "home") {
      // Update current tab to home state
      const updatedTabs = tabs.map(tab => 
        tab.id === activeTabId ? { ...tab, url: "", title: "New Tab" } : tab
      );
      
      setTabs(updatedTabs);
      setActiveView("search");
      return;
    }
    
    setIsLoading(true);
    // Simulate page loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const createNewTab = () => {
    const newTabId = `tab-${Date.now()}`;
    const newTab = { id: newTabId, url: "", title: "New Tab" };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTabId);
    setActiveView("search");
  };

  const closeTab = (tabId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (tabs.length === 1) {
      // Don't allow closing the last tab
      return;
    }
    
    const updatedTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(updatedTabs);
    
    // If we closed the active tab, switch to another tab
    if (tabId === activeTabId) {
      setActiveTabId(updatedTabs[0].id);
      setActiveView(updatedTabs[0].url ? "web" : "search");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-aibrowser-background to-black text-aibrowser-text">
      <NavBar currentUrl={currentTab.url} onNavigate={handleNavigate} />
      
      {/* Tab bar */}
      <div className="flex items-center bg-card/80 backdrop-blur-sm px-2 overflow-x-auto">
        {tabs.map(tab => (
          <div 
            key={tab.id}
            onClick={() => {
              setActiveTabId(tab.id);
              setActiveView(tab.url ? "web" : "search");
            }}
            className={`flex items-center px-4 py-1.5 border-b-2 cursor-pointer max-w-[200px] ${
              activeTabId === tab.id 
                ? "border-primary text-primary"
                : "border-transparent hover:bg-muted/20"
            }`}
          >
            <div className="truncate text-sm mr-2">{tab.title}</div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 opacity-60 hover:opacity-100"
              onClick={(e) => closeTab(tab.id, e)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 ml-1"
          onClick={createNewTab}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
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
                url={currentTab.url} 
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
