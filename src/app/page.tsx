"use client"
import React from "react"
import styles from "./page.module.scss"
import Uploader from "@/components/Uploader"
import PathArray from "@/components/Pathfinder/PathArray"
import { useFindPath } from "@/hooks/useFindPath"
import { useFileUpload } from "@/hooks/useFileUpload"
import Heading from "./_components/Heading"
import Loader from "@/components/UI/Loader"

// Texts shouldn't be hard-coded, they should come from a json file with the locale as a title
export default function HomePage() {
  const { path, findPathFromData, isLoading, error: pathError } = useFindPath()
  const { error: fileError, handleFileUpload } = useFileUpload(
    ({ grid, start, end }) => {
      findPathFromData(grid, start, end)
    }
  )

  return (
    <div className={styles.root}>
      <Heading label="Pathfinder" />
      <Uploader
        validFormat=".json"
        onUpload={handleFileUpload}
        errorMessage={fileError}
      />
      {isLoading ? (
        <Loader size={24} />
      ) : (
        <PathArray
          title="Path found:"
          path={path}
          errorMessage={pathError}
          className={styles.pathArray}
        />
      )}
    </div>
  )
}
