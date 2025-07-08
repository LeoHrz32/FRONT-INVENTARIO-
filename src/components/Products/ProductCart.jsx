import React from 'react';
import { Link } from 'react-router-dom';
import { useItems } from '../../context/rentsDonations/itemsContext';  

const generateSlug = (text) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

const ProductCart = ({ id }) => {
    const { items } = useItems();  
    const item = items.find(product => product._id === id);

    console.log("Producto en ProductCart:", item); 

    if (!item) {
        return <p className="text-center">Cargando producto...</p>;
    }

    const { Name, RentalPrice, image } = item;
    const itemSlug = generateSlug(Name);

    return (
        <div className='bg-white p-5 rounded-xl shadow-sm'>
            <Link to={`/Alquileres/${itemSlug}`}>
                <img 
                    src={image || 'https://via.placeholder.com/300'} 
                    alt={Name} 
                    className='w-full h-80 object-cover object-top drop-shadow-[0_80px_30px_#0007]' 
                />
            </Link>

            <h3 className='text-2xl py-3 text-center font-medium text-black'>{Name}</h3>
            <div className="flex justify-center items-center text-green-600">
                <p>
                    $<span className="text-2xl font-medium">{RentalPrice}</span>
                </p>
            </div>
        </div>
    );
}

export default ProductCart;
