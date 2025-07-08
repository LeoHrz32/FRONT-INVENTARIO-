export function TableBody({ children, ...props }) {
    return (
        <div {...props}>
            {children}
        </div>
    );
}

export default TableBody;