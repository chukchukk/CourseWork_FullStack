import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {Button, Card, CardContent, CardHeader, Typography} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid";
import {Form, Modal, ModalFooter} from "react-bootstrap";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useNavigate} from "react-router";
import {useFormik} from "formik";
import * as yup from "yup";
import SnackbarConstructor from "../snackbar/SnackbarConstructor";

const WorkSpace = observer(() => {
    const {userStore} = useContext(Context)
    const {projectStore} = useContext(Context)
    const {orderStore} = useContext(Context)
    const [currentUser, setCurrentUser] = useState({})
    const [currentUserProjects, setCurrentUserProjects] = useState([])
    const [showProjectManagement, setShowProjectManagement] = useState(false)
    const [showOrderCreation, setShowOrderCreation] = useState(false)
    const [selectedProject, setSelectedProject] = useState(undefined)
    const [showUserList, setShowUserList] = useState(false)
    const [userList, setUserList] = useState([])
    const [needUpdate, setNeedUpdate] = useState('')
    const navigate = useNavigate()
    const [orderTypes, setOrderTypes] = useState([])

    const handleClose = () => {
        setShowProjectManagement(false)
        setShowUserList(false)
        setShowOrderCreation(false)
    }

    useEffect(() => {
        userStore.getUserInfo()
            .then(r => {
                setCurrentUser(r.data)
            })
            .catch(e => console.log(e))
        projectStore.getUserProject()
            .then(r => {
                setCurrentUserProjects(r.data)
            })
        orderStore.getOrderTypes()
            .then(r => {
                setOrderTypes(r.data)
            })
    }, [needUpdate])

    const formik = useFormik({
        initialValues: {
            title: "",
            priority: 1,
            type: null,
            inVersion: "",
            description: "",
            worksUserId: null
        },
        validateOnChange: true,
        validateOnBlur: true,
        validationSchema: yup.object({
            title: yup.string()
                .required("Это поле обязательно"),
            type: yup.string()
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
            orderStore.createNewOrder(
                    selectedProject.code,
                    values.title,
                    values.priority,
                    values.type,
                    values.inVersion,
                    values.description,
                    values.worksUserId)
                .then(r => {
                    SnackbarConstructor('alertAfterRegistration', 'success', 'Успешно.')
                    handleClose()
                })
                .catch(() => {
                    SnackbarConstructor('alertAfterRegistration', 'error', 'Что-то пошло не так. Попробуйте позже.')
                })
        })
    })

    const userColumns: GridColDef[] = [
        {field: 'id', headerName: 'ID', hide: true, type: 'number'},
        {
            field: 'fullName', headerName: 'Инициалы', minWidth: 250
        },
        {
            field: '', headerName: 'Добавить', minWidth: 200, disableColumnMenu: true, disableExport: true, disableReorder: true, renderCell: params => {
                return (
                    <Button startIcon={<AddCircleIcon />} onClick={() => {
                        projectStore.addNewUser(selectedProject.id, params.row.id)
                        projectStore.getUserProject().then(r => {
                            setCurrentUserProjects(r.data)
                        })
                        setNeedUpdate((Math.random() + 1).toString(36).substring(7))
                    }}>Добавить</Button>
                )
            }
        }
    ]

    const projectColumns: GridColDef[] = [
        {field: 'id', headerName: 'ID', hide: false, type: 'number', align: 'right', headerAlign: 'right'},
        {field: 'name', headerName: 'Название', align: 'right', headerAlign: 'right'},
        {field: 'code', headerName: 'Код проекта', align: 'right', headerAlign: 'right', minWidth: 150},
        {field: 'type', headerName: 'Тип', align: 'right', headerAlign: 'right'},
        {field: 'status', headerName: 'Статус', align: 'right', headerAlign: 'right'},
        {field: 'creatorUserName', headerName: 'Автор', minWidth: 250, align: 'right', headerAlign: 'right'},
        {field: 'createdDate', headerName: 'Дата создания', type: 'dateTime', minWidth: 250, align: 'right', headerAlign: 'right'},
        {field: 'creatorId', headerName: '', hide: true, align: 'right', headerAlign: 'right'},
        {
            field: 'Управление', headerName: 'Участники', minWidth: 150, align: 'right', headerAlign: 'right', renderCell: params => {
                return (
                    currentUser.id === params.row.creatorId ?
                        <Button color={"primary"} onClick={() => {
                            setSelectedProject(params.row)
                            setShowProjectManagement(true)
                        }}>
                            Просмотр
                        </Button>
                        : null
                )
            }
        },
        {
            field: 'Задачи', headerName: 'Задача', align: 'right', headerAlign: 'right', minWidth: 100, renderCell: params => {
                return (
                    <Button color={"primary"} onClick={() => {
                        setSelectedProject(params.row)
                        setShowOrderCreation(true)
                    }}>
                        Создать
                    </Button>
                )
            }
        }
    ]

    return (
        userStore.isAuth ?
            <div style={{width: '95%', margin: 'auto'}}>
                <div id={"alertAfterRegistration"} />
                <Card variant={'elevation'} style={{marginTop: "1em"}}>
                    <CardHeader title={'Карточка сотрудника'} className={'p-3 mb-2 bg-success text-white'}/>
                    <CardContent>
                        <Typography>
                            <h3>{currentUser.fullName}</h3>
                        </Typography>
                        <Typography>
                            <p><b>Эл. почта:</b> {currentUser.email}</p>
                        </Typography>
                        <Typography>
                            <p><b>Номер телефона:</b> {currentUser.telephoneNumber}</p>
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant={'elevation'} style={{marginTop: "1em"}}>
                    <CardHeader title={'Мои проекты'} className={'p-3 mb-2 bg-success text-white'}/>
                    <CardContent>
                        <div style={{display: 'flex', height: '100%', width: '100%'}}>
                            <div style={{flexGrow: 1}}>
                                <DataGrid disableColumnMenu={true} autoHeight={true} autoPageSize={true}
                                          columns={projectColumns}
                                          rows={currentUserProjects}
                                          components={{
                                              Toolbar: GridToolbar,
                                          }}
                                          pageSize={10}
                                          rowsPerPageOptions={[10]}/>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div style={{width: '90%'}}>
                    <Modal show={showProjectManagement} onHide={handleClose} centered={true}>
                        {
                            showProjectManagement ?
                                <Modal.Header className={'p-3 bg-dark text-white'} closeButton closeVariant={'white'}>
                                    <Modal.Title>Проект {selectedProject.name}</Modal.Title>
                                </Modal.Header> : null
                        }
                        {
                            selectedProject === undefined ? null :
                                <>
                                    <Modal.Body>
                                        <h5>Участники:</h5>
                                        {
                                            selectedProject.users.map(user => (
                                                <div className={'d-flex justify-content-between bd-highlight mb-2'}>
                                                    <p>
                                                        - {user.fullName}
                                                    </p>
                                                    {
                                                        currentUser.id === user.id ?
                                                            null :
                                                            <Button color={'error'} endIcon={<PersonRemoveIcon/>}
                                                                    onClick={() => {
                                                                        projectStore.deleteUserFromProject(selectedProject.id, user.id)
                                                                        navigate("/")
                                                                    }
                                                                    }/>
                                                    }
                                                </div>
                                            ))
                                        }
                                        {
                                            showUserList === true ?
                                                <DataGrid autoHeight={true} autoPageSize={true}
                                                          columns={userColumns}
                                                          rows={userList}
                                                          components={{
                                                              Toolbar: GridToolbar,
                                                          }}
                                                          pageSize={10}
                                                          rowsPerPageOptions={[10]}/>
                                                : null
                                        }
                                    </Modal.Body>
                                    <ModalFooter bsPrefix={'p-3 bg-dark text-white'}>
                                        <Button variant={'outlined'} color={'primary'} onClick={() => {
                                            projectStore.getAvailableUsersForProject(selectedProject.id)
                                                .then(r => {
                                                    setUserList(r.data)
                                                    setShowUserList(true)
                                                })
                                        }}>Добавить
                                            участника</Button>
                                    </ModalFooter>
                                </>
                        }
                    </Modal>
                    {
                        selectedProject === undefined ? null :
                            <>
                                <Modal show={showOrderCreation} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Создание задачи</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Название</Form.Label>
                                                <Form.Control
                                                    id={"title"}
                                                    placeholder={formik.errors.title}
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
                                                    defaultValue={1}
                                                    onChange={formik.handleChange}
                                                    autoFocus
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Тип</Form.Label>
                                                <Form.Select
                                                    id={"type"}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.type}
                                                >
                                                    <option selected={true} disabled={true}>Выбрать</option>
                                                    {
                                                        orderTypes.map(x => {
                                                            return <option key={x} value={x}>{x}</option>
                                                        })
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Сделать в версии</Form.Label>
                                                <Form.Control
                                                    id={"inVersion"}
                                                    placeholder={formik.errors.inVersion}
                                                    type="text"
                                                    onChange={formik.handleChange}
                                                    autoFocus
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Назначенный исполнитель</Form.Label>
                                                <Form.Select
                                                    id={"worksUserId"}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.worksUserId}
                                                >
                                                    <option selected={true} disabled={true}>Выбрать</option>
                                                    {
                                                        selectedProject.users.map(x => {
                                                            return <option key={x.id} value={x.id}>{x.fullName} ({x.email})</option>
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
                    }
                </div>
            </div>
            : null
    )
})

export default WorkSpace