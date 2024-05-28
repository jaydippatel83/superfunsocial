'use client';
import Layout from '@/components/layout/Layout';
import Profile from '@/components/profile/Profile';
import useLocalStorage from '@/hooks/use-local-storage-state';
import { getUserById } from '@/lib/user'; 
import React, { useEffect, useState } from 'react';

const page = () => {
    const [user, setUser, removeUser] = useLocalStorage("user"); 

    const [userData, setUserData] = useState(null); 

    const getUserData = async (id) => {  
        try {
            const data = await getUserById(id);
            setUserData(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const id = user.fid;
        getUserData(id);
    }, [user]) 
 
    return (
        <Layout>
           {
            userData && <Profile user={userData[0]} />
           } 
        </Layout>
    );
};

export default page;