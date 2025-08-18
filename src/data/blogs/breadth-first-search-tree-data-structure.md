---
title: "Breadth-First Search in Trees: Complete Guide with Implementation"
description: "Master BFS traversal in tree data structures with detailed explanations, implementations, and real-world applications. Learn level-order traversal, performance analysis, and practical examples."
date: "August 19, 2025"
publishedAt: "August 19, 2025"
readTime: "15 minutes read"
author: "Ilyas Bashirah"
tags: ["Algorithms", "Data Structures", "BFS", "Trees", "Graph Traversal", "Queue", "Level Order"]
image: "/images/blog/bfs-tree-cover.jpg"
slug: "breadth-first-search-tree-data-structure"
---

# Breadth-First Search in Trees: Complete Guide with Implementation

**Published:** August 19, 2025  
**Reading Time:** 15 minutes  
**Tags:** Algorithms, Data Structures, BFS, Trees, Graph Traversal, Queue

> **🚀 Enhanced with TypeScript & Execution Logs**: This comprehensive guide features TypeScript implementations with concrete data examples and detailed execution logs showing step-by-step processing for better algorithm understanding.

---

## Introduction

Breadth-First Search (BFS) is a fundamental tree and graph traversal algorithm that explores nodes level by level, making it one of the most intuitive and widely-used algorithms in computer science. In tree data structures, BFS is also known as **level-order traversal**.

Understanding BFS is crucial for solving a wide range of problems, from finding the shortest path in unweighted graphs to implementing features like autocomplete, social network analysis, and web crawling. This comprehensive guide will take you through everything you need to know about BFS in trees.

## What is Breadth-First Search?

Breadth-First Search is a traversal algorithm that visits nodes level by level, from left to right. It starts at the root node and explores all nodes at the current depth before moving to nodes at the next depth level.

### Key Characteristics:
- **Level-by-Level**: Visits all nodes at depth `d` before visiting nodes at depth `d+1`
- **Queue-Based**: Uses a queue data structure (FIFO - First In, First Out)
- **Complete**: Guarantees to visit every node in the tree
- **Optimal for Unweighted Paths**: Finds shortest path in terms of number of edges

## How BFS Works in Trees

The algorithm follows these steps:

1. **Initialize**: Create a queue and add the root node
2. **Process**: While queue is not empty:
   - Dequeue the front node
   - Process/visit the current node
   - Enqueue all children of the current node (left to right)
3. **Complete**: Continue until queue is empty

### Visual Example:

```
Tree Structure:
       A
      / \
     B   C
    / \   \
   D   E   F
  /
 G

BFS Traversal Order: A → B → C → D → E → F → G

Level 0: A
Level 1: B, C  
Level 2: D, E, F
Level 3: G
```

## Tree Node Implementation

Let's start with a basic tree node structure:

```typescript
// Binary Tree Node
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// N-ary Tree Node  
class NaryTreeNode {
    val: number;
    children: NaryTreeNode[];

    constructor(val: number, children: NaryTreeNode[] = []) {
        this.val = val;
        this.children = children;
    }
}

// Helper function to create sample binary tree
function createSampleTree(): TreeNode {
    /*
    Sample Tree Structure:
           1
          / \
         2   3
        / \   \
       4   5   6
      /
     7
    */
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);
    root.left.left.left = new TreeNode(7);
    return root;
}

// Helper function to create sample N-ary tree
function createSampleNaryTree(): NaryTreeNode {
    /*
    Sample N-ary Tree Structure:
           1
         / | \
        2  3  4
       / |    |
      5  6    7
    */
    const root = new NaryTreeNode(1);
    const child2 = new NaryTreeNode(2);
    const child3 = new NaryTreeNode(3);
    const child4 = new NaryTreeNode(4);
    
    child2.children = [new NaryTreeNode(5), new NaryTreeNode(6)];
    child4.children = [new NaryTreeNode(7)];
    
    root.children = [child2, child3, child4];
    return root;
}
```

## BFS Implementation

### Basic BFS Traversal

```typescript
function bfsTraversal(root: TreeNode | null): number[] {
    if (!root) return [];
    
    const result: number[] = [];
    const queue: TreeNode[] = [root];
    
    console.log("=== BFS Traversal Execution Log ===");
    console.log(`Starting with root: ${root.val}`);
    
    let step = 1;
    while (queue.length > 0) {
        const current = queue.shift()!; // Dequeue
        result.push(current.val);      // Process node
        
        console.log(`Step ${step}: Processing node ${current.val}`);
        console.log(`  Current queue: [${queue.map(n => n.val).join(', ')}]`);
        console.log(`  Result so far: [${result.join(', ')}]`);
        
        // Enqueue children
        if (current.left) {
            queue.push(current.left);
            console.log(`  Added left child: ${current.left.val}`);
        }
        if (current.right) {
            queue.push(current.right);
            console.log(`  Added right child: ${current.right.val}`);
        }
        
        console.log(`  Queue after additions: [${queue.map(n => n.val).join(', ')}]`);
        console.log('');
        step++;
    }
    
    console.log(`Final result: [${result.join(', ')}]`);
    return result;
}

// Example usage with sample data
const sampleTree = createSampleTree();
/*
Input Tree:
       1
      / \
     2   3
    / \   \
   4   5   6
  /
 7

Expected Output: [1, 2, 3, 4, 5, 6, 7]
*/
console.log("BFS Traversal Result:", bfsTraversal(sampleTree));
```

**Sample Execution Output:**
```
=== BFS Traversal Execution Log ===
Starting with root: 1
Step 1: Processing node 1
  Current queue: []
  Result so far: [1]
  Added left child: 2
  Added right child: 3
  Queue after additions: [2, 3]

Step 2: Processing node 2
  Current queue: [3]
  Result so far: [1, 2]
  Added left child: 4
  Added right child: 5
  Queue after additions: [3, 4, 5]

Step 3: Processing node 3
  Current queue: [4, 5]
  Result so far: [1, 2, 3]
  Added right child: 6
  Queue after additions: [4, 5, 6]

Step 4: Processing node 4
  Current queue: [5, 6]
  Result so far: [1, 2, 3, 4]
  Added left child: 7
  Queue after additions: [5, 6, 7]

Step 5: Processing node 5
  Current queue: [6, 7]
  Result so far: [1, 2, 3, 4, 5]
  Queue after additions: [6, 7]

Step 6: Processing node 6
  Current queue: [7]
  Result so far: [1, 2, 3, 4, 5, 6]
  Queue after additions: [7]

Step 7: Processing node 7
  Current queue: []
  Result so far: [1, 2, 3, 4, 5, 6, 7]
  Queue after additions: []

Final result: [1, 2, 3, 4, 5, 6, 7]
```

