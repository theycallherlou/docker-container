import { useState } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T) {
  // Get the value from localStorage or use the initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error retrieving localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Function to update both the state and localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function like in useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Update state
      setStoredValue(valueToStore);

      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
