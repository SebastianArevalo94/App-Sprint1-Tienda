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

const confirmarP = () => {
  let nombre = document.querySelector("#inputNombre").value;
  let telefono = document.querySelector("#inputCorreo").value;
  let tarjeta = document.querySelector("#inputTarjeta").value;
  let fecha = document.querySelector("#inputFecha").value;
  let cvv = document.querySelector("#inputCVV").value;

  let carrito = JSON.parse(localStorage.getItem("carrito"));

  if (
    nombre.length == 0 ||
    telefono.length == 0 ||
    tarjeta.length == 0 ||
    fecha.length == 0 ||
    cvv.length == 0
  ) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Error. Rellena todos los campos!",
      showConfirmButton: true,
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `Se han confirmado ${carrito.length} pedidos para ${nombre}`,
      showConfirmButton: true,
      timer: 1500
    });
    localStorage.removeItem('carrito');
    const redirect = () => {
        window.location.href = `../html/index.html`
    }
     setTimeout(redirect, 2000)
  }
};

addEventListener('DOMContentLoaded', () => {
    let html = document.querySelector(".product-container");
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    let total = 0;
    let counter = 1;
    carrito.forEach(element => {
        const { name, img, price, id } = element;
        html.innerHTML+=`
        <div id="shop" class="card-body">
            <div class="shop-1">
                <img src="${img}" alt="" width="120">
                <div class="shop-1-content">
                    <h3>${name}</h3>
                    <p>${price}</p>
                </div>
            </div>
            <div class="shop-2">
                <p class="shop-2-input" id="cantidad${counter}" type="number">1</p>
                <button class="btn btn-dark shop-button" onclick="add(${counter})">+</button>
                <button class="btn btn-danger shop-button" onclick="delete_(${counter})">-</button>
            </div>
        </div>
        `
        total+=price;
        counter+=1;
    });
    let payButton = document.querySelector("#pay-button");
    payButton.innerHTML = `[${carrito.length}] Pagar $${total}`
})
