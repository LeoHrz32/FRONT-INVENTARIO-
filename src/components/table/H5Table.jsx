export function H5Table({ children, ...props }) {
    return (
        <h5 className="md:hidden text-white font-bold mb-2 justify-text-center" {...props}>
            {children}
        </h5>
    );
}

export default H5Table;