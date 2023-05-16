import github from "../assets/github-mark.png"
import linkedin from "../assets/linkedin-mark.png"
import instagram from "../assets/instagram-mark.png"
import "../styles/SocialsBar.css"

const githublink = "https://github.com/mohammadfadhli"
const linkedinlink = "https://www.linkedin.com/in/mohd-fadhli-997607155/"
const instagramlink = ""

function SocialsBar() {
    return (
        <>
            <div className="container mt-3">
                <div className="d-flex flex-row mb-3">
                    <div className="p-2"><button type="button" className="btn btn-light"><a href={githublink}><img src={github}></img></a></button></div>
                    <div className="p-2"><button type="button" className="btn btn-light"><a href={linkedinlink}><img src={linkedin}></img></a></button></div>
                    <div className="p-2"><button type="button" className="btn btn-light"><a href={instagramlink}><img src={instagram}></img></a></button></div>
                </div>
            </div>
        </>
    );
}

export default SocialsBar;
