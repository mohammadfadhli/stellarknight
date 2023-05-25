import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from "../firebase";

function Posts() {
    const { currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const tempArr = []

            const querySnapshot = await getDocs(
                collection(db, `posts/${currentUser.uid}/posts`)
            );
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                // tempArr.push(doc.data())
                tempArr.push(doc)
            });

            setPosts(tempArr)
        };

        fetchData();
    }, []);

    console.log(posts)

    const postCards = posts.map((post) => (
        <Fragment key={post.id}>
            <div className="card mb-3" key={post.id}>
                <div className="card-body">
                    {/* <h5 className="card-title">{games.data().title}</h5> */}
                    <p className="card-text">{post.data().text}</p>
                </div>
            </div>
        </Fragment>
    ));

    return <>{postCards}</>
}

export default Posts;
