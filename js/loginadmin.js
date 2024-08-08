const mainURL = "http://localhost:3000/";

// fetch API
async function getadmins() {
  return await fetch(mainURL + "admins", { method: "GET" })
    .then((json) => json.json())
    .catch((err) => console.log(err));
}

async function login() {
  //kiem tra form
  //   const email = document.getElementById("email").value || "abc@gmail.com";
  //   const password = document.getElementById("password").value || "123456";
  const email = "abc@gmail.com";
  const password = "120648";
  if (!email || !password) {
    alert("can nhap day du thong tin");
    return;
  }
  //kiem tra co ton tai trong danh sach admin ko
  const admins = await getadmins();
  const currentUser = admins.filter(function (user) {
    return user.email === email && user.password === password;
  })[0];
  if (!currentUser) {
    alert("Email hoac mat khau khong dung");
    return;
  }
  // luu du lieu vao loclaStorage
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  location.href = "./admin.html";
}

document
  .getElementById("signin-btn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    login();
  });
