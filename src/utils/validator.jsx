const validateField = (configMethod, inputValue, configuration) => {
  let ifError;
  switch (configMethod) {
    case "isRequired":
      ifError = inputValue === "";
      break;
    case "isNumber":
      const regExNumber = /\d+/g;
      ifError = !regExNumber.test(inputValue);
      break;
    case "setLength":
      ifError = inputValue.length !== configuration.len;
      break;
    case "setMin":
      ifError = +inputValue < configuration.min;
      break;
    case "setMax": {
      ifError = +inputValue > configuration.max;
      break;
    }
    case "isLink": {
      const regExLink = /^(\S+:\/\/\S+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal)/g;
      ifError = !regExLink.test(inputValue);
      break;
    }
    default:
      console.error("Error validate form");
      break;
  }
  if (ifError) return configuration.message;
};

export const validator = (data, config) => {
  const errors = {};
  for (const fieldName in data) {
    for (const configMethod in config[fieldName]) {
      const error = validateField(
        configMethod,
        data[fieldName],
        config[fieldName][configMethod]
      );

      if (error) {
        !errors[fieldName] && (errors[fieldName] = error);
      }
    }
  }
  return errors;
};
