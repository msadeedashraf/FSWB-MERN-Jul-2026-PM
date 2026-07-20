const Son = (props) => {
  return (
   <div style={{background: 'lightgreen'}}>
      <h2>Son</h2>
      <div>{props.children}</div>
    </div>
  )
}

export default Son