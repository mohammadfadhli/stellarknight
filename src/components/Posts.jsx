import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from "../firebase";
import { Link, useParams } from "react-router-dom";

function Posts() {
    const { currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [displayName, setDisplayName] = useState("");
    const [profilepicture, setProfilePicture] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const tempArr = [];

            const querySnapshot = await getDocs(
                collection(db, `posts/${id}/posts`)
            );
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                tempArr.push(doc);
            });

            const docSnap = await getDoc(doc(db, `allgames`, id));

            if (docSnap.exists()) {
                setDisplayName(docSnap.data().displayName);
                setProfilePicture(docSnap.data().profilepicture);
            }

            setPosts(tempArr);
        };

        fetchData();
    }, []);

    console.log(posts);

    function PostDate(props) {
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const finaldate = props.postdate.toDate();
        const hour = finaldate.getHours().toString().padStart(2, "0");
        const min = finaldate.getMinutes().toString().padStart(2, "0");
        const sec = finaldate.getSeconds().toString().padStart(2, "0");
        const day = finaldate.getDay();
        const month = finaldate.getMonth();
        const year = finaldate.getFullYear();

        return (
            <p className="">{`${day} ${monthNames[month]} ${year} ${hour}:${min}:${sec}`}</p>
        );
    }

    const postCards = posts.map((post) => (
        <Fragment key={post.id}>
            <div className="col mb-3">
                <div className="card">
                    <Link to={"/profilepage/" + post.id} class="testcard">
                        <div class="d-flex align-items-center ">
                            <div class="flex-shrink-0">
                                <div class="container my-2">
                                    <img
                                        class="rounded"
                                        src={profilepicture}
                                        style={{ width: 60 }}
                                    ></img>
                                </div>
                            </div>
                            <div class="flex-grow-1 ms-1 mt-3">
                                <h5>{displayName}</h5>
                                <PostDate postdate={post.data().posted_at}></PostDate>
                                <p>{post.data().text}</p>
                                
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </Fragment>
    ));

    return <>{postCards}</>;
}

export default Posts;
