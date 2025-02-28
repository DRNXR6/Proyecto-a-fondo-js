
import { getUsers,postUsers } from "../services/usuarios.js"


const Rusuario = document.getElementById("Rusuario")
const Rcontraseña = document.getElementById("Rcontraseña")
const rol = "estudiante";

const btnRegistrar = document.getElementById("btnRegistrar")

let UserExiste = false;

btnRegistrar.addEventListener("click",function () {

    VUserExistente()
})


async function VUserExistente() {

    if (Rusuario.value.trim() != "" && Rcontraseña.value.trim() != "") {
        
        const datos = await getUsers()

        for (let index = 0; index < datos.length; index++) {


            if (Rusuario.value.trim() == datos[index].usuario) {
                UserExiste = true;
            
                setTimeout(() => {
                    Swal.fire({
                        title: "El usuario ya existe, por favor ingrese otro nuevamente!",
                        icon: "info",
                    }).then (( ) => {
                        location.href = "registros.html"
                    })
                    
                }, 400);
                return;
                
            }
        }


        if(UserExiste == false) {

            postUsers(rol,Rusuario.value,Rcontraseña.value)
        
            setTimeout(() => {
                Swal.fire({
                    title: "Usuario registrado correctamente!",
                    icon: "success",
                    
                }).then (( ) => {
                    location.href = "index.html"
                })
                
            }, 400);
            return;
            
        }

    }
    

}




