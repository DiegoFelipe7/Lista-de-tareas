const url = "http://localhost:8080/tareas";
fetch(url)
  .then((response) => response.json())
  .then((data) => datos(data))
  .catch((error) => console.log(error));
const datos = (data) => {
  const container = document.getElementById("listado-tareas");
  const fragment = document.createDocumentFragment();

  data.forEach((element) => {
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
    button_eliminar.classList.add("btn-close", "text-dark");
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
    button_guardar.classList.add("btn", "btn-dark", "fw-bold");
    button_guardar.type = "button";
    button_guardar.textContent = "Guardar";
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
    const tbody = document.createElement("tbody");
    for (const key in data.subtareas) {
      //tr body
      const trBody = document.createElement("tr");
      const tdNombre = document.createElement("td");
      tdNombre.innerHTML = data.subtareas[key].nombre;
      const tdEstado = document.createElement("td");
      tdEstado.innerHTML = data.subtareas[key].estado;

      const tdAcciones = document.createElement("td");
      const btn_editar = document.createElement("button");
      button_editar.classList.add("btn", "btn-dark");
      button_editar.textContent = "U";
      button_editar.dataset.id = data.subtareas[key].id;
      button_editar.dataset.id = data.subtareas[key].nombre;

      const btn_eliminar = document.createElement("button");
      button_editar.classList.add("btn", "btn-dark");
      button_editar.textContent = "U";
      button_editar.dataset.id = data.subtareas[key].id;

      tdAcciones.append(btn_editar, btn_eliminar);

      trBody.append(tdNombre, tdEstado, tdAcciones);
      tbody.append(trBody);
      table.append(tbody);
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
    table.append(tr);
    container_tabla.append(h3, table);
    fragment.append(div);
  });
  container.append(fragment);
};

/*  <div class="w-100 border shadow rounded p-5 mt-2 bg-white">
              <hr class="bg-dark" />
              <div class="row justify-content-end">
                <div class="col-1">
                  <button
                    id="eliminar_tarea"
                    name="eliminar_tarea"
                    title="Eliminar tarea"
                    class="eliminar_tarea btn-close text-dark"
                    aria-label="Close"
                  ></button>
                </div>
              </div>---aqui voy



               <div class="card mt-2">
                <h5 id="titulo-tarea" class="card-header"></h5>
                <div class="card-body"> --
                  <form id="form-guardar-tarea" method="POST">
                    <div class="row">
                      <div class="col-8">
                        <input
                          id="subtarea"
                          name="subtarea"
                          class="subtarea form-control w-100"
                          placeholder="Ingresa una subtareas "
                        />
                      </div>
                      <div class="col-4">
                        <button
                          id="guardar_subtarea"
                          name="guardar_subtarea"
                          class="guardar_subtarea btn btn-outline-secondary"
                        >
                          Guardar
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>--aqui
              

                <hr />
              <div class="w-100">
                <h3 class="text-dark text-center fw-bold">
                  Subtareas 📋<samp></samp>
                </h3>
                <table id="super-tabla" class="table table-striped">
                  <thead>
                    <tr>
                      <th>Actividad</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody id="tbody-final"></tbody>
                </table>
              </div>
            </div>
              
              
              */
