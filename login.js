const username = document.getElementById("email-box");
const password = document.querySelector("#pass-box");
const login = document.querySelector("#login-in");
const signin = document.querySelector("#sign-in");

signin.addEventListener("click", () => {
  saveEntryInfo(username.value, password.value);
  alert("Data saved!, Login");
});
login.addEventListener("click", () => {
  loginMainPage(username.value, password.value);
});
function saveEntryInfo(valueUSer, valuePass) {
  const obj = {
    valueUSer,
    valuePass,
  };
  const userInfoList = getEntryInfoLocalList();
  userInfoList.push(obj);
  localStorage.setItem("userInfo", JSON.stringify(userInfoList));
  deleteEntryInfo();
}
function getEntryInfoLocalList() {
  try {
    const userInfoList = localStorage.getItem("userInfo");
    if (userInfoList) {
      return JSON.parse(localStorage.getItem("userInfo"));
    } else {
      return [];
    }
  } catch (e) {
    console.log(e);
  }
}
function deleteEntryInfo() {
  username.value = "";
  password.value = "";
}
function loginMainPage(valueUSer, valuePass) {
  try {
    const userInfoList = getEntryInfoLocalList();
    if (userInfoList) {
      const obj = {
        valueUSer,
        valuePass,
      };
      userInfoList.map((infoList) => {
        if (
          obj.valueUSer === infoList.valueUSer &&
          obj.valuePass === infoList.valuePass
        ) {
          alert("success");
          location.href = "/index.html";
        }
      });
      if (obj.valueUSer.trim() === "" && obj.valuePass.trim() === "") {
        console.log("fill all of the input");
      }
    } else {
      console.log("you don't have any acount first sign in");
    }
  } catch (e) {
    console.log(e);
  }
}
