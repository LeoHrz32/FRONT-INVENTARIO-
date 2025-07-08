export function Table({ children, ...props }) {
    return (
        <div className="bg-secondary-100 p-8 pb-5 pt-5 rounded-xl lg:items-center" {...props}>
            {children}
        </div>
    );
}

export default Table;