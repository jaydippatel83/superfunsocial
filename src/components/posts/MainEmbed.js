import React from "react";
import RepostCast from "./RepostCast";
import EmbedUrls from "./EmbedUrls";
import Link from "next/link";

const MainEmbed = ({ data, lable }) => {
  return (
    <>
      {data?.embeds &&
        data.embeds.map((embed, index) => { 
          return (
            <div key={index}>
              {embed?.cast_id && (
                <RepostCast
                  key={index}
                  id={embed.cast_id.fid}
                  hash={embed.cast_id.hash}
                  classId="max-w-4xl mx-auto px-4"
                />
              )}
              {embed.url && (
                <EmbedUrls
                  key={index}
                  data={embed.url}
                  link={`/${data?.author?.username}/${data?.hash}`}
                  lable="max-w-4xl mx-auto px-4"
                />
              )}
            </div>
          );
        })}
    </>
  );
};

export default MainEmbed;
