import axios from 'axios';
import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export  async function GET(req, res) {
    const { searchParams } = new URL(req.url, 'http://example.com');
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL is required' });
    }
  try {

    const headResponse = await axios.head(url);
    const contentType = headResponse.headers['content-type'];

    // Check if the URL is a direct link to an image
    if (contentType.startsWith('image/')) {
        return NextResponse.json({ metaTags: { 'og:image': url }, frameTags: {}, image: url, video: null ,status: 200});
    }

    // Check if the URL is a direct link to a video
    if (contentType.startsWith('video/')) {
        return NextResponse.json({ metaTags: { 'og:video': url }, frameTags: {}, image: null, video: url, status: 200  });
    } 

    const isHLS = /\.m3u8$/i.test(url);
    if (isHLS) {
      return NextResponse.json({ metaTags: { 'og:video': url }, frameTags: {}, image: null, video: url, status: 200 });
    }

    const response = await axios.get(url, { maxRedirects: 5 });
    const finalUrl = response.request.res.responseUrl;
    const htmlString = response.data;
    const $ = cheerio.load(htmlString);
    const metaTags = {};
    const frameTags = {};
    const twitterTags = {};


    $('meta').each((_, element) => {
      const property = $(element).attr('property') || $(element).attr('name');
      const content = $(element).attr('content');
      if (property && content) {
        metaTags[property] = content;
      }
    }); 

    $('meta').each((_, element) => {
        const name = $(element).attr('name');
        const content = $(element).attr('content');
        if (name && name.startsWith('twitter:')) {
          twitterTags[name] = content;
        }
      });
 
    const frameImage = $('meta[property="fc:frame:image"]').attr('content');
    const aspectRatio = $('meta[property="fc:frame:image:aspect_ratio"]').attr('content');
    const frameVideo = $('meta[property="fc:frame:video"]').attr('content');
    const frameVideoType = $('meta[property="fc:frame:video:type"]').attr('content');

    if (frameImage && aspectRatio) {
      frameTags['fc:frame:image'] = frameImage;
      frameTags['fc:frame:image:aspect_ratio'] = aspectRatio;
    }
    if (frameVideo && frameVideoType) {
      frameTags['fc:frame:video'] = frameVideo;
      frameTags['fc:frame:video:type'] = frameVideoType;
    }

    return NextResponse.json({ metaTags, frameTags, twitterTags, image: null, video: null , status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch metadata' });
  }
}
