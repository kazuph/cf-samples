import { useState } from 'react'

interface TodoProps {
  todo: {
    id: number;
    description: string;
    completed: boolean;
  }
}

export function ToggleTodo({ todo }: TodoProps) {
  const [isCompleted, setIsCompleted] = useState(todo.completed)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(e.target.checked)
    // フォームの送信
    e.currentTarget.form?.submit()
  }

  return (
    <form method="POST" action={`/todos/${todo.id}/toggle`}>
      <input
        type="checkbox"
        name="completed"
        checked={isCompleted}
        onChange={handleChange}
      />{' '}
      {todo.description}
    </form>
  )
}
