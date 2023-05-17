import "../styles/Banner.css";
import SocialsBar from "./SocialsBar";

function Banner() {
    return (
        <>
            <div class="container">
                <div class="d-flex align-items-center flex-row mb-3 vh-100">
                    <div class="p-2 flex-fill text-center">
                        <h1>
                            Hello, I'm <span>Fadhli</span>
                        </h1>
                        <h3>an aspiring coder.</h3>
                        <br></br>
                        <p>
                            Morbi vehicula finibus eros, sed accumsan odio.
                            Aenean sed luctus leo. Morbi id est eget ante
                            feugiat placerat et at eros.
                        </p>
                        <SocialsBar></SocialsBar>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Banner;
