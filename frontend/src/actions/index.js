export const INIT_CATEGORIES = 'INIT_CATEGORIES';

export function initCategories(categories) {
  return {
    type: INIT_CATEGORIES,
    categories,
  };
}
