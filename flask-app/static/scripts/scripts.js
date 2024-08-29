'use strict'

function add_view_row(spare_part_name, spare_part_model, spare_part_price,seller_name) {
    document.querySelector("#table_data").style.display = "table";
    const viewDataElement = document.querySelector("#view_data");
    let new_row = document.createElement('tr');
    for (let name of [spare_part_name, spare_part_model, spare_part_price,seller_name]) {
        let new_el = document.createElement('td')
        new_el.innerText = name
        new_row.appendChild(new_el)
    }

    viewDataElement.appendChild(new_row);
}

function operate_query() {
    let url = "./get_spare_part"
    let spare_part_model = document.querySelector("#spare_part_model").value;

    if (spare_part_model == "") {
        alert("Выберите название машины!")
        return
    }
    url += "?spare_part_model=" + spare_part_model
    console.log(url)
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        document.querySelector("#view_data").innerHTML = "";
        for (const view_row of data) {
            add_view_row(view_row['spare_part_name'], view_row['spare_part_model'], view_row['spare_part_price'], view_row['seller_name'])
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

document.querySelector("#find_spare_parts").onsubmit = function (event) {event.preventDefault(); operate_query()};

function choose_model(e) {
    document.querySelector("#spare_part_model").value = e.target.id
 }

var colorBoxes = document.querySelectorAll(".colorBox");

colorBoxes.forEach(function(colorBox) {
    colorBox.addEventListener("mouseover", function() {
        colorBox.classList.add("hover");
    });

    colorBox.addEventListener("mouseout", function() {
        colorBox.classList.remove("hover");
    });
});

var sidebar = document.getElementById('sidebar');

sidebar.addEventListener('click', function() {
    sidebar.classList.toggle('open');
});
