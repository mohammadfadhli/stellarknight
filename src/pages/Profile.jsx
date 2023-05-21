import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth";

function Profile() {
    const { currentUser, updateUserName, updateUserEmail } =
        useContext(AuthContext);
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [profileupdated, setProfileUpdated] = useState(false)

    useEffect(() => {
        setUserName(currentUser.displayName);
        setEmail(currentUser.email);
    }, []);

    async function updateProfile(e) {
        e.preventDefault();
        if (username) {
            await updateUserName({ displayName: username }).then(() => {
                setProfileUpdated(true)
            })
        }

        if (email) {
            await updateUserEmail(email).then(() => {
                setProfileUpdated(true)
            })
        }

        // setProfileUpdated(true)
        // window.location.reload()
    }

    useEffect(() => {
        if (profileupdated) {
            const toRef = setTimeout(() => {
              setProfileUpdated(false);
              clearTimeout(toRef);
            }, 3000);
          }
    },[profileupdated])

    function SuccessAlert() {

        if(profileupdated)
        {
            return (
                <>
                    <div class="alert alert-success" role="alert">
                        Changes Saved!
                    </div>
                </>
            );
        }
        
    }

    return (
        <>
            <div class="container mt-5">
                <h1 class="text-center">Edit Profile</h1>
                <form onSubmit={updateProfile}>
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
                        Save
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
