export type State = {
  year: string
  month: string
  day: string
  location: string
  files: FileList | null
  status: string | null
  loading: boolean
}

export type Action =
  | { type: "SET_YEAR"; value: string }
  | { type: "SET_MONTH"; value: string }
  | { type: "SET_DAY"; value: string }
  | { type: "SET_LOCATION"; value: string }
  | { type: "SET_FILES"; files: FileList | null }
  | { type: "SET_STATUS"; status: string | null }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "RESET" }