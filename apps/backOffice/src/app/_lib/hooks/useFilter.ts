import { useCallback, useState } from "react";

export function useFilter() {
  const [filter, setFilter] = useState<
    { value: string; column: string } | undefined
  >(undefined);

  const onFilter = useCallback(
    (column: string, value: string) => {
      setFilter({ value, column });
    },
    [setFilter],
  );

  const onFilterClear = useCallback(() => {
    setFilter(undefined);
  }, [setFilter]);

  return { filter, onFilter, onFilterClear };
}
