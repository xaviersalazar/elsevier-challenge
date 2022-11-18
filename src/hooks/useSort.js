import { useMemo, useState } from "react";

const useSort = (data = [], options) => {
  const [sortOptions, setSortOptions] = useState(options);

  const sortedData = useMemo(() => {
    if (!sortOptions) return data;

    const { sortKey, sortDirection } = sortOptions;

    return data.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortDirection === "asc" ? 1 : -1;

      return 0;
    });
  }, [data, sortOptions]);

  const sort = (sortKey) => {
    let sortDirection = "desc";

    if (
      sortOptions &&
      sortOptions.sortKey === sortKey &&
      sortOptions?.sortDirection === "desc"
    ) {
      sortDirection = "asc";
    }

    setSortOptions({ sortKey, sortDirection });
  };

  return {
    data: sortedData,
    sort,
    sortOptions,
  };
};

export default useSort;
