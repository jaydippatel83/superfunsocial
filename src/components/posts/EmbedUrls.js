'use client';
import React, { useEffect, useState } from 'react';
import LinkPreview from './PreviewLink';
import axios from 'axios';   
import SocialMediaEmbed from './SocialMediaEmbed';

const EmbedUrls = ({ data }) => {
    const [url, setUrl] = useState(data)
    const [metaTags, setMetaTags] = useState(null);
    const [frameTags, setFrameTags] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [twitterTags, setTwitterTags] = useState(null);


    const fetchMetadata = async (url) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`/api/metadata?url=${encodeURIComponent(url)}`);
            const { metaTags, frameTags, twitterTags, image, video } = response.data;
            setMetaTags(metaTags);
            setFrameTags(frameTags);
            setImage(image);
            setVideo(video);
            setTwitterTags(twitterTags);
        } catch (err) {
            setError('Failed to fetch metadata');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMetadata(data)
    }, [data])

    const isSocialMediaLink = (url) => {
        const socialMediaRegex = /(?:www\.)?(facebook\.com|instagram\.com|linkedin\.com|pinterest\.com|tiktok\.com|twitter\.com|x\.com|youtube\.com)/;
        return socialMediaRegex.test(url);
    };

    const title = twitterTags ? twitterTags['twitter:title'] : metaTags ? metaTags['og:title'] : '';
    const description = twitterTags ? twitterTags['twitter:description'] : metaTags ? metaTags['og:description'] : '';
    const imageUrl = twitterTags ? twitterTags['twitter:image'] : metaTags ? metaTags['og:image'] : '';
    const siteName = twitterTags ? twitterTags['twitter:site'] : metaTags ? metaTags['og:site_name'] : url;

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
                className="border p-2 rounded w-full mb-4"
            />
            <button
                className="bg-blue-500 text-white p-2 rounded mb-4"
                onClick={() => fetchMetadata(url)}
            >
                Preview URL
            </button>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {isSocialMediaLink(url) ? (
                <SocialMediaEmbed url={url} />
            ) : (
                title && description && (
                    <div className="relative">
                        <a className="absolute inset-0 subtle-hover-z" title={url} href={url} target="_blank" rel="noopener noreferrer"></a>
                        <div title={url} className="relative flex cursor-pointer rounded-lg text-sm text-inherit bg-app w-full flex-row">
                            {imageUrl && (
                                <img
                                    loading="lazy"
                                    src={imageUrl}
                                    alt={title}
                                    className="border object-cover border-faint h-24 w-[88px] min-w-[88px] rounded-l-lg"
                                />
                            )}
                            <div className="flex max-h-24 w-full flex-col justify-center overflow-hidden rounded-lg border p-2 border-faint w-full rounded-l-none border-l-0">
                                <div className="line-clamp-1 font-semibold">{title}</div>
                                <div className="line-clamp-2 max-h-12 max-w-lg text-xs break-gracefully text-faint">{description}</div>
                                <div className="text-xs text-muted">{siteName}</div>
                            </div>
                        </div>
                    </div>
                )
            )}
            {image &&
                <div className="rounded-lg border">
                    <img src={url} alt="Preview" className="w-full h-full object-cover rounded-lg " />
                </div>
            }
            {
                video &&
                <div className="border rounded-lg">
                    <video src={video} controls className="w-full h-full object-cover rounded-lg "></video>
                </div>
            }

            {/* {(frameTags) && (
                <LinkPreview frameTags={frameTags} metaTags={metaTags} url={url} />
            )} */}
        </div>
    );
};

export default EmbedUrls;