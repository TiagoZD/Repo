onload = inicio;

const client = new Cliente();
const employee = new Empleado();
const project = new Proyecto();
const system = new Sistema();

function inicio() {
  document
    .getElementById("botonCliente")
    .addEventListener("click", agregarCliente);
  document
    .getElementById("botonEmpleado")
    .addEventListener("click", agregarEmpleado);
  document
    .getElementById("botonProyecto")
    .addEventListener("click", agregarProyecto);
  document
    .getElementById("botonAsignar")
    .addEventListener("click", asignarProyecto);
  document
    .getElementById("botonEliminar")
    .addEventListener("click", eliminarEmpleadoProyecto);
}

function agregarCliente() {
  let nombre = document.getElementById("txtNombreC").value;
  let telefono = document.getElementById("txtTelefonoC").value;
  let email = document.getElementById("txtEmailC").value;
  let sitioweb = document.getElementById("txtSitiowebC").value;
  client.agregar(new Cliente(nombre, telefono, email, sitioweb));
  updateClientList();
  clientesCombo(document.getElementById("comboClienteP"));
  clientesCombo(document.getElementById("comboClienteQR"));
}

function updateClientList() {
  document.getElementById("idFormRegistroClientes").reset();
  let lista = document.getElementById("idListaClientesRegistrados");
  lista.innerHTML = "";
  let data = client.retornarDatos();
  for (item of data) {
    let x = document.createElement("li");
    let nodo = document.createTextNode(item);
    x.appendChild(nodo);
    lista.appendChild(x);
  }
}

function clientesCombo(combo) {
  let lista1 = combo;
  lista1.innerHTML = "";
  let data = client.retornarDatos();
  let data1 = system.listaClientes[0].nombre;
  for (let i = 0; i < data.length; i++) {
    data1 = system.listaClientes[i].nombre;
    let x = document.createElement("option");
    let nodo = document.createTextNode(data1);
    x.appendChild(nodo);
    lista1.appendChild(x);
  }
}

function agregarEmpleado() {
  let nombre = document.getElementById("txtNombreE").value;
  let telefono = document.getElementById("txtTelefonoE").value;
  let salario = document.getElementById("txtSalarioE").value;
  let cantidad = 0;
  let estado = "Disponible";
  employee.agregar(new Empleado(nombre, telefono, salario, cantidad, estado));
  updateEmployeeList();
  empleadoCombos(document.getElementById("comboEmpleados1"));
  empleadoCombos(document.getElementById("comboLiderP"));
  empleadoCombos(document.getElementById("comboEmpleados2"));
}

function updateEmployeeList() {
  document.getElementById("idFormRegistroEmpleado").reset();
  let tabla = document.getElementById("tabla");
  tabla.innerHTML = "";
  var header = tabla.createTHead();
  var row = header.insertRow(0);
  var cellN = row.insertCell();
  cellN.innerHTML = "Nombre";
  var cellS = row.insertCell();
  cellS.innerHTML = "Salario";
  var cellC = row.insertCell();
  cellC.innerHTML = "Cantidad";
  var cellE = row.insertCell();
  cellE.innerHTML = "Estado";

  let data = employee.retornarDatos();

  for (let i = 0; i < data.length; i++) {
    let fila = tabla.insertRow();
    let empleado = data[i];
    for (let k in empleado) {
      let celda = fila.insertCell();
      celda.innerHTML = empleado[k];
    }
  }
}

function empleadoCombos(combo) {
  let lista1 = combo;
  lista1.innerHTML = "";
  let data = employee.retornarDatos();
  let data1 = system.listaEmpleados[0].nombre;

  for (let i = 0; i < data.length; i++) {
    data1 = system.listaEmpleados[i].nombre;
    let x = document.createElement("option");
    let nodo = document.createTextNode(data1);
    x.appendChild(nodo);
    lista1.appendChild(x);
  }
}

function agregarProyecto() {
  let nombre = document.getElementById("txtNombreP").value;
  let descripcion = document.getElementById("txtDescripcionP").value;
  let area = document.getElementById("comboAreaP").value;
  let cliente = document.getElementById("comboClienteP").value;
  let lider = document.getElementById("comboLiderP").value;
  let listaAsignados = [];
  project.agregar(
    new Proyecto(nombre, descripcion, area, cliente, lider, listaAsignados)
  ); //crea objeto client y usa la función agregar() de la clase Cliente
  proyectoCombos(document.getElementById("comboProyecto1"));
  proyectoCombos(document.getElementById("comboProyecto2"));
}

function proyectoCombos(combo) {
  document.getElementById("idRegistroProyecto").reset();
  let lista1 = combo;
  lista1.innerHTML = "";
  let data = project.retornarDatos();
  let data1 = system.listaProyectos[0].nombre;
  for (let i = 0; i < data.length; i++) {
    data1 = system.listaProyectos[i].nombre;
    let x = document.createElement("option");
    let nodo = document.createTextNode(data1);
    x.appendChild(nodo);
    lista1.appendChild(x);
  }
}

function asignarProyecto() {
  let proyectoN = document.getElementById("comboProyecto1").value;
  let empleadoN = document.getElementById("comboEmpleados1").value;
  for (let i = 0; i < system.listaProyectos.length; i++) {
    //recorre la lista de proyectos
    if (system.listaProyectos[i].nombre == proyectoN) {
      //si en la posición i (cada posición es un proyecto), el nombre del proyecto es igual al del combobox
      if (system.listaProyectos[i].listaAsignados.indexOf(empleadoN) == -1) {
        system.listaProyectos[i].listaAsignados.push(empleadoN); //le agrega el empleado a la lista de asignados de ese proyecto
        for (let j = 0; j < system.listaEmpleados.length; j++) {
          if (system.listaEmpleados[j].nombre == empleadoN) {
            //busca el empleado seleccionado en el combo dentro de la lista de empleados
            system.listaEmpleados[j].cantidad++;
            if (
              system.listaEmpleados[j].cantidad >= 3 &&
              system.listaEmpleados[j].cantidad < 6
            ) {
              //este if es para que determine el estado del empleado
              system.listaEmpleados[j].estado = "Medio";
            } else if (system.listaEmpleados[j].cantidad >= 6) {
              system.listaEmpleados[j].estado = "Ocupado";
            } else {
              system.listaEmpleados[j].estado = "Disponible";
            }
          }
        }
      }
    }
  }
}

function eliminarEmpleadoProyecto() {
  let proyectoN = document.getElementById("comboProyecto2").value;
  let empleadoN = document.getElementById("comboEmpleados2").value;
  for (let i = 0; i < system.listaProyectos.length; i++) {
    if (system.listaProyectos[i].nombre == proyectoN) {
      if (system.listaProyectos[i].listaAsignados.indexOf(empleadoN) != -1) {
        let p = system.listaProyectos[i].listaAsignados.indexOf(empleadoN);
        system.listaProyectos[i].listaAsignados.splice(p, 1);
        for (let j = 0; j < system.listaEmpleados.length; j++) {
          if (system.listaEmpleados[j].nombre == empleadoN) {
            system.listaEmpleados[j].cantidad--;
            if (
              system.listaEmpleados[j].cantidad >= 3 &&
              system.listaEmpleados[j].cantidad < 6
            ) {
              system.listaEmpleados[j].estado = "Medio";
            } else if (system.listaEmpleados[j].cantidad >= 6) {
              system.listaEmpleados[j].estado = "Ocupado";
            } else {
              system.listaEmpleados[j].estado = "Disponible";
            }
          }
        }
      }
    }
  }
}
