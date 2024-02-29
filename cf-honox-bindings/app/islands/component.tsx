import { hc } from 'hono/client'
import { useState } from 'hono/jsx'
import type { AppType } from '../routes/api'

export default function Component() {
  const [prompt, setPrompt] = useState('1girl and cat, in town')
  const [numSteps, setNumSteps] = useState(10)
  const [guidance, setGuidance] = useState(1.5)
  const [photos, setPhotos] = useState<{ id: string, src: string }[]>([])
  const client = hc<AppType>('/api')

  const fetchApi = async () => {
    console.log('fetchApi')
    const res = await client.image.$get({
      query: {
        prompt,
        num_steps: numSteps.toString(),
        guidance: guidance.toString(),
      }
    })

    const blob = await res.blob()
    // idはunixtime
    const id = new Date().getTime().toString()
    const src = URL.createObjectURL(blob);

    setPhotos([{ id, src }, ...photos])
  }

  return (
    <div>
      <p>Cloudflare SDXL Lightning Tester</p>
      <label for="prompt">Prompt: </label>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt((e.target as HTMLInputElement).value)}
        placeholder="input prompt"
      />
      <label for="numSteps">steps: </label>
      <input
        type="number"
        value={numSteps}
        onChange={(e) => setNumSteps(Number((e.target as HTMLInputElement).value))}
        placeholder="num steps"
      />
      <label for="guidance">guidance: </label>
      <input
        type="number"
        value={guidance}
        onChange={(e) => setGuidance(Number((e.target as HTMLInputElement).value))}
        placeholder="guidance"
      />
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={() => fetchApi()}>Send</button>
      <br />
      {photos?.map((photo) => <img key={`photo-${photo.id}`} src={photo.src} alt="generated" width="480px" />)}
    </div>
  )
}
