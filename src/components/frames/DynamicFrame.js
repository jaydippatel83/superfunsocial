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

    const handleButtonClick = async (buttonAction, buttonTarget) => {
        console.log(`Button clicked: action=${buttonAction}, target=${buttonTarget}`);
        if (buttonAction === 'post_redirect' && buttonTarget) {
            window.location.href = buttonTarget;
        } else if (buttonAction === 'post' && buttonTarget) {
            window.open(buttonTarget, '_blank');
        } else if (buttonAction === 'tx' && buttonTarget) {
            try {
                const response = await fetch(buttonTarget, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                console.log('API call result:', result);
                // Handle the response as needed
            } catch (error) {
                console.error('API call error:', error);
            }
        }
    };

    console.log(metadata,"metadata");
 
    const renderButtons = () => {
        const buttonElements = [];
        for (let i = 1; buttons[`fc:frame:button:${i}`]; i++) {
            const buttonText = buttons[`fc:frame:button:${i}`];
            const buttonAction = buttons[`fc:frame:button:${i}:action`];
            let buttonTarget = buttons[`fc:frame:button:${i}:target`];

            // Replace part of the URL
            if (buttonTarget) {
                buttonTarget = buttonTarget.replace("https://superfunsocial.vercel.app", "http://localhost:3000");
            } 
            buttonElements.push(
                <button
                    key={i}
                    onClick={() => handleButtonClick(buttonAction, buttonTarget)}
                    className="px-4 w-full py-2 mb-2 font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:border-gray-400"
                >
                    {buttonText}
                </button>
            );
        }
        return buttonElements;
    };
    const [aspectWidth, aspectHeight] = aspectRatio.split(':').map(Number);
    return (
        <div className="max-w-4xl mx-auto my-2 bg-white border border-gray-300 rounded-lg  overflow-hidden">
            {frameImage && (
                <div className="relative" style={{ paddingTop: `${(aspectHeight / aspectWidth) * 100}%` }}>
                    <Image
                        src={frameImage}
                        alt={ogTitle}
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0 w-full h-full"
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