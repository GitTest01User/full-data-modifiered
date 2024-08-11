
export default function Get(base,token) {
  const myHeaders = new Headers();
 
  if (token) {
    myHeaders.append("authorization", `Bearer ${token}`);
  }
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,

    redirect: "follow",
  };

  return fetch(base, requestOptions);
}
