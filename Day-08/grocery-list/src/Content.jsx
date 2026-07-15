//Props in React
//https://www.w3schools.com/react/react_props.asp

const Content = (props) => {
  return (
    <main>

        <h2>Greetings from  {props.name}</h2>
        <p>Im a {props.age} year old full stack developer</p>


    </main>
  )
}

export default Content