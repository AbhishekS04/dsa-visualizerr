export type TopicInfo = {
  name: string
  slug: string
  tagline: string
  progress: number
  description: string
  algorithms: { name: string; slug: string; brief: string }[]
  externalUrl?: string
}

export const topics: TopicInfo[] = [
  {
    name: "Sorting",
    slug: "sorting",
    tagline: "6 algorithms to master",
    progress: 40,
    description: "Learn foundational sorting algorithms, their complexities, and where each shines in practice.",
    externalUrl: "https://sortingg-visualizer.vercel.app",
    algorithms: [
      { name: "Bubble Sort", slug: "bubble-sort", brief: "Simple adjacent swaps; O(n^2)" },
      { name: "Selection Sort", slug: "selection-sort", brief: "Pick min each pass; O(n^2)" },
      { name: "Insertion Sort", slug: "insertion-sort", brief: "Build sorted prefix; O(n^2)" },
      { name: "Merge Sort", slug: "merge-sort", brief: "Divide and conquer; O(n log n)" },
      { name: "Quick Sort", slug: "quick-sort", brief: "Partition-based; avg O(n log n)" },
      { name: "Heap Sort", slug: "heap-sort", brief: "Binary heap; O(n log n)" },
    ],
  },
  {
    name: "Searching",
    slug: "searching",
    tagline: "Binary, Ternary & more",
    progress: 25,
    description: "Explore linear and logarithmic search strategies across arrays and monotonic functions.",
    externalUrl: "https://your-searching-visualizer.com",
    algorithms: [
      { name: "Linear Search", slug: "linear-search", brief: "Scan sequentially" },
      { name: "Binary Search", slug: "binary-search", brief: "Halve search space each step" },
      { name: "Ternary Search", slug: "ternary-search", brief: "Unimodal optimization" },
      { name: "Jump/Exponential Search", slug: "jump-exponential", brief: "Skip-ahead variants" },
    ],
  },
  {
    name: "Trees",
    slug: "trees",
    tagline: "BST, AVL, Segment",
    progress: 10,
    description: "Master hierarchical data structures for efficient queries and updates.",
    externalUrl: "https://your-trees-visualizer.com",
    algorithms: [
      { name: "Tree Traversals", slug: "traversals", brief: "Inorder, Preorder, Postorder" },
      { name: "Binary Search Tree", slug: "bst", brief: "Insert/Search/Delete" },
      { name: "AVL/Rotations", slug: "avl", brief: "Self-balancing BST" },
      { name: "Segment Tree", slug: "segment-tree", brief: "Range queries and updates" },
      { name: "Trie", slug: "trie", brief: "Prefix tree for strings" },
    ],
  },
  {
    name: "Graphs",
    slug: "graphs",
    tagline: "BFS, DFS, Dijkstra",
    progress: 60,
    description: "Work with nodes and edges to solve traversal, path, and connectivity problems.",
    externalUrl: "https://your-graphs-visualizer.com",
    algorithms: [
      { name: "BFS / DFS", slug: "bfs-dfs", brief: "Traversals / Reachability" },
      { name: "Dijkstra", slug: "dijkstra", brief: "Shortest paths with non-negative weights" },
      { name: "Bellman–Ford", slug: "bellman-ford", brief: "Handles negative edges" },
      { name: "Floyd–Warshall", slug: "floyd-warshall", brief: "All-pairs shortest paths" },
      { name: "Kruskal / Prim", slug: "mst", brief: "Minimum Spanning Trees" },
      { name: "Topological Sort", slug: "topo", brief: "Order DAG nodes" },
    ],
  },
  {
    name: "Dynamic Programming",
    slug: "dynamic-programming",
    tagline: "Patterns & state transitions",
    progress: 20,
    description: "Transform exponential brute force into polynomial time with overlapping subproblems.",
    externalUrl: "https://your-dp-visualizer.com",
    algorithms: [
      { name: "Knapsack (0/1)", slug: "knapsack", brief: "Subset selection with capacity" },
      { name: "LCS / Edit Distance", slug: "lcs-edit", brief: "Classic string DP" },
      { name: "Coin Change", slug: "coin-change", brief: "Min coins / ways to make amount" },
      { name: "Grid Paths", slug: "grid-paths", brief: "Count / min-cost paths" },
    ],
  },
  {
    name: "Hashing",
    slug: "hashing",
    tagline: "Maps, Sets, Collisions",
    progress: 75,
    description: "Design hash-based structures with collision strategies and amortized guarantees.",
    externalUrl: "https://your-hashing-visualizer.com",
    algorithms: [
      { name: "Chaining", slug: "chaining", brief: "Linked buckets" },
      { name: "Open Addressing", slug: "open-addressing", brief: "Linear/Quadratic/Double" },
      { name: "Double Hashing", slug: "double-hashing", brief: "Two independent hashes" },
    ],
  },
]

// Map topic/algorithm slugs to Visualizer category+algo keys
const slugToCategory: Record<string, "sorting" | "searching" | "trees" | "graphs" | "hashing" | "dp"> = {
  sorting: "sorting",
  searching: "searching",
  trees: "trees",
  graphs: "graphs",
  "dynamic-programming": "dp",
  hashing: "hashing",
}

const algoSlugToKey: Record<string, string> = {
  // Sorting
  "bubble-sort": "bubble",
  "selection-sort": "selection",
  "insertion-sort": "insertion",
  "merge-sort": "merge",
  "quick-sort": "quick",
  "heap-sort": "heap",
  // Searching
  "linear-search": "linear",
  "binary-search": "binaryIter",
  "ternary-search": "ternary",
  "jump-exponential": "exponential",
  // Trees
  traversals: "traversal",
  bst: "bstInsert",
  avl: "avl",
  "segment-tree": "segment",
  trie: "trie",
  // Graphs
  "bfs-dfs": "bfs",
  dijkstra: "dijkstra",
  "bellman-ford": "bellmanFord",
  "floyd-warshall": "floydWarshall",
  mst: "kruskal",
  topo: "topo",
  // DP
  knapsack: "knapsack",
  "lcs-edit": "lcs",
  "coin-change": "coinChange",
  "grid-paths": "gridPaths",
  // Hashing
  chaining: "chaining",
  "open-addressing": "openAddressing",
  "double-hashing": "doubleHashing",
}

// Build query string for /visualizer
export function getVisualizerQueryFor(topicSlug: string, algoSlug?: string) {
  const category = slugToCategory[topicSlug] || "sorting"
  const algo = algoSlug ? algoSlugToKey[algoSlug] : undefined
  const params = new URLSearchParams()
  params.set("category", category)
  if (algo) params.set("algo", algo)
  return params.toString()
}

export function getTopic(slug: string) {
  return topics.find((t) => t.slug === slug)
}
