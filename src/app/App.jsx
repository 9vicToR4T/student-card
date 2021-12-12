import "../App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ListOfStudents from "./listOfStudents";
import About from "./about";
import CreateStudentInfo from "./createStudentInfo";
// import StudentInfo from './studentInfo'

function App() {
  return (
    <>
      <Router>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/list">
              LIST
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/create">
              Create student card
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About Us
            </Link>
          </li>
        </ul>
        <Routes>
          <Route exact path="/list/*" element={<ListOfStudents />} />
          <Route path="/:keyName" element={<CreateStudentInfo />} />
          <Route path="/create" exact element={<CreateStudentInfo />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
