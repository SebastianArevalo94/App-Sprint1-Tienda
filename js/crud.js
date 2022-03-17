const urlUser = "https://api-tienda-app.herokuapp.com/productos/";

const tbody = document.querySelector("tbody");
const form = document.querySelector(".form-group");

const getUsers = async () => {
  const resp = await fetch(urlUser);
  const users = await resp.json();
  console.log(users);
  users.forEach((element) => {
    const { img, name, price, category, id } = element;
    tbody.innerHTML += `
        <tr>
            <td class="tdIm">
            <img src=${img}>
            </td>
            <td>${name}</td>
            <td>${price}</td>
            <td>${category}</td>
            <td><a id=${id} href="#" class="btn btn-danger eliminar">Delete</a></td>
        </tr>
        `;
  });
};

document.addEventListener("DOMContentLoaded", getUsers);

tbody.addEventListener("click", async (e) => {
  // e.defaultPrevented();
  const btnDelete = e.target.classList.contains("eliminar");
  const id = e.target.id;
  if (btnDelete) {
    await fetch(urlUser + id, {
      method: "DELETE",
    });
  }
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Producto eliminado!",
    showConfirmButton: false,
    timer: 1500,
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = await fetch(`https://api-tienda-app.herokuapp.com/productos`);
  const json = await data.json();
  const existe = json.find(
    (e) => e.name.toLocaleLowerCase() === document.getElementById("inputName").value.toLocaleLowerCase()
  );

  if (!existe) {
    const name = document.getElementById("inputName").value;
    const price = document.getElementById("inputPrice").value;
    const discount = document.getElementById("inputDiscount").value;
    const category = document.getElementById("inputCategory").value;
    const img = document.getElementById("inputImg").value;

      let obj = {
        name,
        price,
        discount,
        category,
        img,
      };
      await fetch(`https://api-tienda-app.herokuapp.com/productos`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto agregado!",
        showConfirmButton: false,
        timer: 1500,
      });
      document.getElementById("inputName").value = ``;
      document.getElementById("inputPrice").value = ``;
      document.getElementById("inputDiscount").value = ``;
      document.getElementById("inputCategory").value = ``;
      document.getElementById("inputImg").value = ``;
    
  } else {
    const name = document.getElementById("inputName").value;
    const price = document.getElementById("inputPrice").value;
    const discount = document.getElementById("inputDiscount").value;
    const category = document.getElementById("inputCategory").value;
    const img = document.getElementById("inputImg").value;
    if (false) {
      console.log(img, name, price, discount, category);
      alert(`Ya existe la prenda ${name}`);
      console.log("algo salio mal");
    } else {
      let obj = {
        name,
        price,
        discount,
        category,
        img,
      };
      await fetch(`https://api-tienda-app.herokuapp.com/productos/${existe.id}`, {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto Editado!",
        showConfirmButton: false,
        timer: 1500,
      });
      document.getElementById("inputName").value = ``;
      document.getElementById("inputPrice").value = ``;
      document.getElementById("inputDiscount").value = ``;
      document.getElementById("inputCategory").value = ``;
      document.getElementById("inputImg").value = ``;  
  }}
});

let searchButton = document.querySelector("#searchButton");

searchButton.addEventListener("click", async () => {
  if (document.getElementById("inputName").value.length !== 0) {
    const data = await fetch(`https://api-tienda-app.herokuapp.com/productos`);
    const json = await data.json();
    const result = json.find((e) =>
      e.name
        .toLocaleLowerCase()
        .includes(
          document.getElementById("inputName").value.toLocaleLowerCase()
        )
    );
    document.getElementById("inputName").value = result.name;
    document.getElementById("inputPrice").value = result.price;
    document.getElementById("inputDiscount").value = result.discount;
    document.getElementById("inputCategory").value = result.category;
    document.getElementById("inputImg").value = result.img;
  }
});

const validarName = async (name) => {
  const resp = await fetch(urlUser);
  const data = await resp.json();
  const result = data.find(
    (dat) => dat.name.toLocaleLowerCase() === name.toLocaleLowerCase()
  );
  if (result === undefined) {
    return false;
  } else {
    return true;
  }
};

let shopCartButton = document.querySelector("#shop-cart");

shopCartButton.addEventListener("click", () => {
  const shopCart = JSON.parse(localStorage.getItem("carrito"));
  const shopCartHTML = document.querySelector("#shopCartModal");
  if (!shopCart) {
    shopCartHTML.innerHTML = ``;
    document.querySelector(".shopCartButtons").style.display = `none`;
    document.querySelector(".emptyShopCart").style.display = `flex`;
  } else {
    document.querySelector(".emptyShopCart").style.display = `none`;
    document.querySelector(".shopCartButtons").style.display = `flex`;
    shopCartHTML.innerHTML = ``;
    let total = 0;
    let counter = 1;
    shopCart.forEach((element) => {
      const { id, name, price, img } = element;
      shopCartHTML.innerHTML += `
      <div id="shop" class="card-body">
      <div class="shop-1">
          <img src="${img}" alt="" width="120">
          <div class="shop-1-content">
              <h3>${name}</h3>
              <p>$${price}</p>
          </div>
      </div>
      <div class="shop-2">
          <p>Cantidad:</p>
          <p class="shop-2-input" id="cantidad${counter}" type="number">1</p>
          <button class="btn btn-dark shop-button" onclick="add(${counter})">+</button>
          <button class="btn btn-danger shop-button" onclick="delete_(${counter})">-</button>
      </div>
      </div>
      `;
      total += price;
      counter += 1;
    });
    let shopButton = document.querySelector("#shop-button");
    shopButton.innerHTML = `[${shopCart.length}] Ir a pagar $${total}`;
    shopButton.addEventListener("click", () => {
      window.location.href = `../html/pagar.html`;
    });
  }
});

let cleanButton = document.querySelector("#cleanCarrito");

cleanButton.addEventListener("click", () => {
  localStorage.removeItem("carrito");
  document.querySelector("#shopCartModal").innerHTML = ``;
  document.querySelector(".emptyShopCart").style.display = `flex`;
  document.querySelector(".shopCartButtons").style.display = `none`;
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Carrito vaciado",
    showConfirmButton: false,
    timer: 1500,
  });
  let shop_cart = document.querySelector("#shop-cart");
  shop_cart.innerHTML = `<span class="fa-solid fa-cart-shopping btnCar"></span>`;
});

const add = (id) => {
  document.querySelector(`#cantidad${id}`).textContent =
    parseInt(document.querySelector(`#cantidad${id}`).textContent) + 1;
};

const delete_ = (id) => {
  if (
    parseInt(document.querySelector(`#cantidad${id}`).textContent) - 1 !==
    0
  ) {
    document.querySelector(`#cantidad${id}`).textContent =
      parseInt(document.querySelector(`#cantidad${id}`).textContent) - 1;
  }
};
