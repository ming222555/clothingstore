"use client";

import { createContext, useMemo, useState } from "react";

export const CartModalContext = createContext({
  open: false,
  openCartModal: () => {},
  closeCartModal: () => {},
});

export const CartModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const openCartModal = useMemo(() => {
    return () => {
      setOpen(true);
    };
  }, []);

  const closeCartModal = useMemo(() => {
    return () => setOpen(false);
  }, []);

  return (
    <CartModalContext.Provider
      value={{
        open,
        openCartModal,
        closeCartModal,
      }}
    >
      {children}
    </CartModalContext.Provider>
  );
};
