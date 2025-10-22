// External visualizer configuration
// Add your external visualizer URLs here

export const externalVisualizers: Record<string, string> = {
  // Sorting algorithms
  sorting: "https://sortingg-visualizer.vercel.app",
  
  // Searching algorithms  
  searching: "https://your-searching-visualizer.com",
  
  // Tree algorithms
  trees: "https://your-trees-visualizer.com",
  
  // Graph algorithms
  graphs: "https://your-graphs-visualizer.com",
  
  // Dynamic Programming
  "dynamic-programming": "https://your-dp-visualizer.com",
  
  // Hashing
  hashing: "https://your-hashing-visualizer.com",
}

// Function to get external URL for a topic
export function getExternalVisualizerUrl(topicSlug: string): string | undefined {
  return externalVisualizers[topicSlug]
}

// Function to check if a topic has an external visualizer
export function hasExternalVisualizer(topicSlug: string): boolean {
  return topicSlug in externalVisualizers
}

