##Problem 3

1. Inefficient sorting logic: The sorting logic in the `sortedBalances` memoized value uses the `getPriority` function multiple times in the sort comparison function. This results in redundant computations. To improve efficiency, calculate the priority once for each balance and store it as a property in the balance object.

2. Redundant filtering condition: The filtering condition in the `sortedBalances` memoized value checks `lhsPriority` against `balance.amount <= 0`. It seems that `lhsPriority` should be replaced with `balancePriority` to make the filtering logic consistent and accurate.

3. Unnecessary dependency in useMemo: The `useMemo` hook has a dependency on `prices`, but it is not used in the code. To optimize performance, remove `prices` from the dependencies array.

4. Redundant iteration in `formattedBalances`: The `formattedBalances` array is derived from `sortedBalances` by mapping over each balance and creating a new object with the formatted amount. This operation can be combined with the initial mapping in `rows`, eliminating the need for an additional iteration.

5. lhsPriority has not been declared but still used

6. Error when changing the order or number of elements in a list: If you add, remove, or change the order of elements in a list, key={index} is no longer guaranteed to be unique and may result in Display error.Poor performance when updating lists: When you change the list, React needs to compare and update the elements based on the key. Using an index as a key can cause React to have to update the entire list again, affecting performance. To avoid these problems, use a unique and stable key for each element in the list. For example, if there is a unique attribute like balanceId in the balance object, you can use key={balance.balanceId}.

7.

```
if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
```

This can cause an error when the `leftPriority` and `rightPriority` values ​​are equal

```typescript
interface WalletPageProps extends BoxProps {}

const WalletPage: React.FC<WalletPageProps> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = useMemo(() => {
    const priorityMap = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
    return (blockchain: string) => priorityMap[blockchain] || -99;
  }, []);

  const sortedBalances = () => {
    return balances
      .filter((balance: WalletBalance) => balance.amount <= 0)
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      })};

```

In the refactored code, the following changes were made:

- The priority is calculated and stored as a property in each balance object during the mapping in `formattedBalances`. This avoids redundant computations during sorting.
- The filtering condition in `sortedBalances` is modified to consistently use `balance.amount <= 0`.
- The unnecessary dependency on `prices` is removed from the `useMemo` hook, as it is not used in the code.
- The operations of mapping `formattedBalances` and creating `rows` are combined into a single iteration, simplifying the code and eliminating the need for an additional iteration.
