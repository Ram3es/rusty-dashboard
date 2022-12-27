import React, { useState } from 'react'
import './App.css'

function App (): JSX.Element {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Awesome Rusty dashboard, TS and tailwind added
      </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
