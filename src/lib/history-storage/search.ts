import HistoryStorage from '.';

interface SearchTerm {
  id: string;
  date: string;
  term: string;
}

export default new HistoryStorage<SearchTerm>(
  'search-history',
  (item) => item.id,
  10
);
