'use client';
import React from 'react';
import {
    FacebookEmbed,
    InstagramEmbed,
    LinkedInEmbed,
    PinterestEmbed,
    PlaceholderEmbed,
    TikTokEmbed,
    XEmbed,
    YouTubeEmbed
} from 'react-social-media-embed';

const  SocialMediaEmbed = ({ url }) => { 
    
  const getEmbedComponent = (url) => {
    if (url.match(/(?:www\.)?facebook\.com/)) {
      return <FacebookEmbed url={url} />;
    } else if (url.match(/(?:www\.)?instagram\.com/)) {
      return <InstagramEmbed url={url} />;
    } else if (url.match(/(?:www\.)?linkedin\.com/)) {
      return <LinkedInEmbed url={url} />;
    } else if (url.match(/(?:www\.)?pinterest\.com/)) {
      return <PinterestEmbed url={url} />;
    } else if (url.match(/(?:www\.)?tiktok\.com/)) {
      return <TikTokEmbed url={url} />;
    } else if (url.match(/(?:www\.)?twitter\.com/) || url.match(/(?:www\.)?x\.com/)) {
      return <XEmbed url={url} />;
    } else if (url.match(/(?:www\.)?youtube\.com/)) {
      return <YouTubeEmbed url={url} />;
    } else {
      return <PlaceholderEmbed url={url}/>;
    }
  };

  return (
    <div className="social-media-embed p-4 max-w-4xl mx-auto">
     {getEmbedComponent(url)} 
    </div>
  );
}; 

export default SocialMediaEmbed;