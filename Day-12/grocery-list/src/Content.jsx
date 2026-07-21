import { useState } from "react"
import {FaTrashAlt } from 'react-icons/fa';

const Content = () => {

    const [items, setItems] = useState([

{  id : 1,
    checked: false,
    item: "Bread"
  },
{  id : 2,
    checked: false,
    item: "Milk"
  },
{  id : 3,
    checked: true,
    item: "eggs"
  }
,{  id : 4,
    checked: false,
    item: "oranges"
  }


    ])


  return (
    <>
  <ul>



{/* {  items.map( () => ()  ) } */}

{  items.map( (i) =>  ( 
    <li className="item" key={i.id}> 
    <input type="checkbox" checked= {i.checked }/>
    <label htmlFor="">{i.item}</label>
    <FaTrashAlt 
              role="button" 
              tabIndex={0}
             />
       </li>

       )  ) }

    
    



  </ul>
    </>
  )
}

export default Content