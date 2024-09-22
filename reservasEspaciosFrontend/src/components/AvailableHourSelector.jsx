



function AvailableHourSelector({horaInicio,HoraFinal}) {


    return (

        <div style={{
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '10px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            width: '300px'
        }}
        
        
        >
            <p style={{
                    backgroundColor: 'lightgreen', 
                    padding: '10px', 
                    borderRadius: '5px', 
                    color: 'black', 
                    margin: '0'
                }}
        
            >{horaInicio}</p>
            <p style={{
                    backgroundColor: 'lightgreen', 
                    padding: '10px', 
                    borderRadius: '5px', 
                    color: 'black', 
                    margin: '0'
                }}
            >{HoraFinal}</p>


            <button


            style={{
                    padding: '10px 15px', 
                    borderRadius: '5px', 
                    backgroundColor: '#007BFF', 
                    color: 'white', 
                    border: 'none', 
                    cursor: 'pointer'
                }}
            
            
            >Elegir Hora</button>
        </div>


    )
}


export default AvailableHourSelector