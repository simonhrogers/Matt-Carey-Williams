import type { 
  ScenePayload,
  SettingsPayload,
} from '@/types'
import ExhibitionPage from '@/components/shared/ExhibitionPage'

export interface ScenePageProps {
  data: ScenePayload | null
  settings: SettingsPayload | null
}

export function ScenePage({ data, settings }: ScenePageProps) {
  return (
    <>
      <PageHead data={data} settings={settings} />
      <ExhibitionPage 
        exhibition={data}
        label="Scene"
      />
    </>
  )
}

export default ScenePage
