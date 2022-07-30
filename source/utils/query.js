export function createPaginationArguments({ page, per_page }) {
  const limit = isNaN(per_page) ? 10 : Number(per_page);
  const skip = isNaN(page) ? 0 : (Number(page) - 1) * limit;

  return { limit, skip };
}
