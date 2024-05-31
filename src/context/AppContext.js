"use client";

import useLocalStorage from "@/hooks/use-local-storage-state";
import { verifyUser } from "@/utils/helpers";
import axios, { AxiosError } from "axios";
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [signerUuid, setSignerUuid] = useState("");
  const [userData, setUserData] = useState();
  const [fid, setFid] = useState();
  const [user, setUser, removeUser] = useLocalStorage("user");
 

  const lookupUser = useCallback(async () => {
    if (user && user.fid) {
      try {
        const { data } = await axios.get(`/api/user/${user.fid}`); 
        setUserData(data.user);
        setFid(user.fid);
      } catch (err) {
        const axiosError = err;
        console.error(axiosError.response?.data);
      }
    }
  }, [user]);

  useEffect(() => {
    lookupUser();
  }, [user]);

  const isUserLoggedIn = useCallback(async () => {
    if (signerUuid && fid) {
      const verifiedUser = await verifyUser(signerUuid, fid);
      if (verifiedUser) {
        setUser({ signerUuid, fid });
      } else {
        removeUser();
      }
    }
  }, [user, signerUuid, fid, setUser, removeUser]);

  useEffect(() => {
    isUserLoggedIn();
  }, []); 
  const value = useMemo(
    () => ({
      userData,
      setUserData,
      signerUuid,
      setSignerUuid,
      fid,
      setFid,
    }),
    [userData, setUserData, signerUuid, fid]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within AppProvider");
  }
  return context;
};