### Level-Order with Level Information

**Sample Data:**
```
Input Tree:
       5
      / \
     3   8
    / \   \
   2   4   9
  /
 1

Expected Output: [[5], [3, 8], [2, 4, 9], [1]]
```

```typescript
interface QueueItem {
    node: TreeNode;
    level: number;
}

function bfsWithLevels(root: TreeNode | null): number[][] {
    if (!root) return [];
    
    const result: number[][] = [];
    const queue: QueueItem[] = [{node: root, level: 0}];
    
    console.log("=== BFS With Levels Execution Log ===");
    console.log(`Input Tree Root: ${root.val}`);
    
    while (queue.length > 0) {
        const {node, level} = queue.shift()!;
        
        console.log(`\nProcessing node ${node.val} at level ${level}`);
        
        // Initialize level array if needed
        if (!result[level]) {
            result[level] = [];
            console.log(`  Created new level array for level ${level}`);
        }
        
        result[level].push(node.val);
        console.log(`  Added ${node.val} to level ${level}: [${result[level].join(', ')}]`);
        
        // Add children with incremented level
        if (node.left) {
            queue.push({node: node.left, level: level + 1});
            console.log(`  Enqueued left child ${node.left.val} for level ${level + 1}`);
        }
        if (node.right) {
            queue.push({node: node.right, level: level + 1});
            console.log(`  Enqueued right child ${node.right.val} for level ${level + 1}`);
        }
        
        console.log(`  Current queue: [${queue.map(item => `${item.node.val}(L${item.level})`).join(', ')}]`);
        console.log(`  Result so far: [${result.map(level => `[${level.join(', ')}]`).join(', ')}]`);
    }
    
    console.log(`\nFinal result: [${result.map(level => `[${level.join(', ')}]`).join(', ')}]`);
    return result;
}

// Sample data creation
function createLevelsSample(): TreeNode {
    const root = new TreeNode(5);
    root.left = new TreeNode(3);
    root.right = new TreeNode(8);
    root.left.left = new TreeNode(2);
    root.left.right = new TreeNode(4);
    root.right.right = new TreeNode(9);
    root.left.left.left = new TreeNode(1);
    return root;
}

const levelsTree = createLevelsSample();
console.log("BFS With Levels Result:", bfsWithLevels(levelsTree));
```

**Sample Execution Output:**
```
=== BFS With Levels Execution Log ===
Input Tree Root: 5

Processing node 5 at level 0
  Created new level array for level 0
  Added 5 to level 0: [5]
  Enqueued left child 3 for level 1
  Enqueued right child 8 for level 1
  Current queue: [3(L1), 8(L1)]
  Result so far: [[5]]

Processing node 3 at level 1
  Created new level array for level 1
  Added 3 to level 1: [3]
  Enqueued left child 2 for level 2
  Enqueued right child 4 for level 2
  Current queue: [8(L1), 2(L2), 4(L2)]
  Result so far: [[5], [3]]

Processing node 8 at level 1
  Added 8 to level 1: [3, 8]
  Enqueued right child 9 for level 2
  Current queue: [2(L2), 4(L2), 9(L2)]
  Result so far: [[5], [3, 8]]

Processing node 2 at level 2
  Created new level array for level 2
  Added 2 to level 2: [2]
  Enqueued left child 1 for level 3
  Current queue: [4(L2), 9(L2), 1(L3)]
  Result so far: [[5], [3, 8], [2]]

Processing node 4 at level 2
  Added 4 to level 2: [2, 4]
  Current queue: [9(L2), 1(L3)]
  Result so far: [[5], [3, 8], [2, 4]]

Processing node 9 at level 2
  Added 9 to level 2: [2, 4, 9]
  Current queue: [1(L3)]
  Result so far: [[5], [3, 8], [2, 4, 9]]

Processing node 1 at level 3
  Created new level array for level 3
  Added 1 to level 3: [1]
  Current queue: []
  Result so far: [[5], [3, 8], [2, 4, 9], [1]]

Final result: [[5], [3, 8], [2, 4, 9], [1]]
```

### Optimized Level-Order Traversal

**Sample Data:**
```
Input Tree:
       10
      /  \
     5    15
    / \     \
   3   7    20
  /   / \
 1   6   8

Expected Output: [[10], [5, 15], [3, 7, 20], [1, 6, 8]]
```

```typescript
function levelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];
    
    const result: number[][] = [];
    const queue: TreeNode[] = [root];
    
    console.log("=== Optimized Level-Order Execution Log ===");
    console.log(`Input Tree Root: ${root.val}`);
    
    let levelNum = 0;
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel: number[] = [];
        
        console.log(`\nLevel ${levelNum}: Processing ${levelSize} nodes`);
        console.log(`  Initial queue: [${queue.map(n => n.val).join(', ')}]`);
        
        // Process all nodes at current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            currentLevel.push(node.val);
            
            console.log(`  Step ${i + 1}/${levelSize}: Processing ${node.val}`);
            console.log(`    Current level array: [${currentLevel.join(', ')}]`);
            
            if (node.left) {
                queue.push(node.left);
                console.log(`    Enqueued left child: ${node.left.val}`);
            }
            if (node.right) {
                queue.push(node.right);
                console.log(`    Enqueued right child: ${node.right.val}`);
            }
            
            console.log(`    Queue after adding children: [${queue.map(n => n.val).join(', ')}]`);
        }
        
        result.push(currentLevel);
        console.log(`  Level ${levelNum} complete: [${currentLevel.join(', ')}]`);
        console.log(`  Queue for next level: [${queue.map(n => n.val).join(', ')}]`);
        
        levelNum++;
    }
    
    console.log(`\nFinal optimized result: [${result.map(level => `[${level.join(', ')}]`).join(', ')}]`);
    return result;
}

// Sample data creation
function createOptimizedSample(): TreeNode {
    const root = new TreeNode(10);
    root.left = new TreeNode(5);
    root.right = new TreeNode(15);
    root.left.left = new TreeNode(3);
    root.left.right = new TreeNode(7);
    root.right.right = new TreeNode(20);
    root.left.left.left = new TreeNode(1);
    root.left.right.left = new TreeNode(6);
    root.left.right.right = new TreeNode(8);
    return root;
}

const optimizedTree = createOptimizedSample();
console.log("Optimized Level Order Result:", levelOrder(optimizedTree));
```

