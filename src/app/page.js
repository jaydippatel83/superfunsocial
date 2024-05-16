'use client';
import Image from "next/image";
import Layout from "./components/layout/Layout";
import PostCardLoader from "./components/loader/PostCardLoader";
import RightSIdeBar from "./components/sidebar/RightSIdeBar";
import { IonIcon } from "@ionic/react";
import { camera, chevronBack, chevronForward } from "ionicons/icons";

export default function Home() {
  return (
    <Layout>
      <main id="site__main" className="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]">

        <div className="lg:flex 2xl:gap-16 gap-12 max-w-[1065px] mx-auto" id="js-oversized">

          <div className="max-w-[680px] mx-auto">
            <div className="mb-8">

              <h3 className="font-extrabold text-2xl  text-black dark:text-white hidden"> Stories</h3>

              <div className="relative" tabindex="-1" uk-slider="auto play: true;finite: true" uk-lightbox="">

                <div className="py-5 uk-slider-container">

                  <ul className="uk-slider-items w-[calc(100%+14px)]" uk-scrollspy="target: > li; cls: uk-animation-scale-up; delay: 20;repeat:true">
                    <li className="md:pr-3" uk-scrollspy-className="uk-animation-fade">
                      <div className="md:w-16 md:h-16 w-12 h-12 rounded-full relative border-2 border-dashed grid place-items-center bg-slate-200 border-slate-300 dark:border-slate-700 dark:bg-dark2 shrink-0"
                        uk-toggle="target: #create-story">
                        <IonIcon name={camera} className="text-2xl"></IonIcon>
                      </div>
                    </li>
                    <li className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                      <a href="assets/images/avatars/avatar-lg-1.jpg" data-caption="Caption 1">
                        <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                          <img src="assets/images/avatars/avatar-2.jpg" alt="" className="absolute w-full h-full object-cover" />
                        </div>
                      </a>
                    </li>
                    <li className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                      <a href="assets/images/avatars/avatar-lg-2.jpg" data-caption="Caption 1">
                        <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                          <img src="assets/images/avatars/avatar-3.jpg" alt="" className="absolute w-full h-full object-cover" />
                        </div>
                      </a>
                    </li>
                    <li className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                      <a href="assets/images/avatars/avatar-lg-4.jpg" data-caption="Caption 1">
                        <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                          <img src="assets/images/avatars/avatar-5.jpg" alt="" className="absolute w-full h-full object-cover" />
                        </div>
                      </a>
                    </li>
                      
                    <li className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                      <a href="assets/images/avatars/avatar-lg-1.jpg" data-caption="Caption 1">
                        <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                          <img src="assets/images/avatars/avatar-2.jpg" alt="" className="absolute w-full h-full object-cover" />
                        </div>
                      </a>
                    </li>
                    <li className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                      <a href="assets/images/avatars/avatar-lg-2.jpg" data-caption="Caption 1">
                        <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                          <img src="assets/images/avatars/avatar-3.jpg" alt="" className="absolute w-full h-full object-cover" />
                        </div>
                      </a>
                    </li>
                    <li className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                      <a href="assets/images/avatars/avatar-lg-4.jpg" data-caption="Caption 1">
                        <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                          <img src="assets/images/avatars/avatar-5.jpg" alt="" className="absolute w-full h-full object-cover" />
                        </div>
                      </a>
                    </li>
                    <li className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                      <a href="assets/images/avatars/avatar-lg-5.jpg" data-caption="Caption 1">
                        <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                          <img src="assets/images/avatars/avatar-6.jpg" alt="" className="absolute w-full h-full object-cover" />
                        </div>
                      </a>
                    </li>
                    <li className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                      <a href="assets/images/avatars/avatar-lg-1.jpg" data-caption="Caption 1">
                        <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                          <img src="assets/images/avatars/avatar-7.jpg" alt="" className="absolute w-full h-full object-cover" />
                        </div>
                      </a>
                    </li>
                    <li className="md:pr-3 pr-2">
                      <div className="md:w-16 md:h-16 w-12 h-12 bg-slate-200/60 rounded-full dark:bg-dark2 animate-pulse"></div>
                    </li>
                  </ul>

                </div>

                <div className="max-md:hidden">

                  <button type="button" className="absolute -translate-y-1/2 bg-white shadow rounded-full top-1/2 -left-3.5 grid w-8 h-8 place-items-center dark:bg-dark3" uk-slider-item="previous"> <IonIcon name={chevronBack} className="text-2xl"></IonIcon></button>
                  <button type="button" className="absolute -right-2 -translate-y-1/2 bg-white shadow rounded-full top-1/2 grid w-8 h-8 place-items-center dark:bg-dark3" uk-slider-item="next"> <IonIcon name={chevronForward} className="text-2xl"></IonIcon> </button>

                </div>


              </div>

            </div>


            <div className="md:max-w-[580px] mx-auto flex-1 xl:space-y-6 space-y-3">

              {/* stories slider */}
              <div className="bg-white rounded-xl shadow-sm md:p-4 p-2 space-y-4 text-sm font-medium border1 dark:bg-dark2">

                <div className="flex items-center md:gap-3 gap-1">
                  <div className="flex-1 bg-slate-100 hover:bg-opacity-80 transition-all rounded-lg cursor-pointer dark:bg-dark3" uk-toggle="target: #create-status">
                    <div className="py-2.5 text-center dark:text-white"> What do you have in mind? </div>
                  </div>
                  <div className="cursor-pointer hover:bg-opacity-80 p-1 px-1.5 rounded-xl transition-all bg-pink-100/60 hover:bg-pink-100 dark:bg-white/10 dark:hover:bg-white/20" uk-toggle="target: #create-status">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 stroke-pink-600 fill-pink-200/70" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M15 8h.01" />
                      <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                      <path d="M3.5 15.5l4.5 -4.5c.928 -.893 2.072 -.893 3 0l5 5" />
                      <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l2.5 2.5" />
                    </svg>
                  </div>
                  <div className="cursor-pointer hover:bg-opacity-80 p-1 px-1.5 rounded-xl transition-all bg-sky-100/60 hover:bg-sky-100 dark:bg-white/10 dark:hover:bg-white/20" uk-toggle="target: #create-status">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 stroke-sky-600 fill-sky-200/70 " viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
                      <path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                    </svg>
                  </div>
                </div>

              </div>

              {/* post card */}
              <div className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2">


                <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                  <a href="timeline.html"> <img src="assets/images/avatars/avatar-3.jpg" alt="" className="w-9 h-9 rounded-full" /> </a>
                  <div className="flex-1">
                    <a href="timeline.html"> <h4 className="text-black dark:text-white"> Monroe Parker </h4> </a>
                    <div className="text-xs text-gray-500 dark:text-white/80"> 2 hours ago</div>
                  </div>

                  <div className="-mr-1">
                    <button type="button" className="button-icon w-8 h-8"> <IonIcon className="text-xl" name="ellipsis-horizontal"></IonIcon> </button>
                    <div className="w-[245px]" uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click">
                      <nav>
                        <a href="#"> <IonIcon className="text-xl shrink-0" name="bookmark-outline"></IonIcon>  Add to favorites </a>
                        <a href="#"> <IonIcon className="text-xl shrink-0" name="notifications-off-outline"></IonIcon> Mute Notification </a>
                        <a href="#"> <IonIcon className="text-xl shrink-0" name="flag-outline"></IonIcon>  Report this post </a>
                        <a href="#"> <IonIcon className="text-xl shrink-0" name="share-outline"></IonIcon>  Share your profile </a>
                        <hr />
                        <a href="#" className="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"> <IonIcon className="text-xl shrink-0" name="stop-circle-outline"></IonIcon>  Unfollow </a>
                      </nav>
                    </div>
                  </div>
                </div>


                <a href="#preview_modal" uk-toggle>
                  <div className="relative w-full lg:h-96 h-full sm:px-4">
                    <img src="assets/images/post/img-2.jpg" alt="" className="sm:rounded-lg w-full h-full object-cover" />
                  </div>
                </a>


                <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <button type="button" className="button-icon text-red-500 bg-red-100 dark:bg-slate-700"> <IonIcon className="text-lg" name="heart"></IonIcon> </button>
                      <a href="#">1,300</a>
                    </div>
                    <div className="p-1 px-2 bg-white rounded-full drop-shadow-md w-[212px] dark:bg-slate-700 text-2xl"
                      uk-drop="offset:10;pos: top-left; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-bottom-left">

                      <div className="flex gap-2" uk-scrollspy="target: > button; cls: uk-animation-scale-up; delay: 100 ;repeat: true">
                        <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> 👍 </span></button>
                        <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> ❤️ </span></button>
                        <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> 😂 </span></button>
                        <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> 😯 </span></button>
                        <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> 😢 </span></button>
                      </div>

                      <div className="w-2.5 h-2.5 absolute -bottom-1 left-3 bg-white rotate-45 hidden"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" className="button-icon bg-slate-200/70 dark:bg-slate-700"> <IonIcon className="text-lg" name="chatbubble-ellipses"></IonIcon> </button>
                    <span>260</span>
                  </div>
                  <button type="button" className="button-icon ml-auto"> <IonIcon className="text-xl" name="paper-plane-outline"></IonIcon> </button>
                  <button type="button" className="button-icon"> <IonIcon className="text-xl" name="share-outline"></IonIcon> </button>
                </div>


                <div className="sm:p-4 p-2.5 border-t border-gray-100 font-normal space-y-3 relative dark:border-slate-700/40">

                  <div className="flex items-start gap-3 relative">
                    <a href="timeline.html"> <img src="assets/images/avatars/avatar-2.jpg" alt="" className="w-6 h-6 mt-1 rounded-full" /> </a>
                    <div className="flex-1">
                      <a href="timeline.html" className="text-black font-medium inline-block dark:text-white"> Steeve </a>
                      <p className="mt-0.5">What a beautiful photo! I love it. 😍 </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 relative">
                    <a href="timeline.html"> <img src="assets/images/avatars/avatar-3.jpg" alt="" className="w-6 h-6 mt-1 rounded-full" /> </a>
                    <div className="flex-1">
                      <a href="timeline.html" className="text-black font-medium inline-block dark:text-white"> Monroe </a>
                      <p className="mt-0.5">   You captured the moment.😎 </p>
                    </div>
                  </div>

                  <button type="button" className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 mt-2">
                    <IonIcon name="chevron-down-outline" className="ml-auto duration-200 group-aria-expanded:rotate-180"></IonIcon>
                    More Comment
                  </button>

                </div>


                <div className="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40">

                  <img src="assets/images/avatars/avatar-7.jpg" alt="" className="w-6 h-6 rounded-full" />

                  <div className="flex-1 relative overflow-hidden h-10">
                    <textarea placeholder="Add Comment...." rows="1" className="w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent"></textarea>

                    <div className="!top-2 pr-2" uk-drop="pos: bottom-right; mode: click">
                      <div className="flex items-center gap-2" uk-scrollspy="target: > svg; cls: uk-animation-slide-right-small; delay: 100 ;repeat: true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-sky-600">
                          <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 fill-pink-600">
                          <path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM19 4.75a.75.75 0 00-1.28-.53l-3 3a.75.75 0 00-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 001.28-.53V4.75z" />
                        </svg>
                      </div>
                    </div>


                  </div>


                  <button type="submit" className="text-sm rounded-full py-1.5 px-3.5 bg-secondery"> Replay</button>
                </div>

              </div>


              <PostCardLoader />
            </div>
          </div>

          <RightSIdeBar />

        </div>

      </main>
    </Layout>

  );
}
