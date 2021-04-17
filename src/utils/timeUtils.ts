export const timestampFromSeconds = function (seconds: number): string {
  if (seconds >= 3600) {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
  } else {
    return new Date(seconds * 1000).toISOString().substr(14, 5)
  }
}

export const timestampFromDateTime = (dateTime: string): string =>
  new Date(Date.parse(dateTime)).toLocaleTimeString()

export const timeWithoutSeconds = (time: string) => time.replace(/:[^:]*$/, "")

export const getSecondsFromTime = (time: string) => time.split(":").pop()