**Sample Execution Output:**
```
=== Optimized Level-Order Execution Log ===
Input Tree Root: 10

Level 0: Processing 1 nodes
  Initial queue: [10]
  Step 1/1: Processing 10
    Current level array: [10]
    Enqueued left child: 5
    Enqueued right child: 15
    Queue after adding children: [5, 15]
  Level 0 complete: [10]
  Queue for next level: [5, 15]

Level 1: Processing 2 nodes
  Initial queue: [5, 15]
  Step 1/2: Processing 5
    Current level array: [5]
    Enqueued left child: 3
    Enqueued right child: 7
    Queue after adding children: [15, 3, 7]
  Step 2/2: Processing 15
    Current level array: [5, 15]
    Enqueued right child: 20
    Queue after adding children: [3, 7, 20]
  Level 1 complete: [5, 15]
  Queue for next level: [3, 7, 20]

Level 2: Processing 3 nodes
  Initial queue: [3, 7, 20]
  Step 1/3: Processing 3
    Current level array: [3]
    Enqueued left child: 1
    Queue after adding children: [7, 20, 1]
  Step 2/3: Processing 7
    Current level array: [3, 7]
    Enqueued left child: 6
    Enqueued right child: 8
    Queue after adding children: [20, 1, 6, 8]
  Step 3/3: Processing 20
    Current level array: [3, 7, 20]
    Queue after adding children: [1, 6, 8]
  Level 2 complete: [3, 7, 20]
  Queue for next level: [1, 6, 8]

Level 3: Processing 3 nodes
  Initial queue: [1, 6, 8]
  Step 1/3: Processing 1
    Current level array: [1]
    Queue after adding children: [6, 8]
  Step 2/3: Processing 6
    Current level array: [1, 6]
    Queue after adding children: [8]
  Step 3/3: Processing 8
    Current level array: [1, 6, 8]
    Queue after adding children: []
  Level 3 complete: [1, 6, 8]
  Queue for next level: []

Final optimized result: [[10], [5, 15], [3, 7, 20], [1, 6, 8]]
```

### BFS for N-ary Trees

**Sample Data:**
```
Input N-ary Tree:
       1
    /  |  \
   2   3   4
  / \      |
 5   6     7

Expected Output: [1, 2, 3, 4, 5, 6, 7]
```

```typescript
function naryBFS(root: NaryTreeNode | null): number[] {
    if (!root) return [];
    
    const result: number[] = [];
    const queue: NaryTreeNode[] = [root];
    
    console.log("=== N-ary BFS Execution Log ===");
    console.log(`Input Tree Root: ${root.val}`);
    console.log(`Root has ${root.children.length} children`);
    
    let step = 1;
    while (queue.length > 0) {
        const current = queue.shift()!;
        result.push(current.val);
        
        console.log(`\nStep ${step}: Processing node ${current.val}`);
        console.log(`  Current queue: [${queue.map(n => n.val).join(', ')}]`);
        console.log(`  Result so far: [${result.join(', ')}]`);
        console.log(`  Node ${current.val} has ${current.children.length} children`);
        
        // Add all children to queue
        for (let i = 0; i < current.children.length; i++) {
            const child = current.children[i];
            queue.push(child);
            console.log(`    Added child ${i + 1}: ${child.val}`);
        }
        
        console.log(`  Queue after adding children: [${queue.map(n => n.val).join(', ')}]`);
        step++;
    }
    
    console.log(`\nFinal N-ary BFS result: [${result.join(', ')}]`);
    return result;
}

// Sample N-ary tree creation
function createNaryTree(): NaryTreeNode {
    const root = new NaryTreeNode(1);
    const node2 = new NaryTreeNode(2);
    const node3 = new NaryTreeNode(3);
    const node4 = new NaryTreeNode(4);
    const node5 = new NaryTreeNode(5);
    const node6 = new NaryTreeNode(6);
    const node7 = new NaryTreeNode(7);
    
    root.children = [node2, node3, node4];
    node2.children = [node5, node6];
    node4.children = [node7];
    
    return root;
}

const naryTree = createNaryTree();
console.log("N-ary BFS Result:", naryBFS(naryTree));
```

**Sample Execution Output:**
```
=== N-ary BFS Execution Log ===
Input Tree Root: 1
Root has 3 children

Step 1: Processing node 1
  Current queue: []
  Result so far: [1]
  Node 1 has 3 children
    Added child 1: 2
    Added child 2: 3
    Added child 3: 4
  Queue after adding children: [2, 3, 4]

Step 2: Processing node 2
  Current queue: [3, 4]
  Result so far: [1, 2]
  Node 2 has 2 children
    Added child 1: 5
    Added child 2: 6
  Queue after adding children: [3, 4, 5, 6]

Step 3: Processing node 3
  Current queue: [4, 5, 6]
  Result so far: [1, 2, 3]
  Node 3 has 0 children
  Queue after adding children: [4, 5, 6]

Step 4: Processing node 4
  Current queue: [5, 6]
  Result so far: [1, 2, 3, 4]
  Node 4 has 1 children
    Added child 1: 7
  Queue after adding children: [5, 6, 7]

Step 5: Processing node 5
  Current queue: [6, 7]
  Result so far: [1, 2, 3, 4, 5]
  Node 5 has 0 children
  Queue after adding children: [6, 7]

Step 6: Processing node 6
  Current queue: [7]
  Result so far: [1, 2, 3, 4, 5, 6]
  Node 6 has 0 children
  Queue after adding children: [7]

Step 7: Processing node 7
  Current queue: []
  Result so far: [1, 2, 3, 4, 5, 6, 7]
  Node 7 has 0 children
  Queue after adding children: []

Final N-ary BFS result: [1, 2, 3, 4, 5, 6, 7]
```

