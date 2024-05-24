import { useState, useEffect, useRef } from "react";

function useLocalStorage(
  key,
  defaultValue,
  {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  }  = {}
) {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const valueInLocalStorage = window.localStorage.getItem(key);
        return valueInLocalStorage
          ? deserialize(valueInLocalStorage)
          : defaultValue instanceof Function
          ? defaultValue()
          : defaultValue;
      } catch (error) {
        return defaultValue instanceof Function ? defaultValue() : defaultValue;
      }
    }
    return defaultValue instanceof Function ? defaultValue() : defaultValue;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key && typeof window !== "undefined") {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    try {
      window.localStorage.setItem(key, serialize(user));
    } catch (error) {}
  }, [key, user, serialize]);

  const removeUser = () => {
    window.localStorage.removeItem(key);
  };

  return [user, setUser, removeUser];
}

export default useLocalStorage;