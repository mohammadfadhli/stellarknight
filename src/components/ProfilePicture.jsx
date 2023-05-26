import { useEffect, useState } from "react";
import db from "../firebase.jsx";
import { doc, getDoc } from "firebase/firestore";

function ProfilePicture(props) {
    const [userPic, setUserPic] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "allgames", props.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserPic(docSnap.data().profilepicture);
                    setIsLoading(false);
                } else {
                    // docSnap.data() will be undefined in this case
                }
            } catch {}
        };

        fetchData();
    });

    if (isLoading == false) {
        return (
            <>
                <img
                    src={userPic}
                    class="img-fluid border"
                    style={{ width: 200, height: 200 }}
                ></img>
            </>
        );
    } else {
        return (
            <>
                <div class="text-center mt-5">
                    <div
                        class="spinner-border"
                        role="status"
                        style={{ width: 48, height: 48 }}
                    >
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </>
        );
    }
}

export default ProfilePicture;
