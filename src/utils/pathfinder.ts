import { Coordinate, Grid } from "@/types/pathfinder"

// Check if cell is within bounds and reachable
export const isValidMove = (
  grid: Grid,
  row: number,
  col: number,
  visited: boolean[][]
): boolean => {
  const rows = grid.length
  const cols = grid[0].length
  return (
    row >= 0 &&
    row < rows &&
    col >= 0 &&
    col < cols &&
    grid[row][col] === 0 &&
    !visited[row][col]
  )
}

export const findShortestPath = (
  grid: Grid,
  start: Coordinate,
  end: Coordinate
): Coordinate[] | null => {
  const directions: Coordinate[] = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
  ]

  const rows = grid.length
  const cols = grid[0].length
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  )

  const queue: { position: Coordinate; path: Coordinate[] }[] = []
  queue.push({ position: start, path: [start] })
  visited[start[0]][start[1]] = true

  while (queue.length > 0) {
    const { position, path } = queue.shift()!
    const [row, col] = position

    if (row === end[0] && col === end[1]) {
      return path
    }

    for (const [dr, dc] of directions) {
      const newRow = row + dr
      const newCol = col + dc

      if (isValidMove(grid, newRow, newCol, visited)) {
        visited[newRow][newCol] = true
        queue.push({
          position: [newRow, newCol],
          path: [...path, [newRow, newCol]],
        })
      }
    }
  }

  return null
}

export const formatCoordinateToYX = (coordinate: Coordinate) =>
  `[${coordinate[0]}, ${coordinate[1]}]`
