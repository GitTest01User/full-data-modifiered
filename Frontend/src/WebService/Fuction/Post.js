export default function Post(base, Number) {
  const formdata = new FormData();
  if (Number) {
    formdata.append("mobileNumber", `${Number}`);
    formdata.append("requestFor", "SMS_LGCPickup_OTP");
  }

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  return fetch(base, requestOptions);
}

export function Otp(base, obj) {
  const formdata = new FormData();
  console.log("objobj", obj);
  if (obj) {
    formdata.append("mobileNumber", `${obj.mobileNumber}`);
    formdata.append("Otp", `${obj.OtpBoxNumber}`);
  }

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  return fetch(base, requestOptions);
}

export function PostData(base, data, token) {
  const myHeaders = new Headers();

  if (token) {
    myHeaders.append("authorization", `Bearer ${token}`);
  }
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };

  return fetch(base, requestOptions);
}
