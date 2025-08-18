---
title: "Depth-First Search in Trees: Complete Guide with Implementation"
description: "Master DFS traversal in tree data structures with detailed explanations, implementations, and real-world applications. Learn preorder, inorder, postorder traversal, performance analysis, and practical examples."
date: "August 19, 2025"
publishedAt: "August 19, 2025"
readTime: "15 minutes read"
author: "Ilyas Bashirah"
tags: ["Algorithms", "Data Structures", "DFS", "Trees", "Graph Traversal", "Stack", "Recursion"]
image: "/images/blog/dfs-tree-cover.jpg"
slug: "depth-first-search-tree-data-structure"
---

# Depth-First Search in Trees: Complete Guide with Implementation

**Published:** August 19, 2025  
**Reading Time:** 15 minutes  
**Tags:** Algorithms, Data Structures, DFS, Trees, Graph Traversal, Stack, Recursion

> **🚀 Enhanced with TypeScript & Execution Logs**: This comprehensive guide features TypeScript implementations with concrete data examples and detailed execution logs showing step-by-step processing for better algorithm understanding.

---

## Introduction

Depth-First Search (DFS) is a fundamental graph traversal algorithm that explores as far as possible along each branch before backtracking. In tree data structures, DFS provides three distinct traversal orders: preorder, inorder, and postorder, each serving different use cases and applications.

Unlike Breadth-First Search (BFS) which explores nodes level by level, DFS dives deep into each branch, making it ideal for problems that require exploring all possible paths or when memory constraints favor stack-based approaches over queue-based ones.

## What is Depth-First Search?

DFS is a traversal algorithm that:
- **Explores depth before breadth**: Goes as deep as possible in one direction before exploring other branches
- **Uses a stack data structure**: Either explicitly with an iterative approach or implicitly through recursion
- **Guarantees visiting all nodes**: In a finite tree, DFS will visit every node exactly once
- **Provides multiple traversal orders**: Preorder, inorder, and postorder depending on when the node is processed

### Visual Representation

```
Tree Structure:
       1
      / \
     2   3
    / \   \
   4   5   6
  /
 7

DFS Traversal Orders:
- Preorder:  1 → 2 → 4 → 7 → 5 → 3 → 6
- Inorder:   7 → 4 → 2 → 5 → 1 → 3 → 6  
- Postorder: 7 → 4 → 5 → 2 → 6 → 3 → 1
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
```

## DFS Implementation

### 1. Preorder Traversal (Root → Left → Right)

**Sample Data:**
```
Input Tree:
       1
      / \
     2   3
    / \   \
   4   5   6
  /
 7

Expected Output: [1, 2, 4, 7, 5, 3, 6]
```

#### Recursive Implementation

```typescript
function preorderTraversalRecursive(root: TreeNode | null): number[] {
    const result: number[] = [];
    
    console.log("=== Preorder DFS Recursive Execution Log ===");
    console.log(`Starting traversal from root: ${root?.val || 'null'}`);
    console.log("Order: Root → Left → Right");
    
    let callDepth = 0;
    
    function dfs(node: TreeNode | null): void {
        const indent = "  ".repeat(callDepth);
        
        if (!node) {
            console.log(`${indent}→ null node, returning`);
            return;
        }
        
        console.log(`${indent}→ Visiting node ${node.val} (depth ${callDepth})`);
        
        // Process root first (preorder)
        result.push(node.val);
        console.log(`${indent}  Added ${node.val} to result: [${result.join(', ')}]`);
        
        // Recursively traverse left subtree
        if (node.left) {
            console.log(`${indent}  Going left to ${node.left.val}`);
            callDepth++;
            dfs(node.left);
            callDepth--;
        } else {
            console.log(`${indent}  No left child`);
        }
        
        // Recursively traverse right subtree  
        if (node.right) {
            console.log(`${indent}  Going right to ${node.right.val}`);
            callDepth++;
            dfs(node.right);
            callDepth--;
        } else {
            console.log(`${indent}  No right child`);
        }
        
        console.log(`${indent}← Finished with node ${node.val}`);
    }
    
    dfs(root);
    
    console.log(`\nFinal preorder result: [${result.join(', ')}]`);
    return result;
}

// Example usage
const sampleTree = createSampleTree();
console.log("Preorder Recursive Result:", preorderTraversalRecursive(sampleTree));
```

