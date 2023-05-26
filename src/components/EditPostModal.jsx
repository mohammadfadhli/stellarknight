import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form"
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { AuthContext } from "../auth";
import db from "../firebase";

function DefaultModal(props) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const {currentUser} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)

    const [newData, setNewData] = useState(props.postdata.data().text)

    async function updatePost(){

        await updateDoc(doc(db, `posts/${currentUser.uid}/posts`, props.postdata.id), {
            text: newData,
            posted_at: serverTimestamp()
        })

        setIsLoading(false)
        props.updatePostFunc()

    }

    function handleSave(){
        updatePost()
        setShow(false)
    }

    function handleClose(){
        setShow(false)
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <i class="bi bi-pencil-square"></i>
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{color: "black"}}>Edit post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Control as="textarea" rows={3} value={newData} onChange={(e) => {setNewData(e.target.value)}}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSave} className="col">
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DefaultModal;
