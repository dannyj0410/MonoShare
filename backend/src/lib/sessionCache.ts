import { LRUCache } from "lru-cache";
import { Session, User } from "@prisma/client";

type SessionWithUser = Session & { user: User };

const options = {
  max: 1000,
  ttl: 1000 * 60 * 10,
  updateAgeOnGet: true, //automatic sliding expiration when user active on cache get
  ttlCheckInterval: 1000 * 60,
};

const cache = new LRUCache<string, SessionWithUser>(options);

export const getCachedSession = (tokenHash: string): SessionWithUser | null => {
  return cache.get(tokenHash) || null;
};

export const setCachedSession = (
  tokenHash: string,
  session: Session & { user: User },
) => {
  cache.set(tokenHash, session);
};

export const invalidateCachedSession = (tokenHash: string) => {
  cache.delete(tokenHash);
};
