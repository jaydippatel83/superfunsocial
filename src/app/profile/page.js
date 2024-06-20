'use client';
import Layout from '@/components/layout/Layout';
import Profile from '@/components/profile/Profile';
import useLocalStorage from '@/hooks/use-local-storage-state';
import { getUserById } from '@/lib/user'; 
import { useNeynarContext } from '@neynar/react';
import React, { useEffect, useState } from 'react';

const page = () => {
    const {user}=useNeynarContext(); 
    return (
        <Layout>
            <Profile user={user} /> 
        </Layout>
    );
};

export default page;