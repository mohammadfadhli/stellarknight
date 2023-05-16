import DefaultCard from "../components/DefaultCard.jsx";
import TimeLine from "../components/TimeLine.jsx";
import SocialsBar from "../components/SocialsBar.jsx";
import { useContext } from "react";
import { AuthContext } from "../auth.jsx";

const title = "About Me";
const text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla at est aliquam varius id id tellus. Aliquam sit amet turpis porttitor, volutpat urna in, dictum ex. Nulla vestibulum quam velit, eget faucibus lorem dignissim non. Sed ut nibh id tellus congue vehicula. Vestibulum molestie eget dui ut facilisis. Nunc eget odio eu orci euismod facilisis ac varius nisi. Ut rutrum nulla at laoreet pretium. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec non est a nisi placerat consectetur. Suspendisse id sodales augue. Sed mi ligula, rhoncus nec felis in, congue interdum enim. Morbi eu suscipit dolor. Duis a ex non dolor iaculis lobortis. Praesent nulla risus, vestibulum sollicitudin aliquam id, laoreet non nisi. Nulla facilisi.";

function WelcomeBar() {
    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return (
            <>
                <div className="container mt-5">
                    <h1>Welcome back, + {currentUser}</h1>
                </div>
            </>
        );
    }
}

function Home() {
    return (
        <>
            <WelcomeBar></WelcomeBar>
            <DefaultCard title={title} text={text}></DefaultCard>
            <SocialsBar></SocialsBar>
            <TimeLine></TimeLine>
        </>
    );
}

export default Home;
