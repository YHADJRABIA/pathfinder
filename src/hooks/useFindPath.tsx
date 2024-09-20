import { useState } from "react"
import { findShortestPath } from "@/utils/pathfinder"
import { Coordinate, Grid } from "@/types/pathfinder"

export function useFindPath() {
  const [path, setPath] = useState<Coordinate[] | null | undefined>(undefined)

  const findPathFromData = (grid: Grid, start: Coordinate, end: Coordinate) => {
    const foundPath = findShortestPath(grid, start, end)
    setPath(foundPath)
  }

  return { path, findPathFromData }
}
