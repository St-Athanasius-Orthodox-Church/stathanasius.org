'use client'

import { useRouter } from 'next/navigation'

import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'

type SpeakerFilterProps = {
  speakers: string[]
  selectedSpeaker: string
}

export function SpeakerFilter({ speakers, selectedSpeaker }: SpeakerFilterProps) {
  const router = useRouter()

  return (
    <form action="/homilies" method="get" className="mb-6 flex items-center gap-4">
      <label htmlFor="speaker-filter" className="text-sm font-medium text-byzantine-blue">
        Filter by speaker:
      </label>
      <NativeSelect
        id="speaker-filter"
        name="speaker"
        defaultValue={selectedSpeaker}
        className="w-[250px]"
        onChange={(event) => {
          const speaker = event.currentTarget.value
          router.push(
            speaker === 'all' ? '/homilies' : `/homilies?speaker=${encodeURIComponent(speaker)}`,
          )
        }}
      >
        <NativeSelectOption value="all">All speakers</NativeSelectOption>
        {speakers.map((speaker) => (
          <NativeSelectOption key={speaker} value={speaker}>
            {speaker}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </form>
  )
}
