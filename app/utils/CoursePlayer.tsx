import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  title: string;
  videoUrl: string;
};

const CoursePlayer: FC<Props> = ({ title, videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post(`https://smart-study-server-s4g2.vercel.app/api/v1/getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
      });
  }, [videoUrl]);

  return (
    <div style={{ paddingTop: "40%", position: "relative", overflow: 'hidden' }}>
      {videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=LM0xz1XAOUwPYwue`}
          style={{
            border: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
