## Implementation 1: Using a loop

```javascript
function sum_to_n(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
Explanation: This implementation uses a loop to iterate from 1 to n and accumulates the sum by adding each number to the previous sum.

Implementation 2: Using recursion
javascript
function sum_to_n(n) {
  if (n === 1) {
    return 1;
  }
  return n + sum_to_n(n - 1);
}
Explanation: This implementation uses recursion to calculate the sum. It checks for the base case when n equals 1, and then recursively calls the function with n - 1 until reaching the base case.

Implementation 3: Using the arithmetic progression formula
javascript
function sum_to_n(n) {
  return (n * (n + 1)) / 2;
}
Explanation: This implementation utilizes the formula for the sum of an arithmetic progression. The sum of numbers from 1 to n can be calculated by multiplying n with n + 1 and dividing the result by 2.


These are three different approaches to implement the `sum_to_n` function. Each approach achieves the same result but uses different techniques to compute the sum.
```
