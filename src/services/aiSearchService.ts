
import { SearchResult } from "@/components/SearchResults";
import { Suggestion } from "@/components/Suggestions";

// Simulate AI-powered search with mock data
export const searchWithAI = async (query: string): Promise<{
  results: SearchResult[];
  suggestions: Suggestion[];
}> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate mock search results based on query
  const results: SearchResult[] = generateMockResults(query);
  
  // Generate mock suggestions based on query
  const suggestions: Suggestion[] = generateMockSuggestions(query);
  
  return { results, suggestions };
};

function generateMockResults(query: string): SearchResult[] {
  const queryLower = query.toLowerCase();
  let mockResults: SearchResult[] = [];
  
  // Different mock results based on query keywords
  if (queryLower.includes("recipe") || queryLower.includes("food") || queryLower.includes("cook")) {
    mockResults = [
      {
        id: "1",
        title: "15-Minute Easy Weeknight Meals",
        url: "https://example.com/quick-recipes",
        description: "Collection of the fastest and easiest recipes for busy weeknights. All recipes take 15 minutes or less.",
        confidence: "high",
        relevanceScore: 0.95,
        snippet: "Our most popular quick recipe is the 10-minute pasta with cherry tomatoes and basil."
      },
      {
        id: "2",
        title: "Beginner's Guide to Cooking",
        url: "https://example.com/cooking-guide",
        description: "Learn basic cooking skills, techniques, and essential recipes every home cook should know.",
        confidence: "medium",
        relevanceScore: 0.82
      },
      {
        id: "3",
        title: "Budget-Friendly Meal Planning",
        url: "https://example.com/budget-meals",
        description: "Save money while eating well with these affordable meal planning strategies and recipes.",
        confidence: "medium",
        relevanceScore: 0.78
      }
    ];
  } else if (queryLower.includes("tech") || queryLower.includes("gadget") || queryLower.includes("phone")) {
    mockResults = [
      {
        id: "1",
        title: "Latest Smartphone Comparison 2025",
        url: "https://example.com/smartphone-guide",
        description: "Detailed comparison of the newest flagship smartphones with features, specs, and buying advice.",
        confidence: "high",
        relevanceScore: 0.94,
        snippet: "The latest models offer significant improvements in battery life and AI processing capabilities."
      },
      {
        id: "2",
        title: "Tech Buying Guide: What You Need to Know",
        url: "https://example.com/tech-guide",
        description: "Expert advice on purchasing electronics and avoiding common pitfalls.",
        confidence: "high",
        relevanceScore: 0.87
      },
      {
        id: "3",
        title: "Affordable Tech That Performs Like Premium",
        url: "https://example.com/budget-tech",
        description: "Budget-friendly technology options that offer performance comparable to high-end alternatives.",
        confidence: "medium",
        relevanceScore: 0.76
      }
    ];
  } else if (queryLower.includes("travel") || queryLower.includes("vacation") || queryLower.includes("destination")) {
    mockResults = [
      {
        id: "1",
        title: "Hidden Gems: Off the Beaten Path Travel Destinations",
        url: "https://example.com/hidden-travel-gems",
        description: "Discover stunning locations that aren't overrun with tourists yet offer amazing experiences.",
        confidence: "high",
        relevanceScore: 0.96,
        snippet: "Consider visiting during shoulder seasons (April-May or September-October) for the best balance of good weather and fewer crowds."
      },
      {
        id: "2",
        title: "Budget Travel Guide 2025",
        url: "https://example.com/budget-travel",
        description: "How to plan an amazing vacation without breaking the bank.",
        confidence: "high",
        relevanceScore: 0.89
      },
      {
        id: "3",
        title: "Travel Planning Checklist",
        url: "https://example.com/travel-checklist",
        description: "Everything you need to prepare before your next trip.",
        confidence: "medium",
        relevanceScore: 0.75
      }
    ];
  } else {
    // Generic results for other queries
    mockResults = [
      {
        id: "1",
        title: `Best ${query} Guide for Beginners`,
        url: `https://example.com/${query.replace(/\s+/g, '-').toLowerCase()}-guide`,
        description: `Complete guide to understanding ${query} with expert tips and advice.`,
        confidence: "medium",
        relevanceScore: 0.85,
        snippet: `"${query}" has been trending with a 45% increase in searches this month.`
      },
      {
        id: "2",
        title: `Top 10 Resources for ${query}`,
        url: `https://example.com/${query.replace(/\s+/g, '-').toLowerCase()}-resources`,
        description: `Curated collection of the best materials to learn about ${query}.`,
        confidence: "medium",
        relevanceScore: 0.82
      },
      {
        id: "3",
        title: `${query} Community Forum`,
        url: `https://example.com/${query.replace(/\s+/g, '-').toLowerCase()}-community`,
        description: `Join the discussion with others interested in ${query}.`,
        confidence: "low",
        relevanceScore: 0.65
      }
    ];
  }
  
  return mockResults;
}

function generateMockSuggestions(query: string): Suggestion[] {
  const queryLower = query.toLowerCase();
  
  if (queryLower.includes("recipe") || queryLower.includes("food")) {
    return [
      {
        id: "s1",
        title: "Vegetarian Alternatives",
        description: "Plant-based versions of popular recipes",
        url: "https://example.com/vegetarian"
      },
      {
        id: "s2",
        title: "Quick Breakfast Ideas",
        description: "Start your day with these easy meals",
        url: "https://example.com/breakfast"
      },
      {
        id: "s3",
        title: "Meal Prep Sunday",
        description: "Plan your entire week of meals",
        url: "https://example.com/meal-prep"
      }
    ];
  } else if (queryLower.includes("tech") || queryLower.includes("phone")) {
    return [
      {
        id: "s1",
        title: "Best Budget Options",
        description: "Great technology under $500",
        url: "https://example.com/budget-tech"
      },
      {
        id: "s2",
        title: "Upcoming Releases",
        description: "Technology launching in the next 3 months",
        url: "https://example.com/upcoming-tech"
      },
      {
        id: "s3",
        title: "Tech Support Forums",
        description: "Get help with technical problems",
        url: "https://example.com/tech-support"
      }
    ];
  } else if (queryLower.includes("travel")) {
    return [
      {
        id: "s1",
        title: "Family-Friendly Destinations",
        description: "Places perfect for traveling with kids",
        url: "https://example.com/family-travel"
      },
      {
        id: "s2",
        title: "Adventure Travel",
        description: "For thrill seekers and outdoor enthusiasts",
        url: "https://example.com/adventure"
      },
      {
        id: "s3",
        title: "Travel on a Budget",
        description: "See the world without breaking the bank",
        url: "https://example.com/budget-travel"
      }
    ];
  }
  
  // Default suggestions
  return [
    {
      id: "s1",
      title: `${query} for Beginners`,
      description: `Start learning about ${query} from scratch`,
      url: `https://example.com/${query.replace(/\s+/g, '-').toLowerCase()}-beginners`
    },
    {
      id: "s2",
      title: `Advanced ${query} Techniques`,
      description: `Take your ${query} knowledge to the next level`,
      url: `https://example.com/${query.replace(/\s+/g, '-').toLowerCase()}-advanced`
    },
    {
      id: "s3",
      title: `${query} Community`,
      description: `Connect with others interested in ${query}`,
      url: `https://example.com/${query.replace(/\s+/g, '-').toLowerCase()}-community`
    }
  ];
}
