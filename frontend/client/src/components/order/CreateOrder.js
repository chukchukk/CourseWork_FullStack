import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Button, Form, Modal, NavDropdown} from "react-bootstrap";
import {Context} from "../../index";
import {useFormik} from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router";

const CreateOrder = observer(() => {
    const { orderStore, projectStore } = useContext(Context)
    const [show, setShow] = useState(false)
    const [types, setTypes] = useState([])
    const [projects, setProjects] = useState([])
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        orderStore.getOrderTypes()
            .then(r => {
                setTypes(r.data)
            })
        projectStore.getUserProject()
            .then(r => {
                setProjects(r.data)
            })
        }, []
    )

    const formik = useFormik({
        initialValues: {
            name: "",
            code: "",
            type: 'ERROR',
            description: ""
        },
        validateOnChange: true,
        validationSchema: yup.object({
            name: yup.string()
                .required("Это поле обязательно"),
            code: yup.string()
                .required("Это поле обязательно"),
            type: yup.string()
                .required("Это поле обязательно"),
            description: yup.string()
                .required("Это поле обязательно")
        }),
        onSubmit: (values => {

        })
    })

    return (
        <>
            <NavDropdown.Item onClick={handleShow}>
                Создать задачу
            </NavDropdown.Item>

            <div id={'alertAfterCreateProject'} />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Создание задачи</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Проект</Form.Label>
                            <Form.Select onC>
                                <option disabled={true}>Выбрать</option>
                                {
                                    projects.map(x => {
                                        return <option key={x.name} value={x.name}>{x.name} ({x.code})</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                id={"name"}
                                placeholder={formik.errors.name}
                                type="text"
                                onChange={formik.handleChange}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Код проекта</Form.Label>
                            <Form.Control
                                id={"code"}
                                placeholder={formik.errors.code}
                                type="text"
                                onChange={formik.handleChange}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Тип проекта</Form.Label>
                            <Form.Select
                                id={"type"}
                                onChange={formik.handleChange}
                                value={formik.values.type}
                            >
                                <option disabled={true}>Выбрать</option>
                                {
                                    types.map(x => {
                                        return <option key={x} value={x}>{x}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label>Описание</Form.Label>
                            <Form.Control type="text" as={"textarea"} id={"description"} onChange={formik.handleChange} placeholder={formik.errors.description} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="success" onClick={formik.handleSubmit}>
                        Создать
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
})

export default CreateOrder