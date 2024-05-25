'use client';
import { IonIcon } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { chevronDownOutline } from 'ionicons/icons';
import axios from 'axios';
import getRelativeTime from '@/lib/utils';
import PostCards from '../PostCards';
import CommentCards from './CommentCards';

const FeedComments = ({ cast }) => {
   
console.log(cast,"cast");
    return (
        <div className="sm:py-4 py-2.5 border-t border-gray-100 font-normal relative dark:border-slate-700/40 ">
            {
                cast.map((item, index) => ( 
                    <CommentCards key={index} post={item}/>
                ))
            } 
        </div>
    );
};

export default FeedComments;
