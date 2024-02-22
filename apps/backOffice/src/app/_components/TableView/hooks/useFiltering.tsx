import { useCallback, useState } from "react";

import { HeadersConfig } from "../TableView.types";

export const useFiltering = ({
  onFilter,
  onFilterClear,
  headersConfig,
}: {
  onFilter?: (column: string, value: string, eq: boolean) => void;
  onFilterClear?: () => void;
  headersConfig?: HeadersConfig;
}) => {
  const [currentColumnForFilter, setCurrentColumnForFilter] = useState("");
  const [currentFilterValue, setCurrentFilterValue] = useState("");
  const [isFilterButtonDisabled, setIsFilterButtonDisabled] = useState(true);
  const [isClearButtonDisabled, setIsClearButtonDisabled] = useState(false);

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
      const headerConfig =
        headersConfig && headersConfig[currentColumnForFilter];
      if (headerConfig && typeof headerConfig.foreignKey !== "undefined") {
        onFilter(headerConfig.foreignKey, currentFilterValue, false);
      } else {
        onFilter(currentColumnForFilter, currentFilterValue, false);
      }
      setIsFilterButtonDisabled(true);
    }
    setIsClearButtonDisabled(false);
  }, [currentColumnForFilter, currentFilterValue, onFilter, headersConfig]);

  const onClearButtonPressed = useCallback(() => {
    if (onFilterClear) {
      onFilterClear();
      setIsFilterButtonDisabled(false);
      setIsClearButtonDisabled(true);
    }
    setIsClearButtonDisabled(true);
  }, [currentColumnForFilter, currentFilterValue, onFilter]);

  return {
    onFilterColumnChange,
    onFilterButtonPressed,
    currentColumnForFilter,
    currentFilterValue,
    onFilterValueChange,
    isFilterButtonDisabled,
    onClearButtonPressed,
    isClearButtonDisabled,
  };
};
