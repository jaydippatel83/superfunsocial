'use client'
import Layout from '@/components/layout/Layout';
import RightSIdeBar from '@/components/sidebar/RightSIdeBar';
import GameCard from '@/components/superplay/GameCard';
import { gamesData } from '@/lib/utils';
import React from 'react';

const page = () => {
    return (
        <Layout>
            <main id="site__main" className="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]">
                <div className="lg:flex 2xl:gap-8 gap-6 max-w-[1065px] mx-auto" id="js-oversized">
                <div className="flex-none">
                            <div class="page-heading ">
                                <h1 class="page-title"> Games </h1>
                            </div>
                            <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 p-2">
                                {gamesData.map((game) => (
                                    <div key={game.id} className="group">
                                        <GameCard game={game} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    <RightSIdeBar />
                </div>
            </main>
        </Layout>
    );
};

export default page;