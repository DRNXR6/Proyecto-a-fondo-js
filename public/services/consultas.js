async function getConsults() {
    try {
        const response = await fetch('http://localhost:3001/consults', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching Consults');
        }

        const Consults = await response.json();
        return Consults;
    } catch (error) {
        console.error('Error fetching Consults:', error);
        throw error;
    }
}

export { getConsults };

//////////LLAMADO POST//////////

async function postConsults(nombreUsuario,consulta,fecha,estado) {
    try {
     
        const userData = { 
            nombreUsuario,
            consulta,
            fecha,
            estado
        
        };

        const response = await fetch("http://localhost:3001/consults", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

     
        return await response.json();

        
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}

export{postConsults}

//////////////LLAMADO UPDATE/////////////


async function 
updateConsults(nombreUsuario,consulta,fecha,estado,id)
{
    try {
     
        const userData = { 
            nombreUsuario,
            consulta,
            fecha,
            estado
        
        };

        const response = await fetch("http://localhost:3001/consults/"+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

     
        return await response.json();
    } catch (error) {
        console.error('Error update consult:', error);
        throw error;
    }
}

export{updateConsults}



//////////////LLAMADO DELETE/////////////


async function deleteConsults(id) {
    try {
        const response = await fetch(`http://localhost:3001/consults/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting consult with id ${id}`);
        }

        return { message: `Consult with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting consult:', error);
        throw error;
    }
}

export { deleteConsults };