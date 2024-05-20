"use server";
// @ts-ignore
import instagramDl from "@sasmeee/igdl";
import ytdl from "ytdl-core";

import path from "path";
import fs from "fs";

import { isValidSocial } from "@/lib/utils";

export const Download = async (v: string) => {
  const isValid = isValidSocial(v);

  if (isValid.error) {
    return { error: "Not a valid URL for Download" };
  }

  if (isValid.success) {
    if (isValid.success === "shorts") {
      try {
        // Get video info
        const info = await ytdl.getInfo(v);
        // Choose the highest quality format
        const format = ytdl.chooseFormat(info.formats, {
          quality: "highest",
        });

        // Define the path where the video will be saved
        const videoPath = path.join(
          __dirname,
          "..",
          "..",
          "..",
          "..",
          "public",
          "i",
          "yt.mp4"
        );

        // Create a writable stream and pipe the video into it
        const videoStream = ytdl(v, { format: format });
        const writeStream = fs.createWriteStream(videoPath);

        videoStream.pipe(writeStream);

        // Return a promise that resolves when the video has finished downloading
        return new Promise((resolve, reject) => {
          writeStream.on("finish", () => {
            resolve({
              success: "yt",
              path: "/i/yt.mp4",
            });
          });

          writeStream.on("error", (error) => {
            reject({
              error: "Error writing the video file",
            });
          });

          videoStream.on("error", (error) => {
            reject({
              error: "Error downloading the video",
            });
          });
        });
      } catch (error) {
        return { error: "No video found" };
      }
    }
    if (isValid.success === "post") {
      const dataList = await instagramDl(v);
      return { success: "ins", list: dataList };
    }
    if (isValid.success === "reel") {
      const dataList = await instagramDl(v);
      return { success: "ins", list: dataList };
    }
  }

  return { error: "Something went wrong" };
};
