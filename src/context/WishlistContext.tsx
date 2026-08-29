import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface WishlistContextType {
  ids: string[];
  toggle: (designId: string) => void;
  has: (designId: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  const toggle = useCallback((designId: string) => {
    setIds((prev) =>
      prev.includes(designId)
        ? prev.filter((id) => id !== designId)
        : [...prev, designId]
    );
  }, []);

  const has = useCallback((designId: string) => ids.includes(designId), [ids]);

  return (
    <WishlistContext.Provider value={{ ids, toggle, has, count: ids.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
