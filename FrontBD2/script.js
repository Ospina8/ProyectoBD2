const apiUrl = "http://localhost:8080/productos"; // URL de la API

// Variable para almacenar el ID del producto que se está editando
let productoId = null;

// Función para obtener productos y mostrarlos
function obtenerProductos() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los productos");
            }
            return response.json();
        })
        .then(productos => {
            const productosList = document.getElementById("productos-list");
            productosList.innerHTML = ""; // esto Limpia la lista antes de agregar nuevos productos

            productos.forEach(producto => {
                // esto Crea un contenedor para el producto
                const divProducto = document.createElement("div");
                divProducto.classList.add("producto");

                // Resaltar si el stock es bajo
                if (producto.stock < 20) {
                    divProducto.classList.add("stock-bajo");
                    alert(`¡Atención! El producto "${producto.nombre}" tiene un stock bajo (${producto.stock} unidades).`);
                }

                // Agregar información del producto
                divProducto.innerHTML = `
                    <span>${producto.nombre}</span>
                    <span>${producto.categoria}</span>
                    <span>${producto.precio}</span>
                    <span>${producto.stock}</span>
                    <span>${producto.cantidad}</span>
                    <button class="edit" onclick="editarProducto('${producto.id}')">Editar</button>
                    <button class="delete" onclick="eliminarProducto('${producto.id}')">Eliminar</button>
                `;

                // Agregar el producto a la lista
                productosList.appendChild(divProducto);
            });
        })
        .catch(error => console.error("Error:", error));
}

// Función para agregar un producto
function agregarProducto(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const categoria = document.getElementById("categoria").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const stock = parseInt(document.getElementById("stock").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);

    const nuevoProducto = { nombre, categoria, precio, stock, cantidad };

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al agregar el producto");
            }
            return response.json();
        })
        .then(() => {
            obtenerProductos(); // Actualizar la lista después de agregar
            document.getElementById("producto-form").reset(); // Limpiar el formulario
        })
        .catch(error => console.error("Error:", error));
}

// Función para editar un producto
function editarProducto(id) {
    productoId = id;

    // Mostrar el formulario de actualización
    document.getElementById("producto-update-form").style.display = "block";

    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(producto => {
            // Llenar los campos de actualización con los valores del producto
            document.getElementById("nombre-update").value = producto.nombre;
            document.getElementById("categoria-update").value = producto.categoria;
            document.getElementById("precio-update").value = producto.precio;
            document.getElementById("stock-update").value = producto.stock;
            document.getElementById("cantidad-update").value = producto.cantidad;
        })
        .catch(error => console.error("Error:", error));
}

// Función para actualizar un producto
function actualizarProducto(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre-update").value;
    const categoria = document.getElementById("categoria-update").value;
    const precio = parseFloat(document.getElementById("precio-update").value);
    const stock = parseInt(document.getElementById("stock-update").value);
    const cantidad = parseInt(document.getElementById("cantidad-update").value);

    const productoActualizado = { nombre, categoria, precio, stock, cantidad };

    fetch(`${apiUrl}/${productoId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productoActualizado),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al actualizar el producto");
            }
            return response.json();
        })
        .then(() => {
            obtenerProductos(); // Actualizar la lista después de editar
            document.getElementById("producto-update-form").reset(); // Limpiar el formulario
            document.getElementById("producto-update-form").style.display = "none"; // Ocultar el formulario
        })
        .catch(error => console.error("Error:", error));
}

// Función para cancelar la edición
function cancelarEdicion() {
    document.getElementById("producto-update-form").reset(); // Limpiar el formulario de actualización
    document.getElementById("producto-update-form").style.display = "none"; // Ocultar el formulario
}

// Función para eliminar un producto
function eliminarProducto(id) {
    fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al eliminar el producto");
            }
            obtenerProductos(); // Actualizar la lista después de eliminar
        })
        .catch(error => console.error("Error:", error));
}

// Asignar eventos
document.getElementById("producto-form").addEventListener("submit", agregarProducto);
document.getElementById("producto-update-form").addEventListener("submit", actualizarProducto);

// Cargar productos al iniciar
obtenerProductos();
