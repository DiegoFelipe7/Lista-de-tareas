const url = "http://localhost:8080/tareas";
const url2 = "http://localhost:8080/subtareas";
fetch(url)
  .then((response) => response.json())
  .then((data) => datos(data))
  .catch((error) => console.log(error));
const datos = (data) => {
  const container = document.getElementById("listado-tareas");
  const fragment = document.createDocumentFragment();

  data.forEach((element) => {
    console.log(element);
    //Div
    const div = document.createElement("div");
    div.classList.add(
      "w-100",
      "border",
      "shadow",
      "rounded",
      "p-5",
      "mt-2",
      "bg-white"
    );
    //fin div
    //hr
    const hr = document.createElement("hr");
    hr.classList.add("bg-dark");

    //div row
    const row = document.createElement("div");
    row.classList.add("row", "justify-content-end");
    //fin div row

    //div col-1
    const col_1 = document.createElement("div");
    col_1.classList.add("col-1");
    //fin col-1

    //button eliminar
    const button_eliminar = document.createElement("button");
    button_eliminar.classList.add("eliminar_tarea", "btn-close", "text-dark");
    button_eliminar.dataset.id = element.id;
    //fin button eliminar

    //card
    const card = document.createElement("div");
    card.classList.add("card", "mt-2");
    //fin card

    //titulo car
    const titulo = document.createElement("h5");
    titulo.classList.add("card-header");
    titulo.textContent = `TAREA : ${element.nombre} 🧮`;
    //fin titulo card

    //cuerpo card
    const card_body = document.createElement("div");
    card_body.classList.add("card-body");
    //fin card body

    //row card
    const row_card = document.createElement("div");
    row_card.classList.add("row");
    //fin row card

    //col en el row
    const col_8 = document.createElement("div");
    col_8.classList.add("col-8");
    //fin row

    //input
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Ingresa una subtarea";
    input.id = "nombre_subtarea";
    input.name = "nombre_subtarea";
    input.classList.add("form-control");
    //fin input

    //col para el button
    const col_4 = document.createElement("div");
    col_4.classList.add("col-4");
    //fin button

    //button guardar
    const button_guardar = document.createElement("button");
    button_guardar.classList.add(
      "guardar_subtarea",
      "btn",
      "btn-dark",
      "fw-bold"
    );
    button_guardar.type = "button";
    button_guardar.textContent = "Guardar";
    button_guardar.dataset.id = element.id;
    //fin button
    //contendor de la tabla
    const container_tabla = document.createElement("div");
    container_tabla.classList.add("w-100");
    //fin tabla

    //titulo
    const h3 = document.createElement("h3");
    h3.classList.add("text-dark", "text-center", "fw-bold", "mt-2");
    h3.innerHTML = "Subtareas 📋";
    //fin titulo

    //tabla
    const table = document.createElement("table");
    table.classList.add("table", "table-striped");
    //fin tabla

    //cabezera tabla
    const tr = document.createElement("tr");
    const thSub = document.createElement("th");
    thSub.textContent = "Nombre";
    const thEstado = document.createElement("th");
    thEstado.textContent = "Nombre";
    const thAcciones = document.createElement("th");
    thAcciones.textContent = "Nombre";
    //fin

    //table-body
    const tbodytabla = document.createElement("tbody");
    for (const key in element.subtarea) {
      //tr body
      const tr = document.createElement("tr");
      //
      const tdNombre = document.createElement("td");
      tdNombre.innerHTML = element.subtarea[key].nombre;
      const tdEstado = document.createElement("td");
      tdEstado.innerHTML = element.subtarea[key].estado;

      const tdAcciones = document.createElement("td");
      const btn_editar = document.createElement("button");
      btn_editar.classList.add("actualizar_sub", "btn", "btn-dark");
      btn_editar.textContent = "U";
      btn_editar.title = "Editar tarea";
      btn_editar.dataset.id = element.subtarea[key].id;
      btn_editar.dataset.nombre = element.subtarea[key].nombre;

      const btn_eliminar = document.createElement("button");
      btn_eliminar.classList.add("eliminar_sub", "btn", "btn-danger", "ms-1");
      btn_eliminar.textContent = "D";
      btn_editar.title = "Eliminar tarea";
      btn_eliminar.dataset.id = element.subtarea[key].id;

      const btn_completado = document.createElement("button");
      btn_completado.classList.add(
        "completado_sub",
        "btn",
        "btn-success",
        "ms-1"
      );
      btn_completado.textContent = "C";
      btn_editar.title = "Completando tarea";
      btn_completado.dataset.id = element.subtarea[key].id;

      tdAcciones.append(btn_editar, btn_eliminar, btn_completado);

      tr.append(tdNombre, tdEstado, tdAcciones);
      tbodytabla.append(tr);
    }

    row.append(col_1);
    col_1.appendChild(button_eliminar);
    col_8.appendChild(input);
    col_4.appendChild(button_guardar);
    row_card.append(col_8, col_4);
    card_body.appendChild(row_card);
    card.append(titulo, card_body);
    div.append(hr, row, card, container_tabla);
    tr.append(thSub, thEstado, thAcciones);
    table.append(tr, tbodytabla);
    container_tabla.append(h3, table);
    fragment.append(div);
  });
  container.append(fragment);
};

document.getElementById("guardar_tarea").addEventListener("click", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  if (nombre.trim() === "") {
    Swal.fire("Ingresa una tarea");
    return;
  }
  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre,
    }),
  };
  fetch(url, config)
    .then((response) => response.json())
    .then((data) => {
      Swal.fire("Registro exito!", "Tarea registrada");
      setTimeout(() => {
        location.reload();
      }, 2000);
    })
    .catch((error) => console.log(error));
});

document.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.matches(".eliminar_tarea")) {
    Swal.fire({
      title: "¿Estas seguro de eliminar esta tarea?",
      showDenyButton: true,
      confirmButtonText: "Si",
    }).then((result) => {
      let configuracion = {
        method: "DELETE",
      };
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "", "success");
        fetch(`${url}/del/${e.target.dataset.id}`, configuracion)
          .then((response) => response.json())
          .then((data) => location.reload())
          .catch((err) => {
            location.reload();
          });
      }
    });
  }

  if (e.target.matches(".guardar_subtarea")) {
    let subtarea = document.getElementById("nombre_subtarea").value;
    if (subtarea.trim() === "") {
      Swal.fire("Ingresa subtarea");
      return;
    }
    console.log(e.target.dataset.id);
    let config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        estado: "incompleta",
        nombre: subtarea,
        id_subtareas: {
          id: e.target.dataset.id,
        },
      }),
    };
    fetch(url2, config)
      .then((response) => response.json())
      .then((data) => {
        Swal.fire("Registro exito!", "Tarea registrada");
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
      .catch((error) => console.log(error));
  }
  if (e.target.matches(".eliminar_sub")) {
    Swal.fire({
      title: "¿Estas eliminar esta sub tarea?",
      showDenyButton: true,
      confirmButtonText: "Si",
    }).then((result) => {
      let configuracion = {
        method: "DELETE",
      };
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "", "success");
        fetch(`${url2}/del/${e.target.dataset.id}`, configuracion)
          .then((response) => response.json())
          .then((data) => location.reload())
          .catch((err) => {
            location.reload();
          });
      }
    });
  }
  if (e.target.matches("."))
    if (e.target.matches(".actualizar_sub")) {
    }
});
