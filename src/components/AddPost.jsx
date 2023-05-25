import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import db from "../firebase";

function AddPost() {
    const { currentUser } = useContext(AuthContext);
    const [postText, setPostText] = useState("");
    const [postAdded, setPostAdded] = useState(false);

    async function addPost(e) {
        e.preventDefault();
        console.log("TEST");

        await addDoc(collection(db, `posts/${currentUser.uid}/posts`), {
            text: postText,
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
                class="mt-5 mb-3"
                onSubmit={(e) => {
                    addPost(e);
                }}
            >
                <div class="form-floating">
                    <textarea
                        class="form-control"
                        placeholder="Leave a comment here"
                        id="floatingTextarea"
                        onChange={(e) => {
                            setPostText(e.target.value);
                        }}
                    ></textarea>
                    <label for="floatingTextarea" style={{ color: "black" }}>
                        What's on your mind?
                    </label>
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
