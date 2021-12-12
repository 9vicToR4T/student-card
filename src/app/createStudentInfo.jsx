import React, { useEffect, useState } from "react";
import InputText from "./inputText";
import { validator } from "../utils/validator";
import { Link, useParams } from "react-router-dom";

const CreateStudentInfo = () => {
  const { keyName } = useParams();
  let dataDefault = {
    firstName: "",
    lastName: "",
    birthYear: "",
    portfolio: "",
  };
  let keyForKey;
  if (keyName) {
    const { localStorage } = window;
    const getStudentInfo = JSON.parse(localStorage.getItem(keyName));
    dataDefault = {
      firstName: getStudentInfo["firstName"],
      lastName: getStudentInfo.lastName,
      birthYear: getStudentInfo.birthYear,
      portfolio: getStudentInfo.portfolio,
    };
    keyForKey = getStudentInfo.keyName;
  }

  const [data, setData] = useState(dataDefault);
  const [errors, setErrors] = useState({});

  const validateConfig = {
    firstName: {
      isRequired: {
        message: "You must to write your first name",
      },
    },
    lastName: {
      isRequired: {
        message: "You must to write your last name",
      },
    },
    birthYear: {
      isRequired: {
        message: "You must to write your year of birth",
      },
      isNumber: {
        message: "It is not a number",
      },
      setLength: {
        message: "The year consists of four digits",
        len: 4,
      },
      setMin: {
        message: "Wrong year",
        min: 1900,
      },
      setMax: {
        message: "Wrong year",
        max: 2022,
      },
    },
    portfolio: {
      isRequired: {
        message: "You must to write your portfolio link",
      },
      isLink: {
        message: "It must to be a link",
      },
    },
  };
  const validate = () => {
    const getErrors = validator(data, validateConfig);
    setErrors(getErrors);
    return Object.keys(getErrors).length === 0;
  };
  useEffect(() => {
    validate();
  }, [data]);

  const isValid = Object.keys(errors).length === 0;

  const handleData = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const randomKey = keyForKey || Math.random();
  const handleSubmit = () => {
    data["keyName"] = randomKey;
    const objToString = JSON.stringify(data);
    localStorage.setItem(`${randomKey}`, objToString);
    setData({ firstName: "", lastName: "", birthYear: "", portfolio: "" });
  };
  // const disabled = !isValid ? 'pe-none' : '';
  const handleButtonCss = () =>{
    return "btn btn-primary " + `${!isValid ? 'disabled' : ''}`;
  }
  return (
    <form className="d-flex container col-md-6 offset-md-3 col-lg-6 offset-lg-3 shadow p-4 mt-4">
      <div className="row">
        <h2>Student's information: </h2>
        <InputText
          id="firstName"
          labelTitle="First Name"
          value={data.firstName}
          errors={errors.firstName}
          onWriteData={handleData}
        />
        <InputText
          id="lastName"
          errors={errors.lastName}
          labelTitle="Last Name"
          value={data.lastName}
          onWriteData={handleData}
        />
        <InputText
          id="birthYear"
          labelTitle="Birth Year"
          value={data.birthYear}
          errors={errors.birthYear}
          onWriteData={handleData}
        />
        <InputText
          id="portfolio"
          labelTitle="Portfolio"
          value={data.portfolio}
          errors={errors.portfolio}
          onWriteData={handleData}
        />
        <div className="d-flex flex-column mt-3">
          {/* <button
            className="btn btn-primary"
            onClick={handleSubmit}
            type="button"
            disabled={!isValid}
          > */}
          <Link
            to="/list"
            disabled={!isValid}
            className={handleButtonCss()}
            onClick={handleSubmit}
            
          >
            {keyName ? "Update" : "Create"}
          </Link>
          {/* </button> */}
        </div>
      </div>
    </form>
  );
};

export default CreateStudentInfo;
