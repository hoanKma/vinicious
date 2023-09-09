## Task

List out the computational inefficiencies and anti-patterns found in the code block below.

1. This code block uses:

   1. ReactJS with TypeScript.
   2. Functional components.
   3. React Hooks.

2. You may also provide a refactored version of the code, but that does not give you any more points than stating the issues and explaining correctly how to improve them.

```typescript
interface WalletBalance {
  currency: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
        return 20;
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return (
    <div {...rest}>
      {rows}
    </div>
  );
};

Computational Inefficiencies and Anti-patterns
Unoptimized filter and sort operations: The sortedBalances computation uses filter and sort on every render, even if the balances or prices dependencies haven't changed. This can be computationally expensive, especially when dealing with large arrays.

Inefficient priority calculation: The getPriority function is called for every item in the balances array during filtering and sorting. Since the priorities don't change dynamically, this function could be memoized to avoid redundant calculations.

Redundant mapping operation: The formattedBalances array is created using map, duplicating the data already present in sortedBalances. This is an unnecessary duplication of data and can lead to increased memory consumption.

Lack of key prop: When rendering the WalletRow component inside the rows array, each item should have a unique key prop assigned to it. This helps with React's reconciliation process and improves rendering performance.

Refactored Code

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

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => balance.amount <= 0)
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      });

```
