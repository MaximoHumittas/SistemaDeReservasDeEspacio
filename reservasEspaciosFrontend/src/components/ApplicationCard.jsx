


function ApplicationCard({name,career,typeAplication,index}) {

    //se les mandaria a la api
    const ApprovedAplication = () => {
        console.log("Solicitud Aprovada")

    }

    const DeniedAplication= () => {
        console.log("Solicitud denegada")

    }



    return (
        <div style={{display:"flex",backgroundColor:""}}>
            <p>Numero: {index}</p>
            <p>Nombre: {name}|</p> 
            <p>Carrera: {career}|</p> 
            <p>Tipo de Solicitud: {typeAplication}</p>


            <button onClick={ApprovedAplication} style={{backgroundColor:"red", }}>Solicitud Aprobada </button>
            <button onClick={DeniedAplication } style={{backgroundColor:"green"}}>Solicitud Degenada </button>
        </div>
    );
}

export default ApplicationCard;