const inputTarea = document.querySelector("#inputTarea");
const btnAgregar = document.querySelector("#btnAgregar");
const mensaje = document.querySelector("#mensaje");
const total = document.querySelector("#total");
const realizadas = document.querySelector("#realizadas");
const listadoTareas = document.querySelector("#listadoTareas");

const tareas = [
    { id: 1, nombre: "Hacer mercado", estado: false },
    { id: 2, nombre: "Estudiar para la prueba", estado: false },
    { id: 3, nombre: "Sacar a pasear a Ringo", estado: false },
];

function calculoID(arreglo) {
    const tareasOrdenadas = arreglo.sort((x, y) => x.id - y.id)   //ordena de menor a mayor 
    if (tareasOrdenadas.length > 0) {
        return tareasOrdenadas[tareasOrdenadas.length-1].id + 1  // y luego saca el último id y le suma 1
    } else {                     // en caso de que se borren todas las tareas, de igual forma genere un id
        return 1
    }
}

function borrar(id) {
    const index = tareas.findIndex((ele) => ele.id == id)
    tareas.splice(index, 1)
    render()
}

function cambiarEstado(id) {
    const index = tareas.findIndex((ele) => ele.id == id)
    tareas[index].estado ? tareas[index].estado = false : tareas[index].estado = true
    render()
}

const render = () => {
    mensaje.textContent = ""; // limpio acá el mensaje, para que luego cuando realice un cambio de estado o se elimine una tarea, se borre el mensaje desplegado asociado a la validación de input vacío (addEventListener), ya que si sólo lo dejaba en el evento, este sólo se borraba al ingresar una nueva tarea, no al modificar las que ya están en la lista.
    let contenidoTemporal = "";
    tareas.forEach((item) => {
        contenidoTemporal += `
    <tr>
        <td>${item.id}</td>
        <td>${item.estado ? `<b>${item.nombre}</b>` : item.nombre}</td>
        <td><input onclick="cambiarEstado(${item.id})" type="checkbox" ${item.estado ? "checked" : ""}></td>
        <td><button onclick="borrar(${item.id})">x</button></td>
    </tr>
    `;
    });

    listadoTareas.innerHTML = contenidoTemporal
    total.innerHTML = `Total: ${tareas.length}`

    const tareasFiltradas = tareas.filter((t) => t.estado);
    realizadas.innerHTML = `Realizadas: ${tareasFiltradas.length}`
};
render()

btnAgregar.addEventListener("click", () => {
    //mensaje.textContent = ""; esto va en render ()
    if (inputTarea.value.trim() == "") {
        mensaje.textContent = "Ingresa un dato válido"
        return
    }
    let tareaTemporal = { id: calculoID(tareas), nombre: inputTarea.value, estado: false }
    tareas.push(tareaTemporal)
    inputTarea.value = "";
    render()
})


