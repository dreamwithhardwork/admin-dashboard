export const postRequest = (payload) => {
  console.log(JSON.stringify(payload))
    let header =  {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }
    let jwt = localStorage.getItem("token");
    if(jwt !== null && jwt !== undefined && jwt !== "undefined")
    header.headers.Authorization = "Bearer "+localStorage.getItem("token");
    return header;
  }

  export const putRequest = (payload) => {
    console.log(JSON.stringify(payload))
      let header =  {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
      let jwt = localStorage.getItem("token");
      if(jwt !== null && jwt !== undefined && jwt !== "undefined")
      header.headers.Authorization = "Bearer "+localStorage.getItem("token");
      return header;
    }
  
  export const getRequest= () => {
    let header =  {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
    header.headers.Authorization = "Bearer "+localStorage.getItem("token");
    return header;
  }

  export const deleteRequest= () => {
    let header =  {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }
    header.headers.Authorization = "Bearer "+localStorage.getItem("token");
    return header;
  }


  export const payloads = {
    login: {
      loginType:"PASSWORD",
      password:"",
      username:"",
      otp:""
    },
    newBrand: {
      name: "",
      logoUrl:"",
      popular:false,
      type:"CAR",
    }
  }