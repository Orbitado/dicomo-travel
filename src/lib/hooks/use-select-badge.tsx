import { useState } from "react";

export const useSelectBadge = (badgeIds: string[]) => {
  const [selectedBadge, setSelectedBadge] = useState<string[]>(
    badgeIds ? badgeIds.map((a) => a.trim()) : []
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
