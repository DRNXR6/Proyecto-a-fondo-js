
import { getUsers } from "../services/usuarios.js";
import { getConsults,postConsults,updateConsults } from "../services/consultas.js";

const exit = document.getElementById("exit");

const UserPerfil = document.getElementById("UserPerfil");
const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || [];
const estado = "pendiente"
UserPerfil.textContent = usuarioActual;

const btnConsultar = document.getElementById("btnConsultar");

const users = document.getElementById("users");

let search = document.getElementById("search");
const main = document.getElementById("main");

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
            window.open("../html/index.html", "_self"); 
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
        showCancelButton: true,
        confirmButtonText: 'Enviar',

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

function crearConsulta(consulta) {

    let fecha = new Date().toLocaleString('es-ES', { hour12: false, second: '2-digit', minute: '2-digit', hour: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }).slice(0, -3);


    postConsults(usuarioActual,consulta,fecha,estado)

    setTimeout(() => {
        location.reload()
    }, 1000);

}


mostrarConsultas()

async function mostrarConsultas() {
    const datos = await getConsults()

    for (let index = 0; index < datos.length; index++) {
        let element = datos[index];        
        
        if(element.nombreUsuario === usuarioActual) {

            let colorAleatorio = colores[Math.floor(Math.random() * colores.length)];

            let divConsulta = document.createElement("div")
            divConsulta.classList.add("item")
            divConsulta.style.background = colorAleatorio;

            let h4User = document.createElement("h4")
            h4User.textContent = element.nombreUsuario
            h4User.classList.add("pNombre")

            let imgEdit = document.createElement("img")
            imgEdit.src = "../img/edit.png"
            imgEdit.classList.add("imgEdit")

            let pConsulta = document.createElement("p")
            pConsulta.textContent = element.consulta;
            pConsulta.id = "pConsulta"
            pConsulta.classList.add("pConsulta")



            let fecha = document.createElement("p")
            fecha.classList.add("footerItem")

            fecha.textContent = element.fecha

            divConsulta.appendChild(h4User)
            divConsulta.appendChild(imgEdit)
            divConsulta.appendChild(pConsulta)
            divConsulta.appendChild(fecha)

            main.appendChild(divConsulta)

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

                        actualizarConsulta(ActConsulta,element.id)
                        
                        return { ActConsulta };
                    }
                })
            })
        }


    }

}

async function actualizarConsulta(ActConsulta,element) {

    console.log(element);
    
    console.log(ActConsulta);
    
    const datos = await getConsults()

    for (let index = 0; index < datos.length; index++) {
        const Itr = datos[index]
            

        if(element == Itr.id) {
            console.log(Itr.id);

            let fecha = new Date().toLocaleString('es-ES', { hour12: false, second: '2-digit', minute: '2-digit', hour: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }).slice(0, -3);

            updateConsults(usuarioActual,ActConsulta,fecha,estado,Itr.id)

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
        
        if(datos[index].rol === "estudiante") {

            if(element === usuarioActual) {
                let DivUser = document.createElement("div")
                DivUser.id = "UserActual"


                let divIconP = document.createElement("div")
                divIconP.classList.add("iconP")
                divIconP.textContent = element[0];
                
        
                let pUser = document.createElement("p")
                pUser.textContent = element
                pUser.classList.add("pUser")

        
                
                DivUser.appendChild(divIconP)

                DivUser.appendChild(pUser)
        
                users.appendChild(DivUser)
            }
            else {

                let DivUser = document.createElement("div")
                DivUser.id = "divUser"

                let divIconP = document.createElement("div")
                divIconP.classList.add("iconP")
                divIconP.textContent = element[0];
                
        
                let pUser = document.createElement("p")
                pUser.textContent = element
                pUser.classList.add("pUser")
        
                DivUser.appendChild(divIconP)

                DivUser.appendChild(pUser)
        
                users.appendChild(DivUser)
            }
        }
    }
}



