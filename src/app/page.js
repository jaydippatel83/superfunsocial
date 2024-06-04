import Layout from "../components/layout/Layout"; 
import RightSIdeBar from "../components/sidebar/RightSIdeBar"; 
import StickyHeader from "@/components/header/StickyHeader";
import CreatePostModal from "@/components/modals/CreatePostModal";
import { getFeed } from "@/lib/farcaster";

export default async function Home() {
  const cursor ="";
  const feed = await getFeed(cursor); 
   
  return (
    <Layout>
      <main
        id="site__main"
        className="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]"
      >
        <div
          className="lg:flex 2xl:gap-12 gap-8 max-w-[1065px] mx-auto"
          id="js-oversized"
        >
          <div className="max-w-[1080px] mx-auto">
            <div className="md:w-[580px] md:max-w-[580px] mx-auto flex-1 xl:space-y-6 space-y-3">
            {
              feed && <StickyHeader data={feed?.feed?.casts} cursor={feed?.feed?.next?.cursor} />  
            }  
            </div>
          </div>
          <RightSIdeBar />
        </div>
      </main>
      <CreatePostModal />
    </Layout>
  );
}
