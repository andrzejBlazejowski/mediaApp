import { useCallback, useState } from "react";

export function useFilter() {
  const [filter, setFilter] = useState<
    { value: string; column: string; eq: boolean } | undefined
  >(undefined);

  const onFilter = useCallback(
    (column: string, value: string, eq: boolean) => {
      setFilter({ value, column, eq });
    },
    [setFilter],
  );

  const onFilterClear = useCallback(() => {
    setFilter(undefined);
  }, [setFilter]);

  return { filter, onFilter, onFilterClear };
}
