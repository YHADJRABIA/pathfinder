import { getErrorMessage } from "@/utils/error"
import { findShortestPath } from "@/utils/pathfinder"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate incoming data
    if (!body || !body.grid || !body.start || !body.end) {
      return NextResponse.json(
        { message: "Invalid input data", success: false },
        { status: 400 }
      )
    }

    const { grid, start, end } = body

    // Call the pathfinding logic
    const path = findShortestPath(grid, start, end)

    if (!path) {
      return NextResponse.json(
        { message: "No path found", success: false },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: "Path found successfully",
      success: true,
      path,
    })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