## Advanced BFS Implementations

### BFS with Custom Processing

**Sample Data:**
```
Input Tree:
       12
      /  \
     7    18
    / \   / \
   3  10 15  22
  /
 1

Input: Only process even values
Expected Output: [12, 10, 18, 22]
```

```typescript
type ProcessorFunction = (node: TreeNode) => number | null;

function bfsWithProcessor(root: TreeNode | null, processor: ProcessorFunction): number[] {
    if (!root) return [];
    
    const result: number[] = [];
    const queue: TreeNode[] = [root];
    
    console.log("=== BFS with Custom Processing Execution Log ===");
    console.log(`Input Tree Root: ${root.val}`);
    console.log("Processing Rule: Only include even values");
    
    let step = 1;
    while (queue.length > 0) {
        const current = queue.shift()!;
        
        console.log(`\nStep ${step}: Processing node ${current.val}`);
        
        // Apply custom processing function
        const processedValue = processor(current);
        console.log(`  Processor result for ${current.val}: ${processedValue}`);
        
        if (processedValue !== null) {
            result.push(processedValue);
            console.log(`  Added ${processedValue} to result`);
        } else {
            console.log(`  Skipped ${current.val} (doesn't meet criteria)`);
        }
        
        console.log(`  Current result: [${result.join(', ')}]`);
        console.log(`  Queue before adding children: [${queue.map(n => n.val).join(', ')}]`);
        
        if (current.left) {
            queue.push(current.left);
            console.log(`  Added left child: ${current.left.val}`);
        }
        if (current.right) {
            queue.push(current.right);
            console.log(`  Added right child: ${current.right.val}`);
        }
        
        console.log(`  Queue after adding children: [${queue.map(n => n.val).join(', ')}]`);
        step++;
    }
    
    console.log(`\nFinal processed result: [${result.join(', ')}]`);
    return result;
}

// Example processor: Only process even values
const evenProcessor: ProcessorFunction = (node: TreeNode): number | null => {
    return node.val % 2 === 0 ? node.val : null;
};

// Sample data creation
function createProcessorSample(): TreeNode {
    const root = new TreeNode(12);
    root.left = new TreeNode(7);
    root.right = new TreeNode(18);
    root.left.left = new TreeNode(3);
    root.left.right = new TreeNode(10);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(22);
    root.left.left.left = new TreeNode(1);
    return root;
}

const processorTree = createProcessorSample();
console.log("BFS with Even Processor Result:", bfsWithProcessor(processorTree, evenProcessor));
```

**Sample Execution Output:**
```
=== BFS with Custom Processing Execution Log ===
Input Tree Root: 12
Processing Rule: Only include even values

Step 1: Processing node 12
  Processor result for 12: 12
  Added 12 to result
  Current result: [12]
  Queue before adding children: []
  Added left child: 7
  Added right child: 18
  Queue after adding children: [7, 18]

