class Cliente {
  constructor(nombre, telefono, email, sitioweb) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.email = email;
    this.sitioweb = sitioweb;
  }

  agregar(ingreso) {
    system.listaClientes.push(ingreso);
  }

  retornarDatos() {
    //toma la lista con el nuevo ingreso y la ordena por orden alfabético
    system.listaClientes.sort(function(a, b) {
      if (a.nombre.toUpperCase() < b.nombre.toUpperCase()) {
        return -1;
      } else {
        return 1;
      }
    });
    return system.listaClientes;
  }

  toString() {
    return this.nombre + " - " + this.sitioweb; //debe mostrarse solo nombre y sitioweb en la lista
  }
}

class Empleado {
  constructor(nombre, telefono, salario, cantidad, estado) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.salario = salario;
    this.estado = estado;
    this.cantidad = cantidad;
  }
  agregar(ingreso) {
    system.listaEmpleados.push(ingreso);
  }

  retornarDatos() {
    return system.listaEmpleados;
  }

  toString() {
    return this.nombre + " " + this.salario + " " + this.estado;
  }
}

class Proyecto {
  constructor(nombre, descripcion, area, cliente, lider, listaAsignados) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.area = area;
    this.cliente = cliente;
    this.lider = lider;
    this.listaAsignados = [];
  }
  agregar(ingreso) {
    system.listaProyectos.push(ingreso);
  }

  retornarDatos() {
    return system.listaProyectos;
  }

  toString() {
    return (
      this.nombre +
      " " +
      this.descripcion +
      " " +
      this.area +
      " " +
      this.cliente +
      " " +
      this.lider +
      " " +
      this.listaAsignados
    );
  }
}

class Sistema {
  constructor() {
    this.listaClientes = [];
    this.listaEmpleados = [];
    this.listaProyectos = [];
  }
  agregar(ingreso) {
    this.lista.push(ingreso);
  }

  retornarDatos() {
    return this.lista;
  }

  toString() {
    return this.nombre + " " + this.descripcion + " " + this.area;
  }
}
