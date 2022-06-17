const url = "http://localhost:8080/tareas";
const url2 = "http://localhost:8080/subtareas";
const d = document,
  $listadotareas = d.getElementById("listado-tareas"),
  $lista = d.getElementById("lista"),
  $form = d.getElementById("form-lista"),
  $form_tarea = d.getElementById("form-guardar-tarea"),
  $title = d.getElementById("titulo-listas"),
  $template = d.getElementById("template-listas").content,
  $tabla = d.getElementById("tbody-final"),
  $fragmento = d.createDocumentFragment();

fetch(url)
  .then((response) => response.json())
  .then((data) => datos(data))
  .catch((error) => console.log(error));
const datos = (data) => {
  data.forEach((data) => {
    $template.getElementById("titulo-tarea").textContent = data.nombre;
    $template.getElementById("eliminar_tarea").dataset.id = data.id;
    $template.getElementById("guardar_subtarea").dataset.id = data.id;
    let cadena = "";
    for (const key in data.subtarea) {
      cadena += `  
      <tr>
          <td>${data.subtarea[key].nombre}</td>
          <td>${data.subtarea[key].estado}</td>
      </tr>
      `;
    }
    let $clone = d.importNode($template, true);
    $fragmento.appendChild($clone);
  });

  $listadotareas.appendChild($fragmento);

  //Eliminar  tarea
};

d.getElementById("guardar_tarea").addEventListener("click", (e) => {
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
    console.log(e.path);
    let subtarea = d.querySelector(".subtarea").value;
    if (subtarea.trim() === "") {
      Swal.fire("Ingresa subtarea");
      return;
    }
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
        // setTimeout(() => {
        // location.reload();
        //  }, 2000);
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
  if (e.target.matches(".actualizar_sub")) {
    console.log(e.target.dataset.nombre);
  }
});
