// JSON ----------------------
// la dinh dang du lieu (string)
// giup hien thi du lieu trong JS: string, number, object, array, boolean, null

const mainURL = "http://localhost:3000/";

// fetch API
function getOrders() {
  fetch(mainURL + "orders", { method: "GET" })
    .then((json) => json.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

function createOrder(order) {
  fetch(mainURL + `orders`, { method: "POST", body: JSON.stringify(order) })
    .then((data) => console.log("post", data))
    .catch((err) => console.log(err));
}

function updateOrderById(order) {
  fetch(mainURL + `orders/${order.id}`, {
    method: "PUT",
    body: JSON.stringify(order),
  })
    .then((data) => console.log("update", data))
    .catch((err) => console.log(err));
}

updateOrderById({
  id: "2",
  arrival_date: "2024-12-12",
  adults: "12",
  children: "12",
  phone_num: "123456789",
  type: "5dem",
  status: "da huy",
  updated_date: "2024-13-12",
  updated_admin_id: 2,
});
