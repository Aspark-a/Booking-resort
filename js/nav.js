// kiem tra khi nao co current admin => doi ten tren thanh bar + dieu huong link dan

// lay du lieu tu local storage
const current_admin = JSON.parse(localStorage.getItem("current_admin"));
// lay cac element trong giao dien
const admin_tab = document.querySelector("#admin");
const loginLink = location.href.includes("/index.html")
  ? "./html/sign-in.html"
  : "./sign-in.html";
const adminLink = location.href.includes("/index.html")
  ? "./html/admin.html"
  : "./admin.html";

if (!current_admin) {
  // hien thi chu "Admin"
  admin_tab.innerHTML = "Admin";
  // dieu huong sang login
  admin_tab.href = loginLink;
} else {
  // hien thi ten cua admin
  admin_tab.innerHTML = current_admin.username;
  // dieu huong sang admin
  admin_tab.href = adminLink;
}

document.addEventListener("DOMContentLoaded", function () {
  if (current_admin && window.location.href.includes("sign-in.html")) {
    // neu da login => khong the truy cap den trang login
    window.location.href = adminLink;
  } else if (!current_admin && window.location.href.includes("admin.html")) {
    // neu chua login => khong the truy cap den trang admin
    window.location.href = loginLink;
  }
});
