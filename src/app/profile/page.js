'use client';
import Layout from '@/components/layout/Layout';
import Profile from '@/components/profile/Profile';  
import { useNeynarContext } from '@neynar/react';
import React  from 'react';

const page = () => {
    const {user}=useNeynarContext(); 
    return (
        <Layout>
            {
                user &&  <Profile user={user} /> 
            } 
        </Layout>
    );
};

export default page;