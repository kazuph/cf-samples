// export default createRoute((c) => {
//   return c.render(<h1>{c.env.MY_VARIABLE}</h1>)
// })

import { css } from 'hono/css'
import { createRoute } from 'honox/factory'
import Component from '../islands/component'

const className = css`
  font-family: sans-serif;
`

export default createRoute((c) => {
  return c.render(
    <>
      <h1>{c.env.MY_VARIABLE}</h1>
      <div class={className}>
        <Component />
      </div>
    </>
  )
})
