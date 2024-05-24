import React from 'react';
import RepostCast from './RepostCast';
import EmbedUrls from './EmbedUrls';

const MainEmbed = ({ data ,lable}) => { 
    return (
        <div> 
            {data?.embeds && data.embeds.map((embed, index) => {
                return <>
                    {embed?.cast_id &&
                        <RepostCast key={index} id={embed.cast_id.fid} hash={embed.cast_id.hash} />
                    }
                    {
                        embed.url && <EmbedUrls key={index} data={embed.url} lable={lable}/>
                    }
                </>
            })}
        </div>
    );
};

export default MainEmbed;