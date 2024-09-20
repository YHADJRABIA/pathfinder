"use client"
import React from "react"
import styles from "./page.module.scss"
import Uploader from "@/components/Uploader"
import PathArray from "@/components/Pathfinder/PathArray"
import { useFindPath } from "@/hooks/useFindPath"
import { useFileUpload } from "@/hooks/useFileUpload"
import Heading from "./_components/Heading"

// Texts shouldn't be hard-coded, they should come from a json file with the locale as a title
export default function HomePage() {
  const { path, findPathFromData } = useFindPath()

  // Initialize useFileUpload with the findPathFromData callback
  const { error, handleFileUpload } = useFileUpload(({ grid, start, end }) => {
    findPathFromData(grid, start, end)
  })

  return (
    <div className={styles.root}>
      <Heading label="Pathfinder" />
      <Uploader
        validFormat=".json"
        onUpload={handleFileUpload}
        errorMessage={error}
      />
      <PathArray title="Path found:" path={path} className={styles.pathArray} />
    </div>
  )
}
