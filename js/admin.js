//quy dinh chuyen status
const status_list = [
  "Dang_xu_ly",
  "Da_xac_nhan",
  "Da_nhan_phong",
  "Hoan_thanh",
  "Da_huy",
];

const type_list = ["3dem", "4dem", "5dem", "6dem"];

// khai bao trong nav.js
const admin_id = current_admin.id;

// load du lieu ra man hinh
async function run() {
  // get by API
  await fetch(mainURL + "orders", { method: "GET" })
    .then((json) => json.json())
    .then((orders) => {
      orders.forEach((order) => {
        // render ra man hinh
        const row_edit = document.createElement("tr");
        row_edit.setAttribute("data-id", order.id);
        renderNewRow(row_edit, order);
        document.querySelector("#editableTable tbody").append(row_edit);
        // before: them vao phia truoc cac element cu
      });
    })
    .catch((err) => console.log(err));

  // bat su kien ---------------------------------------------------
  // bat su kien cho nut edit
  document.querySelector("#editableTable a[title='Edit']").onclick = function (
    e
  ) {
    e.preventDefault();
    // closet: lay ra cha cua nut edit (tr gan nhat)
    // get this row
    const this_row = this.closest("tr");
    // lay du lieu cu
    const old_order = {
      id: this_row.getAttribute("data-id"),
      arrival_date: "",
      adults: "",
      children: "",
      phone_num: "",
      type: "",
      status: "",
      updated_date: "",
      updated_admin_id: admin_id,
    };
    this_row.querySelectorAll("td").forEach((td) => {
      if (td.getAttribute("data-field")) {
        old_order[`${td.getAttribute("data-field")}`] = td.innerText;
      }
    });
    // doi thanh edit tren giao dien
    changeToEditRow(this_row, old_order);

    // update in database neu bam nut save
    this_row.querySelector("a[title='Save']").onclick = async function (e) {
      e.preventDefault();
      try {
        const response = await fetch(mainURL + `orders/${old_order.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Make sure to include this header for JSON data
          },
          body: JSON.stringify(old_order),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json(); // If the response is JSON, parse it
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  };

  // bat su kien cho nut delete
  document.querySelector("#editableTable a[title='Delete']").onclick =
    function (e) {
      e.preventDefault();
      if (confirm("Are you sure you want to delete entire row?") == true) {
        // lay row id
        const id = document
          .querySelector("#editableTable a[title='Delete']")
          .closest("tr")
          .getAttribute("data-id");
        // closet: lay ra cha cua nut delete (tr gan nhat)
        document
          .querySelector("#editableTable a[title='Delete']")
          .closest("tr")
          .remove();
        // remove in database
        fetch(mainURL + `orders/${id}`, { method: "DELETE" })
          .then((data) => console.log("delete", data))
          .catch((err) => console.log(err));
      }
    };
}

// bat su kien nut add row
document.querySelector(".add-row").onclick = async function () {
  // get new date string
  const date = new Date();
  const dateString =
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0");
  // tao moi id
  const new_id = await countNewId();
  // tao moi obj order
  const new_order = {
    id: new_id.toString(),
    arrival_date: dateString,
    adults: "",
    children: "",
    phone_num: "",
    type: "",
    status: "",
    updated_date: "",
    updated_admin_id: admin_id,
  };

  // tao row
  const row_edit = document.createElement("tr");
  row_edit.setAttribute("data-id", new_id.toString());
  changeToEditRow(row_edit, new_order);

  document
    .querySelector("#editableTable tbody")
    .firstElementChild.before(row_edit);
  // before: them vao phia truoc cac element cu

  // bat su kien nut xoa o dong hien tai => khong cap nhat vao db
  document.querySelector(`[data-id="${new_id}"] a[title='Delete']`).onclick =
    function (e) {
      // e.target: lay ra nut vua duoc bam vao
      e.target.closest("tr").remove();
    };

  // bat su kien cho nut luu => tao du lieu moi trong db.json
  document.querySelector(`[data-id="${new_id}"] a[title='Save']`).onclick =
    function (e) {
      document.querySelectorAll(`[data-id="${new_id}"] td`).forEach((td) => {
        if (td.getAttribute("data-field")) {
          new_order[`${td.getAttribute("data-field")}`] =
            td.querySelector("input")?.value ||
            td.querySelector("select")?.value;
        }
      });
      // e.target: lay ra nut vua duoc bam vao, closest: lay ra dong chua no (gan nhat)
      renderNewRow(e.target.closest("tr"), new_order);
      createOrderInAPI(new_order);
    };
};

// bat su kien nut save => luu vao API
function changeToEditRow(row_edit, old_order) {
  const type_options_html = type_list
    .filter((item) => item !== old_order.type)
    .map((item) => `<option value=${item}>${item}</option>`);

  const status_options_html = status_list
    .filter((item) => item !== old_order.status)
    .map((item) => `<option value=${item}>${item}</option>`);

  row_edit.innerHTML = `<td data-field="arrival_date"><input type="date" value=${old_order.arrival_date} /></td>
                    <td data-field="adults"><input type="number" value="${old_order.adults}"></td>
                    <td data-field="children"><input type="number" value="${old_order.children}"/></td>
                    <td data-field="phone_num"><input type="text" value="${old_order.phone_num}"/></td>
                    <td data-field="type">
                      <select title="type">
                <option value="${old_order.type}" selected>${old_order.type}</option>
                ${type_options_html}
              </select>
                    </td>
                    <td data-field="status">
                    <select title="status" >
                <option value="${old_order.status}">${old_order.status}</option>
                ${status_options_html}
              </select>
                    </td>
                    <td>
                      <a class="button button-small edit" title="Save">
                        <i class="fa fa-save"></i>
                      </a>

                      <a class="button button-small edit" title="Delete">
                        <i class="fa fa-trash"></i>
                      </a>
                    </td>`;
}

function renderNewRow(row_edit, new_data) {
  row_edit.innerHTML = `<td data-field="arrival_date">${new_data.arrival_date}</td>
                    <td data-field="adults">${new_data.adults}</td>
                    <td data-field="children">${new_data.children}</td>
                    <td data-field="phone_num">${new_data.phone_num}</td>
                    <td data-field="type">${new_data.type}</td>
                    <td data-field="status">${new_data.status}</td>
                    <td>
                      <a class="button button-small edit" title="Edit">
                        <i class="fa fa-pencil"></i>
                      </a>

                      <a class="button button-small edit" title="Delete">
                        <i class="fa fa-trash"></i>
                      </a>
                    </td>`;
}

async function countNewId() {
  // lay id moi tu danh sach cu (size cua danh sach + 1)
  return await fetch(mainURL + `orders`)
    .then((data) => data.json())
    .then((orders) => parseInt(orders[orders.length - 1].id) + 1)
    .catch((err) => console.log(err));
}

async function updateOrderInAPI() {}

function createOrderInAPI(order) {
  fetch(mainURL + `orders`, { method: "POST", body: JSON.stringify(order) })
    .then((data) => console.log("post", data))
    .catch((err) => console.log(err));
}

setTimeout(run, 1000);
