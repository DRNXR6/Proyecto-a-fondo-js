// In your main JS file
import { getUsers } from "../services/usuarios.js"

// Declare the variable at the top
let veri = false;
// export let usuario = ""; // Export usuario here so other files can access it.

const loginUsuario = document.getElementById("loginUsuario")
const loginContraseña = document.getElementById("loginContraseña")

const btnLogin = document.getElementById("btnLogin")


btnLogin.addEventListener("click", function () {
    verificarCreedenciales();
})

async function verificarCreedenciales() {
    if (loginUsuario.value.trim() == "" || loginContraseña.value.trim() == "") {
        Swal.fire({
            icon: "info",
            text: "¡Por favor, llene todos los campos!",
        });
    }
    else {
        const datos = await getUsers()

        for (let index = 0; index < datos.length; index++) {
            if (loginUsuario.value.trim() == datos[index].usuario && loginContraseña.value.trim() == datos[index].contraseña && datos[index].rol == "estudiante") {
                veri = true;
                
                localStorage.setItem("usuarioActual", JSON.stringify(datos[index].usuario));

                setTimeout(() => {
                    window.open("../html/webEstudiante.html", "_self"); 
                }, 300 )
            }
            else if (loginUsuario.value.trim() == datos[index].usuario && loginContraseña.value.trim() == datos[index].contraseña && datos[index].rol == "admin") {
                veri = true;

                localStorage.setItem("usuarioActual", JSON.stringify(datos[index].usuario));

                setTimeout(() => {
                    window.open("../html/webAdmin.html", "_self"); 
                }, 300 )
            }
        }

        if(veri == false) {
            Swal.fire({
                icon: "error",
                text: "¡El usuario o contraseña es incorrecta, porfavor intentelo de nuevo!",
            });
        }
    }
}
