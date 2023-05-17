import DefaultCard from "../components/DefaultCard.jsx";
import TimeLine from "../components/TimeLine.jsx";
import Banner from "../components/Banner.jsx"

const title = "Disclaimer";
const text =
    "This Website is a personal side project and is developed using React.";

function Home() {
    return (
        <>
            <Banner></Banner>
            <DefaultCard title={title} text={text}></DefaultCard>
            <TimeLine></TimeLine>
        </>
    );
}

export default Home;
