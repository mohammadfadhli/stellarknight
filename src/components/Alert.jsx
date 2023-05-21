function Alert(props) {
    let alertClass = `alert alert-${props.status}`;

    return (
        <>
            <div class={alertClass} role="alert">
                {props.text}
            </div>
        </>
    );
}

export default Alert;
