import { Fragment, useEffect, useState } from "react";
import {  doc, getDoc,  } from "firebase/firestore";
import db from "../firebase";
import { Link, useParams } from "react-router-dom";

function FriendList(props) {
    const { id } = useParams();
    const [frenList, setFrenList] = useState([]);
    const [displayName, setDisplayName] = useState("");
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "allgames", id);
                const docSnap = await getDoc(docRef);
                const tempArr = [];

                if (docSnap.exists()) {
                    setDisplayName(docSnap.data().displayName);

                    await Promise.all(
                        docSnap.data().friends.map(async (fren) => {
                            const docHere = await getDoc(
                                doc(db, "allgames", fren)
                            );

                            if (docHere.exists()) {
                                tempArr.push(docHere.data());
                            }
                        })
                    );
                }

                setFrenList(tempArr);
                setIsLoading(false)
            } catch (err) {}
        };

        fetchData();
    }, []);

    const frenCards = frenList.map((fren) => (
        <Fragment key={fren.uid}>
            <div className="col-lg-4 col-md-6 col-sm-12 mt-3">
                <div className="card">
                    <Link to={"/profilepage/" + fren.uid} class="testcard">
                        <div class="d-flex align-items-center ">
                            <div class="flex-shrink-0">
                                <div class="container my-2">
                                    <img
                                        class="rounded border border-black"
                                        src={fren.profilepicture}
                                        style={{ width: 60 }}
                                    ></img>
                                </div>
                            </div>
                            <div class="flex-grow-1 ms-3">
                                {fren.displayName}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </Fragment>
    ));

    if(isLoading == false)
    {
        return (
            <>
                <div class="container mt-5">
                    <h4>{displayName}'s friends</h4>
                    <div class="row">{frenCards}</div>
                </div>
            </>
        );
    }
    
}

export default FriendList;
