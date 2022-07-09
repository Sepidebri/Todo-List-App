const username = document.getElementById("email-box");
const password = document.querySelector("#pass-box");
const login = document.querySelector("#login-in");
const signin = document.querySelector("#sign-in");

signin.addEventListener("click", () => {
  saveEntryInfo(username.value, password.value);
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
  if (obj.valuePass && obj.valueUSer) {
    userInfoList.push(obj);
    localStorage.setItem("userInfo", JSON.stringify(userInfoList));
    alert("Data saved!, Login");
    deleteEntryInfo();
  } else {
    alert("fill all of input");
  }
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
      userInfoList.map((infoList, index) => {
        if (
          obj.valueUSer === infoList.valueUSer &&
          obj.valuePass === infoList.valuePass
        ) {
          showUserOnMainPage(userInfoList[index].valueUSer);
          location.href = "/index.html";
        }
      });
      if (obj.valueUSer.trim() === "" && obj.valuePass.trim() === "") {
        alert("fill all of the input");
      }
    }
  } catch (e) {
    console.log(e);
  }
}
function showUserOnMainPage(i) {
  alert(`Welcome ${i}`);
}
