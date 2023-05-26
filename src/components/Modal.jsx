import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form"
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { AuthContext } from "../auth";
import db from "../firebase";

function DefaultModal(props) {
    const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {currentUser} = useContext(AuthContext)

    const [newData, setNewData] = useState(props.postdata.data().text)

    async function updatePost(){

        await updateDoc(doc(db, `posts/${currentUser.uid}/posts`, props.postdata.id), {
            text: newData,
            posted_at: serverTimestamp()
        })

    }

    function handleClose(){
        updatePost()
        setShow(false)
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <i class="bi bi-pencil-square"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{color: "black"}}>{props.postdata.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Control as="textarea" rows={3} value={newData} onChange={(e) => {setNewData(e.target.value)}}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DefaultModal;
