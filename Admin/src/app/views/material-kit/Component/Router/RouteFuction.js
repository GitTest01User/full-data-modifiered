import Api from 'Service/Api';

export const dynamicFetch = async (endpoint, data) => {
  const myHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  const raw = JSON.stringify(data);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  try {
    const response = await fetch(Api.BrowserRoutePostApi, requestOptions);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.log('Error:', error);
  }
};
