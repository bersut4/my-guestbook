const THUM_IO_MARKER = '/get/'
const MOBILE_VIEWPORT_WIDTH = 420

export const getMobileThumbnailUrl = (thumbnailUrl) => {
  const markerIndex = thumbnailUrl.indexOf(THUM_IO_MARKER)
  if (markerIndex === -1) return thumbnailUrl

  const insertAt = markerIndex + THUM_IO_MARKER.length
  return `${thumbnailUrl.slice(0, insertAt)}width/${MOBILE_VIEWPORT_WIDTH}/${thumbnailUrl.slice(insertAt)}`
}
