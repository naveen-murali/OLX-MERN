
export const VALIDATE_DATA = (name, value) => {

  const data = {
    value,
    errorStatus: false,
    error:""
  }

  switch (name) {
    case "name":
      return nameValidation(data);
    
    case "email":
      return emailValidation(data);

    case "phone":
      return phoneValidation(data);

    case "password":
      return passwordValidation(data);

    default:
      break;
  }
}

function nameValidation(data) {
  if (data.value.length < 6) {
    data.error = "Min-length is 6";
    data.errorStatus = true;
  }

  return data;
}

function emailValidation(data) {
  let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  data.value = data.value.trim();

  if (!data.value.match(pattern)) {
    data.errorStatus = true; 
    data.error = "Invalid email";
  }

  return data;
}

function phoneValidation(data) {
  data.value = data.value.trim();
  
  if (!data.value.match(/^[0-9]{10}$/)) {
    data.errorStatus = true;
    data.error = "Phone number should be 10 number long";
  }
  
  return data;
}

function passwordValidation(data) {
  data.value = data.value.trim();

  if (data.value.length < 6) {
    data.errorStatus = true;
    data.error = "Min-length is 6";
  }

  return data;
}
