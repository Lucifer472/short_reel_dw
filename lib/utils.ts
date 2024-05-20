export const isValidSocial = (url: string) => {
  const instagramPostRegex =
    /(?:http[s]?:\/\/)?(?:www\.)?instagram\.com\/p\/[A-Za-z0-9_-]+\/?/;
  const instagramReelRegex =
    /(?:http[s]?:\/\/)?(?:www\.)?instagram\.com\/reel\/[A-Za-z0-9_-]+\/?/;

  const youtubeShortsRegex =
    /(?:http[s]?:\/\/)?(?:www\.)?youtube\.com\/shorts\/[A-Za-z0-9_-]+\/?/;

  if (youtubeShortsRegex.test(url)) return { success: "shorts" };
  if (instagramPostRegex.test(url)) return { success: "post" };
  if (instagramReelRegex.test(url)) return { success: "reel" };
  return { error: "Invalid URL" };
};

export const validateUrl = (v: string) => {
  try {
    const url = new URL(v);

    return { success: url };
  } catch (error) {
    return { error: "Invalid URL" };
  }
};
