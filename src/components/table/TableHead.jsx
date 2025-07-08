export function TableHead({ children, ...props }) {
    return (
        <div className="hidden md:grid grid-cols-1 md:grid-cols-6 gap-4 mb-2 pb-2 text-white font-bold justify-items-center text-center" {...props}>
            {children}
        </div>
    );
}

export default TableHead;