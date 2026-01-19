import { useReducer } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { State, Action } from "@/types/uploads"

const initialState: State = {
  year: "",
  month: "",
  day: "",
  location: "",
  files: null,
  status: null,
  loading: false,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_YEAR":
      return { ...state, year: action.value }
    case "SET_MONTH":
      return { ...state, month: action.value }
    case "SET_DAY":
      return { ...state, day: action.value }
    case "SET_LOCATION":
      return { ...state, location: action.value }
    case "SET_FILES":
      return { ...state, files: action.files }
    case "SET_STATUS":
      return { ...state, status: action.status }
    case "SET_LOADING":
      return { ...state, loading: action.loading }
    case "RESET":
      return initialState
    default:
      return state
  }
}

export function UploadForm() {
  const [state, dispatch] = useReducer(reducer, initialState)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!state.files || state.files.length === 0) {
      dispatch({ type: "SET_STATUS", status: "No files selected" })
      return
    }

    const form = new FormData()
    form.append("year", state.year)
    form.append("month", state.month)
    form.append("day", state.day)
    form.append("location", state.location)

    Array.from(state.files).forEach(file => {
      form.append("files", file)
    })

    dispatch({ type: "SET_LOADING", loading: true })
    dispatch({ type: "SET_STATUS", status: null })

    try {
      const res = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: form,
      })

      if (!res.ok) {
        throw new Error("Upload failed")
      }

      const data = await res.json()
      dispatch({ type: "SET_STATUS", status: `Uploaded ${data.count} photos to ${data.album}` })
    } catch (err) {
      dispatch({ type: "SET_STATUS", status: (err as Error).message })
    } finally {
      dispatch({ type: "SET_LOADING", loading: false })
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border rounded-lg p-6 max-w-xl"
    >
      <h2 className="text-lg font-semibold">Upload Photos</h2>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Year</Label>
          <Input
            type="number"
            required
            value={state.year}
            onChange={e => dispatch({ type: "SET_YEAR", value: e.target.value })}
          />
        </div>

        <div>
          <Label>Month</Label>
          <Input
            type="number"
            required
            value={state.month}
            onChange={e => dispatch({ type: "SET_MONTH", value: e.target.value })}
          />
        </div>

        <div>
          <Label>Day</Label>
          <Input
            type="number"
            required
            value={state.day}
            onChange={e => dispatch({ type: "SET_DAY", value: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label>Location</Label>
        <Input
          type="text"
          required
          value={state.location}
          onChange={e => dispatch({ type: "SET_LOCATION", value: e.target.value })}
        />
      </div>

      <div>
        <Label>Photos or Folder</Label>
        <Input
          type="file"
          multiple
          //@ts-expect-error webkitdirectory is non-standard
          webkitdirectory="true"
          onChange={e => dispatch({ type: "SET_FILES", files: e.target.files })}
        />
      </div>

      <Button type="submit" disabled={state.loading}>
        {state.loading ? "Uploading…" : "Upload"}
      </Button>

      {state.status && (
        <div className="text-sm text-muted-foreground">{state.status}</div>
      )}
    </form>
  )
}
