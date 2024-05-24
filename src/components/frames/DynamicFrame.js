import Image from 'next/image';
import React from 'react';

const DynamicFrame = ({ metadata }) => {
    const {
        description,
        'fc:frame:image': frameImage,
        'fc:frame:image:aspect_ratio': aspectRatio,
        'og:title': ogTitle,
        'og:description': ogDescription,
        'og:image': ogImage,
        'og:url': ogUrl,
        ...buttons
    } = metadata;
 
    const renderButtons = () => {
        const buttonElements = [];
        for (let i = 1; buttons[`fc:frame:button:${i}`]; i++) {
            const buttonText = buttons[`fc:frame:button:${i}`];
            const buttonAction = buttons[`fc:frame:button:${i}:action`];
            const buttonTarget = buttons[`fc:frame:button:${i}:target`];

            buttonElements.push(
                <button
                    key={i}
                    onClick={() => {
                        if (buttonAction === 'post_redirect' && buttonTarget) {
                            window.location.href = buttonTarget;
                        } else if (buttonAction === 'post' && buttonTarget) {
                            // Handle other button actions here
                            window.open(buttonTarget, '_blank');
                        }
                    }}
                    className="px-4 w-full py-2 mb-2 font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:border-gray-400"
                >
                    {buttonText}
                </button>
            );
        }
        return buttonElements;
    };

    return (
        <div className="max-w-4xl mx-auto my-2 bg-white border border-gray-300 rounded-lg  overflow-hidden">
            {frameImage && (
                <div className="relative aspect-w-1 aspect-h-1">
                    <Image
                        src={frameImage}
                        alt={ogTitle} 
                        height={200}
                        width={200}
                        className="w-full h-auto"
                    />
                </div>
            )}
            <div className="p-2 rounded-b-lg bg-gray-300 flex justify-between">
                {/* {ogTitle && <h2 className="text-2xl font-bold">{ogTitle}</h2>}
                {description && <p className="mt-2 text-gray-600">{description}</p>}
                {ogDescription && <p className="mt-2 text-gray-600">{ogDescription}</p>}
                {ogUrl && (
                    <a
                        href={ogUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-blue-500"
                    >
                        {ogUrl}
                    </a>
                )} */}
                 {renderButtons()} 
            </div>
        </div>
    );
};

export default DynamicFrame;