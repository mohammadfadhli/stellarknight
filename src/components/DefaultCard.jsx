import "../styles/CardStyle.css"

function DefaultCard(props) {
    return (
        <>
            <div className="container mt-5">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">{props.title}</h3>
                        <p className="card-text">{props.text}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DefaultCard;
