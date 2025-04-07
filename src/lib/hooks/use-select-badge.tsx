import { useState } from "react";

export const useSelectBadge = (initialBadges: string[]) => {
  const [selectedBadge, setSelectedBadge] = useState<string[]>(
    initialBadges || []
  );

  const toggleSelectedBadge = (badgeId: string) => {
    setSelectedBadge((prev) => {
      if (prev.includes(badgeId)) {
        return prev.filter((id) => id !== badgeId);
      } else {
        return [...prev, badgeId];
      }
    });
  };

  return { selectedBadge, toggleSelectedBadge };
};
