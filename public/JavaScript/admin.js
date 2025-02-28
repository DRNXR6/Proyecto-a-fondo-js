
import { getUsers } from "../services/usuarios.js";
import { getConsults,postConsults,updateConsults,deleteConsults } from "../services/consultas.js";

const btnConsultar = document.getElementById("btnConsultar");

const usersAdmin = document.getElementById("usersAdmin");
const usersEstudiantes = document.getElementById("usersEstudiantes");


let search = document.getElementById("search");
const main = document.getElementById("main");

const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || [];


const UserPerfil = document.getElementById("UserPerfil");

UserPerfil.textContent = usuarioActual;

const cambiarConsultas = document.getElementById("cambiarConsultas");
const cambiarConsultas2 = document.getElementById("cambiarConsultas2")


let estado = "pendiente";

const colores = [
    "#FF5733",  // Red-Orange
    "#33FF57",  // Lime Green
    "#3357FF",  // Royal Blue
    "#FFD700",  // Gold
    "#FF6347",  // Tomato
    "#00CED1",  // Dark Turquoise
    "#FF1493",  // Deep Pink
    "#8A2BE2",  // Blue Violet
    "#20B2AA",  // Light Sea Green
    "#FF4500",  // Orange Red
    "#2E8B57",  // Sea Green
    "#FFFF00",  // Yellow
    "#ADFF2F",  // Green Yellow
    "#D2691E",  // Chocolate
    "#1E90FF",  // Dodger Blue
    "#C71585",  // Medium Violet Red
    "#A52A2A",  // Brown
    "#008080",  // Teal
    "#FF8C00",  // Dark Orange
  ];
  

  
exit.addEventListener("click", async function () {

    Swal.fire({
        title: "Cerrar sesión?",
        text: "",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar!"

    }).then((result) => {

        if (result.isConfirmed) {
            window.location.replace("../html/index.html");
            // location.reload()

            // history.pushState(null, null, window.location.href);
            // history.back();
            // history.forward();
        }
    })
})

search.addEventListener("input", function() {
    buscar();
});

function buscar() {
    let searchF = document.getElementById("search").value.toUpperCase();
    let pConsultas = document.getElementsByClassName("pConsulta");
    
    for (let i = 0; i < pConsultas.length; i++) {
        let texto = pConsultas[i].textContent || pConsultas[i].innerText;
        let divContenedor = pConsultas[i].parentElement;  // Obtiene el div que contiene el pConsulta

        if (texto.toUpperCase().indexOf(searchF) > -1) {
            divContenedor.style.display = "block";
        } else {
            divContenedor.style.display = "none"; 
        }
    }
}

btnConsultar.addEventListener("click", async function () {

    Swal.fire({
        title: 'Hacer Consulta',
        html: `
            
            <textarea id="consulta" class="swal2-textarea" placeholder="Escriba su consulta"></textarea>
            
        `,
        confirmButtonText: 'Enviar',
        showCancelButton: true,

        focusConfirm: false,
        preConfirm: () => {

            const consulta = document.getElementById('consulta').value;
            

            if (!consulta) {
                Swal.showValidationMessage('Por favor, escriba su consulta.');
            }
            setTimeout(() => {
                crearConsulta(consulta)
            }, 500);
            
            return { consulta };
        }
    }).then((result) => {
        
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Consulta Enviada',
                icon: 'success',
                showConfirmButton: false
            })
            
        }
    });
    
    
});

cambiarConsultas.addEventListener("click", function () {

    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }

    cambiarConsultas.style.display = "none";
    cambiarConsultas2.style.display = "block";

    MConsultasAtendidas()

});

cambiarConsultas2.addEventListener("click", function () {

    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }

    cambiarConsultas.style.display = "block";
    cambiarConsultas2.style.display = "none";

    MConsultasPendientes()

});

function crearConsulta(consulta) {

    let fecha = new Date().toLocaleString('es-ES', { hour12: false, second: '2-digit', minute: '2-digit', hour: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }).slice(0, -3);

    postConsults(usuarioActual,consulta,fecha,estado)

    setTimeout(() => {
        location.reload()
    }, 1000);

}
////////////////////////////////////////////




////////////////////////////////////////////
if(estado == "pendiente"){
    MConsultasPendientes()
}


