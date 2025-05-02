// problemsData.js
"use client"
const problemsData = [
    {
      id: 1,
      title: "Array Sum",
      statement: "Find the sum of all integers in an array.",
      description: `You are given an array of integers. Your task is to compute the sum of all elements in the array.
  
  Constraints:
  - The array can contain up to 10^6 integers.
  - Integers can be negative, zero, or positive.
  
  ### Example:
  Input: [1, 2, 3, 4, 5]  
  Output: 15
  
  ### Approach:
  Use a simple linear scan of the array and keep a running total.
  
  ### Pseudocode:
  function arraySum(arr):
      total = 0
      for num in arr:
          total += num
      return total
  
  Make sure to test edge cases like:
  - An empty array → return 0
  - Large arrays → consider performance
  - Negative numbers → ensure they are added correctly
  
  Bonus: Implement using both \`for\` loop and built-in methods like \`reduce()\` in JavaScript.`,
      github: "https://github.com/example/array-sum",
      deadline: "2025-06-01",
      bounty: "$50"
    },
    {
      id: 2,
      title: "Palindrome Check",
      statement: "Determine if a string is a palindrome.",
      description: `Given a string, return true if it reads the same forward and backward after removing non-alphanumeric characters and ignoring case.
  
  ### Example:
  Input: "A man, a plan, a canal: Panama"  
  Output: true
  
  ### Approach:
  1. Sanitize the input:
     - Remove punctuation and spaces.
     - Convert to lowercase.
  2. Check if the string is equal to its reverse.
  
  ### JavaScript Tip:
  Use regex \`s.replace(/[^a-z0-9]/gi, '').toLowerCase()\` for cleaning the string.`,
      github: "https://github.com/example/palindrome-check",
      deadline: "2025-06-10",
      bounty: "$70"
    },
    {
      id: 3,
      title: "Binary Search",
      statement: "Implement binary search on a sorted array.",
      description: `Binary search is an efficient algorithm to find a target value in a sorted array.
  
  ### Time Complexity:
  O(log n)
  
  ### Example:
  Input: nums = [-1,0,3,5,9,12], target = 9  
  Output: 4 (index of 9)
  
  ### Pseudocode:
  function binarySearch(arr, target):
      left = 0
      right = arr.length - 1
      while left <= right:
          mid = Math.floor((left + right) / 2)
          if arr[mid] == target:
              return mid
          else if arr[mid] < target:
              left = mid + 1
          else:
              right = mid - 1
      return -1
  
  ### Notes:
  - Don't forget to test when the element is not found.
  - This only works on sorted arrays.`,
      github: "https://github.com/example/binary-search",
      deadline: "2025-06-15",
      bounty: "$40"
    }
  ];
  
  export default problemsData;
  