#### Iterative Implementation with Stack

```typescript
function preorderTraversalIterative(root: TreeNode | null): number[] {
    if (!root) return [];
    
    const result: number[] = [];
    const stack: TreeNode[] = [root];
    
    console.log("=== Preorder DFS Iterative Execution Log ===");
    console.log(`Starting with root: ${root.val}`);
    console.log("Using explicit stack for iteration");
    
    let step = 1;
    while (stack.length > 0) {
        const current = stack.pop()!;
        
        console.log(`\nStep ${step}: Processing node ${current.val}`);
        console.log(`  Stack before pop: [${stack.map(n => n.val).concat(current.val).join(', ')}]`);
        console.log(`  Popped: ${current.val}`);
        
        // Process current node (preorder)
        result.push(current.val);
        console.log(`  Added ${current.val} to result: [${result.join(', ')}]`);
        
        // Push right child first (so left is processed first)
        if (current.right) {
            stack.push(current.right);
            console.log(`  Pushed right child: ${current.right.val}`);
        }
        
        if (current.left) {
            stack.push(current.left);
            console.log(`  Pushed left child: ${current.left.val}`);
        }
        
        console.log(`  Stack after pushes: [${stack.map(n => n.val).join(', ')}]`);
        step++;
    }
    
    console.log(`\nFinal iterative preorder result: [${result.join(', ')}]`);
    return result;
}

console.log("Preorder Iterative Result:", preorderTraversalIterative(sampleTree));
```

### 2. Inorder Traversal (Left → Root → Right)

**Sample Data:**
```
Input Tree:
       1
      / \
     2   3
    / \   \
   4   5   6
  /
 7

Expected Output: [7, 4, 2, 5, 1, 3, 6]
```

#### Recursive Implementation

```typescript
function inorderTraversalRecursive(root: TreeNode | null): number[] {
    const result: number[] = [];
    
    console.log("=== Inorder DFS Recursive Execution Log ===");
    console.log(`Starting traversal from root: ${root?.val || 'null'}`);
    console.log("Order: Left → Root → Right");
    
    let callDepth = 0;
    
    function dfs(node: TreeNode | null): void {
        const indent = "  ".repeat(callDepth);
        
        if (!node) {
            console.log(`${indent}→ null node, returning`);
            return;
        }
        
        console.log(`${indent}→ Visiting node ${node.val} (depth ${callDepth})`);
        
        // First, traverse left subtree
        if (node.left) {
            console.log(`${indent}  Going left to ${node.left.val}`);
            callDepth++;
            dfs(node.left);
            callDepth--;
        } else {
            console.log(`${indent}  No left child`);
        }
        
        // Process root (inorder)
        result.push(node.val);
        console.log(`${indent}  Added ${node.val} to result: [${result.join(', ')}]`);
        
        // Finally, traverse right subtree
        if (node.right) {
            console.log(`${indent}  Going right to ${node.right.val}`);
            callDepth++;
            dfs(node.right);
            callDepth--;
        } else {
            console.log(`${indent}  No right child`);
        }
        
        console.log(`${indent}← Finished with node ${node.val}`);
    }
    
    dfs(root);
    
    console.log(`\nFinal inorder result: [${result.join(', ')}]`);
    return result;
}

console.log("Inorder Recursive Result:", inorderTraversalRecursive(sampleTree));
```

### 3. Postorder Traversal (Left → Right → Root)

**Sample Data:**
```
Input Tree:
       1
      / \
     2   3
    / \   \
   4   5   6
  /
 7

Expected Output: [7, 4, 5, 2, 6, 3, 1]
```

#### Recursive Implementation

