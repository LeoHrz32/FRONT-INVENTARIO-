export function TableRow({ children, isActive, ...props }) {
    return (
        <div 
            className={`grid grid-cols-1 md:grid-cols-6 gap-2 items-center mb-1 bg-secondary-900 p-1 rounded-md text-center justify-items-center ${isActive ? '' : 'bg-secondary-900/50'}`} 
            {...props}
        >
            {children}
        </div>
    );
    
}

export default TableRow;
