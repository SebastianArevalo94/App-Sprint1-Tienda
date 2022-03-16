const urlUser = 'https://api-tienda-app.herokuapp.com/productos/';

const tbody = document.querySelector('tbody');
const form = document.querySelector('.form-group');

const getUsers = async () => {

    const resp = await fetch(urlUser);
    const users = await resp.json();
    console.log(users)
    users.forEach(element => {
        const { img, name, price, category, discount, id } = element;
        tbody.innerHTML += `
        <tr>
            <td class="tdIm">
            <img src=${img}>
            </td>
            <td>${name}</td>
            <td>${price}</td>
            <td>${category}</td>
            <td>${discount}</td>
            <td><a id=${id} href="#" class="btn btn-danger eliminar">Delete</a></td>
        </tr>
        `
    });
}

document.addEventListener('DOMContentLoaded', getUsers)


tbody.addEventListener('click', async (e) => {
    // e.defaultPrevented();
    const btnDelete = e.target.classList.contains('eliminar');
    const id = e.target.id;
    if (btnDelete) {
        await fetch(urlUser + id, {
            method: 'DELETE'
        })
    }
})

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('inputName').value;
    const price = document.getElementById('inputPrice').value;
    const discount = document.getElementById('inputDiscount').value;
    const category = document.getElementById('inputCategory').value;
    const img = document.getElementById('inputImg').value;
    if (false) {
        console.log(img, name, price, discount, category)
        alert(`Ya existe la prenda ${name}`)
        console.log("algo salio mal")
    } else {
        let obj = {
            name,
            price,
            discount,
            category,
            img
        }
         console.log(obj)
        await fetch(urlUser, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
    }
})

const validarName = async (name) => {

    const resp = await fetch(urlUser);
    const data = await resp.json();
    const result = data.find(dat => dat.name.toLocaleLowerCase() === name.toLocaleLowerCase())
    if (result === undefined) {
        return false
    }
    else {
        return true
    }
}