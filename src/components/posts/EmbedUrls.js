'use client';
import React, { useEffect, useState } from 'react';
import LinkPreview from './PreviewLink';
import axios from 'axios';

const EmbedUrls = ({ data }) => {
    const [url, setUrl] = useState(data)
    const [metaTags, setMetaTags] = useState(null);
    const [frameTags, setFrameTags] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);


    const fetchMetadata = async (url) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`/api/metadata?url=${encodeURIComponent(url)}`);
            console.log(response.data, "resp");
            const { metaTags, frameTags, image, video } = response.data;
            console.log(metaTags, frameTags, image, video,"metaTags, frameTags, image, video");
            setMetaTags(metaTags);
            setFrameTags(frameTags);
            setImage(image);
            setVideo(video);
        } catch (err) {
            setError('Failed to fetch metadata');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMetadata(data)
    }, [data])


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

            {image &&
                <div className="border p-4 rounded shadow-lg bg-white">
                    <img src={url} alt="Preview" className="w-full h-full object-cover" />
                </div>
            }
            {
                video &&
                <div className="border p-4 rounded shadow-lg bg-white">
                    <video src={video} controls className="w-full h-full object-cover"></video>
                </div>
            }

            {(metaTags || frameTags) && (
                <LinkPreview frameTags={frameTags} metaTags={metaTags} url={url} />
            )}
        </div>
    );
};

export default EmbedUrls;