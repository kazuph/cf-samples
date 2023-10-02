import { Hono } from 'hono'
import { Ai } from '@cloudflare/ai'

type Bindings = {
  AI: any
}

type Answer = {
  response: string
}

type Message = {
  content: string
  rolo: string
}



const app = new Hono<Bindings>()

app.get('/', (c) => {
  return c.html(
    <div>
      <h1>About me</h1>
      <h2>Favorites</h2>
      <ul>
        <li>Programming</li>
        <li>Music</li>
        <li>Reading</li>
      </ul>
    </div>
  )
})

app.get('/ai', async (c) => {
  const ai = new Ai(c.env.AI)
  const answer: Answer = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
    messages: [
      {
        role: 'user',
        content: `What is Cloudflare Workers. You respond in less than 100 words.`
      }
    ]
  })
  return c.text(answer.response)
})

export default app
