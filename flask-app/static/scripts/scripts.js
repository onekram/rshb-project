'use strict'

function add_view_row(spare_part_name, spare_part_model, spare_part_price,seller_name) {
    document.querySelector("#table_data").style.display = "table";
    document.querySelector("#finder_parts").style.display = "block";
    document.querySelector("#finder_parts input").value = "";
    const viewDataElement = document.querySelector("#view_data");
    let new_row = document.createElement('tr');
    new_row.dataset.spare_part_name = spare_part_name.toLowerCase()
    for (let name of [spare_part_name, spare_part_model, spare_part_price,seller_name]) {
        let new_el = document.createElement('td')
        new_el.innerText = name
        new_row.appendChild(new_el)
    }
    
    viewDataElement.appendChild(new_row);
}

function add_view_row_with_action(spare_part_name, spare_part_model, spare_part_price, seller_name, item_id) {
    document.querySelector("#table_data").style.display = "table";
    const viewDataElement = document.querySelector("#view_data");
    let new_row = document.createElement('tr');
    new_row.dataset.spare_part_name = spare_part_name.toLowerCase()
    for (let name of [spare_part_name, spare_part_model, spare_part_price,seller_name]) {
        let new_el = document.createElement('td')
        new_el.innerText = name
        new_row.appendChild(new_el)
    }

    let buttonCell = document.createElement('td')
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Удалить';
    deleteButton.classList.add('delete-button', 'pure-button');
    deleteButton.onclick = () => deleteItem(item_id);
    buttonCell.appendChild(deleteButton)

    const editButton = document.createElement('button');
    editButton.innerText = 'Редактировать';
    editButton.classList.add('edit-button', 'pure-button');
    editButton.onclick = () => editItem(item_id, new_row);
    new_row.dataset.editing = false;
    buttonCell.appendChild(editButton)
    
    new_row.appendChild(buttonCell)
    viewDataElement.appendChild(new_row);
}

function editItem(item_id, row_view) {
    console.log(row_view.dataset)
    if (row_view.dataset.editing == "true") {
        row_view.dataset.editing = "false"
        let new_values = []
        for (let child of row_view.childNodes) {
            if (child == row_view.lastChild) {
                child.lastChild.innerText = "Редактировать"
            } else {
                new_values.push(child.firstChild.value);
                child.innerHTML = `<td>${child.firstChild.value}</td>`
            }
        }
        update_spare_part(item_id, ...new_values)
        return;
    }

    row_view.dataset.editing = "true"
    row_view.classList.add('pure-form')
    for (let child of row_view.childNodes) {
        if (child == row_view.lastChild) {
            child.lastChild.innerText = "Сохранить"
            
        } else {
            child.innerHTML = `<td><input type="text" value="${child.innerText}" /></td>`
        }
    }
}

function update_spare_part(part_id, new_part_name, new_part_model, new_part_price, new_part_seller) {
    let url = "./change_item"

    url += "?part_id=" + part_id
    url += "&new_part_name=" + new_part_name
    url += "&new_part_model=" + new_part_model
    url += "&new_part_price=" + new_part_price
    url += "&new_part_seller=" + new_part_seller


    fetch(url,  {method: 'PUT'})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
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
        document.querySelector("#view_data").innerHTML = "";
        for (const view_row of data) {
            add_view_row(view_row['spare_part_name'], view_row['spare_part_model'], view_row['spare_part_price'], view_row['seller_name'])
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

var control_panel = document.querySelector("#control_panel");
if (control_panel) {
    fetchItems()
}

async function fetchItems() {
    try {
        const response = await fetch('./items');
        const items = await response.json();
        renderItems(items)
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

function renderItems(items) {
    document.querySelector("#view_data").innerHTML = "";
    if (!items.length) {
        document.querySelector("#table_data").style.display = "none";
    }
    items.forEach(item => {
        console.log(item);
        add_view_row_with_action(item['spare_part_name'], item['spare_part_model'], item['spare_part_price'], item['seller_name'], item.id)
    });
}

async function deleteItem(itemId) {
    try {
        const response = await fetch(`./delete_item/${itemId}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        if (result.status === 'success') {
            fetchItems(); // Refresh the item list
        }
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}
function find_spare_parts(e) {
    let all_items = document.querySelectorAll(`tr`)
    for (let item of all_items) {
        item.classList.remove("hide-me")
    }

    if (e.target.value == "") return;
    let items_to_hide = document.querySelectorAll(`tr:not([data-spare_part_name*="${e.target.value.toLowerCase()}"])`)
    for (let item of items_to_hide) {
        if (item.dataset.spare_part_name == undefined) {
            continue;
        }
        item.classList.add("hide-me")
    }
}

var spare_parts = document.querySelector("#find_spare_parts");
if (spare_parts) {
spare_parts.onsubmit = function (event) {event.preventDefault(); operate_query()};
}

function choose_model(e) {
    document.querySelector("#spare_part_model").value = e.target.id
 }

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('open');
        });
    }
});
