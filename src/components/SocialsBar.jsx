import "../styles/SocialsBar.css"

const githublink = "https://github.com/mohammadfadhli"
const linkedinlink = "https://www.linkedin.com/in/mohd-fadhli-997607155/"
const instagramlink = ""

function SocialsBar() {
    return (
        <>
            <div className="container mt-3">
                <div className="d-flex flex-row justify-content-center mb-3">
                    <div className="p-2"><button type="button" className="btn btn-light"><a href={githublink}><i class="bi bi-github"></i></a></button></div>
                    <div className="p-2"><button type="button" className="btn btn-light"><a href={linkedinlink}><i class="bi bi-linkedin"></i></a></button></div>
                    <div className="p-2"><button type="button" className="btn btn-light"><a href={instagramlink}><i class="bi bi-instagram"></i></a></button></div>
                </div>
            </div>
        </>
    );
}

export default SocialsBar;
