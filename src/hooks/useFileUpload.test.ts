import { ChangeEvent } from "react"
import { useFileUpload } from "./useFileUpload"
import { act, renderHook } from "@testing-library/react"
import { getErrorMessage } from "@/utils/error"

describe("useFileUpload", () => {
  const mockOnFileParsed = jest.fn()

  beforeEach(() => {
    mockOnFileParsed.mockClear()
  })

  it("should parse valid JSON and call onFileParsed", () => {
    const { result } = renderHook(() => useFileUpload(mockOnFileParsed))
    const file = new File(
      [
        JSON.stringify({
          grid: [
            [0, 1],
            [0, 0],
          ],
          start: [0, 0],
          end: [1, 1],
        }),
      ],
      "test.json",
      { type: "application/json" }
    )
    const event = {
      target: { files: [file] },
    } as unknown as ChangeEvent<HTMLInputElement>

    act(() => {
      result.current.handleFileUpload(event)
    })

    const reader = new FileReader()
    reader.onload = () => {
      act(() => {
        const data = JSON.parse(reader.result as string)
        expect(mockOnFileParsed).toHaveBeenCalledWith(data)
        expect(result.current.error).toBeNull()
      })
    }
    reader.readAsText(file)
  })

  it("should set an error for invalid JSON", () => {
    const { result } = renderHook(() => useFileUpload(mockOnFileParsed))
    const file = new File(["Invalid JSON"], "test.json", {
      type: "application/json",
    })
    const event = {
      target: { files: [file] },
    } as unknown as ChangeEvent<HTMLInputElement>

    act(() => {
      result.current.handleFileUpload(event)
    })

    const reader = new FileReader()
    reader.onload = () => {
      act(() => {
        try {
          JSON.parse(reader.result as string)
        } catch (err) {
          expect(result.current.error).toBe("Invalid JSON format")
          expect(mockOnFileParsed).not.toHaveBeenCalled()
          console.error("Error handling file upload:", getErrorMessage(err))
        }
      })
    }
    reader.readAsText(file)
  })

  it("should not call onFileParsed if no file is selected", () => {
    const { result } = renderHook(() => useFileUpload(mockOnFileParsed))
    const event = {
      target: { files: [] },
    } as unknown as ChangeEvent<HTMLInputElement>

    act(() => {
      result.current.handleFileUpload(event)
    })

    expect(mockOnFileParsed).not.toHaveBeenCalled()
    expect(result.current.error).toBeNull()
  })
})
