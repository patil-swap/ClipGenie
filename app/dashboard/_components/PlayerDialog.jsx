import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState();
  const [durationInFrame, setDurationInFrame] = useState(100);
  const router = useRouter();

  useEffect(() => {
    setOpenDialog(playVideo);
    videoId && getVideoData();
  }, [playVideo]);

  const getVideoData = async () => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, videoId));

    setVideoData(result[0]);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Your video is ready!
          </DialogTitle>
        </DialogHeader>
        <Player
          component={RemotionVideo}
          durationInFrames={Number(durationInFrame.toFixed(0))}
          compositionWidth={300}
          compositionHeight={450}
          fps={30}
          inputProps={{
            ...videoData,
            setDurationInFrame: (frameValue) => setDurationInFrame(frameValue)
          }}
          controls={true}
        />
        <DialogFooter className="flex gap-10 items-center mt-10">
          <Button
            className="bg-accent"
            onClick={() => {
              router.replace("/dashboard");
              setOpenDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button>Export</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;
