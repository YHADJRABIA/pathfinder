import { Coordinate, Grid } from "@/types/pathfinder";
import {
  findShortestPath,
  formatCoordinateToYX,
  isValidMove,
} from "./pathfinder";

describe("isValidMove", () => {
  const grid: Grid = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 0, 0],
  ];
  const visited: boolean[][] = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ];

  it("should return true for a valid move", () => {
    expect(isValidMove(grid, 1, 1, visited)).toBe(true);
  });

  it("should return false for a cell out of bounds", () => {
    expect(isValidMove(grid, -1, 0, visited)).toBe(false); // negative index
    expect(isValidMove(grid, 3, 0, visited)).toBe(false); // row out of bounds
    expect(isValidMove(grid, 0, 3, visited)).toBe(false); // column out of bounds
  });

  it("should return false for a blocked cell", () => {
    expect(isValidMove(grid, 0, 1, visited)).toBe(false); // cell has 1 (blocked)
  });

  it("should return false for an already visited cell", () => {
    visited[1][1] = true;
    expect(isValidMove(grid, 1, 1, visited)).toBe(false); // cell already visited
  });
});

describe("findShortestPath", () => {
  it("should return the shortest path between two points", () => {
    const grid: Grid = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    const start: Coordinate = [0, 0];
    const end: Coordinate = [2, 2];
    const expectedPath: Coordinate[] = [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
      [2, 2],
    ];
    expect(findShortestPath(grid, start, end)).toEqual(expectedPath);
  });

  it("should return null if no path exists", () => {
    const grid: Grid = [
      [0, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ];
    const start: Coordinate = [0, 0];
    const end: Coordinate = [2, 2];
    expect(findShortestPath(grid, start, end)).toBeNull();
  });

  it("should handle start and end at the same point", () => {
    const grid: Grid = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    const start: Coordinate = [1, 1];
    const end: Coordinate = [1, 1];
    const expectedPath: Coordinate[] = [[1, 1]];
    expect(findShortestPath(grid, start, end)).toEqual(expectedPath);
  });
});

describe("formatCoordinateToYX", () => {
  it("should format coordinates correctly", () => {
    const coordinate: Coordinate = [2, 3];
    expect(formatCoordinateToYX(coordinate)).toBe("[2, 3]");
  });

  it("should handle negative coordinates", () => {
    const coordinate: Coordinate = [-1, -2];
    expect(formatCoordinateToYX(coordinate)).toBe("[-1, -2]");
  });

  it("should handle zero coordinates", () => {
    const coordinate: Coordinate = [0, 0];
    expect(formatCoordinateToYX(coordinate)).toBe("[0, 0]");
  });
});
