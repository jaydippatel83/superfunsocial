import Layout from '@/components/layout/Layout';
import PostCards from '@/components/posts/PostCards';
import QuestionForm from '@/components/questions/QuestionForm';
import RightSIdeBar from '@/components/sidebar/RightSIdeBar';
import React from 'react';

const page = () => {
    return (
        <Layout>
            <main id="site__main" className="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]">
                <div className="lg:flex 2xl:gap-12 gap-8 max-w-[1065px] mx-auto" id="js-oversized">
                    <div className="max-w-[1080px] w-full  mx-auto ">
                        <div className="md:max-w-[580px] lg:min-w-96 mx-auto flex-1 xl:space-y-6 space-y-3">
                            <QuestionForm/> 
                        </div>
                    </div>
                    <RightSIdeBar />
                </div>
            </main>
        </Layout>
    );
};

export default page;