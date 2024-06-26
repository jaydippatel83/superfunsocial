'use server'
import Layout from "../components/layout/Layout";  
import HomeComponent from "@/components/home/Home";
import CreatePostModal from "@/components/modals/CreatePostModal"; 
import { getFeed } from "@/lib/farcaster";

export default async function Home() {  
  const cursor ="";
  const data = await getFeed(cursor); 
  return (
    <Layout>
      <HomeComponent feed={data}/>
      {/* <CreatePostModal /> */}
    </Layout>
  );
}
