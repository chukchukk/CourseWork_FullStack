import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {Button, Card, CardContent, CardHeader, TextField, Typography} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid";
import {Modal, ModalFooter} from "react-bootstrap";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const WorkSpace = observer(() => {
    const {userStore} = useContext(Context)
    const {projectStore} = useContext(Context)
    const [currentUser, setCurrentUser] = useState({})
    const [currentUserProjects, setCurrentUserProjects] = useState([])
    const [showProjectManagement, setShowProjectManagement] = useState(false)
    const [selectedProject, setSelectedProject] = useState(undefined)
    const [showUserList, setShowUserList] = useState(false)
    const [userList, setUserList] = useState([])
    const [needUpdate, setNeedUpdate] = useState('')

    const handleClose = () => {
        setShowProjectManagement(false)
        setShowUserList(false)
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
    }, [needUpdate])

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
                        setNeedUpdate((Math.random() + 1).toString(36).substring(7))
                        console.log(needUpdate)
                    }}>Добавить</Button>
                )
            }
        }
    ]

    const projectColumns: GridColDef[] = [
        {field: 'id', headerName: 'ID', hide: false, type: 'number'},
        {field: 'name', headerName: 'Название'},
        {field: 'code', headerName: 'Код проекта'},
        {field: 'type', headerName: 'Тип'},
        {field: 'status', headerName: 'Статус'},
        {field: 'creatorUserName', headerName: 'Автор', minWidth: 250},
        {field: 'createdDate', headerName: 'Дата создания', type: 'dateTime', minWidth: 250},
        {field: 'creatorId', headerName: '', hide: true},
        {
            field: 'Управление', headerName: 'Участники', minWidth: 150, renderCell: params => {
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
        }
    ]

    return (
        userStore.isAuth ?
            <div style={{width: '95%', margin: 'auto'}}>
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
                                <DataGrid autoHeight={true} autoPageSize={true}
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
                                                    console.log(userList)
                                                    setShowUserList(true)
                                                })
                                        }}>Добавить
                                            участника</Button>
                                    </ModalFooter>
                                </>
                        }
                    </Modal>
                </div>
            </div>
            : null
    )
})

export default WorkSpace