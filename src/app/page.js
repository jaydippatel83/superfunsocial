'use client';
import Image from "next/image";
import Layout from "../components/layout/Layout";
import PostCardLoader from "../components/loader/PostCardLoader";
import RightSIdeBar from "../components/sidebar/RightSIdeBar";
import { IonIcon } from "@ionic/react";
import { camera, chevronBack, chevronBackCircle, chevronForward, ellipsisHorizontal } from "ionicons/icons";
import PostCards from "../components/posts/PostCards";
import CreatePost from "../components/posts/CreatePost";
import PostTabs from "@/components/tabs/PostTabs";
import StickyHeader from "@/components/header/StickyHeader";

export default function Home() {
  return (
    <Layout>
      <main id="site__main" className="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]">
        <div className="lg:flex 2xl:gap-12 gap-8 max-w-[1065px] mx-auto" id="js-oversized"> 
          <div className="max-w-[1080px] mx-auto">   
            <div className="md:max-w-[580px] mx-auto flex-1 xl:space-y-6 space-y-3"> 
            <StickyHeader/>
              <CreatePost/> 
              <PostCards/> 
              <PostCardLoader />
            </div>
          </div> 
          <RightSIdeBar /> 
        </div> 
      </main>
    </Layout>

  );
}
