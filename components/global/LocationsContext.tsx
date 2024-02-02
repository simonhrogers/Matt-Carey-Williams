import { createContext, useContext, useState, ReactNode } from "react";

type LocationsContextType = {
  locations: string[];
  setLocations: React.Dispatch<React.SetStateAction<string[]>>;
};

const LocationsContext = createContext<LocationsContextType | undefined>(undefined);

export function LocationsProvider({ children }: { children: ReactNode }) {
  const [locations, setLocations] = useState<string[]>(['at Porchester Place']);

  return (
    <LocationsContext.Provider value={{ locations, setLocations }}>
      {children}
    </LocationsContext.Provider>
  );
}

export function useLocationsContext() {
  const context = useContext(LocationsContext);
  if (!context) {
    throw new Error('useLocationsContext must be used within a LocationsProvider');
  }
  return context;
}