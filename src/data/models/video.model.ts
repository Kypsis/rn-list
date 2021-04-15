export interface VideoModel {
  title: string
  data: DataModel
}

export interface DataModel {
  dateTime: string
  fileName: string
  durationInSeconds: number
  videoUrl: string
  thumbnailUrl: string
}
