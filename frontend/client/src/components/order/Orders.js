
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Modal} from "react-bootstrap";
import {Button, CardHeader, TextField} from "@mui/material";
import './style/Order.css'


const Orders = observer(() => {
    const {orderStore} = useContext(Context)
    const {userStore} = useContext(Context)
    const [allOrders, setAllOrders] = useState([])
    const [currentOrder, setCurrentOrder] = useState({})
    const [showFromAll, setShowFromAll] = useState(false)


    useEffect(() => {
        orderStore.getAllOrders()
            .then(r => {
                setAllOrders(r.data)
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
        {field: 'status', headerName: 'Статус'},
        {field: 'description', headerName: 'description', hide: true},
        {field: 'inVersion', headerName: 'Изменить в версии', minWidth: 150},
        {field: 'createdDate', headerName: 'Дата создания', type: 'dateTime', minWidth: 250},
        {field: 'updatedDate', headerName: 'Дата обновления', type: 'dateTime', minWidth: 250},
        {field: 'creatorUser', headerName: 'Автор', minWidth: 200, valueFormatter: params => {
                return params.value.fullName
            }},
        {field: 'worksUser', headerName: 'Работник', minWidth: 200, valueFormatter: params => {
                return params.value.fullName
            }
        },
        {field: 'Просмотр', headerName: 'Просмотр', disableColumnMenu: true, disableExport: true, disableReorder: true, renderCell: params => {
                return(
                    <Button color={"primary"} onClick={() => {
                        setCurrentOrder(params.row)
                        console.log(currentOrder)
                        setShowFromAll(true)
                    }}>
                        Просмотр
                    </Button>
                )
            }
        }
    ]

    const handleClose = () => {
        setShowFromAll(false)
    }

    return(
        <>
            {
                userStore.isAuth ?
                    <div style={{width: '95%', margin: 'auto'}}>
                        <Modal show={showFromAll} onHide={handleClose} dialogClassName={'modal-90w'}>
                            <Modal.Header closeButton>
                                <Modal.Title>Карточка заказа</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                            </Modal.Body>
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
                    </div> : null
            }
        </>
    )
})

export default Orders