import { useState, useEffect, useRef } from 'react';

function useLocalStorage(key, defaultValue = '', { serialize = JSON.stringify, deserialize = JSON.parse } = {}) {
  const [state, setState] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const valueInLocalStorage = window.localStorage.getItem(key);
        return valueInLocalStorage
          ? deserialize(valueInLocalStorage)
          : typeof defaultValue === 'function'
          ? defaultValue()
          : defaultValue;
      } catch (error) {
        return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key && typeof window !== 'undefined') {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    try {
      window.localStorage.setItem(key, serialize(state));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }, [key, state, serialize]);

  const removeItem = () => {
    window.localStorage.removeItem(key);
  };

  return [state, setState, removeItem];
}

export default useLocalStorage;
