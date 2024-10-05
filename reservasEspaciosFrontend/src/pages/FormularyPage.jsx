
export default function Formulary(){

    return (
        

        <div>

        <h1>Pruebas crear agendamientos </h1>


        <h2>Registro de reserva </h2>

        <form >

            <div>
                <label>tipo de agendamiento</label>
                <select

                    name="tipo_agendamiento"
                    id="tipo_agendamiento"
                 
                    


                >
                    <option value="">Seleccionar ...</option>
                    <option value="CUBICULO">Cubículo</option>
                    <option value="GIMNASIO">Gimnasio</option>
                </select>
            </div>


            <div>
                <label >Seleccionar Dia</label>

            </div>

            <div>
                <label>Seleccionar Horario</label>
                <select 
                    name="horario" 
                    id="horario" 
          

                >
                    <option value="">Seleccionar ...</option>

                </select>
            </div>


            <button type='submit'>Agendar Fecha</button>
        </form>    



        <h2>Registrar de los recursos reservables</h2>  

        <form >

            <div>
                <label>Tipo de recurso</label>
                <select 
                    name="tipo_recurso" 
                    id="tipo_recurso"
                   
                >
                    <option value="">Seleccionar...</option>
                    <option value="CUBICULO">Cubículo</option>
                    <option value="GIMNASIO">Gimnasio</option>
                </select>

            </div>

            <div>
                <label htmlFor="text">Nombre del recurso</label>
                <input type="text" name='nombre'  />
            </div>


            <button type='submit' >Registrar Recurso</button>

            

        </form>










    </div>

    )
}