Step 2: Processing node 7
  Processor result for 7: null
  Skipped 7 (doesn't meet criteria)
  Current result: [12]
  Queue before adding children: [18]
  Added left child: 3
  Added right child: 10
  Queue after adding children: [18, 3, 10]

Step 3: Processing node 18
  Processor result for 18: 18
  Added 18 to result
  Current result: [12, 18]
  Queue before adding children: [3, 10]
  Added left child: 15
  Added right child: 22
  Queue after adding children: [3, 10, 15, 22]

Step 4: Processing node 3
  Processor result for 3: null
  Skipped 3 (doesn't meet criteria)
  Current result: [12, 18]
  Queue before adding children: [10, 15, 22]
  Added left child: 1
  Queue after adding children: [10, 15, 22, 1]

Step 5: Processing node 10
  Processor result for 10: 10
  Added 10 to result
  Current result: [12, 18, 10]
  Queue before adding children: [15, 22, 1]
  Queue after adding children: [15, 22, 1]

Step 6: Processing node 15
  Processor result for 15: null
  Skipped 15 (doesn't meet criteria)
  Current result: [12, 18, 10]
  Queue before adding children: [22, 1]
  Queue after adding children: [22, 1]

Step 7: Processing node 22
  Processor result for 22: 22
  Added 22 to result
  Current result: [12, 18, 10, 22]
  Queue before adding children: [1]
  Queue after adding children: [1]

Step 8: Processing node 1
  Processor result for 1: null
  Skipped 1 (doesn't meet criteria)
  Current result: [12, 18, 10, 22]
  Queue before adding children: []
  Queue after adding children: []

Final processed result: [12, 18, 10, 22]
```

### BFS with Path Tracking

**Sample Data:**
```
Input Tree:
       1
      / \
     2   3
    / \   \
   4   5   6

Expected Output (Root-to-leaf paths): 
[[1, 2, 4], [1, 2, 5], [1, 3, 6]]
```

```typescript
interface PathQueueItem {
    node: TreeNode;
    path: number[];
}

function bfsWithPaths(root: TreeNode | null): number[][] {
    if (!root) return [];
    
    const result: number[][] = [];
    const queue: PathQueueItem[] = [{node: root, path: [root.val]}];
    
    console.log("=== BFS with Path Tracking Execution Log ===");
    console.log(`Input Tree Root: ${root.val}`);
    console.log("Tracking all root-to-leaf paths");
    
    let step = 1;
    while (queue.length > 0) {
        const {node, path} = queue.shift()!;
        
        console.log(`\nStep ${step}: Processing node ${node.val}`);
        console.log(`  Current path: [${path.join(' → ')}]`);
        console.log(`  Is leaf: ${!node.left && !node.right}`);
        
        // If leaf node, add path to result
        if (!node.left && !node.right) {
            result.push([...path]);
            console.log(`  ✓ Leaf found! Added path to result: [${path.join(', ')}]`);
            console.log(`  Current result: [${result.map(p => `[${p.join(', ')}]`).join(', ')}]`);
        } else {
            console.log(`  → Internal node, continuing traversal`);
        }
        
        console.log(`  Queue before adding children: [${queue.map(item => `${item.node.val}(${item.path.join('→')})`).join(', ')}]`);
        
        if (node.left) {
            const newPath = [...path, node.left.val];
            queue.push({
                node: node.left,
                path: newPath
            });
            console.log(`  Added left child: ${node.left.val} with path [${newPath.join(' → ')}]`);
        }
        
        if (node.right) {
            const newPath = [...path, node.right.val];
            queue.push({
                node: node.right,
                path: newPath
            });
            console.log(`  Added right child: ${node.right.val} with path [${newPath.join(' → ')}]`);
        }
        
        console.log(`  Queue after adding children: [${queue.map(item => `${item.node.val}(${item.path.join('→')})`).join(', ')}]`);
        step++;
    }
    
    console.log(`\nAll root-to-leaf paths found: ${result.length} paths`);
    result.forEach((path, index) => {
        console.log(`  Path ${index + 1}: [${path.join(' → ')}]`);
    });
    
    return result;
}

// Sample data creation for path tracking
function createPathTrackingSample(): TreeNode {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);
    return root;
}

const pathTree = createPathTrackingSample();
console.log("BFS Path Tracking Result:", bfsWithPaths(pathTree));
```

**Sample Execution Output:**
```
=== BFS with Path Tracking Execution Log ===
Input Tree Root: 1
Tracking all root-to-leaf paths

Step 1: Processing node 1
  Current path: [1]
  Is leaf: false
  → Internal node, continuing traversal
  Queue before adding children: []
  Added left child: 2 with path [1 → 2]
  Added right child: 3 with path [1 → 3]
  Queue after adding children: [2(1→2), 3(1→3)]

Step 2: Processing node 2
  Current path: [1 → 2]
  Is leaf: false
  → Internal node, continuing traversal
  Queue before adding children: [3(1→3)]
  Added left child: 4 with path [1 → 2 → 4]
  Added right child: 5 with path [1 → 2 → 5]
  Queue after adding children: [3(1→3), 4(1→2→4), 5(1→2→5)]

Step 3: Processing node 3
  Current path: [1 → 3]
  Is leaf: false
  → Internal node, continuing traversal
  Queue before adding children: [4(1→2→4), 5(1→2→5)]
  Added right child: 6 with path [1 → 3 → 6]
  Queue after adding children: [4(1→2→4), 5(1→2→5), 6(1→3→6)]

Step 4: Processing node 4
  Current path: [1 → 2 → 4]
  Is leaf: true
  ✓ Leaf found! Added path to result: [1, 2, 4]
  Current result: [[1, 2, 4]]
  Queue before adding children: [5(1→2→5), 6(1→3→6)]
  Queue after adding children: [5(1→2→5), 6(1→3→6)]

Step 5: Processing node 5
  Current path: [1 → 2 → 5]
  Is leaf: true
  ✓ Leaf found! Added path to result: [1, 2, 5]
  Current result: [[1, 2, 4], [1, 2, 5]]
  Queue before adding children: [6(1→3→6)]
  Queue after adding children: [6(1→3→6)]

Step 6: Processing node 6
  Current path: [1 → 3 → 6]
  Is leaf: true
  ✓ Leaf found! Added path to result: [1, 3, 6]
  Current result: [[1, 2, 4], [1, 2, 5], [1, 3, 6]]
  Queue before adding children: []
  Queue after adding children: []

All root-to-leaf paths found: 3 paths
  Path 1: [1 → 2 → 4]
  Path 2: [1 → 2 → 5]
  Path 3: [1 → 3 → 6]
```

### TypeScript Implementation with Generics

```typescript
interface TreeNode<T> {
    val: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
}

function bfsGeneric<T>(root: TreeNode<T> | null): T[] {
    if (!root) return [];
    
    const result: T[] = [];
    const queue: TreeNode<T>[] = [root];
    
    while (queue.length > 0) {
        const current = queue.shift()!;
        result.push(current.val);
        
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
    }
    
    return result;
}

// Usage with different types
const stringTree: TreeNode<string> = {
    val: "A",
    left: { val: "B", left: null, right: null },
    right: { val: "C", left: null, right: null }
};

console.log(bfsGeneric(stringTree)); // ["A", "B", "C"]
```

## Performance Analysis

### Time Complexity

**All Cases: O(n)**
- Must visit every node exactly once
- Each node is enqueued and dequeued exactly once
- Processing each node takes O(1) time

### Space Complexity

**Worst Case: O(w)** where w is the maximum width of the tree
- Queue stores nodes level by level
- Maximum queue size equals maximum width
- For a complete binary tree: O(n/2) = O(n) in the worst case
- For a balanced tree: O(2^h) where h is height

### Detailed Space Analysis

```javascript
function analyzeBFSSpace(root) {
    if (!root) return { maxQueueSize: 0, totalNodes: 0 };
    
    let maxQueueSize = 0;
    let totalNodes = 0;
    const queue = [root];
    
    while (queue.length > 0) {
        maxQueueSize = Math.max(maxQueueSize, queue.length);
        
        const current = queue.shift();
        totalNodes++;
        
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
    }
    
    return { maxQueueSize, totalNodes };
}

// Example analysis
const analysis = analyzeBFSSpace(tree);
console.log(analysis); // { maxQueueSize: 3, totalNodes: 7 }
```

## Practical Applications

### 1. Finding Tree Level Width

```javascript
function findLevelWidths(root) {
    if (!root) return [];
    
    const widths = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        widths.push(levelSize);
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return widths;
}

console.log(findLevelWidths(tree)); // [1, 2, 3, 1]
```

### 2. Finding Minimum Depth

**Problem:** Find the minimum depth of a binary tree (shortest path from root to any leaf node).

**Sample Data:**
```
Input Tree:
       5
      / \
     3   8
      \   \
       4   9
      /
     2

Leaf nodes: 2, 9
Minimum depth: 3 (path: 5 → 3 → 4 → 2)
Expected Output: 3
```

```typescript
interface DepthQueueItem {
    node: TreeNode;
    depth: number;
}

function minDepth(root: TreeNode | null): number {
    if (!root) return 0;
    
    const queue: DepthQueueItem[] = [{node: root, depth: 1}];
    
    console.log("=== Minimum Depth Search Execution Log ===");
    console.log(`Input Tree Root: ${root.val}`);
    console.log("Finding first leaf node (BFS guarantees minimum depth)");
    
    let step = 1;
    while (queue.length > 0) {
        const {node, depth} = queue.shift()!;
        
        console.log(`\nStep ${step}: Processing node ${node.val} at depth ${depth}`);
        console.log(`  Is leaf? ${!node.left && !node.right}`);
        
        // First leaf node found gives minimum depth (BFS guarantees this)
        if (!node.left && !node.right) {
            console.log(`  ✓ LEAF FOUND! Minimum depth is ${depth}`);
            console.log(`  Path length from root to this leaf: ${depth}`);
            return depth;
        }
        
        console.log(`  → Internal node, adding children to queue`);
        console.log(`  Queue before adding: [${queue.map(item => `${item.node.val}(d${item.depth})`).join(', ')}]`);
        
        if (node.left) {
            queue.push({node: node.left, depth: depth + 1});
            console.log(`    Added left child: ${node.left.val} at depth ${depth + 1}`);
        }
        if (node.right) {
            queue.push({node: node.right, depth: depth + 1});
            console.log(`    Added right child: ${node.right.val} at depth ${depth + 1}`);
        }
        
        console.log(`  Queue after adding: [${queue.map(item => `${item.node.val}(d${item.depth})`).join(', ')}]`);
        step++;
    }
    
    return 0;
}

// Sample data for minimum depth
function createMinDepthSample(): TreeNode {
    const root = new TreeNode(5);
    root.left = new TreeNode(3);
    root.right = new TreeNode(8);
    root.left.right = new TreeNode(4);
    root.right.right = new TreeNode(9);
    root.left.right.left = new TreeNode(2);
    return root;
}

const minDepthTree = createMinDepthSample();
console.log("Minimum Depth Result:", minDepth(minDepthTree));
```

**Sample Execution Output:**
```
=== Minimum Depth Search Execution Log ===
Input Tree Root: 5
Finding first leaf node (BFS guarantees minimum depth)

Step 1: Processing node 5 at depth 1
  Is leaf? false
  → Internal node, adding children to queue
  Queue before adding: []
    Added left child: 3 at depth 2
    Added right child: 8 at depth 2
  Queue after adding: [3(d2), 8(d2)]

Step 2: Processing node 3 at depth 2
  Is leaf? false
  → Internal node, adding children to queue
  Queue before adding: [8(d2)]
    Added right child: 4 at depth 3
  Queue after adding: [8(d2), 4(d3)]

Step 3: Processing node 8 at depth 2
  Is leaf? false
  → Internal node, adding children to queue
  Queue before adding: [4(d3)]
    Added right child: 9 at depth 3
  Queue after adding: [4(d3), 9(d3)]

Step 4: Processing node 4 at depth 3
  Is leaf? false
  → Internal node, adding children to queue
  Queue before adding: [9(d3)]
    Added left child: 2 at depth 4
  Queue after adding: [9(d3), 2(d4)]

Step 5: Processing node 9 at depth 3
  Is leaf? true
  ✓ LEAF FOUND! Minimum depth is 3
  Path length from root to this leaf: 3
```

### 3. Level Order Zigzag Traversal

**Problem:** Given a binary tree, return the zigzag level order traversal (alternating left-to-right and right-to-left for each level).

**Sample Data:**
```
Input Tree:
       1
      / \
     2   3
    / \   \
   4   5   6

Expected Output: [[1], [3, 2], [4, 5, 6]]
```

```typescript
function zigzagLevelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];
    
    const result: number[][] = [];
    const queue: TreeNode[] = [root];
    let leftToRight = true;
    
    console.log("=== Zigzag Level Order Execution Log ===");
    console.log(`Input Tree Root: ${root.val}`);
    console.log("Direction pattern: Left→Right, Right→Left, Left→Right, ...");
    
    let level = 0;
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel: number[] = [];
        
        console.log(`\nLevel ${level}: Processing ${levelSize} nodes`);
        console.log(`  Direction: ${leftToRight ? 'Left → Right' : 'Right → Left'}`);
        console.log(`  Queue: [${queue.map(n => n.val).join(', ')}]`);
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            
            console.log(`  Processing node ${node.val} (${i + 1}/${levelSize})`);
            
            if (leftToRight) {
                currentLevel.push(node.val);
                console.log(`    Added to end: [${currentLevel.join(', ')}]`);
            } else {
                currentLevel.unshift(node.val); // Add to front
                console.log(`    Added to front: [${currentLevel.join(', ')}]`);
            }
            
            if (node.left) {
                queue.push(node.left);
                console.log(`    Enqueued left child: ${node.left.val}`);
            }
            if (node.right) {
                queue.push(node.right);
                console.log(`    Enqueued right child: ${node.right.val}`);
            }
        }
        
        result.push(currentLevel);
        console.log(`  Level ${level} complete: [${currentLevel.join(', ')}]`);
        console.log(`  Queue for next level: [${queue.map(n => n.val).join(', ')}]`);
        
        leftToRight = !leftToRight; // Toggle direction
        console.log(`  Next direction: ${leftToRight ? 'Left → Right' : 'Right → Left'}`);
        level++;
    }
    
    console.log(`\nZigzag traversal complete: [${result.map(level => `[${level.join(', ')}]`).join(', ')}]`);
    return result;
}

