function ErrorMsg() {

    return (
        <>
            <div class="container">
                <div class="d-flex align-items-center flex-row vh-100">
                    <div class="p-2 flex-fill text-center">
                        <h1>Oops!</h1>
                        <h3>Sorry, an unexpected error has occured.</h3>
                        <p>
                            Page not found
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

function Error() {
    return (
        <>
            <ErrorMsg></ErrorMsg>
        </>
    );
}

export default Error;
