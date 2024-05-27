import React from "react";
import RepostCast from "./RepostCast";
import EmbedUrls from "./EmbedUrls";
import Link from "next/link";

const MainEmbed = ({ data, lable }) => {
  console.log(data, "MainEmbed");
  return (
    <Link href={`/${data?.author?.username}/${data?.hash}`}>
      {data?.embeds &&
        data.embeds.map((embed, index) => {
          return (
            <>
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
                  lable="max-w-4xl mx-auto px-4"
                />
              )}
            </>
          );
        })}
    </Link>
  );
};

export default MainEmbed;
