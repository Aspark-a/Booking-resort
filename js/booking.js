const mainURL = "http://localhost:3000/";

// get data from input form
async function booking() {
  const arrival_date = document.getElementById("Araival-Date").value;
  const adults = document.getElementById("Adults").value;
  const children = document.getElementById("Children").value;
  const phone_num = document.getElementById("Phone-number").value;
  const type = document.getElementById("type").value;

  // validate form
  if (!arrival_date || !adults || !children || !phone_num || !type) {
    alert("Fill the form");
    return;
  } else if (
    isNaN(parseInt(phone_num)) ||
    isNaN(parseInt(adults)) ||
    isNaN(parseInt(children))
  ) {
    alert("Please type number in field");
    return;
  } else if (Date.now() > Date.parse(arrival_date)) {
    // kiem tra ngay den
    alert("Please choose date again");
    return;
  } else {
    const new_id = await countNewId();
    const bk_obj = {
      id: new_id.toString(),
      arrival_date: arrival_date,
      adults: adults,
      children: children,
      phone_num: phone_num,
      type: type,
      status: "Dang_xu_ly",
      updated_date: "",
      updated_admin_id: null,
    };

    // luu vao api
    await fetch(mainURL + `orders`, {
      method: "POST",
      body: JSON.stringify(bk_obj),
    })
      .then((data) => console.log("post", data))
      .catch((err) => console.log(err));

    // hien thong bao thanh cong
    alert("Book successful, you can check the History page");
    return;
  }
}

// bat su kien cho button book
document.getElementById("submit_form").addEventListener("click", async (e) => {
  e.preventDefault(); // chan su kien mac dinh
  await booking();
});

async function countNewId() {
  // lay id moi tu danh sach cu (size cua danh sach + 1)
  return await fetch(mainURL + `orders`)
    .then((data) => data.json())
    .then((orders) => parseInt(orders[orders.length - 1].id) + 1)
    .catch((err) => console.log(err));
}
