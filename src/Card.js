import React from 'react'; 

function Card({ image, value, suit }) {
    return (
        <div>
            <img src={image} alt={`${value} of ${suit}`} />
        </div>
    );
}

export default Card; 