async function MConsultasPendientes() {
    const datos = await getConsults()


    for (let index = 0; index < datos.length; index++) {
        let element = datos[index];        
   
        if(element.estado === "pendiente") {
            console.log(estado);

            // let colorAleatorio = colores[Math.floor(Math.random() * colores.length)];

            let divConsulta = document.createElement("div")
            divConsulta.classList.add("item")
            divConsulta.style.background = "lightblue";

            let h4User = document.createElement("h4")
            h4User.textContent = element.nombreUsuario
            h4User.classList.add("pNombre")

            let imgDelete = document.createElement("img")
            imgDelete.src = "../img/basurero.png"
            imgDelete.classList.add("imgDelete")

            let imgEdit = document.createElement("img")
            imgEdit.src = "../img/edit.png"
            imgEdit.classList.add("imgEdit")

            let checkBox = document.createElement("input")
            checkBox.type = "checkbox"
            checkBox.classList.add("check")


            let pConsulta = document.createElement("p")
            pConsulta.textContent = element.consulta;
            pConsulta.classList.add("pConsulta")

            let fecha = document.createElement("p")
            fecha.classList.add("footerItem")

            fecha.textContent = element.fecha

            divConsulta.appendChild(h4User)
            divConsulta.appendChild(imgDelete)
            divConsulta.appendChild(imgEdit)
            divConsulta.appendChild(checkBox)
            divConsulta.appendChild(pConsulta)
            divConsulta.appendChild(fecha)

            main.appendChild(divConsulta)


            imgDelete.addEventListener("click", async function () {
                Swal.fire({
                    title: '¿Estás seguro de eliminar la consulta?',
                    showCancelButton: true,
                    confirmButtonText: 'Eliminar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#FF0000',
                    cancelButtonColor: '#FF0000',
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Consulta Eliminada',
                            icon: 'success',
                            showConfirmButton: false
                        })
                        setTimeout(() => {
                            deleteConsults(element.id)
                        }, 600);
                        setTimeout(() => {
                            location.reload()
                        }, 1000);
        
                        
                    }
                });
            })

            
            imgEdit.addEventListener("click", function () {

                Swal.fire({
                    title: 'Actualizar Consulta',
                    html: `
                        
                        <textarea id="ActConsulta" class="swal2-textarea" placeholder="Escriba su Consulta"></textarea>
                        
                    `,
                    showCancelButton: true,
                    confirmButtonText: 'Actualizar',
            
                    focusConfirm: false,
                    preConfirm: () => {
            
                        const ActConsulta = document.getElementById('ActConsulta').value;
                        
            
                        if (!ActConsulta) {
                            Swal.showValidationMessage('Por favor, escriba su consulta.');
                        }

                        actualizarConsulta(element.nombreUsuario,ActConsulta,element.id)
                        
                        return { ActConsulta };
                    }
                })
            })

            checkBox.addEventListener("change", function () {

                if(this.checked) {

                    let fecha = new Date().toLocaleString('es-ES', { hour12: false, second: '2-digit', minute: '2-digit', hour: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }).slice(0, -3);

                    estado = "atendida"

                    updateConsults(usuarioActual,element.consulta,fecha,estado,element.id)

                    // deleteConsults(element.id)

                    Swal.fire({
                        title: "Consulta atendida",
                        icon: "success",
                        draggable: true,
                        showConfirmButton: false
                    })
        
                    setTimeout(() => {
                        location.reload()
                    }, 1000);
                    
                }
                
            })
        }
    }


}


