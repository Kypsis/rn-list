import React, { useState, useEffect, createContext, FC } from "react"
import { VideoModel } from "../models/video.model"

export const VideoDataContext = createContext(null)

const VideoDataProvider: FC = ({ children }) => {
  const [data, setData] = useState<VideoModel[]>([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsError(false)
    setIsLoading(true)

    try {
      const response = await fetch(
        "https://europe-central2-supervaisor-test.cloudfunctions.net/getVideos",
      )
      const json = await response.json()

      setData(json)
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VideoDataContext.Provider
      value={{
        data,
        isError,
        isLoading,
        fetchData,
      }}
    >
      {children}
    </VideoDataContext.Provider>
  )
}

export default VideoDataProvider
