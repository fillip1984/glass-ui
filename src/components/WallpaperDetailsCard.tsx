"use client";

import { Button } from "./ui/button";

export default function WallpaperDetailsCard({
  refreshWallpaper,
}: {
  refreshWallpaper: () => Promise<void>;
}) {
  return (
    <div className="glass-card rounded-lg p-2">
      <Button onClick={refreshWallpaper}>New wallpaper</Button>
    </div>
  );
}
