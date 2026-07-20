

const Events2 = () => {
 const namechange = () => {

        const myname = ["Frank", "Hazla", "Sara", "Asif", "Umar"]
        
        const i = Math.floor(Math.random()*5)
        return myname[i]
    }


    const handleClick = () => {

        console.log("Clicked it")
    }
    const handleClick2 = (name) => {

        console.log(`${name} Clicked it`)
    }
    const handleClick3 = (e) => {

        console.log(e)
        console.log(e.target.innerText)

    }

  return (
    
<>

<h1> Hello {namechange()}</h1>

<button onClick={handleClick} >Click it</button>
<button onClick={ () =>  handleClick2('Sadeed')} >Click 2 </button>
<button onClick={ (e) =>  handleClick3(e)} >Click 3 </button>

</>

    
    
  )
}

export default Events2