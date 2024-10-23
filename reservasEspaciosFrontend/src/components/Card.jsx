import React from 'react';

import { NavLink } from "react-router-dom";


const Card = ({ title, description, imageUrl, }) => {
    return (
        <div className="principalCard">
            <div className="card-image-container">
                {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
                <div className="card-text">
                    <h2 className="card-title">{title}</h2>
                    <p className="card-description">{description}</p>
                </div>

                <div className="card-link">
                    <div className="link-container">
                        <NavLink to="/formulary" activeClassName="active">Formulario</NavLink>
                    </div>
                </div>


            </div>


        </div>
    );
};

export default Card;
