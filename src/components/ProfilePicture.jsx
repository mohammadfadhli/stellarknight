import { useContext, useEffect, useState } from "react";
import db from "../firebase.jsx";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../auth";

function ProfilePicture(props) {

    const [userPic, setUserPic] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "allgames", props.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    setUserPic(docSnap.data().profilepicture)
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }
            } catch {}
        };

        fetchData()
    });

    console.log(userPic)

    return <><img src={userPic} class="border" style={{width: 200, height: 200}}></img></>

}

export default ProfilePicture;
