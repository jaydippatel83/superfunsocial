import Layout from '@/components/layout/Layout';
import Profile from '@/components/profile/Profile';
import { getUserById } from '@/lib/user';
import React from 'react';

const page = async({params:{user}}) => {
  const userData = await getUserById(user); 
  console.log(userData,"data");
    return (
        <Layout>
          <Profile user={userData[0]}/>
        </Layout>
    );
};

export default page;