import { PREFIX } from 'shared/helpers/local-storage';
import HistoryStorage from '.';
import { DummyData } from '__mocks__/history-storage';

let storage: HistoryStorage<DummyData>;
const KEY = `${PREFIX}dummy`;

const createDummyItem = (id: string, date: Date): DummyData => ({
  id,
  paramA: 1,
  paramB: `id=${id}`,
  paramC: id === '1',
  paramD: {
    paramE: date,
  },
});

const date1 = new Date('1992/03/16');
const date2 = new Date('2017/03/01');

const item1 = createDummyItem('1', date1);
const item2 = createDummyItem('2', date2);
const initialState = [item1, item2];

describe('history-storage', () => {
  beforeEach(() => {
    localStorage.setItem(KEY, JSON.stringify(initialState));
    storage = new HistoryStorage<DummyData>('dummy', (item) => item.id);
  });
  describe('get', () => {
    test('should be able to retrieve items', () => {
      const items = storage.entries;
      const itemsViaLocalStorage = localStorage.getItem(KEY) as string;

      expect(items).toStrictEqual(JSON.parse(itemsViaLocalStorage));
    });
  });
  describe('add', () => {
    test('should be able to put new item with non present id', () => {
      const newItem = createDummyItem('3', new Date('2021/04/02'));

      storage.putNewEntry(newItem);
      const items = storage.entries;

      expect(items).toHaveLength(3);
      expect(items[0].id).toBe('3');
      expect(items[1].id).toBe('1');
      expect(items[2].id).toBe('2');
    });
    test('should be able to put new item with present id', () => {
      const newItem = createDummyItem('2', new Date('2021/04/02'));

      storage.putNewEntry(newItem);
      const items = storage.entries;

      expect(items).toHaveLength(2);
      expect(items[0].id).toBe('2');
      expect(items[1].id).toBe('1');
    });
  });
  describe('remove', () => {
    test('should be able to remove item by id', () => {
      storage.removeEntryById('1');

      const items = storage.entries;

      expect(items).toHaveLength(1);
      expect(items[0].id).toBe('2');
    });
    test('should be able to ignore item removal of non existent id', () => {
      storage.removeEntryById('42');

      const items = storage.entries;

      expect(items).toHaveLength(2);
      expect(items[0].id).toBe('1');
      expect(items[1].id).toBe('2');
    });
    test('should be able to clear history', () => {
      storage.clearHistory();

      const items = storage.entries;

      expect(items).toHaveLength(0);
    });
  });
});
