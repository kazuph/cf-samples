import { createRoute } from 'honox/factory'
import Counter from './$counter'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Mail } from "lucide-react"
import { Header } from '@/components/Header'


export default createRoute((c) => {
  const name = c.req.query('name') ?? 'Hono'
  return c.render(
    <>
      <Header />
      <section className="container flex pt-32 grid grid-cols-2 gap-10 xl:grid-cols-3">

        <Textarea placeholder="Type your message here." />
        <Button>
          <Mail className="mr-2 h-4 w-4" /> Login with Email
        </Button>
        <Counter />
      </section>
    </>
    ,
    { title: name }
  )
})
