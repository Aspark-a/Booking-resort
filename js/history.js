function search_history() {
  // get data from input
  const search_input = document.getElementById("search_inp").value;
  // validate search input
  if (search_input.length > 10 || isNaN(parseInt(search_input))) {
    alert("Phone number is bad format");
    return;
  } else {
    // duyet phan tu trong booking_list => lay ra danh sach phan tu dung sdt
    const bk_list = JSON.parse(localStorage.getItem("booking_list"));
    // loc du lieu
    const results = bk_list.filter((item) => {
      return item.phone_num == search_input;
    });
    // bk_list.forEach(element => {
    //     if(element.phone_num == search_input) {
    //         results.push(element)
    //     }
    // });

    const table = document.querySelector(".content-table");
    const table_body = document.querySelector("tbody");

    // kiem tra neu co du lieu
    if (results.length > 0) {
      // add du lieu vao table
      results.forEach((element) => {
        const row = document.createElement("tr");

        const arrival_date_cell = document.createElement("td");
        arrival_date_cell.innerText = element.arrival_date;
        row.appendChild(arrival_date_cell);

        const adults_cell = document.createElement("td");
        adults_cell.innerText = element.adults;
        row.appendChild(adults_cell);

        const children_cell = document.createElement("td");
        children_cell.innerText = element.children;
        row.appendChild(children_cell);

        const phone_num_cell = document.createElement("td");
        phone_num_cell.innerText = element.phone_num;
        row.appendChild(phone_num_cell);

        const type_cell = document.createElement("td");
        type_cell.innerText = element.type;
        row.appendChild(type_cell);

        table_body.appendChild(row);
      });

      // hien thi bang
      table.classList.toggle("hidden");
      // an not found
      document.querySelector(".no_found").classList.toggle("hidden");
    } else {
      // an bang
      table.classList.toggle("hidden");
      // hien not found
      document.querySelector(".no_found").classList.toggle("hidden");
      return;
    }
  }
}

// bat su kien cho button search
document.getElementById("search_submit").addEventListener("click", (e) => {
  e.preventDefault();
  search_history();
});
