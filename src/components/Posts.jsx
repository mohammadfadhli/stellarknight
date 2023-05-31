import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth";
import {
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc,
} from "firebase/firestore";
import db from "../firebase";
import { useParams } from "react-router-dom";
import DefaultModal from "./EditPostModal";
import AddPost from "./AddPost";

function Posts() {
    const { currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [displayName, setDisplayName] = useState("");
    const [profilepicture, setProfilePicture] = useState("");
    const { id } = useParams();
    let [isPostDeleted, setIsPostDeleted] = useState(false);
    const [inputData, setInputData] = useState([]);
    const [currentUserPic, setCurrentUserPic] = useState("");
    const [postText, setPostText] = useState("");
    const [postAdded, setPostAdded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const tempArr = [];

            const q = query(
                collection(db, `posts/${id}/posts`),
                orderBy("posted_at", "desc")
            ); // get posts from db and sort by desc timestamp

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                tempArr.push(doc);
            });

            const docSnap = await getDoc(doc(db, `allgames`, id));

            if (docSnap.exists()) {
                setDisplayName(docSnap.data().displayName);
                setProfilePicture(docSnap.data().profilepicture);
            }

            setPosts(tempArr);

            if (currentUser) {
                const docTref = await getDoc(
                    doc(db, `allgames`, currentUser.uid)
                );

                if (docTref.exists()) {
                    setCurrentUserPic(docSnap.data().profilepicture);
                }
            }
        };

        fetchData();
    }, [isPostDeleted]);

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

    async function deletePost(clickedId) {
        await deleteDoc(doc(db, `posts/${currentUser.uid}/posts`, clickedId));

        if (isPostDeleted == false) {
            setIsPostDeleted(true);
        } else if (isPostDeleted == true) {
            setIsPostDeleted(false);
        }

        // window.location.reload();
    }

    function updatePost() {
        if (isPostDeleted == false) {
            setIsPostDeleted(true);
        } else if (isPostDeleted == true) {
            setIsPostDeleted(false);
        }
    }

    function IsOwner(i) {
        if (currentUser) {
            if (currentUser.uid === id) {
                return (
                    <>
                        <div class="d-flex flex-row mb-3">
                            <div class="">
                                {/* <button type="button" class="btn btn-primary">
                                    <i class="bi bi-pencil-square"></i>
                                </button> */}
                                <DefaultModal
                                    postdata={i.index}
                                    updatePostFunc={updatePost}
                                ></DefaultModal>
                            </div>
                            <div class="ps-3">
                                <button
                                    type="button"
                                    class="btn btn-danger"
                                    id={i.index.id}
                                    onClick={(e) =>
                                        deletePost(e.currentTarget.id)
                                    }
                                >
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </>
                );
            }
        }
    }

    async function addPost(e) {
        e.preventDefault();
        console.log("TEST");
        setPostText("")

        await addDoc(collection(db, `posts/${currentUser.uid}/posts`), {
            text: postText,
            posted_at: serverTimestamp(),
            comments: []
        });

        setPostAdded(true);
    }

    useEffect(() => {
        if (postAdded) {
            const toRef = setTimeout(() => {
                setPostAdded(false);
                clearTimeout(toRef);
            }, 1500);
        }
    }, [postAdded]);

    function ShowAlert() {
        if (postAdded) {
            return (
                <>
                    <div class="alert alert-success mt-3" role="alert">
                        Successfully Posted!
                    </div>
                </>
            );
        }
    }

    function IsLoggedInPost(){
        return <><form
        class="mt-3 mb-3"
        onSubmit={(e) => {
            addPost(e);
        }}
    >
        <div class="">
            <textarea
                class="form-control"
                placeholder="What's on your mind?"
                id="floatingTextarea"
                value={postText}
                onChange={(e) => {
                    setPostText(e.target.value);
                }}
            ></textarea>
        </div>
        <button type="submit" class="btn btn-primary mt-3">
            Post
        </button>
        <ShowAlert></ShowAlert>
    </form></>
    }

    const postCards = posts.map((post) => (
        <Fragment key={post.id}>
            <div className="col mb-3">
                <div className="card">
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
                            <PostDate
                                postdate={post.data().posted_at}
                            ></PostDate>
                        </div>
                    </div>
                    <div class="card-body">
                        <p>{post.data().text}</p>
                        <IsOwner index={post}></IsOwner>
                    </div>
                </div>
            </div>
        </Fragment>
    ));

    if (posts.length != 0) {
        return <>{postCards}</>;
    } else {
        return (
            <>
                <div className="card mb-3">
                    <div className="card-body">Nothing to see here.</div>
                </div>
            </>
        );
    }
}

export default Posts;
