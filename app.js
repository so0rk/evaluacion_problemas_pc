let problemas = [];

function agregarProblema() {
  const numeroComputadora = document.getElementById('numeroComputadora').value;
  const descripcionProblema = document.getElementById('problema').value;

  // checkea que los campos no esten vacios antes de presionar el boton agregar problema
  if (numeroComputadora.trim() === '' || descripcionProblema.trim() === '') {
    alert('Por favor, complete ambos campos.');
    return;
  }

  // agregamos el problema al array
  problemas.push({
    numeroComputadora,
    descripcionProblema,
    seleccionado: false // agrega la propiedad 'seleccionado' al objeto problema
  });
  document.getElementById('numeroComputadora').value = '';
  document.getElementById('problema').value = '';
  mostrarProblemas();
}

function mostrarProblemas() {
  const listaProblemas = document.getElementById('listaProblemas');
  listaProblemas.innerHTML = '';

  // iterar sobre el array de problemas y agregar elementos a la lista
  for (let i = 0; i < problemas.length; i++) {
    const problema = problemas[i];
    const listItem = document.createElement('li');

    // crea un checkbox para cada problema
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = problema.seleccionado;
    checkbox.onchange = function() {
      problema.seleccionado = checkbox.checked;
      mostrarProblemas(); 
    };
    listItem.appendChild(checkbox);

    // muestra la informacion del problema
    listItem.appendChild(document.createTextNode(`Computadora ${problema.numeroComputadora}: ${problema.descripcionProblema}`));

    // crea botones de modificar y eliminar solo si el checkbox se encuentra marcado
    if (problema.seleccionado) {
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.onclick = function() {
        eliminarProblema(i);
      };
      listItem.appendChild(btnEliminar);

      const btnModificar = document.createElement('button');
      btnModificar.textContent = 'Modificar';
      btnModificar.onclick = function() {
        modificarProblema(i);
      };
      listItem.appendChild(btnModificar);
    }

    listaProblemas.appendChild(listItem);
  }
}

// esta funcion elimina el problema agregado
function eliminarProblema(index) {
  problemas.splice(index, 1);
  mostrarProblemas();
}

// con esta funcion modificamos el contenido del problema que agregamos
function modificarProblema(index) {
  const nuevoContenido = prompt('Ingrese el nuevo contenido del problema:');
  if (nuevoContenido !== null) {
    problemas[index].descripcionProblema = nuevoContenido;
    mostrarProblemas();
  }
}