// Sample data for zigzag
function createZigzagSample(): TreeNode {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);
    return root;
}

const zigzagTree = createZigzagSample();
console.log("Zigzag Level Order Result:", zigzagLevelOrder(zigzagTree));
```

**Sample Execution Output:**
```
=== Zigzag Level Order Execution Log ===
Input Tree Root: 1
Direction pattern: Left→Right, Right→Left, Left→Right, ...

Level 0: Processing 1 nodes
  Direction: Left → Right
  Queue: [1]
  Processing node 1 (1/1)
    Added to end: [1]
    Enqueued left child: 2
    Enqueued right child: 3
  Level 0 complete: [1]
  Queue for next level: [2, 3]
  Next direction: Right → Left

Level 1: Processing 2 nodes
  Direction: Right → Left
  Queue: [2, 3]
  Processing node 2 (1/2)
    Added to front: [2]
    Enqueued left child: 4
    Enqueued right child: 5
  Processing node 3 (2/2)
    Added to front: [3, 2]
    Enqueued right child: 6
  Level 1 complete: [3, 2]
  Queue for next level: [4, 5, 6]
  Next direction: Left → Right

Level 2: Processing 3 nodes
  Direction: Left → Right
  Queue: [4, 5, 6]
  Processing node 4 (1/3)
    Added to end: [4]
  Processing node 5 (2/3)
    Added to end: [4, 5]
  Processing node 6 (3/3)
    Added to end: [4, 5, 6]
  Level 2 complete: [4, 5, 6]
  Queue for next level: []
  Next direction: Right → Left

