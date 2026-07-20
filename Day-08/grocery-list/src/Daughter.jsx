

const Daughter = (props) => {
  return (
     <div style={{background: 'lightblue'}}>
      <h2>Daughter</h2>
      <div>{props.children}</div>
    </div>
  )
}

export default Daughter