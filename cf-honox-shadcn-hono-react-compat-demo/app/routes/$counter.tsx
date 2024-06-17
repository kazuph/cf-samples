import { useState } from 'hono/jsx'
import { Button } from "@/components/ui/button"


export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div className="text-center">
      <p className="text-2xl font-bold">{count}</p>
      <Button variant="outline" onClick={() => setCount(count + 1)}>Increment</Button>
    </div>
  )
}
