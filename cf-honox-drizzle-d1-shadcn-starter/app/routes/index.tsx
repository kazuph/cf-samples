import { createInsertSchema } from 'drizzle-zod'
import { createRoute } from 'honox/factory'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { todos } from '@/schema'
import { ToggleTodo } from './todos/[id]/$ToggleTodo'

export default createRoute(async (c) => {
  const results = await c.var.db.select().from(todos).all()

  return c.render(
    <>
      <div className="p-4 bg-white md:shadow">
        <div className="flex items-center mb-4">
          <h1 className="flex-1 text-xl font-bold">
            Tracking {results.length} {results.length === 1 ? 'task' : 'tasks'}
          </h1>
          <form method="POST" action={"/todos/clear_completed"}>
            <button className="text-blue-600 hover:underline" type="submit">
              Clear completed tasks
            </button>
          </form>
        </div>

        {results.length === 0 ? <p className="text-gray-600">No tasks yet. Create one below.</p> : null}

        <ul>
          {results.map((todo) => (
            <li key={todo.id}>
              <ToggleTodo todo={{ ...todo, completed: todo.completed ?? false }} />
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded shadow">
        <form className="flex flex-1 space-y-4" method="post">
          <input
            type="text"
            name="description"
            className="w-full p-4"
            placeholder="📝 Write a new task. Press enter/return to submit"
            autoFocus
            autoComplete="off"
          />
        </form>
      </div>
    </>
  )
})

const insertSchema = createInsertSchema(todos, {
  id: z.undefined()
})

export const POST = createRoute(zValidator('form', insertSchema), async (c) => {
  const data = c.req.valid('form')
  await c.var.db.insert(todos).values(data)
  return c.redirect('/')
})
