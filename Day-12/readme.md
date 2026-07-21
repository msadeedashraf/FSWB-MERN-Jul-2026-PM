## Create a grocery-list project

```
npm create vite@latest grocery-list
```

- Create a Header component

```Header.jsx

const Header = () => {

  // const headerStyle = {
  //     backgroundColor:'orange',
  //     color: 'white'
  // };

  return (
    // <header style={headerStyle}>
    <header>
      <h1>Grocery List</h1>
    </header>
  )
}

export default Header
```

- Clean up the App.jsx

```App.jsx

import './App.css'

function App() {
 

  return (
    <>
    
    </>
  )
}

export default App

```

- Clean up the App.css and index.css

- Add the Header Component to the App.jsx

```
import './App.css'
import Header from './Header'
function App() {
 

  return (
    <>
    <Header/>
    
    </>
  )
}

export default App

```

- Create two more components Footer.jsx and Content.jsx

```Footer.jsx



const Footer = () => {

    const today = new Date();

  return (
    <footer>

        <p>Copyright &copy; {today.getFullYear()}</p>
    </footer>
  )
}

export default Footer

```
- Create a Content Componet

```


const Content = () => {


  return (
    <>
    <h1>apples</h1>
    <h1>Bananas</h1>
    </>
  )
}

export default Content
```


- Add the Footer and Content component to the App.jsx

```App.jsx
import './App.css'
import Header from './Header'
import Footer from './Footer'
import Content from './Content

function App() {
 

  return (
    <>
    <Header/>
    <Content/>

    <Footer/>
    </>
  )
}

export default App

```

- Add the grocery items using use state and map functions

```
import { useState } from "react"
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
    <button>del</button>
       </li>

       )  ) }

    
    



  </ul>
    </>
  )
}

export default Content
```

- Add the css to index.css file
  
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 22px;
}

body {
  min-height: 100vh;
  font-family: "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.App {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  max-width: 500px;
  border: 1px solid mediumblue;
  margin: auto;
}

header {
  width: 100%;
  padding: 0 0.25em;
  background-color: mediumblue;
  color: aliceblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

main {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}

footer {
  width: 100%;
  padding: 0.25em;
  background-color: mediumblue;
  color: aliceblue;
  display: grid;
  place-content: center;
}
ul {
  width: 100%;
  list-style: none;
  padding: 0 0.25rem 0.25rem;
}

ul li::before {
  content: "\200B";
}

.item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem 0 0.5rem 0.5rem;
  margin: 0.25rem 0;
  background-color: #eee;
}

.item:first-child {
  margin: 0;
}

.item input[type="checkbox"] {
  text-align: center;
  width: 2.5rem;
  width: 48px;
  min-width: 48px;
  height: 2.5rem;
  height: 48px;
  min-height: 48px;
  cursor: pointer;
  margin-right: 0.5rem;
}

.item input[type="checkbox"]:focus + label {
  text-decoration: underline;
}

.item > label {
  font-size: 0.75rem;
  flex-grow: 1;
}

.item svg {
  width: 48px;
  min-width: 48px;
  height: 36px;
  font-size: 1rem;
  color: steelblue;
  cursor: pointer;
}

.item svg:focus, 
.item svg:hover {
  color: red;
  outline: none;
}

```

- Add React icons 
- [React Icons](https://react-icons.github.io/react-icons/)

```
npm install react-icons --save
```

- Add the react icon to the Content.jsx for changing the del button

```
import { useState } from "react"
import {FaTrashAlt } from 'react-icons/fa';
const Content = () => {

  const [items, setItems] = useState([
    {
      id: 1,
      checked: false,
      item : "Bread"

    }, 
    {
      id: 2,
      checked: false,
      item : "Eggs"
    }

    , 
    {
      id: 3,
      checked: false,
      item : "Milk"
    }

    , 
    {
      id: 2,
      checked: true,
      item : "Eggs"
    }


  ])
  
  return (
    <main>
      <ul>
        {items.map(
          (item) => (

            <li className="item" key={item.id}> 
            <input 
              type="checkbox"
              checked= {item.checked}
             />  
             <label htmlFor="">{item.item}</label>
             <FaTrashAlt 
              role="button" 
              tabIndex={0}
             />
             </li>
          )

        )}
      </ul>

    </main>
  )
}
export default Content
```