export const postRequest = (payload) => {
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
  
  export const getRequest= () => {
    let header =  {
      method: 'GET',
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
    }
  }