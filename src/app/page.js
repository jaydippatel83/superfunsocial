import Image from "next/image";
import Layout from "./components/layout/Layout";

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
                        <ion-icon name="camera" className="text-2xl"></ion-icon>
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

                  <button type="button" className="absolute -translate-y-1/2 bg-white shadow rounded-full top-1/2 -left-3.5 grid w-8 h-8 place-items-center dark:bg-dark3" uk-slider-item="previous"> <ion-icon name="chevron-back" className="text-2xl"></ion-icon></button>
                  <button type="button" className="absolute -right-2 -translate-y-1/2 bg-white shadow rounded-full top-1/2 grid w-8 h-8 place-items-center dark:bg-dark3" uk-slider-item="next"> <ion-icon name="chevron-forward" className="text-2xl"></ion-icon> </button>

                </div>


              </div>

            </div>


            <div className="md:max-w-[580px] mx-auto flex-1 xl:space-y-6 space-y-3">


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


              <div className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2">


                <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                  <a href="timeline.html"> <img src="assets/images/avatars/avatar-3.jpg" alt="" className="w-9 h-9 rounded-full" /> </a>
                  <div className="flex-1">
                    <a href="timeline.html"> <h4 className="text-black dark:text-white"> Monroe Parker </h4> </a>
                    <div className="text-xs text-gray-500 dark:text-white/80"> 2 hours ago</div>
                  </div>

                  <div className="-mr-1">
                    <button type="button" className="button-icon w-8 h-8"> <ion-icon className="text-xl" name="ellipsis-horizontal"></ion-icon> </button>
                    <div className="w-[245px]" uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click">
                      <nav>
                        <a href="#"> <ion-icon className="text-xl shrink-0" name="bookmark-outline"></ion-icon>  Add to favorites </a>
                        <a href="#"> <ion-icon className="text-xl shrink-0" name="notifications-off-outline"></ion-icon> Mute Notification </a>
                        <a href="#"> <ion-icon className="text-xl shrink-0" name="flag-outline"></ion-icon>  Report this post </a>
                        <a href="#"> <ion-icon className="text-xl shrink-0" name="share-outline"></ion-icon>  Share your profile </a>
                        <hr />
                        <a href="#" className="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"> <ion-icon className="text-xl shrink-0" name="stop-circle-outline"></ion-icon>  Unfollow </a>
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
                      <button type="button" className="button-icon text-red-500 bg-red-100 dark:bg-slate-700"> <ion-icon className="text-lg" name="heart"></ion-icon> </button>
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
                    <button type="button" className="button-icon bg-slate-200/70 dark:bg-slate-700"> <ion-icon className="text-lg" name="chatbubble-ellipses"></ion-icon> </button>
                    <span>260</span>
                  </div>
                  <button type="button" className="button-icon ml-auto"> <ion-icon className="text-xl" name="paper-plane-outline"></ion-icon> </button>
                  <button type="button" className="button-icon"> <ion-icon className="text-xl" name="share-outline"></ion-icon> </button>
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
                    <ion-icon name="chevron-down-outline" className="ml-auto duration-200 group-aria-expanded:rotate-180"></ion-icon>
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


              <div className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2">


                <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                  <a href="timeline.html"> <img src="assets/images/avatars/avatar-3.jpg" alt="" className="w-9 h-9 rounded-full" /> </a>
                  <div className="flex-1">
                    <a href="timeline.html"> <h4 className="text-black dark:text-white"> Monroe Parker </h4> </a>
                    <div className="text-xs text-gray-500 dark:text-white/80"> 2 hours ago</div>
                  </div>

                  <div className="-mr-1">
                    <button type="button" className="button-icon w-8 h-8"> <ion-icon className="text-xl" name="ellipsis-horizontal"></ion-icon> </button>
                    <div className="w-[245px]" uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click">
                      <nav>
                        <a href="#"> <ion-icon className="text-xl shrink-0" name="bookmark-outline"></ion-icon>  Add to favorites </a>
                        <a href="#"> <ion-icon className="text-xl shrink-0" name="notifications-off-outline"></ion-icon> Mute Notification </a>
                        <a href="#"> <ion-icon className="text-xl shrink-0" name="flag-outline"></ion-icon>  Report this post </a>
                        <a href="#"> <ion-icon className="text-xl shrink-0" name="share-outline"></ion-icon>  Share your profile </a>
                        <hr />
                        <a href="#" className="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"> <ion-icon className="text-xl shrink-0" name="stop-circle-outline"></ion-icon>  Unfollow </a>
                      </nav>
                    </div>
                  </div>
                </div>


                <div className="relative uk-visible-toggle sm:px-4" tabindex="-1" uk-slideshow="animation: push;ratio: 4:3">

                  <ul className="uk-slideshow-items overflow-hidden rounded-xl" uk-lightbox="animation: fade">
                    <li className="w-full">
                      <a className="inline" href="https://getuikit.com/docs/images/photo3.jpg" data-caption="Caption 1" >
                        <img src="assets/images/post/img-2.jpg" alt="" className="w-full h-full absolute object-cover insta-0" />
                      </a>
                    </li>
                    <li className="w-full">
                      <a className="inline" href="https://getuikit.com/docs/images/photo2.jpg" data-caption="Caption 2">
                        <img src="assets/images/post/img-3.jpg" alt="" className="w-full h-full absolute object-cover insta-0" />
                      </a>
                    </li>
                    <li className="w-full">
                      <a className="inline" href="https://getuikit.com/docs/images/photo.jpg" data-caption="Caption 3">
                        <img src="assets/images/post/img-4.jpg" alt="" className="w-full h-full absolute object-cover insta-0" />
                      </a>
                    </li>
                  </ul>

                  <a className="nav-prev left-6" href="#" uk-slideshow-item="previous"> <ion-icon name="chevron-back" className="text-2xl"></ion-icon> </a>
                  <a className="nav-next right-6" href="#" uk-slideshow-item="next"> <ion-icon name="chevron-forward" className="text-2xl"></ion-icon></a>

                </div>


                <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <button type="button" className="button-icon text-red-500 bg-red-100 dark:bg-slate-700"> <ion-icon className="text-lg" name="heart"></ion-icon> </button>
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
                    <button type="button" className="button-icon bg-slate-200/70 dark:bg-slate-700"> <ion-icon className="text-lg" name="chatbubble-ellipses"></ion-icon> </button>
                    <span>260</span>
                  </div>
                  <button type="button" className="button-icon ml-auto"> <ion-icon className="text-xl" name="paper-plane-outline"></ion-icon> </button>
                  <button type="button" className="button-icon"> <ion-icon className="text-xl" name="share-outline"></ion-icon> </button>
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
                    <ion-icon name="chevron-down-outline" className="ml-auto duration-200 group-aria-expanded:rotate-180"></ion-icon>
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


              <div className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2">


                <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                  <a href="timeline.html"> <img src="assets/images/avatars/avatar-5.jpg" alt="" className="w-9 h-9 rounded-full" /> </a>
                  <div className="flex-1">
                    <a href="timeline.html"> <h4 className="text-black dark:text-white"> John Michael </h4> </a>
                    <div className="text-xs text-gray-500 dark:text-white/80"> 2 hours ago</div>
                  </div>

                  <div className="-mr-1">
                    <button type="button" className="button__ico w-8 h-8" aria-haspopup="true" aria-expanded="false"> <ion-icon className="text-xl md hydrated" name="ellipsis-horizontal" role="img" aria-label="ellipsis horizontal"></ion-icon> </button>
                    <div className="w-[245px] uk-dropdown" uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click">
                      <nav>
                        <a href="#"> <ion-icon className="text-xl shrink-0 md hydrated" name="bookmark-outline" role="img" aria-label="bookmark outline"></ion-icon>  Add to favorites </a>
                        <a href="#"> <ion-icon className="text-xl shrink-0 md hydrated" name="notifications-off-outline" role="img" aria-label="notifications off outline"></ion-icon> Mute Notification </a>
                        <a href="#"> <ion-icon className="text-xl shrink-0 md hydrated" name="flag-outline" role="img" aria-label="flag outline"></ion-icon>  Report this post </a>
                        <a href="#"> <ion-icon className="text-xl shrink-0 md hydrated" name="share-outline" role="img" aria-label="share outline"></ion-icon>  Share your profile </a>
                        <hr />
                        <a href="#" className="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"> <ion-icon className="text-xl shrink-0 md hydrated" name="stop-circle-outline" role="img" aria-label="stop circle outline"></ion-icon>  Unfollow </a>
                      </nav>
                    </div>
                  </div>
                </div>

                <div className="sm:px-4 p-2.5 pt-0">
                  <p className="font-normal"> Photography is the art of capturing light with a camera. It can be used to create images that tell stories, express emotions, or document reality. it can be fun, challenging, or rewarding. It can also be a hobby, a profession, or a passion. 📷 </p>
                </div>


                <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <button type="button" className="button-icon text-red-500 bg-red-100 dark:bg-slate-700"> <ion-icon className="text-lg" name="heart"></ion-icon> </button>
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
                    <button type="button" className="button-icon bg-slate-200/70 dark:bg-slate-700"> <ion-icon className="text-lg" name="chatbubble-ellipses"></ion-icon> </button>
                    <span>260</span>
                  </div>
                  <button type="button" className="button-icon ml-auto"> <ion-icon className="text-xl" name="paper-plane-outline"></ion-icon> </button>
                  <button type="button" className="button-icon"> <ion-icon className="text-xl" name="share-outline"></ion-icon> </button>
                </div>


                <div className="sm:p-4 p-2.5 border-t border-gray-100 font-normal space-y-3 relative dark:border-slate-700/40">

                  <div className="flex items-start gap-3 relative">
                    <a href="timeline.html"> <img src="assets/images/avatars/avatar-2.jpg" alt="" className="w-6 h-6 mt-1 rounded-full" /> </a>
                    <div className="flex-1">
                      <a href="timeline.html" className="text-black font-medium inline-block dark:text-white"> Steeve </a>
                      <p className="mt-0.5"> I love taking photos of nature and animals. 🌳🐶</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 relative">
                    <a href="timeline.html"> <img src="assets/images/avatars/avatar-3.jpg" alt="" className="w-6 h-6 mt-1 rounded-full" /> </a>
                    <div className="flex-1">
                      <a href="timeline.html" className="text-black font-medium inline-block dark:text-white"> Monroe </a>
                      <p className="mt-0.5">  I enjoy people and emotions. 😊😢 </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 relative">
                    <a href="timeline.html"> <img src="assets/images/avatars/avatar-5.jpg" alt="" className="w-6 h-6 mt-1 rounded-full" /> </a>
                    <div className="flex-1">
                      <a href="timeline.html" className="text-black font-medium inline-block dark:text-white"> Jesse </a>
                      <p className="mt-0.5">  Photography is my passion. 🎨📸   </p>
                    </div>
                  </div>
                </div>


                <div className="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40">

                  <img src="assets/images/avatars/avatar-7.jpg" alt="" className="w-6 h-6 rounded-full" />

                  <div className="flex-1 relative overflow-hidden h-10">
                    <textarea placeholder="Add Comment...." rows="1" className="w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent" aria-haspopup="true" aria-expanded="false"></textarea>

                    <div className="!top-2 pr-2 uk-drop" uk-drop="pos: bottom-right; mode: click">
                      <div className="flex items-center gap-2" uk-scrollspy="target: > svg; cls: uk-animation-slide-right-small; delay: 100 ;repeat: true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-sky-600">
                          <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 fill-pink-600">
                          <path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM19 4.75a.75.75 0 00-1.28-.53l-3 3a.75.75 0 00-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 001.28-.53V4.75z"></path>
                        </svg>
                      </div>
                    </div>


                  </div>


                  <button type="submit" className="text-sm rounded-full py-1.5 px-3.5 bg-secondery"> Replay</button>
                </div>

              </div>


              <div className="rounded-xl shadow-sm p-4 space-y-4 bg-slate-200/40 animate-pulse border1 dark:bg-dark2">

                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-300/20"></div>
                  <div className="flex-1 space-y-3">
                    <div className="w-40 h-5 rounded-md bg-slate-300/20"></div>
                    <div className="w-24 h-4 rounded-md bg-slate-300/20"></div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-300/20"></div>
                </div>

                <div className="w-full h-52 rounded-lg bg-slate-300/10 my-3"> </div>

                <div className="flex gap-3">

                  <div className="w-16 h-5 rounded-md bg-slate-300/20"></div>

                  <div className="w-14 h-5 rounded-md bg-slate-300/20"></div>

                  <div className="w-6 h-6 rounded-full bg-slate-300/20 ml-auto"></div>
                  <div className="w-6 h-6 rounded-full bg-slate-300/20  "></div>
                </div>

              </div>

            </div>

          </div>


          <div className="flex-1">

            <div className="lg:space-y-4 lg:pb-8 max-lg:grid sm:grid-cols-2 max-lg:gap-6"
              uk-sticky="media: 1024; end: #js-oversized; offset: 80">

              <div className="box p-5 px-6">

                <div className="flex items-baseline justify-between text-black dark:text-white">
                  <h3 className="font-bold text-base"> People you may know </h3>
                  <a href="#" className="text-sm text-blue-500">See all</a>
                </div>

                <div className="side-list">

                  <div className="side-list-item">
                    <a href="timeline.html">
                      <img src="assets/images/avatars/avatar-2.jpg" alt="" className="side-list-image rounded-full" />
                    </a>
                    <div className="flex-1">
                      <a href="timeline.html"><h4 className="side-list-title">  John Michael </h4></a>
                      <div className="side-list-info"> 125k Following </div>
                    </div>
                    <button className="button bg-primary-soft text-primary dark:text-white">follow</button>
                  </div>

                  <div className="side-list-item">
                    <a href="timeline.html">
                      <img src="assets/images/avatars/avatar-3.jpg" alt="" className="side-list-image rounded-full" />
                    </a>
                    <div className="flex-1">
                      <a href="timeline.html"><h4 className="side-list-title"> Monroe Parker </h4></a>
                      <div className="side-list-info"> 320k Following </div>
                    </div>
                    <button className="button bg-primary-soft text-primary dark:text-white">follow</button>
                  </div>

                  <div className="side-list-item">
                    <a href="timeline.html">
                      <img src="assets/images/avatars/avatar-5.jpg" alt="" className="side-list-image rounded-full" />
                    </a>
                    <div className="flex-1">
                      <a href="timeline.html"><h4 className="side-list-title"> James Lewis</h4></a>
                      <div className="side-list-info"> 125k Following </div>
                    </div>
                    <button className="button bg-primary-soft text-primary dark:text-white">follow</button>
                  </div>

                  <div className="side-list-item">
                    <a href="timeline.html">
                      <img src="assets/images/avatars/avatar-6.jpg" alt="" className="side-list-image rounded-full" />
                    </a>
                    <div className="flex-1">
                      <a href="timeline.html"><h4 className="side-list-title">  Alexa stella </h4></a>
                      <div className="side-list-info"> 192k Following </div>
                    </div>
                    <button className="button bg-primary-soft text-primary dark:text-white">follow</button>
                  </div>

                  <div className="side-list-item">
                    <a href="timeline.html">
                      <img src="assets/images/avatars/avatar-2.jpg" alt="" className="side-list-image rounded-full" />
                    </a>
                    <div className="flex-1">
                      <a href="timeline.html"><h4 className="side-list-title"> John Michael </h4></a>
                      <div className="side-list-info"> 320k Following </div>
                    </div>
                    <button className="button bg-primary-soft text-primary dark:text-white">follow</button>
                  </div>

                  <button className="bg-secondery button w-full mt-2 hidden">See all</button>

                </div>

              </div>


              <div className="box p-5 px-6 border1 dark:bg-dark2 hidden">

                <div className="flex justify-between text-black dark:text-white">
                  <h3 className="font-bold text-base"> Peaple You might know </h3>
                  <button type="button"> <ion-icon name="sync-outline" className="text-xl"></ion-icon> </button>
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

              <div className="box p-5 px-6 border1 dark:bg-dark2">

                <div className="flex justify-between text-black dark:text-white">
                  <h3 className="font-bold text-base"> Premium Photos </h3>
                  <button type="button"> <ion-icon name="sync-outline" className="text-xl"></ion-icon> </button>
                </div>

                <div className="relative capitalize font-medium text-sm text-center mt-4 mb-2" tabindex="-1" uk-slider="autoplay: true;finite: true">

                  <div className="overflow-hidden uk-slider-container">

                    <ul className="-ml-2 uk-slider-items w-[calc(100%+0.5rem)]">

                      <li className="w-1/2 pr-2">

                        <a href="#">
                          <div className="relative overflow-hidden rounded-lg">
                            <div className="relative w-full h-40">
                              <img src="assets/images/product/product-1.jpg" alt="" className="object-cover w-full h-full inset-0" />
                            </div>
                            <div className="absolute right-0 top-0 m-2 bg-white/60 rounded-full py-0.5 px-2 text-sm font-semibold dark:bg-slate-800/60"> $12 </div>
                          </div>
                          <div className="mt-3 w-full"> Chill Lotion </div>
                        </a>
                      </li>
                      <li className="w-1/2 pr-2">

                        <a href="#">
                          <div className="relative overflow-hidden rounded-lg">
                            <div className="relative w-full h-40">
                              <img src="assets/images/product/product-3.jpg" alt="" className="object-cover w-full h-full inset-0" />
                            </div>
                            <div className="absolute right-0 top-0 m-2 bg-white/60 rounded-full py-0.5 px-2 text-sm font-semibold dark:bg-slate-800/60"> $18 </div>
                          </div>
                          <div className="mt-3 w-full">  Gaming mouse </div>
                        </a>

                      </li>
                      <li className="w-1/2 pr-2">

                        <a href="#">
                          <div className="relative overflow-hidden rounded-lg">
                            <div className="relative w-full h-40">
                              <img src="assets/images/product/product-5.jpg" alt="" className="object-cover w-full h-full inset-0" />
                            </div>
                            <div className="absolute right-0 top-0 m-2 bg-white/60 rounded-full py-0.5 px-2 text-sm font-semibold dark:bg-slate-800/60"> $12 </div>
                          </div>
                          <div className="mt-3 w-full">  Herbal Shampoo </div>
                        </a>

                      </li>

                    </ul>

                    <button type="button" className="absolute bg-white rounded-full top-16 -left-4 grid w-9 h-9 place-items-center shadow dark:bg-dark3" uk-slider-item="previous"> <ion-icon name="chevron-back" className="text-2xl"></ion-icon></button>
                    <button type="button" className="absolute -right-4 bg-white rounded-full top-16 grid w-9 h-9 place-items-center shadow dark:bg-dark3" uk-slider-item="next"> <ion-icon name="chevron-forward" className="text-2xl"></ion-icon></button>

                  </div>

                </div>


              </div>

              <div className="box p-5 px-6 border1 dark:bg-dark2">

                <div className="flex justify-between text-black dark:text-white">
                  <h3 className="font-bold text-base"> Online Friends </h3>
                  <button type="button"> <ion-icon name="sync-outline" className="text-xl"></ion-icon> </button>
                </div>

                <div className="grid grid-cols-6 gap-3 mt-4">

                  <a href="timeline.html">
                    <div className="w-10 h-10 relative">
                      <img src="assets/images/avatars/avatar-2.jpg" alt="" className="w-full h-full absolute inset-0 rounded-full" />
                      <div className="absolute bottom-0 right-0 m-0.5 bg-green-500 rounded-full w-2 h-2"></div>
                    </div>
                  </a>
                  <a href="timeline.html">
                    <div className="w-10 h-10 relative">
                      <img src="assets/images/avatars/avatar-3.jpg" alt="" className="w-full h-full absolute inset-0 rounded-full" />
                      <div className="absolute bottom-0 right-0 m-0.5 bg-green-500 rounded-full w-2 h-2"></div>
                    </div>
                  </a>
                  <a href="timeline.html">
                    <div className="w-10 h-10 relative">
                      <img src="assets/images/avatars/avatar-4.jpg" alt="" className="w-full h-full absolute inset-0 rounded-full" />
                      <div className="absolute bottom-0 right-0 m-0.5 bg-green-500 rounded-full w-2 h-2"></div>
                    </div>
                  </a>
                  <a href="timeline.html">
                    <div className="w-10 h-10 relative">
                      <img src="assets/images/avatars/avatar-5.jpg" alt="" className="w-full h-full absolute inset-0 rounded-full" />
                      <div className="absolute bottom-0 right-0 m-0.5 bg-green-500 rounded-full w-2 h-2"></div>
                    </div>
                  </a>
                  <a href="timeline.html">
                    <div className="w-10 h-10 relative">
                      <img src="assets/images/avatars/avatar-6.jpg" alt="" className="w-full h-full absolute inset-0 rounded-full" />
                      <div className="absolute bottom-0 right-0 m-0.5 bg-green-500 rounded-full w-2 h-2"></div>
                    </div>
                  </a>
                  <a href="timeline.html">
                    <div className="w-10 h-10 relative">
                      <img src="assets/images/avatars/avatar-7.jpg" alt="" className="w-full h-full absolute inset-0 rounded-full" />
                      <div className="absolute bottom-0 right-0 m-0.5 bg-green-500 rounded-full w-2 h-2"></div>
                    </div>
                  </a>

                </div>


              </div>

              <div className="box p-5 px-6 border1 dark:bg-dark2">

                <div className="flex justify-between text-black dark:text-white">
                  <h3 className="font-bold text-base"> Pro Members </h3>
                </div>

                <div className="relative capitalize font-normal text-sm mt-4 mb-2" tabindex="-1" uk-slider="autoplay: true;finite: true">

                  <div className="overflow-hidden uk-slider-container">

                    {/* <ul className="-ml-2 uk-slider-items w-[calc(100%+0.5rem)]">
                        
                        <li className="w-1/2 pr-2">
                        <a href="timeline.html"> 
                            <div className="flex flex-col items-center shadow-sm p-2 rounded-xl border1">
                                <a href="timeline.html"> 
                                    <div className="relative w-16 h-16 mx-auto mt-2">
                                        <img src="assets/images/avatars/avatar-5.jpg" alt="" className="h-full object-cover rounded-full shadow w-full" />
                                    </div>
                                </a>
                                <div className="mt-5 text-center w-full">
                                    <a href="timeline.html"> <h5 className="font-semibold"> Martin Gray</h5> </a>
                                    <div className="text-xs text-gray-400 mt-0.5 font-medium"> 12K Followers</div>
                                    <button type="button" className="bg-secondery block font-semibold mt-4 py-1.5 rounded-lg text-sm w-full border1"> Follow </button>
                                </div>
                            </div>
                        
                        </li>
                        <li className="w-1/2 pr-2">
                            <div className="flex flex-col items-center shadow-sm p-2 rounded-xl border1">
                                <a href="timeline.html"> 
                                    <div className="relative w-16 h-16 mx-auto mt-2">
                                        <img src="assets/images/avatars/avatar-4.jpg" alt="" className="h-full object-cover rounded-full shadow w-full" />
                                    </div>
                                </a> 
                                <div className="mt-5 text-center w-full">
                                    <a href="timeline.html"> <h5 className="font-semibold"> Alexa Park</h5> </a>
                                    <div className="text-xs text-gray-400 mt-0.5 font-medium"> 12K Followers</div>
                                    <button type="button" className="bg-secondery block font-semibold mt-4 py-1.5 rounded-lg text-sm w-full border1"> Follow </button>
                                </div>
                            </div>
                        </li>
                        <li className="w-1/2 pr-2">
                            <div className="flex flex-col items-center shadow-sm p-2 rounded-xl border1">
                                <a href="timeline.html"> 
                                    <div className="relative w-16 h-16 mx-auto mt-2">
                                        <img src="assets/images/avatars/avatar-4.jpg" alt="" className="h-full object-cover rounded-full shadow w-full" />
                                    </div>
                                </a> 
                                <div className="mt-5 text-center w-full">
                                    <a href="timeline.html"> <h5 className="font-semibold"> James Lewis</h5> </a>
                                    <div className="text-xs text-gray-400 mt-0.5 font-medium"> 15K Followers</div>
                                    <button type="button" className="bg-secondery block font-semibold mt-4 py-1.5 rounded-lg text-sm w-full border1"> Follow </button>
                                </div>
                            </div>
                        </li>
                    

                    </ul> */}

                    <button type="button" className="absolute -translate-y-1/2 bg-slate-100 rounded-full top-1/2 -left-4 grid w-9 h-9 place-items-center dark:bg-dark3" uk-slider-item="previous"> <ion-icon name="chevron-back" className="text-2xl"></ion-icon></button>
                    <button type="button" className="absolute -right-4 -translate-y-1/2 bg-slate-100 rounded-full top-1/2 grid w-9 h-9 place-items-center dark:bg-dark3" uk-slider-item="next"> <ion-icon name="chevron-forward" className="text-2xl"></ion-icon></button>

                  </div>

                </div>


              </div>

              <div className="box p-5 px-6 border1 dark:bg-dark2">

                <div className="flex justify-between text-black dark:text-white">
                  <h3 className="font-bold text-base"> Trends for you </h3>
                  <button type="button"> <ion-icon name="sync-outline" className="text-xl"></ion-icon> </button>
                </div>

                <div className="space-y-3.5 capitalize text-xs font-normal mt-5 mb-2 text-gray-600 dark:text-white/80">
                  <a href="#">
                    <div className="flex items-center gap-3 p">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 -mt-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                      </svg>
                      <div className="flex-1">
                        <h4 className="font-semibold text-black dark:text-white text-sm">  artificial intelligence </h4>
                        <div className="mt-0.5"> 1,245,62 post </div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="block">
                    <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 -mt-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                      </svg>
                      <div className="flex-1">
                        <h4 className="font-semibold text-black dark:text-white text-sm">  Web developers</h4>
                        <div className="mt-0.5"> 1,624 post </div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="block">
                    <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 -mt-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                      </svg>
                      <div className="flex-1">
                        <h4 className="font-semibold text-black dark:text-white text-sm">  Ui Designers</h4>
                        <div className="mt-0.5"> 820 post </div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="block">
                    <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 -mt-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                      </svg>
                      <div className="flex-1">
                        <h4 className="font-semibold text-black dark:text-white text-sm"> affiliate marketing </h4>
                        <div className="mt-0.5"> 480 post </div>
                      </div>
                    </div>
                  </a>
                </div>


              </div>

            </div>
          </div>

        </div>

      </main>
    </Layout>

  );
}
