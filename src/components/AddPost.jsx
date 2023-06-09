import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import db from "../firebase";

function AddPost(props) {
    const { currentUser } = useContext(AuthContext);
    const [postText, setPostText] = useState("");
    const [postAdded, setPostAdded] = useState(false);

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

    return (
        <>
            <form
                classname="mt-3 mb-3"
                onSubmit={(e) => {
                    addPost(e);
                }}
            >
                <div classname="">
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
            </form>
        </>
    );
}

export default AddPost;
