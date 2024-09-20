
function TaskCard({title,data,imageSrc}) {

    {/* por mejorar */}
    return (

        <div>
            <img src={imageSrc} alt="" />
            <div>
                <h3>{title}</h3>
                <p>{data}</p>

            </div>


        </div>


    )
}


export default TaskCard