Zigzag traversal complete: [[1], [3, 2], [4, 5, 6]]
```

### 4. Finding Right Side View

```javascript
function rightSideView(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            // Last node in each level
            if (i === levelSize - 1) {
                result.push(node.val);
            }
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return result;
}

console.log(rightSideView(tree)); // [1, 3, 6, 7]
```

### 5. Connect Level Order Siblings

```javascript
class TreeNodeWithNext {
    constructor(val, left = null, right = null, next = null) {
        this.val = val;
        this.left = left;
        this.right = right;
        this.next = next;
    }
}

function connect(root) {
    if (!root) return null;
    
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            // Connect to next node in same level
            if (i < levelSize - 1) {
                node.next = queue[0]; // Peek at next node
            }
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return root;
}
```

## BFS vs DFS Comparison

### When to Use BFS vs DFS

| Criteria | BFS | DFS |
|----------|-----|-----|
| **Memory Usage** | O(width) - Higher | O(height) - Lower |
| **Finding Shortest Path** | ✅ Optimal | ❌ Not guaranteed |
| **Finding Any Path** | ✅ Good | ✅ Better |
| **Level-wise Processing** | ✅ Perfect | ❌ Complex |
| **Implementation** | Queue-based | Stack/Recursion |
| **Tree Traversal Order** | Level-order | In/Pre/Post-order |

### Performance Comparison

```javascript
function compareTraversals(root) {
    let bfsMemory = 0;
    let dfsMemory = 0;
    
    // BFS Memory Usage
    function bfsMemoryAnalysis(root) {
        if (!root) return 0;
        
        let maxQueueSize = 0;
        const queue = [root];
        
        while (queue.length > 0) {
            maxQueueSize = Math.max(maxQueueSize, queue.length);
            const node = queue.shift();
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        return maxQueueSize;
    }
    
    // DFS Memory Usage (recursion stack)
    function dfsMemoryAnalysis(root, depth = 0) {
        if (!root) return depth;
        
        const leftDepth = dfsMemoryAnalysis(root.left, depth + 1);
        const rightDepth = dfsMemoryAnalysis(root.right, depth + 1);
        
        return Math.max(leftDepth, rightDepth);
    }
    
    return {
        bfsMaxMemory: bfsMemoryAnalysis(root),
        dfsMaxMemory: dfsMemoryAnalysis(root)
    };
}
```

## Advanced BFS Techniques

### 1. Bidirectional BFS

```javascript
function bidirectionalBFS(root, target) {
    if (!root) return -1;
    if (root.val === target) return 0;
    
    const frontQueue = [{node: root, level: 0}];
    const backQueue = []; // Would contain target nodes in real scenario
    const frontVisited = new Set([root.val]);
    const backVisited = new Set();
    
    while (frontQueue.length > 0) {
        const {node, level} = frontQueue.shift();
        
        // Check if we've met the other search
        if (backVisited.has(node.val)) {
            return level; // Found connection
        }
        
        if (node.left && !frontVisited.has(node.left.val)) {
            frontQueue.push({node: node.left, level: level + 1});
            frontVisited.add(node.left.val);
        }
        
        if (node.right && !frontVisited.has(node.right.val)) {
            frontQueue.push({node: node.right, level: level + 1});
            frontVisited.add(node.right.val);
        }
    }
    
    return -1; // Not found
}
```

### 2. Multi-Source BFS

```javascript
function multiSourceBFS(root, sources) {
    if (!root || sources.length === 0) return [];
    
    const queue = [];
    const visited = new Set();
    const result = [];
    
    // Initialize queue with all source nodes
    function findSources(node, path = []) {
        if (!node) return;
        
        const currentPath = [...path, node.val];
        
        if (sources.includes(node.val)) {
            queue.push({node, level: 0, path: currentPath});
            visited.add(node.val);
        }
        
        findSources(node.left, currentPath);
        findSources(node.right, currentPath);
    }
    
    findSources(root);
    
    // BFS from all sources simultaneously
    while (queue.length > 0) {
        const {node, level, path} = queue.shift();
        result.push({val: node.val, level, path});
        
        if (node.left && !visited.has(node.left.val)) {
            queue.push({
                node: node.left,
                level: level + 1,
                path: [...path, node.left.val]
            });
            visited.add(node.left.val);
        }
        
        if (node.right && !visited.has(node.right.val)) {
            queue.push({
                node: node.right,
                level: level + 1,
                path: [...path, node.right.val]
            });
            visited.add(node.right.val);
        }
    }
    
    return result;
}
```

### 3. BFS with Memory Optimization

```javascript
function memoryOptimizedBFS(root) {
    if (!root) return [];
    
    const result = [];
    let currentLevel = [root];
    
    while (currentLevel.length > 0) {
        const nextLevel = [];
        const levelValues = [];
        
        for (const node of currentLevel) {
            levelValues.push(node.val);
            
            if (node.left) nextLevel.push(node.left);
            if (node.right) nextLevel.push(node.right);
        }
        
        result.push(levelValues);
        currentLevel = nextLevel; // Reuse array reference
    }
    
    return result;
}
```

## Real-World Applications

### 1. File System Traversal

```javascript
class FileNode {
    constructor(name, isDirectory = false, children = []) {
        this.name = name;
        this.isDirectory = isDirectory;
        this.children = children;
    }
}

function findFilesBFS(root, extension) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const current = queue.shift();
        
        if (!current.isDirectory && current.name.endsWith(extension)) {
            result.push(current.name);
        }
        
        if (current.isDirectory) {
            for (const child of current.children) {
                queue.push(child);
            }
        }
    }
    
    return result;
}
```

### 2. Social Network Analysis

```javascript
class PersonNode {
    constructor(name, connections = []) {
        this.name = name;
        this.connections = connections;
    }
}

