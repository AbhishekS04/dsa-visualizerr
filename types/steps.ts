// // Generic step union used by the engine across categories

// export type Step =
//   | { type: "message"; text: string }

//   // array-based
//   | { type: "highlightArray"; indices: number[]; comparing?: number[] }
//   | { type: "swap"; i: number; j: number }
//   | { type: "setArray"; values: number[] }

//   // trees
//   | {
//       type: "treeLayout"
//       nodes: { id: string; label: string; x: number; y: number; highlight?: boolean }[]
//       edges: { x1: number; y1: number; x2: number; y2: number; highlight?: boolean }[]
//     }
//   | { type: "highlightTree"; nodes?: string[]; edges?: string[] }

//   // graphs
//   | {
//       type: "graphLayout"
//       nodes: { id: string; label: string; x: number; y: number; highlight?: boolean }[]
//       edges: {
//         from: string
//         to: string
//         x1: number
//         y1: number
//         x2: number
//         y2: number
//         weight?: number
//         highlight?: boolean
//       }[]
//     }
//   | { type: "highlightGraph"; nodes?: string[]; edges?: { from: string; to: string }[] }

//   // hashing
//   | { type: "hashSet"; size: number; slot: number; key: string | number; mode: "chain" | "open" }
//   | { type: "hashHighlight"; slot: number }

//   // dynamic programming
//   | { type: "dpSet"; i: number; j: number; value: number | string; rows: number; cols: number }
//   | { type: "dpHighlight"; cells: [number, number][] }
