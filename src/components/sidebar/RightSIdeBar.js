'use client'
import { IonIcon } from '@ionic/react';
import { syncOutline } from 'ionicons/icons';
import Image from 'next/image';
import React from 'react';

const RightSIdeBar = () => {
  return (
    <div className="flex-1">
      <div className="lg:space-y-4 lg:pb-8 max-lg:grid sm:grid-cols-2 max-lg:gap-6"
        uk-sticky="media: 1024; end: #js-oversized; offset: 80">

        <div className="box p-5 px-6">

          <div className="flex items-baseline justify-between text-black dark:text-white">
            <h3 className="font-bold text-base"> Recent </h3>
            <a href="#" className="text-sm text-blue-500">See all</a>
          </div>

          <div className="text-sm h-[400px] w-full overflow-y-auto pr-2">
            <div className="pl-2 p-1 text-sm font-normal dark:text-white">
              <a href="#" className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10 bg-teal-500/5">
                <div className="relative w-12 h-12 shrink-0">
                  <Image src="/assets/images/avatars/avatar-3.jpg" alt="Alexa Gray" className="object-cover w-full h-full rounded-full" width={48} height={48} />
                </div>
                <div className="flex-1">
                  <p><b className="font-bold mr-1">Alexa Gray</b> started following you. Welcome him to your profile. 👋</p>
                  <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">4 hours ago</div>
                  <div className="w-2.5 h-2.5 bg-teal-600 rounded-full absolute right-3 top-5"></div>
                </div>
              </a>
              <a href="#" className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10">
                <div className="relative w-12 h-12 shrink-0">
                  <Image src="/assets/images/avatars/avatar-7.jpg" alt="Jesse Steeve" className="object-cover w-full h-full rounded-full" width={48} height={48} />
                </div>
                <div className="flex-1">
                  <p><b className="font-bold mr-1">Jesse Steeve</b> mentioned you in a story. Check it out and reply. 📣</p>
                  <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">8 hours ago</div>
                </div>
              </a>
              <a href="#" className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10">
                <div className="relative w-12 h-12 shrink-0">
                  <Image src="/assets/images/avatars/avatar-6.jpg" alt="Alexa Stella" className="object-cover w-full h-full rounded-full" width={48} height={48} />
                </div>
                <div className="flex-1">
                  <p><b className="font-bold mr-1">Alexa Stella</b> commented on your photo “Wow, stunning shot!” 💬</p>
                  <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">8 hours ago</div>
                </div>
              </a>
              <a href="#" className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10">
                <div className="relative w-12 h-12 shrink-0">
                  <Image src="/assets/images/avatars/avatar-2.jpg" alt="John Michael" className="object-cover w-full h-full rounded-full" width={48} height={48} />
                </div>
                <div className="flex-1">
                  <p><b className="font-bold mr-1">John Michael</b> who you might know, is on socialite.</p>
                  <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">2 hours ago</div>
                  <button type="button" className="button text-white bg-primary">Follow</button>
                </div>
              </a>

              <a href="#" className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10">
                <div className="relative w-12 h-12 shrink-0">
                  <Image src="/assets/images/avatars/avatar-2.jpg" alt="Lewis Lewis" className="object-cover w-full h-full rounded-full" width={48} height={48} />
                </div>
                <div className="flex-1">
                  <p><b className="font-bold mr-1">Lewis Lewis</b> mentioned you in a story. Check it out and reply. 📣</p>
                  <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">8 hours ago</div>
                </div>
              </a>
              <a href="#" className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10">
                <div className="relative w-12 h-12 shrink-0">
                  <Image src="/assets/images/avatars/avatar-7.jpg" alt="Martin Gray" className="object-cover w-full h-full rounded-full" width={48} height={48} />
                </div>
                <div className="flex-1">
                  <p><b className="font-bold mr-1">Martin Gray</b> liked your photo of the Eiffel Tower. 😍</p>
                  <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">8 hours ago</div>
                </div>
              </a>
            </div>
          </div> 
        </div>

        <div className="box p-5 px-6 border1 dark:bg-dark2 "> 
          <div className="flex justify-between text-black dark:text-white">
            <h3 className="font-bold text-base"> Top Creators </h3>
            <button type="button"> <IonIcon name={syncOutline} className="text-xl"></IonIcon> </button>
          </div>

          <div className="space-y-4 capitalize text-xs font-normal mt-5 mb-2 text-gray-500 dark:text-white/80">

            <div className="flex items-center gap-3">
              <a href="timeline.html">
                <img src="assets/images/avatars/avatar-7.jpg" alt="" className="bg-gray-200 rounded-full w-10 h-10" />
              </a>
              <div className="flex-1">
                <a href="timeline.html"><h4 className="font-semibold text-sm text-black dark:text-white">  Johnson smith</h4></a>
                <div className="mt-0.5"> Suggested For You </div>
              </div>
              <button type="button" className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"> Follow </button>
            </div>
            <div className="flex items-center gap-3">
              <a href="timeline.html">
                <img src="assets/images/avatars/avatar-5.jpg" alt="" className="bg-gray-200 rounded-full w-10 h-10" />
              </a>
              <div className="flex-1">
                <a href="timeline.html"><h4 className="font-semibold text-sm text-black dark:text-white"> James Lewis</h4></a>
                <div className="mt-0.5"> Followed by Johnson </div>
              </div>
              <button type="button" className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"> Follow </button>
            </div>
            <div className="flex items-center gap-3">
              <a href="timeline.html">
                <img src="assets/images/avatars/avatar-2.jpg" alt="" className="bg-gray-200 rounded-full w-10 h-10" />
              </a>
              <div className="flex-1">
                <a href="timeline.html"><h4 className="font-semibold text-sm text-black dark:text-white"> John Michael</h4></a>
                <div className="mt-0.5"> Followed by Monroe  </div>
              </div>
              <button type="button" className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"> Follow </button>
            </div>
            <div className="flex items-center gap-3">
              <a href="timeline.html">
                <img src="assets/images/avatars/avatar-3.jpg" alt="" className="bg-gray-200 rounded-full w-10 h-10" />
              </a>
              <div className="flex-1">
                <a href="timeline.html"><h4 className="font-semibold text-sm text-black dark:text-white">  Monroe Parker</h4></a>
                <div className="mt-0.5"> Suggested For You </div>
              </div>
              <button type="button" className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"> Follow </button>
            </div>
            <div className="flex items-center gap-3">
              <a href="timeline.html">
                <img src="assets/images/avatars/avatar-4.jpg" alt="" className="bg-gray-200 rounded-full w-10 h-10" />
              </a>
              <div className="flex-1">
                <a href="timeline.html"><h4 className="font-semibold text-sm text-black dark:text-white">  Martin Gray</h4></a>
                <div className="mt-0.5"> Suggested For You </div>
              </div>
              <button type="button" className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"> Follow </button>
            </div>
          </div>

        </div>

      </div>
    </div>
    
  );
};

export default RightSIdeBar;