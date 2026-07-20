

const Mapstudentsnames = () => {

    const myStudentNames = ["Frank", "Hazla", "Sara", "Asif", "Umar", "Andy"]

  return (
    <div>
        <h1>Student in the Class </h1>

        <ul>
             {myStudentNames.map(  (s) => <li>I'm {s} student at cbc</li> )     }   
        </ul>


    </div>
  )
}

export default Mapstudentsnames