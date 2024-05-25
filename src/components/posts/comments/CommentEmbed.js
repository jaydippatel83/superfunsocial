import React from 'react';
import EmbedUrls from '../EmbedUrls';
import RepostCast from '../RepostCast';

const CommentEmbed = ({ embeds }) => {
    return (
        <>
            {embeds.map((embed, index) => {
                 return <>
                 {embed?.cast_id &&
                     <RepostCast key={index} id={embed.cast_id.fid} hash={embed.cast_id.hash} classId="max-w-md mr-auto" />
                 }
                 {
                     embed.url && <EmbedUrls key={index} data={embed.url} lable="max-w-md mr-auto"/>
                 }
             </>
            })}
        </>
    );
};

export default CommentEmbed;