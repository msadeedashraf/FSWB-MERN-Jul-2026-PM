import './App.css'
import Header from './Header'
import Footer from './Footer'
import Content from './Content'
import { useState, useEffect } from "react";
import AddItem from './AddItem';
import SearchItem from './SearchItem';


function App() {
  const API_URL = 'http://localhost:3000/items';

  //const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')))
  const [items, setItems] = useState([])

  const [newItem, setNewItem] = useState('')
  
  const [search, setSearch] = useState('')
  
  const [fetchError, setFetchError] = useState(null)

  const [isLoading , setIsLoading] = useState(true)

  // useEffect(  
  //   () => {
  //     console.log('hazla') 
  //   } 
  //   ,
  //   []  
  // )


  console.log('before the useeffect')

  useEffect(  
    () => {  
      const fetchItems = async () => {

        try {
          const response = await fetch(API_URL);

          if (!response.ok) throw Error('Did not receive the data')
          const listItems = await response.json();
          console.log(listItems)
          setItems(listItems)
          setFetchError(null)

            //some code here 
        }
        catch (err) {
      //some code here 
      //console.log(err.stack)

      setFetchError(err.message)
        }
        finally 
        {

          setIsLoading(false)


        }

      }


      setTimeout(  () => {  ( async () => await fetchItems() )()}  , 5000)

      
     

     


    } 
    ,
    []  
  )

  //console.log('after the useeffect')





 

  const addItem = (item) => {
    const id = items.length ? items[items.length -1].id+1 : 1;
    const myNewItem = {id, checked: false, item}
    const listItems = [...items, myNewItem]
    setItems(listItems)
  }

  const handleCheck = (id) => {
    //console.log(`key: ${id}:`);
    const listItems = items.map((i) =>
      i.id === id ? { ...i, checked: !i.checked } : i,
    );
    setItems(listItems)  };

  const handleDelete = (id) => {
    // console.log(`Checking delete ${id}`)

    const listItems = items.filter((i) => i.id !== id);
   setItems(listItems)  };

  const handleSubmit = (e) => { 
    e.preventDefault();
    if(!newItem) return;   
    addItem(newItem)
    setNewItem('')    

  }
 

  return (
    <>
    <Header title="Grocery List API" />
    <SearchItem
      search={search}
      setSearch={setSearch}  />
    <AddItem 
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
      />
    <main> 
{isLoading && <p> Loading Items...</p>}
    {fetchError  && <p style={{color:'red'}} > {`Error: ${fetchError}`} </p>}

{!fetchError && !isLoading &&

<Content 
      items={items.filter(item =>((item.item).toLowerCase()).includes(search.toLowerCase() ))}          
      handleCheck = {handleCheck}
      handleDelete = {handleDelete}
    />    

}
    
    <Footer length={items.length}/>
      </main>
    </>
  )
}


export default App
