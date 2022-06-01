import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid";
import {Button, CardHeader} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Container, Form, Modal} from "react-bootstrap";
import './style/Order.css'
import {useFormik} from "formik";
import * as yup from "yup";

const CreatedOrders = observer(() => {
    const { orderStore, userStore } = useContext(Context)
    const [allOrders, setAllOrders] = useState([])
    const [userOrders, setUserOrders] = useState([])
    const [currentOrder, setCurrentOrder] = useState({})
    const [showInfo, setShowInfo] = useState(false)
    const [showFromUserOrders, setShowFromUserOrders] = useState(false)


    useEffect(() => {
        orderStore.getAllOrders()
            .then(r => {
                setAllOrders(r.data)
            })
        orderStore.getUserOrders()
            .then(r => {
                setUserOrders(r.data)
                console.log(r.data)
            })
    }, [])

    const handleClose = () => {
        setShowInfo(false)
        setShowFromUserOrders(false)
    }

    const columns:GridColDef[] = [
        {field: 'id', headerName: 'ID', hide: true, type: 'number'},
        {field: 'project', headerName: 'Проект', minWidth: 200, valueFormatter: params => {

                return params.value.name + ' (' + params.value.code + ')'
            }},
        {field: 'title', headerName: 'Название'},
        {field: 'priority', headerName: 'Приоритет', type: 'number'},
        {field: 'type', headerName: 'Тип'},
        {field: 'status', headerName: 'Статус', minWidth: 150},
        {field: 'description', headerName: 'description', hide: true},
        {field: 'inVersion', headerName: 'Изменить в версии', minWidth: 150},
        {field: 'createdDate', headerName: 'Дата создания', editable: true, type: 'dateTime', minWidth: 250},
        {field: 'updatedDate', headerName: 'Дата обновления', type: 'dateTime', minWidth: 250},
        {field: 'creatorUser', headerName: 'Автор', minWidth: 200, valueFormatter: params => {
                return params.value.fullName
            }},
        {field: 'worksUser', headerName: 'Работник', minWidth: 200, renderCell: params => {
                const teleg = 'https://t.me/' + params.value.telephoneNumber
                    .replace(/\s/g, '')
                    .replace('(', '')
                    .replace(')', '')
                return (
                    <a title={'Перейти в телеграм'} style={{display: "table-cell"}} href={teleg} target="_blank">{params.value.fullName}</a>
                )
            }
        },
        {field: 'Изменить', headerName: 'Изменить', disableColumnMenu: true, disableExport: true, disableReorder: true, renderCell: params => {
                return(
                    <Button color={"primary"} onClick={() => {
                        setCurrentOrder(params.row)
                        setShowInfo(true)
                    }}>
                        Изменить
                    </Button>
                )
            }
        }
    ]

    const formik = useFormik({
        initialValues: {
            title: "",
            priority: "",
            inVersion: "",
            description: "",
            worksUserId: null
        },
        validateOnChange: true,
        validationSchema: yup.object({
            title: yup.string()
                .required("Это поле обязательно"),
            priority: yup.string()
                .required("Это поле обязательно"),
            inVersion: yup.string()
                .required("Это поле обязательно"),
            description: yup.string()
                .required("Это поле обязательно"),
            worksUserId: yup.number()
                .required("Это поле обязательно")
        }),
        onSubmit: (values => {
            console.log(values)
            orderStore.changeOrderByCreator(currentOrder.id, values.title, values.priority, values.inVersion, values.description, values.worksUserId)
        })
    })

    return(
        <>
            {
                userStore.isAuth ?
                    <div style={{width: '95%', margin: 'auto'}}>

                        <Modal show={showInfo} onHide={handleClose} dialogClassName={'modal-90w'}>
                            <Modal.Header closeButton>
                                <Modal.Title>Карточка задачи</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className={"card"}>
                                    <div className="card-body">
                                        <Container>
                                            <Form>
                                                <Modal.Body>
                                                    <Form>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Название</Form.Label>
                                                            <Form.Control
                                                                id={"title"}
                                                                placeholder={formik.errors.title}
                                                                defaultValue={currentOrder.title}
                                                                type="text"
                                                                onChange={formik.handleChange}
                                                                autoFocus
                                                            />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Приоритет</Form.Label>
                                                            <Form.Control
                                                                id={"priority"}
                                                                min={1}
                                                                max={10}
                                                                placeholder={formik.errors.priority}
                                                                type={'number'}
                                                                defaultValue={currentOrder.priority}
                                                                onChange={formik.handleChange}
                                                                autoFocus
                                                            />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Сделать в версии</Form.Label>
                                                            <Form.Control
                                                                id={"inVersion"}
                                                                placeholder={formik.errors.inVersion}
                                                                type="text"
                                                                defaultValue={currentOrder.inVersion}
                                                                onChange={formik.handleChange}
                                                                autoFocus
                                                            />
                                                        </Form.Group>
                                                        {
                                                            currentOrder !== undefined && currentOrder.project !== undefined ?
                                                                <Form.Group className="mb-3">
                                                                    <Form.Label>Назначенный исполнитель</Form.Label>
                                                                    <Form.Select
                                                                        id={"worksUserId"}
                                                                        onChange={formik.handleChange}
                                                                        value={formik.values.worksUserId}
                                                                    >
                                                                        <option selected={true} disabled={true}>Выбрать</option>
                                                                        {
                                                                            currentOrder.project.users.map(x => {
                                                                                return <option key={x.id} value={x.id}>{x.fullName} ({x.email})</option>
                                                                            })
                                                                        }
                                                                    </Form.Select>
                                                                </Form.Group> : null
                                                        }
                                                        <Form.Group
                                                            className="mb-3"
                                                        >
                                                            <Form.Label>Описание</Form.Label>
                                                            <Form.Control type="text" as={"textarea"} id={"description"} defaultValue={currentOrder.description} onChange={formik.handleChange} placeholder={formik.errors.description} />
                                                        </Form.Group>
                                                    </Form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button color={"success"} variant={"outlined"} onClick={formik.handleSubmit}>
                                                        Изменить
                                                    </Button>
                                                </Modal.Footer>
                                            </Form>
                                        </Container>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>

                        <Card variant={'elevation'} style={{marginTop: "1em"}}>
                            <CardHeader title={'Созданные задачи'} className={'p-3 mb-2 bg-success text-white'}/>
                            <div style={{ display: 'flex', height: '100%', width: '100%'}}>
                                <div style={{ flexGrow: 1 }}>
                                    <DataGrid autoHeight={true} autoPageSize={true}
                                              columns={columns}
                                              rows={allOrders}
                                              components={{
                                                  Toolbar: GridToolbar,
                                              }}
                                              pageSize={10}
                                              rowsPerPageOptions={[10]} />
                                </div>
                            </div>
                        </Card>

                    </div> : null
            }
        </>
    )
})

export default CreatedOrders