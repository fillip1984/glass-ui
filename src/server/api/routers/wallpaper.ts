import { env } from "~/env";

/**
 * Fetches a random wallpaper from the Unsplash API based on the provided query (comma-separated list of keywords) and orientation.
 */
export const getWallpaper = async ({
  query,
  orientation,
}: {
  query: string;
  orientation: "landscape" | "portrait" | "squarish";
}): Promise<WallpaperDetails> => {
  //example: https://api.unsplash.com/photos/random?query=nature,snow,dark&orientation=landscape&count=5&client_id=thisIsYourAccessKey
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${query}&orientation=${orientation}&client_id=${env.UNSPLASH_ACCESS_KEY}`,
  );
  if (!response.ok) {
    throw new Error("Failed to retrieve wallpaper");
  }
  const data = (await response.json()) as WallpaperResponse;
  return {
    id: data.id,
    width: data.width,
    height: data.height,
    color: data.color,
    blurHash: data.blur_hash,
    description: data.description,
    altDescription: data.alt_description,
    likes: data.likes,
    views: data.views,
    urls: {
      full: data.urls.full,
      regular: data.urls.regular,
      small: data.urls.small,
    },
    unsplashUrl: data.links.html,
    user: {
      id: data.user.id,
      name: data.user.name,
      username: data.user.username,
      unsplashProfileUrl: data.user.links.html,
      profileImageUrls: {
        small: data.user.profile_image.small,
        medium: data.user.profile_image.medium,
        large: data.user.profile_image.large,
      },
    },
  };
};

export interface WallpaperDetails {
  id: string;
  width: number;
  height: number;
  color: string;
  blurHash: string;
  description: string | null;
  altDescription: string | null;
  likes: number;
  views: number;
  urls: {
    full: string;
    regular: string;
    small: string;
  };
  unsplashUrl: string;
  user: {
    id: string;
    name: string;
    username: string;
    unsplashProfileUrl: string;
    profileImageUrls: {
      small: string;
      medium: string;
      large: string;
    };
  };
}

interface WallpaperResponse {
  id: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  likes: number;
  views: number;
  urls: {
    full: string;
    regular: string;
    small: string;
  };
  links: {
    html: string;
  };
  user: {
    id: string;
    name: string;
    username: string;
    links: {
      html: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
  };
}
