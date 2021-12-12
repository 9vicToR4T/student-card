import React from "react";
import { Link } from "react-router-dom";

const student = (keyName, firstName, lastName, year, portfolio) => {
	
  return (
    <div className='shadow m-3 p-3 text-center'>
      <details>
        <summary>
          {firstName} {lastName}
        </summary>
        <div>
          <div>First Name: {firstName.toUpperCase()}</div>
          <div>Last Name: {lastName.toUpperCase()}</div>
          <div>
            Age: {year}, {new Date().getFullYear() - year} years old
          </div>
          <div>
            Portfolio:{" "}
            <a href={`${portfolio}`} target="_blank">
              {portfolio}
            </a>
          </div>
        </div>
        <button className="btn btn-warning" type="button">
          <Link to={`/${keyName}`}>Update ifo</Link>
        </button>
      </details>
    </div>
  );
};

const ListOfStudents = () => {
  const studentsArr = [];
  const len = window.localStorage.length;
  if(len === 0) return 'No students in the list. Create new card now!'
  for (let i = 0; i < len; i++) {
    const { localStorage } = window;
	const userKey = localStorage.key(i);
	const userObj = JSON.parse(localStorage.getItem(userKey));
    studentsArr.push(userObj);
  }
  return (
    <div className="container mt-3">
	  {studentsArr.map((el) =>
	  <div key={el.firstName}>
		  {student(el.keyName, el.firstName, el.lastName, el.birthYear, el.portfolio)}
	  </div>
        
      )}
    </div>
  );
};

export default ListOfStudents;
