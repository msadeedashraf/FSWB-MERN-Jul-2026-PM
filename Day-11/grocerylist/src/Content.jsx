import { useState } from "react"

const Content = () => {


  const [name, setName] = useState("Sadeed")


    const handleNameChnage = () => {
    
        const myname = ["Frank", "Hazla", "Sara", "Asif", "Umar"]
        
        const i = Math.floor(Math.random()*5)
        //return myname[i]
        setName(myname[i])


    }

  return (
    <main>
        <p>Hello {name}</p>
        <button onClick={handleNameChnage} >Change Name</button>
    </main>
  )
}

export default Content