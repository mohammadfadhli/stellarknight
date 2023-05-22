import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth";
import Alert from "../components/Alert";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage, db } from "../firebase.jsx";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Profile() {
    const { currentUser, updateUserName, updateUserEmail } =
        useContext(AuthContext);
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [profileupdated, setProfileUpdated] = useState(false);
    const [profilePic, setProfilePic] = useState("");
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);
    const [profilePicUrl, setProfilePicUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const docRef = doc(db, `allgames`, currentUser.uid);

    useEffect(() => {
        setUserName(currentUser.displayName);
        setEmail(currentUser.email);

        const fetchData = async () => {
            await getDownloadURL(ref(storage, "users/" + currentUser.uid))
                .then((url) => {
                    console.log("downloaded file: " + url);
                    setProfilePicUrl(url);
                    setIsLoading(false);
                })
                .catch((error) => {
                    // Handle any errors
                    setIsLoading(false);
                });
        };

        const fetchDefault = async () => {
            await getDownloadURL(ref(storage, "users/defaultdp.png"))
                .then((url) => {
                    console.log("downloaded file: " + url);
                    setProfilePicUrl(url);
                    setIsLoading(false);
                })
                .catch((error) => {
                    // Handle any errors
                    setIsLoading(false);
                });
        };

        const fetchPic = async () => {
            try {
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log(docSnap.data().profilepicture);
                    if (docSnap.data().profilepicture != "https://firebasestorage.googleapis.com/v0/b/stellarknight2-eddf1.appspot.com/o/users%2Fdefaultdp.png?alt=media&token=979791e0-ff90-40b7-ab8c-38f2579a05cb") {
                        fetchData();
                    } else {
                        fetchDefault();
                    }
                }
            } catch {}
        };

        fetchPic();

        // fetchData();
    }, []);

    useEffect(() => {
        if (isProfileUpdated == false) {
            setIsProfileUpdated(true);
        } else if (isProfileUpdated == true) {
            setIsProfileUpdated(false);
        }
    }, [profilePicUrl]);

    async function updateProfile(e) {
        e.preventDefault();
        if (username) {
            await updateUserName({ displayName: username }).then(() => {
                setProfileUpdated(true);
            });
        }

        if (email) {
            await updateUserEmail(email).then(() => {
                setProfileUpdated(true);
            });
        }

        if (profilePic) {
            await uploadBytes(
                ref(storage, "users/" + currentUser.uid),
                profilePic
            )
                .then(async (snapshot) => {
                    console.log("Uploaded a blob or file!");
                    // await updateDoc(doc(db, "allgames", currentUser.uid), {
                    //     profilepicture: currentUser.uid,
                    // });
                    return getDownloadURL(snapshot.ref);
                })
                .then(async (downloadURL) => {
                    console.log("Download URL", downloadURL);
                    await updateDoc(doc(db, "allgames", currentUser.uid), {
                        profilepicture: downloadURL,
                    });
                });
            //     console.log("Uploaded a blob or file!");
            //     await updateDoc(doc(db, "allgames", currentUser.uid), {
            //         profilepicture: currentUser.uid,
            //     });
            // });
        }

        // setProfileUpdated(true)
        // window.location.reload()
    }

    useEffect(() => {
        if (profileupdated) {
            const toRef = setTimeout(() => {
                setProfileUpdated(false);
                clearTimeout(toRef);
            }, 2000);
        }
    }, [profileupdated]);

    function SuccessAlert() {
        if (profileupdated) {
            return (
                <>
                    <Alert status="success" text="Changes Saved!"></Alert>
                </>
            );
        }
    }

    function HasProfilePicture() {
        if (isLoading == false) {
            return (
                <>
                    <div class="text-center mt-3">
                        <img
                            src={profilePicUrl}
                            class="img"
                            alt="..."
                            style={{ width: 200, height: 200 }}
                        ></img>
                    </div>
                </>
            );
        }
    }

    return (
        <>
            <div class="container mt-5">
                <h1 class="text-center">Edit Profile</h1>
                <HasProfilePicture></HasProfilePicture>
                <form onSubmit={updateProfile}>
                    <div class="my-3">
                        <label for="formFile" class="form-label">
                            Profile Picture
                        </label>
                        <input
                            class="form-control"
                            type="file"
                            id="formFile"
                            onChange={(e) => {
                                setProfilePic(e.target.files[0]);
                                setProfilePicUrl(
                                    URL.createObjectURL(e.target.files[0])
                                );
                            }}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="username" class="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <label for="emailaddress" class="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            class="form-control"
                            id="emailaddress"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <button type="submit" class="btn btn-primary">
                        Save Profile
                    </button>
                </form>
            </div>
            <div class="container mt-3">
                <SuccessAlert></SuccessAlert>
            </div>
        </>
    );
}

export default Profile;
