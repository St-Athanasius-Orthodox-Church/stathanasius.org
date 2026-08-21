'use client'

import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'

type SpeakerFilterProps = {
  speakers: string[]
  selectedSpeaker: string
}

export function SpeakerFilter({ speakers, selectedSpeaker }: SpeakerFilterProps) {
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
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
      >
        <NativeSelectOption value="all">All speakers</NativeSelectOption>
        {speakers.map((speaker) => (
          <NativeSelectOption key={speaker} value={speaker}>
            {speaker}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <noscript>
        <button type="submit" className="text-sm font-medium text-byzantine-blue underline">
          Apply
        </button>
      </noscript>
    </form>
  )
}
