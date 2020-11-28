import { SERVICE_URL } from "../constants/constants";
import { getRequest,postRequest,deleteRequest } from "../constants/headers";

export const getAllUsers = async () => {
    let url = SERVICE_URL.GET_ALL_USERS;
    let response = await fetch(url,getRequest());
    let body = await response.json();
    return body;
  }

  export const saveUser = async (payload) => {
    let url = SERVICE_URL.ADD_USER;
    payload.roles = Array.isArray(payload.roles)?payload.roles:[payload.roles];
    let response = await fetch(url,postRequest(payload));
    let body = await response.json();
    return body;
  }
  
  export const deleteUser = async (id) => {
    let url = SERVICE_URL.DELETE_USER+id;
    let response = await fetch(url, deleteRequest());
  }

  const notify = (user) => {
      let body = "?body="+"Please find login credentials for autoride https://cars-292905.et.r.appspot.com/ ....  Username:"+user.mobile+" Password:"+user.name+"!@";
      let email= body+"&email="+user.email;
      let subject = email+"&subject=User credentials for autoride"
      let mobile = subject+"&mobile="+user.mobile;
      let url = SERVICE_URL.NOTIFY+mobile;
      fetch(url)
     // /api/v1/notification/notify?body=test&email=srikanth581267%40gmail.com&mobile=9066170423&subject=subject
  }

  export const addRow = (newRow,rows,setRows) => {
    return new Promise( async (res,rej) => {
          let body = await saveUser(newRow);
          notify(newRow);
          console.log(body)
          newRow.id = body.id;
          let newDataToPush = [...rows];
          newDataToPush.push(newRow)
          console.log(newRow);
          setRows(newDataToPush)
          res();
      })
  }

  export const updateRow = (updated,olddata,rows,setRows) => {
    return new Promise(async (res,rej) => {
        await saveUser(updated)
        let index = olddata.tableData.id;
        let updatedData = [...rows];
        updatedData.splice(index,1,updated)
        setRows(updatedData)
        res();
    })
  }

  export const deleteRow = (deletedRow,rows,setRows) => {
    return new Promise(async (res,rej) => {
        console.log(deletedRow)
        await deleteUser(deletedRow.id)
        let index = deletedRow.tableData.id;
        let updatedData = [...rows];
        updatedData.splice(index,1)
        setRows(updatedData)
        res();
    })
  }


  export const uploadProfilePic = async (file,fileName) => {
    var data = new FormData()
    data.append('files', file)
    data.append('filePath','profilePics/')
    data.append('fileName', fileName)
    let res =  await fetch("https://image-service-cemhl7ajqq-uc.a.run.app/api/upload", {
        method:"POST",
        body: data,
        files: file
    });
    let body = await res.json();
    return body;
}