
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Col, Container, Modal, Row} from "react-bootstrap";
import {Button, CardHeader, TextField} from "@mui/material";
import './style/Order.css'


const Orders = observer(() => {
    const {orderStore} = useContext(Context)
    const {userStore} = useContext(Context)
    const [allOrders, setAllOrders] = useState([])
    const [userOrders, setUserOrders] = useState([])
    const [currentOrder, setCurrentOrder] = useState({})
    const [showFromAll, setShowFromAll] = useState(false)
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
        {field: 'createdDate', headerName: 'Дата создания', type: 'dateTime', minWidth: 250},
        {field: 'updatedDate', headerName: 'Дата обновления', type: 'dateTime', minWidth: 250},
        {field: 'creatorUser', headerName: 'Автор', minWidth: 200, renderCell: params => {
                const teleg = 'https://t.me/' + params.value.telephoneNumber
                    .replace(/\s/g, '')
                    .replace('(', '')
                    .replace(')', '')
                return (
                    <a title={'Перейти в телеграм'} style={{display: "table-cell"}} href={teleg} target="_blank">{params.value.fullName}</a>
                )
            }},
        {field: 'worksUser', headerName: 'Работник', minWidth: 200, renderCell: params => {
                const teleg = 'https://t.me/' + params.value.telephoneNumber
                    .replace(/\s/g, '')
                    .replace('(', '')
                    .replace(')', '')
                return (
                    <a title={'Перейти в телеграм'} style={{display: "table-cell"}} href={teleg} target="_blank">{params.value.fullName}</a>
                )
            }},
        {field: 'Просмотр', headerName: 'Просмотр', disableColumnMenu: true, disableExport: true, disableReorder: true, renderCell: params => {
                return(
                    <Button color={"primary"} onClick={() => {
                        setCurrentOrder(params.row)
                        setShowFromAll(true)
                    }}>
                        Просмотр
                    </Button>
                )
            }
        }
    ]

    const userOrderColumns:GridColDef[] = [
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
        {field: 'createdDate', headerName: 'Дата создания', type: 'dateTime', minWidth: 250},
        {field: 'updatedDate', headerName: 'Дата обновления', type: 'dateTime', minWidth: 250},
        {field: 'creatorUser', headerName: 'Автор', minWidth: 200, renderCell: params => {
                const teleg = 'https://t.me/' + params.value.telephoneNumber
                    .replace(/\s/g, '')
                    .replace('(', '')
                    .replace(')', '')
                return (
                    <a title={'Перейти в телеграм'} style={{display: "table-cell"}} href={teleg} target="_blank">{params.value.fullName}</a>
                )
            }},
        {field: 'worksUser', headerName: 'Работник', minWidth: 200, valueFormatter: params => {
                return params.value.fullName
            }
        },
        {field: 'Управление', headerName: 'Управление', disableColumnMenu: true, disableExport: true, disableReorder: true, renderCell: params => {
                return(
                    <Button color={"primary"} onClick={() => {
                        setCurrentOrder(params.row)
                        setShowFromAll(true)
                        setShowFromUserOrders(true)
                    }}>
                        Управление
                    </Button>
                )
            }
        }
    ]

    const handleClose = () => {
        setShowFromAll(false)
        setShowFromUserOrders(false)
    }

    return(
        <>
            {
                userStore.isAuth ?
                    <div style={{width: '95%', margin: 'auto'}}>
                        <Modal show={showFromAll} onHide={handleClose} dialogClassName={'modal-90w'}>
                            <Modal.Header closeButton>
                                <Modal.Title>Карточка задачи</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className={"card"}>
                                    <div className="card-body">
                                        <Container>
                                            <Row>
                                                <Col>
                                                    <h5 className="card-title">Название:</h5>
                                                    <p className="card-text">{currentOrder.title}</p>
                                                    <h5 className="card-title">Приоритет:</h5>
                                                    <p className="card-text">{currentOrder.priority}</p>
                                                    <h5 className="card-title">Тип:</h5>
                                                    <p className="card-text">{currentOrder.type}</p>
                                                    <h5 className="card-title">Статус:</h5>
                                                    <p className="card-text">{currentOrder.status}</p>
                                                    <h5 className="card-title">Исправить в версии:</h5>
                                                    <p className="card-text">{currentOrder.inVersion}</p>
                                                </Col>
                                                <Col>
                                                    <h5 className="card-title">Дата создания:</h5>
                                                    <p className="card-text">{currentOrder.createdDate}</p>
                                                    <h5 className="card-title">Дата обновления:</h5>
                                                    <p className="card-text">{currentOrder.updatedDate}</p>
                                                    {
                                                        currentOrder.worksUser === undefined &&
                                                        currentOrder.creatorUser === undefined &&
                                                        currentOrder.project === undefined ? null :
                                                        <>
                                                            <h5 className="card-title">Автор:</h5>
                                                            <p className="card-text">{currentOrder.creatorUser.fullName + ' (' + currentOrder.creatorUser.email + ')'}</p>
                                                            <h5 className="card-title">Исполнитель:</h5>
                                                            <p className="card-text">{currentOrder.worksUser.fullName + ' (' + currentOrder.worksUser.email + ')'}</p>
                                                            <h5 className="card-title">Проект:</h5>
                                                            <p className="card-text">{currentOrder.project.name}</p>
                                                        </>
                                                    }
                                                </Col>
                                            </Row>
                                            <Row>
                                                <h5 className="card-title">Описание:</h5>
                                                <TextField name="description"
                                                           type={"text"}
                                                           defaultValue={currentOrder.description}
                                                           fullWidth={true}
                                                           rows={5}
                                                           multiline
                                                           disabled={true}
                                                />
                                            </Row>
                                        </Container>
                                    </div>
                                </div>
                            </Modal.Body>
                            {
                                currentOrder.availableStatuses !== undefined && showFromUserOrders === true ?
                                    <Modal.Footer>
                                        <p>Изменить статус на:</p>
                                        {
                                            currentOrder.availableStatuses.map(stat => {
                                                return (
                                                    <Button variant={'contained'} style={{margin: "0.5em"}} onClick={() => {
                                                        orderStore.changeOrderStatus(currentOrder.id, stat)
                                                        orderStore.getAllOrders()
                                                            .then(r => setAllOrders(r.data))
                                                        orderStore.getUserOrders()
                                                            .then(r => setUserOrders(r.data))
                                                        handleClose()
                                                    }}>{stat}</Button>
                                                )
                                            })
                                        }
                                    </Modal.Footer> : null
                            }
                        </Modal>

                        <Card variant={'elevation'} style={{marginTop: "1em"}}>
                            <CardHeader title={'Все задачи'} className={'p-3 mb-2 bg-success text-white'}/>
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

                        <Card variant={'elevation'} style={{marginTop: "1em"}}>
                            <CardHeader title={'Мои задачи'} className={'p-3 mb-2 bg-success text-white'}/>
                            <div style={{ display: 'flex', height: '100%', width: '100%'}}>
                                <div style={{ flexGrow: 1 }}>
                                    <DataGrid autoHeight={true} autoPageSize={true}
                                              columns={userOrderColumns}
                                              rows={userOrders}
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

export default Orders