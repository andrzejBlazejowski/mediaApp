import { useCallback, useState } from "react";

export const useFiltering = ({
  onFilter,
}: {
  onFilter?: (column: string, value: string) => void;
}) => {
  const [currentColumnForFilter, setCurrentColumnForFilter] = useState("");
  const [currentFilterValue, setCurrentFilterValue] = useState("");
  const [isFilterButtonDisabled, setIsFilterButtonDisabled] = useState(true);

  const filterData = useCallback(
    (column: string, value: string) => {
      onFilter && onFilter(column, value);
    },
    [onFilter],
  );

  const onFilterColumnChange = useCallback((value: string) => {
    setCurrentColumnForFilter(value);
    setCurrentFilterValue("");
  }, []);

  const onFilterValueChange = useCallback(
    (value: string) => {
      setCurrentFilterValue(value);
      if (value !== "" && isFilterButtonDisabled) {
        setIsFilterButtonDisabled(false);
      }
    },
    [isFilterButtonDisabled],
  );

  const onFilterButtonPressed = useCallback(() => {
    if (onFilter) {
      onFilter(currentColumnForFilter, currentFilterValue);
      setIsFilterButtonDisabled(true);
    }
  }, [currentColumnForFilter, currentFilterValue, onFilter]);

  return {
    filterData,
    onFilterColumnChange,
    onFilterButtonPressed,
    currentColumnForFilter,
    currentFilterValue,
    onFilterValueChange,
    isFilterButtonDisabled,
  };
};
