'use client';
import Layout from '@/components/layout/Layout';
import Profile from '@/components/profile/Profile';
import useLocalStorage from '@/hooks/use-local-storage-state';
import { getUserById } from '@/lib/user';
import React from 'react';

const page = () => {
    const [user, setUser, removeUser] = useLocalStorage("user"); 
   console.log(user,"user");
    return (
        <Layout>
          {/* <Profile /> */}
        </Layout>
    );
};

export default page;