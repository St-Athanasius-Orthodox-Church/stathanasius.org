import { type DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText as ConvertRichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/utilities/ui'

import { YouTubeEmbed } from './YouTubeEmbed'

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md': enableProse,
        },
        className,
      )}
      converters={({ defaultConverters }) => ({
        ...defaultConverters,
        blocks: {
          ...defaultConverters.blocks,
          youtubeEmbed: ({ node }: { node: { fields: { url: string } } }) => (
            <YouTubeEmbed url={node.fields.url} />
          ),
        },
      })}
      {...rest}
    />
  )
}
