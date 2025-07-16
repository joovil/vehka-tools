"use client";

import React, { createContext, useContext, useState } from "react";

interface MinutesData {
  test?: string;
}

type MinutesContextType = {
  minutesData: MinutesData;
  setMinutesData: (data: MinutesData) => void;
};

const MinutesContext = createContext<MinutesContextType | undefined>(undefined);

export const MinutesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [minutesData, setMinutesData] = useState<MinutesData>({});

  return (
    <MinutesContext.Provider
      value={{
        minutesData,
        setMinutesData,
      }}
    >
      {children}
    </MinutesContext.Provider>
  );
};

export const useMinutesContext = () => {
  const context = useContext(MinutesContext);

  if (context === undefined) {
    throw new Error("Context undefined");
  }
  return context;
};