```typescript
function postorderTraversalRecursive(root: TreeNode | null): number[] {
    const result: number[] = [];
    
    console.log("=== Postorder DFS Recursive Execution Log ===");
    console.log(`Starting traversal from root: ${root?.val || 'null'}`);
    console.log("Order: Left → Right → Root");
    
    let callDepth = 0;
    
    function dfs(node: TreeNode | null): void {
        const indent = "  ".repeat(callDepth);
        
        if (!node) {
            console.log(`${indent}→ null node, returning`);
            return;
        }
        
        console.log(`${indent}→ Visiting node ${node.val} (depth ${callDepth})`);
        
        // First, traverse left subtree
        if (node.left) {
            console.log(`${indent}  Going left to ${node.left.val}`);
            callDepth++;
            dfs(node.left);
            callDepth--;
        } else {
            console.log(`${indent}  No left child`);
        }
        
        // Then, traverse right subtree
        if (node.right) {
            console.log(`${indent}  Going right to ${node.right.val}`);
            callDepth++;
            dfs(node.right);
            callDepth--;
        } else {
            console.log(`${indent}  No right child`);
        }
        
        // Finally, process root (postorder)
        result.push(node.val);
        console.log(`${indent}  Added ${node.val} to result: [${result.join(', ')}]`);
        
        console.log(`${indent}← Finished with node ${node.val}`);
    }
    
    dfs(root);
    
    console.log(`\nFinal postorder result: [${result.join(', ')}]`);
    return result;
}

console.log("Postorder Recursive Result:", postorderTraversalRecursive(sampleTree));
```

## Problem Solving Applications

### 1. Maximum Depth of Binary Tree

**Problem:** Find the maximum depth (height) of a binary tree.

**Sample Data:**
```
Input Tree:
       3
      / \
     9   20
        /  \
       15   7

Expected Output: 3
```

```typescript
function maxDepth(root: TreeNode | null): number {
    console.log("=== Maximum Depth DFS Execution Log ===");
    console.log(`Finding maximum depth from root: ${root?.val || 'null'}`);
    
    let callDepth = 0;
    
    function dfs(node: TreeNode | null): number {
        const indent = "  ".repeat(callDepth);
        
        if (!node) {
            console.log(`${indent}→ null node, depth = 0`);
            return 0;
        }
        
        console.log(`${indent}→ Processing node ${node.val} (call depth ${callDepth})`);
        
        callDepth++;
        const leftDepth = dfs(node.left);
        const rightDepth = dfs(node.right);
        callDepth--;
        
        const currentDepth = Math.max(leftDepth, rightDepth) + 1;
        
        console.log(`${indent}  Left depth: ${leftDepth}, Right depth: ${rightDepth}`);
        console.log(`${indent}  Max depth for node ${node.val}: ${currentDepth}`);
        
        return currentDepth;
    }
    
    const result = dfs(root);
    console.log(`\nMaximum tree depth: ${result}`);
    return result;
}

// Sample data for max depth
function createMaxDepthSample(): TreeNode {
    const root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);
    return root;
}

const maxDepthTree = createMaxDepthSample();
console.log("Maximum Depth Result:", maxDepth(maxDepthTree));
```

### 2. Path Sum Problem

**Problem:** Given a binary tree and a target sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the target sum.

**Sample Data:**
```
Input Tree:
       5
      / \
     4   8
    /   / \
   11  13  4
  / \      \
 7   2      1

Target Sum: 22
Expected Output: true (path: 5 → 4 → 11 → 2 = 22)
```

