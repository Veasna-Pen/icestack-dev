import { useCallback, useState } from 'react';
import { readStorage, writeStorage } from '../utils/storage';

type CompletionStore = Record<string, string[]>;

const readStore = (storageKey: string): CompletionStore => {
  try {
    const parsed: unknown = JSON.parse(readStorage(storageKey) ?? '{}');
    return parsed && typeof parsed === 'object' ? (parsed as CompletionStore) : {};
  } catch {
    return {};
  }
};

export const useCompletion = (storageKey: string, groupId: string) => {
  const [done, setDone] = useState<ReadonlySet<string>>(() => new Set(readStore(storageKey)[groupId] ?? []));

  const save = useCallback(
    (next: ReadonlySet<string>) => {
      writeStorage(storageKey, JSON.stringify({ ...readStore(storageKey), [groupId]: [...next] }));
      setDone(next);
    },
    [storageKey, groupId]
  );

  const toggle = useCallback(
    (itemId: string) => {
      const next = new Set(done);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      save(next);
    },
    [done, save]
  );

  return { done, toggle };
};
