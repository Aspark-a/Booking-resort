const mainURL = "http://localhost:3000/";

function validatePhoneNum(phone_num) {
  if (phone_num.length > 10 || isNaN(parseInt(phone_num))) {
    alert("Phone number is bad format");
    return false;
  }
  return true;
}

function renderRowInHistoryTable(tbody, row_data) {
  // Create a new <tr> element
  const tr = document.createElement("tr");
  tr.setAttribute("data-id", row_data.id);

  // Create and append <td> elements
  const td1 = document.createElement("td");
  td1.setAttribute("data-field", "arrival_date");
  td1.textContent = row_data.arrival_date;
  tr.appendChild(td1);

  const td2 = document.createElement("td");
  td2.setAttribute("data-field", "adults");
  td2.textContent = row_data.adults;
  tr.appendChild(td2);

  const td3 = document.createElement("td");
  td3.setAttribute("data-field", "children");
  td3.textContent = row_data.children;
  tr.appendChild(td3);

  const td4 = document.createElement("td");
  td4.setAttribute("data-field", "phone_num");
  td4.textContent = row_data.phone_num;
  tr.appendChild(td4);

  const td5 = document.createElement("td");
  td5.setAttribute("data-field", "type");
  td5.textContent = row_data.type;
  tr.appendChild(td5);

  const td6 = document.createElement("td");
  td6.setAttribute("data-field", "status");
  td6.textContent = row_data.status;
  tr.appendChild(td6);

  // Append the new row to the <tbody> or <table>
  tbody.appendChild(tr);
}

function renderRowInHistoryTable(tbody, row_data) {
  // Create a new <tr> element
  const tr = document.createElement("tr");
  tr.setAttribute("data-id", row_data.id);

  // Create and append <td> elements
  const td1 = document.createElement("td");
  td1.setAttribute("data-field", "arrival_date");
  td1.textContent = row_data.arrival_date;
  tr.appendChild(td1);

  const td2 = document.createElement("td");
  td2.setAttribute("data-field", "adults");
  td2.textContent = row_data.adults;
  tr.appendChild(td2);

  const td3 = document.createElement("td");
  td3.setAttribute("data-field", "children");
  td3.textContent = row_data.children;
  tr.appendChild(td3);

  const td4 = document.createElement("td");
  td4.setAttribute("data-field", "phone_num");
  td4.textContent = row_data.phone_num;
  tr.appendChild(td4);

  const td5 = document.createElement("td");
  td5.setAttribute("data-field", "type");
  td5.textContent = row_data.type;
  tr.appendChild(td5);

  const td6 = document.createElement("td");
  td6.setAttribute("data-field", "status");
  td6.textContent = row_data.status;
  tr.appendChild(td6);

  // Append the new row to the <tbody> or <table>
  tbody.appendChild(tr);
}


function showEmptyMessage(search_list_size) {
  if (!search_list_size) {
    // khong co du lieu de hien thi
    // an bang
    document.querySelector("#table .container").classList.add("hidden");
    // hien not found
    document.querySelector(".no_found").classList.remove("hidden");
    return true;
  } else {
    // hien thi bang
    document.querySelector("#table .container").classList.remove("hidden");
    // an not found
    document.querySelector(".no_found").classList.add("hidden");
    return false;
  }
}

async function getOrdersByPhoneNum(phone_num) {
  // fetch api
  return await fetch(mainURL + "orders", { method: "GET" })
    .then((json) => json.json())
    .then((ordersList) =>
      ordersList.filter(function (item) {
        // loc du lieu
        return item.phone_num == phone_num;
      })
    )
    .catch((err) => console.log(err));
}

async function search_history() {
  // get data from input
  const search_input = document.getElementById("search_inp").value;
  // validate search input
  if (validatePhoneNum(search_input)) {
    const table_body = document.querySelector("#table tbody");
    // lay danh sach tu API
    const search_list = await getOrdersByPhoneNum(search_input);
    if (location.href.includes("history.html")) {
      // neu la trang history => moi hien ra phan empty
      if (!showEmptyMessage(search_list.length)) {
        // render du lieu ra man hinh
        search_list.forEach((order) => {
          renderRowInHistoryTable(table_body, order);
        });
      }
    } else if (location.href.includes("admin.html")) {
      console.log("anc")
      // neu la trang admin thi hien het
      // render du lieu ra man hinh
      // search_list.forEach((order) => {
      //   renderRowInAdminTable(table_body, order);
      // });
    }
  }
}

// bat su kien cho button search -----------------------
document.getElementById("search_submit").addEventListener("click", (e) => {
  e.preventDefault();
  search_history();
});
