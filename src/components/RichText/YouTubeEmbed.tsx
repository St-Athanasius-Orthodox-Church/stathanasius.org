import { getYouTubeVideoId } from '@/utilities/getYouTubeVideoId'

type Props = {
  url: string
}

export function YouTubeEmbed({ url }: Props) {
  const videoId = getYouTubeVideoId(url)

  if (!videoId) return null

  return (
    <div className="my-8 aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}
