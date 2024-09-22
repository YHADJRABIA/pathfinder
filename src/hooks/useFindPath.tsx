import { useState } from "react";
import axios from "axios";
import { Coordinate, Grid } from "@/types/pathfinder";
import { getErrorMessage } from "@/utils/error";

export function useFindPath() {
  const [path, setPath] = useState<Coordinate[] | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findPathFromData = async (
    grid: Grid,
    start: Coordinate,
    end: Coordinate,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/find-path", { grid, start, end });

      if (res.data.success) {
        setPath(res.data.path);
      } else {
        setError(getErrorMessage(res));
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return { path, findPathFromData, isLoading, error };
}
