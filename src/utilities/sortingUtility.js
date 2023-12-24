export const sortItems = (items, criteria, order, getValueForSorting) => {
  const sortedItems = [...items];

  sortedItems.sort((a, b) => {
    const valueA = getValueForSorting(a, criteria);
    const valueB = getValueForSorting(b, criteria);

    if (valueA < valueB) {
      return order === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  return sortedItems;
};
