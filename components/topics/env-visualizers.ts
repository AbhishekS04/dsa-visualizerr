// Environment-based external visualizer configuration
// Set these in your .env.local file:
// NEXT_PUBLIC_EXTERNAL_SORTING_URL=https://your-sorting-visualizer.com
// NEXT_PUBLIC_EXTERNAL_SEARCHING_URL=https://your-searching-visualizer.com
// etc.

export const getExternalVisualizerUrl = (topicSlug: string): string | undefined => {
  const envKey = `NEXT_PUBLIC_EXTERNAL_${topicSlug.toUpperCase().replace('-', '_')}_URL`
  return process.env[envKey]
}

export const hasExternalVisualizer = (topicSlug: string): boolean => {
  return !!getExternalVisualizerUrl(topicSlug)
}

