import React from 'react';

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 mx-1 border rounded ${currentPage === 1 ? 'bg-secondary-900 text-gray-700 border-gray-700 cursor-not-allowed' : 'bg-secondary-900 text-white hover:bg-gray-500'}`}
            >
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(index + 1)}
                    className={`px-3 py-1 mx-1 border rounded ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-secondary-900 text-white hover:bg-gray-500'}`}
                >
                    {index + 1}
                </button>
            ))}
            <button
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 mx-1 border rounded ${currentPage === totalPages ? 'bg-secondary-900 text-gray-700 border-gray-700 cursor-not-allowed' : 'bg-secondary-900 text-white hover:bg-gray-500'}`}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;