function findConnectionDegree(person, target) {
    if (person.name === target) return 0;
    
    const queue = [{person, degree: 0}];
    const visited = new Set([person.name]);
    
    while (queue.length > 0) {
        const {person: current, degree} = queue.shift();
        
        for (const connection of current.connections) {
            if (connection.name === target) {
                return degree + 1;
            }
            
            if (!visited.has(connection.name)) {
                queue.push({person: connection, degree: degree + 1});
                visited.add(connection.name);
            }
        }
    }
    
    return -1; // Not connected
}
```

### 3. Web Crawling Simulation

```javascript
class WebPage {
    constructor(url, links = []) {
        this.url = url;
        this.links = links;
        this.content = null;
    }
}

function webCrawlerBFS(startPage, maxDepth = 3) {
    const visited = new Set();
    const queue = [{page: startPage, depth: 0}];
    const crawledPages = [];
    
    while (queue.length > 0) {
        const {page, depth} = queue.shift();
        
        if (visited.has(page.url) || depth > maxDepth) {
            continue;
        }
        
        visited.add(page.url);
        crawledPages.push({
            url: page.url,
            depth,
            linkCount: page.links.length
        });
        
        // Add linked pages to queue
        for (const linkedPage of page.links) {
            if (!visited.has(linkedPage.url)) {
                queue.push({page: linkedPage, depth: depth + 1});
            }
        }
    }
    
    return crawledPages;
}
```

## Common Mistakes and Best Practices

### Common Mistakes

1. **Forgetting to Check for Null Nodes**
```javascript
// ❌ Wrong: May cause errors
function badBFS(root) {
    const queue = [root];
    while (queue.length > 0) {
        const node = queue.shift();
        console.log(node.val); // Error if node is null
        queue.push(node.left, node.right);
    }
}

// ✅ Correct: Always check for null
function goodBFS(root) {
    if (!root) return;
    const queue = [root];
    while (queue.length > 0) {
        const node = queue.shift();
        console.log(node.val);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
}
```

2. **Inefficient Queue Operations**
```javascript
// ❌ Wrong: shift() is O(n) in JavaScript arrays
const queue = [];
const node = queue.shift(); // O(n) operation

// ✅ Better: Use proper queue implementation
class Queue {
    constructor() {
        this.items = [];
        this.head = 0;
    }
    
    enqueue(item) {
        this.items.push(item);
    }
    
    dequeue() {
        if (this.head >= this.items.length) return null;
        return this.items[this.head++];
    }
    
    isEmpty() {
        return this.head >= this.items.length;
    }
}
```

### Best Practices

1. **Use Appropriate Data Structures**
```javascript
// Efficient queue for large datasets
class EfficientQueue {
    constructor() {
        this.front = [];
        this.back = [];
    }
    
    enqueue(item) {
        this.back.push(item);
    }
    
    dequeue() {
        if (this.front.length === 0) {
            while (this.back.length > 0) {
                this.front.push(this.back.pop());
            }
        }
        return this.front.pop();
    }
    
    isEmpty() {
        return this.front.length === 0 && this.back.length === 0;
    }
}
```

2. **Handle Edge Cases Properly**
```javascript
function robustBFS(root) {
    // Handle all edge cases
    if (!root) return [];
    if (root && !root.left && !root.right) return [root.val];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const node = queue.shift();
        if (node) { // Additional safety check
            result.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return result;
}
```

## Performance Optimization

### 1. Early Termination

```javascript
function bfsWithEarlyTermination(root, target) {
    if (!root) return null;
    
    const queue = [{node: root, path: [root.val]}];
    
    while (queue.length > 0) {
        const {node, path} = queue.shift();
        
        if (node.val === target) {
            return path; // Found target, return immediately
        }
        
        if (node.left) {
            queue.push({
                node: node.left,
                path: [...path, node.left.val]
            });
        }
        
        if (node.right) {
            queue.push({
                node: node.right,
                path: [...path, node.right.val]
            });
        }
    }
    
    return null;
}
```

### 2. Memory Pool for Large Trees

```javascript
class NodePool {
    constructor() {
        this.pool = [];
    }
    
    getNode(node, level) {
        if (this.pool.length > 0) {
            const pooled = this.pool.pop();
            pooled.node = node;
            pooled.level = level;
            return pooled;
        }
        return {node, level};
    }
    
    releaseNode(obj) {
        obj.node = null;
        obj.level = 0;
        this.pool.push(obj);
    }
}

function memoryEfficientBFS(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [];
    const pool = new NodePool();
    
    queue.push(pool.getNode(root, 0));
    
    while (queue.length > 0) {
        const current = queue.shift();
        result.push(current.node.val);
        
        if (current.node.left) {
            queue.push(pool.getNode(current.node.left, current.level + 1));
        }
        
        if (current.node.right) {
            queue.push(pool.getNode(current.node.right, current.level + 1));
        }
        
        pool.releaseNode(current);
    }
    
    return result;
}
```

## Conclusion

Breadth-First Search is a powerful and versatile algorithm that forms the foundation for many advanced algorithms and real-world applications. Understanding BFS deeply enables you to solve complex problems involving level-order processing, shortest path finding, and tree analysis.

**Key Takeaways:**

- **Algorithm**: Level-by-level traversal using a queue
- **Time Complexity**: O(n) - visits each node once
- **Space Complexity**: O(w) - where w is maximum width
- **Use Cases**: Level-order traversal, shortest paths, tree analysis
- **Implementation**: Queue-based with careful null checking

**When to Use BFS:**
- Finding shortest path in unweighted scenarios
- Level-order tree processing
- Finding minimum depth or distance
- Web crawling and network analysis
- Any scenario requiring breadth-first exploration

**Best Practices:**
- Always check for null nodes
- Use efficient queue implementations for large datasets
- Consider early termination for search problems
- Handle edge cases properly
- Choose appropriate data structures for your specific needs

BFS is not just an academic concept—it's a practical tool used in search engines, social networks, GPS navigation, and countless other applications. Master BFS, and you'll have a powerful algorithm in your programming toolkit!

---

**Tags:** #Algorithms #DataStructures #BFS #Trees #GraphTraversal #Queue #LevelOrder #ComputerScience

**Related Articles:**
- [Binary Search Algorithm: Understanding Performance and Implementation](#)
- [Linear Search Algorithm: Understanding Performance and Implementation](#)
- [Depth-First Search: Complete Guide with Examples](#)
- [Tree Data Structures: From Basics to Advanced](#)
