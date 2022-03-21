import { persistItem, retrieveItem } from 'shared/helpers/local-storage';

export default class HistoryStorage<T> {
  private store: T[];

  constructor(
    readonly key: string,
    readonly idGetter: (item: T) => string,
    readonly limit: number = 10
  ) {
    this.store = retrieveItem(this.key, []);
  }

  get entries() {
    return this.store;
  }

  private setHistory(array: T[]) {
    this.store = array.slice(0, this.limit);
    persistItem(this.key, this.store);
  }

  private findIndexById(id: string) {
    return this.store.findIndex(
      (storeEntry) => this.idGetter(storeEntry) === id
    );
  }

  putNewEntry(entry: T) {
    const entryIndex = this.findIndexById(this.idGetter(entry));
    if (entryIndex === -1) {
      this.setHistory([entry, ...this.store]);
      return;
    }
    this.setHistory([
      entry,
      ...this.store.slice(0, entryIndex),
      ...this.store.slice(entryIndex + 1),
    ]);
  }

  removeEntryById(entryId: string) {
    const entryIndex = this.findIndexById(entryId);
    if (entryIndex === -1) return;
    this.setHistory([
      ...this.store.slice(0, entryIndex),
      ...this.store.slice(entryIndex + 1),
    ]);
  }

  clearHistory() {
    this.setHistory([]);
  }
}
