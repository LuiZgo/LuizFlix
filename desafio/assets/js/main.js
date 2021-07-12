document.addEventListener("DOMContentLoaded", () => {
  llamadaAPI();
});

let arrayMovies = [
  { name: "toy story", selected: false },
  { name: "toy story 2", selected: false },
  { name: "toy story 3", selected: false },
  { name: "avengers endgame", selected: false },
  { name: "avengers infinity war", selected: false },
  { name: "avengers age of ultron", selected: false },
  { name: "shrek", selected: false },
  { name: "shrek 2", selected: false },
  { name: "shrek the third", selected: false },
  { name: "The SpongeBob Movie ", selected: false },
  { name: "Harry Potter and the Chamber of Secrets", selected: false },
  { name: "Harry Potter and the Prisoner of Azkaban", selected: false },
  { name: "Harry Potter and the Order of the Phoenix", selected: false },
  { name: "Harry Potter and the Half-Blood Prince", selected: false },
  { name: "Harry Potter and the Deathly Hallows Part 1", selected: false },
  { name: "Harry Potter and the Deathly Hallows Part 2", selected: false },
  { name: "wreck it ralph", selected: false },
  { name: "ralph breaks the internet", selected: false },
  { name: "Lion King", selected: false },
  { name: "Lion King 2", selected: false },
  { name: "Mulan", selected: false },
  { name: "Jackass", selected: false },
  { name: "Dragon ball z", selected: false },
  { name: "The Dark Knight Rises", selected: false },
  { name: "Iron man 3", selected: false },
  { name: "Iron man 2", selected: false },
  { name: "luca", selected: false },
  { name: "joker", selected: false },
  { name: "soul", selected: false },
  { name: "parasite", selected: false },
  { name: "Aquaman", selected: false },
  { name: "deadpool", selected: false },
];

let estrenos = document.querySelector(".estrenos");
let busqueda = document.querySelector(".busqueda");
let carrito = document.querySelector(".container__carro");

let cardFilm;
let cardInfo;
let arrayCompras = [];
let arrayPrecios = ["4000","5000","6000"];

function seleccionarPelicula(pelicula) {
  let peliculaSeleccionada = pelicula.getAttribute("name");
  let valorSeleccionado = pelicula.getAttribute("alt");

  arrayCompras.push({
    name: peliculaSeleccionada,
    price: valorSeleccionado,
    quantity: 1,
  });
  console.log(peliculaSeleccionada);

  console.log(arrayCompras);
  alert("La pelicula se ha agregado al carrito")
}

agregarBton = document.getElementsByClassName("select");

const llamadaAPI = async (nameFilm) => {
  try {
    const resultados = await arrayMovies.forEach((el) => {
      fetch(
        `https://www.omdbapi.com/?apikey=180e0412&t=${el.name}&plot=full&type=movie`
      )
        .then((respuesta) => respuesta.json())
        .then((data) => {
          const imagenPeli = data.Poster;
          const nombrePeli = data.Title;
          const id = data.imdbID;
          const precio = arrayPrecios[Math.floor(Math.random()*arrayPrecios.length)];

          const div = document.createElement("div");

          catalogo = ` <div class="tarjeta">
        <img class="select tamano__imagen"
            onclick="seleccionarPelicula(this); llenarCarrito();"
            src="${imagenPeli}"
            alt=${precio}
            name="${nombrePeli}"
            id="${id}">
    </div>`;
          div.innerHTML = catalogo;
          estrenos.append(div);
        });
    });
  } catch (error) {
    console.log(error.messagge);
  }
};

const llamarPelicula = async () => {
  let input = document.getElementById("input__busqueda").value;

  try {
    const result = await fetch(
      `https://www.omdbapi.com/?apikey=180e0412&t=${input}&plot=full&type=movie`
    )
      .then((respuesta) => respuesta.json())
      .then((data) => {
        console.log(data);
        const imagenPeli = data.Poster;
        const nombrePeli = data.Title;
        const actores = data.Actors;
        const director = data.Director;
        const pais = data.Country;
        const duracion = data.Runtime;
        const genero = data.Genre;
        const resumen = data.Plot;
        const premios = data.Awards;
        const año = data.Year;

        const div = document.createElement("div");
        cardInfo = `<h1>${nombrePeli}</h1>
        <div class="info__peli">
        <img class="imagen__peli" src="${imagenPeli}">
        
        <p>${resumen} </p>
        <p>Año : ${año}</p>
        <p>Actores : ${actores}</p>
        <p>Director :${director} </p>
        <p>Pais : ${pais} </p>
        <p>Duracion : ${duracion} </p>
        <p>Genero : ${genero} </p>
        <p>Premios: ${premios} </p>
        </div>`;

        div.innerHTML = cardInfo;
        busqueda.innerHTML = cardInfo;
      });
  } catch (error) {
    console.log(error.messagge);
  }
};

const llenarCarrito = async () => {
  try {
    const resultados = await arrayCompras.forEach((el) => {
      fetch(
        `https://www.omdbapi.com/?apikey=180e0412&t=${el.name}&plot=full&type=movie`
      )
        .then((respuesta) => respuesta.json())
        .then((data) => {
          const imagenPeli = data.Poster;
          const nombrePeli = data.Title;
          const id = data.imdbID;
          let totalArray = 0;
          const div = document.createElement("div");

          let carritoPeliculas = ` <table border="1">
          <h1>Carrito de Compras</h1>
          <thead>
            <th>Nombre Pelicula</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Eliminar</th>
          </thead>
          <tbody>`;
          for (let i = 0; i < arrayCompras.length; i++) {
            totalArray = totalArray + Number(arrayCompras[i].price);
            carritoPeliculas =
              carritoPeliculas +
              `
                <tr>
                  <td>${arrayCompras[i].name}</td>
                  <td>${arrayCompras[i].quantity}</td>
                  <td>${arrayCompras[i].price}</td>
                  <td><input type="button" value="Eliminar" class="boton__eliminar" nombre="${arrayCompras[i].name}" onclick="eliminarPelicula(this)"></td>
                  
                </tr>`;
          }
          carritoPeliculas =
            carritoPeliculas +
            `
            <tr>
              <td colspan="4">Total: $${totalArray}</td>
            </tr>`;
          carritoPeliculas =
            carritoPeliculas +
            `
            </tbody>
            </table>
            <button class="boton__pagar" onclick="pagarCarrito()">PAGAR</button>`;

          div.innerHTML = carritoPeliculas;
          carrito.innerHTML = carritoPeliculas;
        });
    });
  } catch (error) {
    console.log(error.messagge);
  }
};

const pagarCarrito = () => {
  alert("Su compra ha sido procesada");
  location.reload();
};

const eliminarPelicula = (nombrePelicula) => {
  let nombre = nombrePelicula.getAttribute("nombre");

  for (let i = 0; i < arrayCompras.length; i++) {
    if (arrayCompras[i].name == nombre) {
      arrayCompras.splice(i, 1);
    }
  }

  llenarCarrito();
};
