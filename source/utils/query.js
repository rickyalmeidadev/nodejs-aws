export function createPaginationArguments({ page, per_page }) {
  const limit = isNaN(per_page) ? 10 : Number(per_page);
  const skip = isNaN(page) ? 0 : (Number(page) - 1) * limit;

  return { limit, skip };
}

export function createSortArguments({ sort_by }) {
  const DEFAULT_ARGUMENTS = { sort: {} };

  if (typeof sort_by !== 'string') {
    return DEFAULT_ARGUMENTS;
  }

  const [key, direction] = sort_by.split(':');

  const directions = new Map([
    ['asc', 1],
    ['desc', -1],
  ]);

  if (key.trim() === '' || directions.has(direction) === false) {
    return DEFAULT_ARGUMENTS;
  }

  return { sort: { [key]: directions.get(direction) } };
}