async function MConsultasAtendidas() {
    const datos = await getConsults()


    for (let index = 0; index < datos.length; index++) {
        let element = datos[index];        

        if(element.estado === "atendida") {
            console.log(estado);
                
            // let colorAleatorio = colores[Math.floor(Math.random() * colores.length)];

            let divConsulta = document.createElement("div")
            divConsulta.classList.add("item")
            divConsulta.style.background = "lightgreen";

            let h4User = document.createElement("h4")
            h4User.textContent = element.nombreUsuario
            h4User.classList.add("pNombre")

            let imgDelete = document.createElement("img")
            imgDelete.src = "../img/basurero.png"
            imgDelete.classList.add("imgDelete")

            let imgEdit = document.createElement("img")
            imgEdit.src = "../img/edit.png"
            imgEdit.classList.add("imgEdit")

            let checkBox = document.createElement("input")
            checkBox.type = "checkbox"
            checkBox.classList.add("check")
            checkBox.checked = true;



            let pConsulta = document.createElement("p")
            pConsulta.textContent = element.consulta;
            pConsulta.classList.add("pConsulta")

            let fecha = document.createElement("p")
            fecha.classList.add("footerItem")

            fecha.textContent = element.fecha

            divConsulta.appendChild(h4User)
            divConsulta.appendChild(imgDelete)
            divConsulta.appendChild(imgEdit)
            divConsulta.appendChild(checkBox)
            divConsulta.appendChild(pConsulta)
            divConsulta.appendChild(fecha)

            main.appendChild(divConsulta)


            imgDelete.addEventListener("click", async function () {
                Swal.fire({
                    title: '¿Estás seguro de eliminar la consulta?',
                    showCancelButton: true,
                    confirmButtonText: 'Eliminar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#FF0000',
                    cancelButtonColor: '#FF0000',
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Consulta Eliminada',
                            icon: 'success',
                            showConfirmButton: false
                        })
                        setTimeout(() => {
                            deleteConsults(element.id)
                        }, 600);
                        setTimeout(() => {
                            location.reload()
                        }, 1000);
        
                        
                    }
                });
            })

            
            imgEdit.addEventListener("click", function () {

                Swal.fire({
                    title: 'Actualizar Consulta',
                    html: `
                        
                        <textarea id="ActConsulta" class="swal2-textarea" placeholder="Escriba su Consulta"></textarea>
                        
                    `,
                    showCancelButton: true,
                    confirmButtonText: 'Actualizar',
            
                    focusConfirm: false,
                    preConfirm: () => {
            
                        const ActConsulta = document.getElementById('ActConsulta').value;
                        
            
                        if (!ActConsulta) {
                            Swal.showValidationMessage('Por favor, escriba su consulta.');
                        }

                        actualizarConsulta(element.nombreUsuario,ActConsulta,element.id)
                        
                        return { ActConsulta };
                    }
                })
            })

            checkBox.addEventListener("change", function () {

                if(this.checked) {
                }
                else {
                    let fecha = new Date().toLocaleString('es-ES', { hour12: false, second: '2-digit', minute: '2-digit', hour: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }).slice(0, -3);

                    estado = "pendiente"

                    updateConsults(usuarioActual,element.consulta,fecha,estado,element.id)

                    Swal.fire({
                        title: "Consulta modificada a pendiente",
                        icon: "success",
                        draggable: true,
                        showConfirmButton: false
                    })
        
                    setTimeout(() => {
                        location.reload()
                    }, 1000);
                }
            })
        }

    }


}



async function actualizarConsulta(nomUsuario,ActConsulta,ID) {

        
    const datos = await getConsults()

    for (let index = 0; index < datos.length; index++) {
        const Itr = datos[index]
            

        if(ID == Itr.id) {

            let fecha = new Date().toLocaleString('es-ES', { hour12: false, second: '2-digit', minute: '2-digit', hour: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }).slice(0, -3);

            updateConsults(nomUsuario,ActConsulta,fecha,estado,Itr.id)

            Swal.fire({
                title: "Consulta Actualizada",
                icon: "success",
                draggable: true,
                showConfirmButton: false
            })

            setTimeout(() => {
                location.reload()
            }, 1000);
           
              
            
            
        }
    }
    

    

}

participantes()

async function participantes() {
    const datos = await getUsers()

    for (let index = 0; index < datos.length; index++) {
        let element = datos[index].usuario;
        
        if(datos[index].rol === "admin") {
            let divIconP = document.createElement("div")
            divIconP.classList.add("iconP")
            divIconP.textContent = element[0];
            
    
            let pUser = document.createElement("p")
            pUser.textContent = element + " (Admin)"
            pUser.classList.add("pUser")
    
            usersAdmin.appendChild(divIconP)
    
            usersAdmin.appendChild(pUser)
        }

        else {
            let divIconP = document.createElement("div")
            divIconP.classList.add("iconP")
            divIconP.textContent = element[0];
            
    
            let pUser = document.createElement("p")
            pUser.textContent = element
            pUser.classList.add("pUser")
    
            usersEstudiantes.appendChild(divIconP)
    
            usersEstudiantes.appendChild(pUser)
        }
    }
}




