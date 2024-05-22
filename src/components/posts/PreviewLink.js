const LinkPreview = ({ frameTags, metaTags, url }) => {
    if (frameTags && frameTags['fc:frame:image']) {
      return (
        <div className="border p-4 rounded shadow-lg bg-white">
          <h1 className="text-xl font-bold">Frame Preview</h1>
          <div
            className="relative"
            style={{ paddingBottom: `${100 / frameTags['fc:frame:image:aspect_ratio']}%` }}
          >
            <img
              src={frameTags['fc:frame:image']}
              alt="Frame Image"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      );
    }
  
    if (metaTags && metaTags['og:title']) {
      return (
        <div className="border p-4 rounded shadow-lg bg-white">
          <h1 className="text-xl font-bold">{metaTags['og:title']}</h1>
          <p className="text-gray-700">{metaTags['og:description']}</p>
          {metaTags['og:image'] && (
            <img
              src={metaTags['og:image']}
              alt={metaTags['og:image:alt'] || 'Image'}
              className="mt-4 w-full"
            />
          )}
          <a href={metaTags['og:url'] || url} className="text-blue-500 mt-4 block">
            {metaTags['og:url'] || url}
          </a>
        </div>
      );
    }
  
    return (
      <div className="border p-4 rounded shadow-lg bg-white">
        <h1 className="text-xl font-bold">No metadata found</h1>
        <p>Unable to fetch frame or OpenGraph metadata from the provided URL.</p>
      </div>
    );
  };
  
  export default LinkPreview;
  