```typescript
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    console.log("=== Path Sum DFS Execution Log ===");
    console.log(`Finding path with sum ${targetSum} from root: ${root?.val || 'null'}`);
    
    let callDepth = 0;
    
    function dfs(node: TreeNode | null, currentSum: number, path: number[]): boolean {
        const indent = "  ".repeat(callDepth);
        
        if (!node) {
            console.log(`${indent}→ null node, returning false`);
            return false;
        }
        
        const newSum = currentSum + node.val;
        const newPath = [...path, node.val];
        
        console.log(`${indent}→ Processing node ${node.val} (depth ${callDepth})`);
        console.log(`${indent}  Current path: [${newPath.join(' → ')}]`);
        console.log(`${indent}  Current sum: ${currentSum} + ${node.val} = ${newSum}`);
        console.log(`${indent}  Target: ${targetSum}, Remaining: ${targetSum - newSum}`);
        
        // Check if this is a leaf node
        const isLeaf = !node.left && !node.right;
        console.log(`${indent}  Is leaf: ${isLeaf}`);
        
        if (isLeaf) {
            const found = newSum === targetSum;
            console.log(`${indent}  ${found ? '✓ TARGET FOUND!' : '✗ Target not reached'} (${newSum} ${found ? '==' : '!='} ${targetSum})`);
            if (found) {
                console.log(`${indent}  Winning path: [${newPath.join(' → ')}] = ${newSum}`);
            }
            return found;
        }
        
        // Recursively check left and right subtrees
        callDepth++;
        
        let leftResult = false;
        if (node.left) {
            console.log(`${indent}  Checking left subtree (${node.left.val})`);
            leftResult = dfs(node.left, newSum, newPath);
        }
        
        let rightResult = false;
        if (node.right && !leftResult) { // Short circuit if left found the path
            console.log(`${indent}  Checking right subtree (${node.right.val})`);
            rightResult = dfs(node.right, newSum, newPath);
        }
        
        callDepth--;
        
        const result = leftResult || rightResult;
        console.log(`${indent}← Node ${node.val} result: ${result} (left: ${leftResult}, right: ${rightResult})`);
        
        return result;
    }
    
    const result = dfs(root, 0, []);
    console.log(`\nPath sum ${targetSum} exists: ${result}`);
    return result;
}

// Sample data for path sum
function createPathSumSample(): TreeNode {
    const root = new TreeNode(5);
    root.left = new TreeNode(4);
    root.right = new TreeNode(8);
    root.left.left = new TreeNode(11);
    root.right.left = new TreeNode(13);
    root.right.right = new TreeNode(4);
    root.left.left.left = new TreeNode(7);
    root.left.left.right = new TreeNode(2);
    root.right.right.right = new TreeNode(1);
    return root;
}

const pathSumTree = createPathSumSample();
console.log("Path Sum Result:", hasPathSum(pathSumTree, 22));
```

## Time and Space Complexity

### Time Complexity
- **All traversals (preorder, inorder, postorder)**: O(n) where n is the number of nodes
- **Each node is visited exactly once**
- **Problem-specific operations**: Generally O(n) as DFS visits all nodes

### Space Complexity
- **Recursive approach**: O(h) where h is the height of the tree (call stack depth)
- **Iterative approach**: O(h) for the explicit stack
- **Balanced tree**: O(log n) space
- **Skewed tree**: O(n) space in worst case

## When to Use DFS

**Choose DFS when:**
- You need to explore all paths or branches completely
- Memory is limited (DFS uses less memory than BFS for wide trees)
- You're looking for solutions that require going deep (like finding paths)
- The tree is very wide but not too deep
- You need specific traversal orders (preorder, inorder, postorder)

**DFS is ideal for:**
- Tree serialization and deserialization
- Expression tree evaluation
- Finding paths between nodes
- Topological sorting in DAGs
- Backtracking algorithms

## Conclusion

Depth-First Search is a powerful and versatile tree traversal algorithm that forms the foundation for many advanced tree and graph algorithms. Its three variants (preorder, inorder, postorder) provide different ways to process tree data, each suited for specific use cases.

The recursive nature of DFS makes it particularly elegant for tree problems, while iterative implementations offer more control over memory usage. Understanding DFS thoroughly is essential for mastering tree data structures and solving complex algorithmic problems.

With the concrete examples and detailed execution logs provided in this guide, you now have a solid foundation to implement and debug DFS algorithms in your own projects.
