import { Fragment, useContext, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from "../firebase";
import { useParams } from "react-router-dom";
import { AuthContext } from "../auth";

function FriendList() {
    const { id } = useParams();
    const [friendsList, setFriendsList] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const docSnap = await getDoc(doc(db, "allgames", id));

                if (docSnap.exists()) {
                    setFriendsList(docSnap.data().friends);
                }

            } catch {}

            
        };

        fetchData();
    }, []);

    console.log("HUH" + allUsers)

    const friends = friendsList.map((friend, index) => (
        <Fragment key={index}>
            <div class="col-4">
                <div className="card mb-3" key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{friend}</h5>
                    </div>
                </div>
            </div>
        </Fragment>
    ));

    return (
        <>
            <div class="row">{friends}</div>
        </>
    );
}

export default FriendList;
