"use client";
import React, { useState, useContext, useEffect } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const { user } = useUser();

  const { videoData, setVideoData } = useContext(VideoDataContext);

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue
    }));
  };

  const onCreateClickHhandler = () => {
    getVideoScript();
  };

  const getVideoScript = async () => {
    setLoading(true);
    const prompt =
      "Write a script to generate " +
      formData.duration +
      " seconds video on topic: " +
      formData.topic +
      " along with AI image prompt in " +
      formData.imageStyle +
      " format for each scene and give me result in JSON format with imagePrompt and contentText as field";
    const resp = await axios.post("/api/get-video-script", {
      prompt: prompt
    });
    if (resp.data.result) {
      setVideoData((prev) => ({
        ...prev,
        videoScript: resp.data.result
      }));
      setVideoScript(resp.data.result);
      generateAudioFile(resp.data.result);
    }
  };

  const generateAudioFile = async (videoScript) => {
    let script = "";
    const id = uuidv4();
    videoScript.forEach((item) => {
      script = script + item.contentText + " ";
    });
    const resp = await axios.post("/api/generate-audio", {
      id: id,
      text: script
    });
    if (resp.data.result) {
      setVideoData((prev) => ({
        ...prev,
        audioFileUrl: resp.data.result
      }));
      setAudioFileUrl(resp.data.result);
      generateAudioCaption(resp.data.result, videoScript);
    }
  };

  const generateAudioCaption = async (audioFileUrl, videoScript) => {
    const resp = await axios.post("/api/generate-caption", {
      audioFileUrl: audioFileUrl
    });
    if (resp.data.result) {
      setVideoData((prev) => ({
        ...prev,
        captions: resp.data.result
      }));
      setCaptions(resp.data.result);
      generateImage(videoScript);
    }
  };

  const generateImage = async (videoScript) => {
    let images = [];
    for (const element of videoScript) {
      try {
        const resp = await axios.post("/api/generate-image", {
          prompt: element?.imagePrompt
        });
        images.push(resp.data.result);
      } catch (e) {
        console.log("Error: " + e);
      }
    }
    setVideoData((prev) => ({
      ...prev,
      imageList: images
    }));
    setImageList(images);
    setLoading(false);
  };

  useEffect(() => {
    console.log(videoData);
    if (Object.keys(videoData).length == 4) {
      saveVideoData(videoData);
    }
  }, [videoData]);

  const saveVideoData = async (videoData) => {
    setLoading(true);
    const result = await db.insert(VideoData).values({
      script: videoData?.videoScript,
      audioFileUrl: videoData?.audioFileUrl,
      captions: videoData?.captions,
      imageList: videoData?.imageList,
      createBy: user?.primaryEmailAddress?.emailAddress
    });
    setLoading(false);
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>

      <div className="mt-10 shadow-md p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <Button className="mt-10 w-full" onClick={onCreateClickHhandler}>
          Create the Magic!
        </Button>
      </div>

      <CustomLoading loading={loading} />
    </div>
  );
}

export default CreateNew;
