const InputText = ({ id, labelTitle, value, errors, onWriteData }) => {
  const setClassName = () => {
    return "form-control " + `${errors ? "is-invalid" : ""}`;
  };
  return (
    <div className="d-flex flex-column mt-3 input-group has-validation">
      <label htmlFor={id}>{labelTitle}</label>
      <div className="input-group has-validation">
        <input
          className={setClassName()}
          type="text"
          id={id}
          autoComplete='off'
          name={id}
          value={value}
          onChange={onWriteData}
        />
        <div className="invalid-feedback">{errors}</div>
      </div>
    </div>
  );
};

export default InputText;
