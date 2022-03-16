// urlCartas = "http://localhost:8000/Food/"
urlCartas = "https://api-tienda-app.herokuapp.com/productos/"
urlOne = "https://clothes-edwin.herokuapp.com/Clothes/"

const getData = async (url) => {
  const resp = await fetch(url);
  const data = resp.json();
  // console.log(data)
  return data;
};

addEventListener("DOMContentLoaded", async () => {
  const data = await getData("https://api-tienda-app.herokuapp.com/productos/");
  pintarCartas(data);
})

// pintarCartas
function pintarCartas(data) {
  console.log(data)
  let divCartas = document.getElementById('cartas');
  divCartas.innerHTML = ''
  data.forEach(element => {
    const { name, img, price, id, discount } = element;
    cartas.innerHTML += `
        <div class="card" style="width: 13rem;">
        <div class="descuento fw-bold">${discount} dto.</div>

        <div class="padreImg">
        <img src="${img}" width="100%"class="card-img-top">
        </div>
        <div class="card-body">
        <p class="card-text fw-bold">$${price}/Kg <span class="text-muted text-decoration-line-through"> $${price}/Kg</span></p>          
        <p class="card-title text-capitalize">${name}</p>
          <a href="#"><button class="btn btnLook text-light w-100 agregar2" data-bs-toggle="modal" data-bs-target="#exampleModal2" onclick="pintarSola('${id}')">Ver más</button></a>  
          
        </div>
      </div>
        `;
  });
}

// ver mas local storage modal
function saveLocalS(id) {
  localStorage.setItem("llave", id);
  console.log(id);
}

// pintar carta en el modal
async function pintarSola(id) {
  url1 = "https://api-tienda-app.herokuapp.com/productos/" + id;
  const f = await getData(url1);
  let space = document.getElementById("verSola");
  space.innerHTML = `
        <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
                <div class="card mb-3" style="max-width: 100w0px;">
            <div class="row g-0">
                <div class="col-md-4 d-flex align-items-center">
                    <img src="${f.img}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h2 class="card-title fw-bolder">${f.name}</h2>
                        <h3 class="card-text fw-bold">$${f.price}/Kg</h3>
                        <p class="card-text">Precio con IVA incluido</p>
                        <p class="card-text">Peso aproximado por pieza, pueda variar de acuerdo al peso real</small></p>
                        <h5 for="" class="fw-bold">Selecciona la madurez que desea</h5>
                        <form action="" id="addFaruit">
                          <select class="form-select" id="madurez" aria-label="Default select example">
                              <!-- <option selected>Open this select menu</option> -->
                              <option value="maduro">Maduro (Para hoy)</option>
                              <option value="normal">Normal (3-5 días)</option>
                              <option value="verde">verde (7 días)</option>
                            </select>
                            <div class="btnPesoAdd">                          
                              <input type="number" id="peso" class=" peso" placeholder="Cantidad en U. " value="1" required>
                              <button type="button"  class="btn btnAdd w-50" onclick="guardarCarrito('${id}')">Agregar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  `;
}

const guardarCarrito = async (id) => {

  let item = await getData(
    `https://api-tienda-app.herokuapp.com/productos/${id}`
  );
  
  let carrito_actual = JSON.parse(localStorage.getItem("carrito"));

  if (!localStorage.getItem("carrito")) {
    let carrito = [item];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Producto agregado al carrito!",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    let existe = carrito_actual.find((e) => e.name === item.name);
    if (!existe) {
      carrito_actual.push(item);
      localStorage.setItem("carrito", JSON.stringify(carrito_actual));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto agregado al carrito!",
        showConfirmButton: false,
        timer: 1500,
      });
      let shop_cart = document.querySelector("#shop-cart");
      shop_cart.innerHTML = `<span class="fa-solid fa-cart-shopping btnCar"></span>[${carrito_actual.length}]`;
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "El producto ya esta en el carrito!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    // console.log(`Tipo: ${typeof carrito_actual} Contenido: ${carrito_actual}`);
  }
};

// ver mas local storage carrito
function guardarLocalS(id, madurez, peso) {
  localStorage.setItem("llave", id);
  console.log(id);
}

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
          <img src="${img}" alt="" width="70">
          <div class="shop-1-content">
              <h3>${name}</h3>
              <p>$${price}</p>
          </div>
      </div>
      <div class="shop-2">
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
