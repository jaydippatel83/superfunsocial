"use server";
import Image from "next/image";
import CreatePostModal from "@/components/modals/CreatePostModal";
import Layout from "@/components/layout/Layout";
import RightSIdeBar from "@/components/sidebar/RightSIdeBar";
import { getCastConversations } from "@/lib/castdata";
import { PostDetailPage } from "@/components/posts/PostDetailsPage"; 

export default async function CastDetailPage({ params }) {
    const { username, hash } = params;
    const castdata = await getCastConversations(hash);  
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
                        <div className="md:max-w-[580px] min-w-md mx-auto flex-1 xl:space-y-6 space-y-3"> 
                          {
                            castdata && <PostDetailPage post={castdata}/> 
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
