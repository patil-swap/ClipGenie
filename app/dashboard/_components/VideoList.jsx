import React, { useState } from "react";
import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import PlayerDialog from "./PlayerDialog";

function VideoList({ videoList }) {
  const [openPlayerDialog, setOpenPlayerDialog] = useState(false);
  const [videoId, setVideoId] = useState();
  return (
    <div className="mt-10 gap-5 grid grid-col-2 md:grid-col-3 lg:grid-cols-4">
      {videoList?.map((video, index) => (
        <div
          className="cursor-pointer hover:scale-105 transition-all"
          onClick={() => {
            setOpenPlayerDialog(Date.now);
            setVideoId(video?.id);
          }}
        >
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={250}
            compositionHeight={350}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            style={{
              borderRadius: 15
            }}
            inputProps={{
              ...video,
              setDurationInFrame: (v) => console.log(v)
            }}
          />
        </div>
      ))}
      <PlayerDialog playVideo={openPlayerDialog} videoId={videoId} />
    </div>
  );
}

export default VideoList;
