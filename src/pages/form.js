import * as React from "react"
export default function FormPage() {
  const [value, setValue] = React.useState({})
  const [serverResponse, setServerResponse] = React.useState(``)
  // Listen to form changes and save them.
  function handleChange(e) {
    value[e.target.id] = e.target.value
    setServerResponse(``)
    setValue({ ...value })
  }
  // When the form is submitted, send the form values
  // to our function for processing.
  async function onSubmit(e) {
    e.preventDefault()
    const response = await window
      .fetch(`https://api.datamuse.com/words?v=es&sp=*`+value.name, {
        method: `GET`,
        headers: {
          "content-type": "application/json",
        }
      })
      .then(res => res.json())
    setServerResponse(response)
  }
  
  return (
    <div>        
        <form onSubmit={onSubmit} method="POST" action="/api/form">
            <label htmlFor="name">Con que rima:</label>
            <input
            type="text"
            id="name"
            value={value[`name`] || ``}
            onChange={handleChange}
            />
            <input type="submit" />
        </form>
        <div>Server response: 
          <ul>
            {Object.keys(serverResponse).map((key, index) => (
              <li key={serverResponse[key].score}>{serverResponse[key].word}</li>
            ))}
          </ul>
        </div>
    </div>
  )
}