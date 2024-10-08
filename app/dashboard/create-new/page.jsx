"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();

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
    const result = await axios
      .post("/api/get-video-script", {
        prompt: prompt
      })
      .then((resp) => {
        generateAudioFile(resp.data.result);
      });
  };

  const generateAudioFile = async (videoScript) => {
    let script = "";
    const id = uuidv4();
    videoScript.forEach((item) => {
      script = script + item.contentText + " ";
    });
    console.log(script);
    const result = await axios
      .post("/api/generate-audio", {
        id: id,
        text: script
      })
      .then((resp) => {
        setAudioFileUrl(resp.data.result);
        generateAudioCaption(resp.data.result);
      });
  };

  const generateAudioCaption = async (audioFileUrl) => {
    const result = await axios
      .post("/api/generate-caption", {
        audioFileUrl: audioFileUrl
      })
      .then((resp) => {
        setCaptions(resp.data.result);
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
