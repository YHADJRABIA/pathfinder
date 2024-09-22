import { useState, ChangeEvent } from "react";
import { Grid, Coordinate } from "@/types/pathfinder";
import { getErrorMessage } from "@/utils/error";

interface PropTypes {
  grid: Grid;
  start: Coordinate;
  end: Coordinate;
}

type OnFileParsed = (data: PropTypes) => void;

export function useFileUpload(onFileParsed: OnFileParsed) {
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setError(null);
          onFileParsed(json);
        } catch (err) {
          console.error("Error handling file upload:", getErrorMessage(err)); // TODO: fix this with respect to JEST to prevent annoying log
          setError("Invalid JSON format");
        }
      };
      reader.readAsText(file);
    }
  };

  return { error, handleFileUpload };
}
