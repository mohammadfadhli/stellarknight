import { Fragment } from "react";
import "../styles/TimeLine.css"

const educations = [
    {
        school: "Singapore Management University",
        period: "2021 - Present",
        qualifications: "Bachelor of Science - Information Systems",
    },
    {
        school: "Temasek Polytechnic",
        period: "2015 - 2018",
        qualifications:
            "Diploma in Digital & Cyber Security | Diploma Plus in Business Fundamentals",
    },
    {
        school: "Seng Kang Secondary School",
        period: "2011 - 2014",
        qualifications: "GCE O-Level",
    },
];

const educationList = educations.map((education, index) => (

    <Fragment key={index}>
        <div className="card mt-3">
            <div className="card-body">
                <h5 className="card-title">{education.school}</h5>
                <p className="card-text">{education.qualifications}</p>
                <p className="card-subtitle">{education.period}</p>
            </div>
        </div>
    </Fragment>

));

function TimeLine() {
    return (
        <>
            <div className="container my-5">
                <h1 className="text-center">My Education Journey</h1>
                {/* <div className="row">{educationList}</div> */}
                {educationList}
            </div>
        </>
    );
}

export default TimeLine;
