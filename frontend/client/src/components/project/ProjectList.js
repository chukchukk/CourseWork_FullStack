import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid";
import {Button, TextField} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from "react-bootstrap";

const ProjectList = observer(() => {
    const {projectStore} = useContext(Context)
    const [projectList, setProjectList] = useState([])
    const [currentProject, setCurrentProject] = useState({})
    const [show, setShow] = useState(false)
    const {userStore} = useContext(Context)

    const handleClose = () => setShow(false)

    useEffect(() => {
        projectStore.getOpenProjects()
            .then(r => {
                setProjectList(r.data)
                console.log(r.data)
            })
            .catch(r => console.log(r))
    }, [])

    const columns:GridColDef[] = [
        {field: 'id', headerName: 'ID', hide: false, type: 'number'},
        {field: 'name', headerName: 'Название'},
        {field: 'code', headerName: 'Код проекта'},
        {field: 'type', headerName: 'Тип'},
        {field: 'status', headerName: 'Статус'},
        {field: 'creatorUserName', headerName: 'Автор', minWidth: 250},
        {field: 'createdDate', headerName: 'Дата создания', type: 'dateTime', minWidth: 250},
        {field: 'Просмотр', headerName: 'Просмотр', disableColumnMenu: true, disableExport: true, disableReorder: true, renderCell: params => {
            return(
                <Button color={"primary"} onClick={() => {
                    setCurrentProject(params.row)
                    setShow(true)
                }}>
                    Просмотр
                </Button>
                )
            }
        }
    ]

    return(
        <>
            {
                userStore.isAuth ?
                    <div>
                        <div style={{width: '90%'}}>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Карта проекта</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className={"card"}>
                                        <div className="card-body">
                                            <h5 className="card-title">Название:</h5>
                                            <p className="card-text">{currentProject.name}</p>
                                            <h5 className="card-title">Код:</h5>
                                            <p className="card-text">{currentProject.code}</p>
                                            <h5 className="card-title">Тип:</h5>
                                            <p className="card-text">{currentProject.type}</p>
                                            <h5 className="card-title">Статус:</h5>
                                            <p className="card-text">{currentProject.status}</p>
                                            <h5 className="card-title">Автор:</h5>
                                            <p className="card-text">{currentProject.creatorUserName}</p>
                                            <h5 className="card-title">Описание:</h5>
                                            <TextField name="description"
                                                       type={"text"}
                                                       defaultValue={currentProject.description}
                                                       fullWidth={true}
                                                       rows={5}
                                                       multiline
                                                       disabled={true}
                                            />
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </div>
                        <div style={{ display: 'flex', height: '100%', width: '100%'}}>
                            <div style={{ flexGrow: 1 }}>
                                <DataGrid autoHeight={true} autoPageSize={true}
                                          columns={columns}
                                          rows={projectList}
                                          components={{
                                              Toolbar: GridToolbar,
                                          }}
                                          pageSize={10}
                                          rowsPerPageOptions={[10]} />
                            </div>
                        </div>
                    </div> : null
            }
        </>
    )
})

export default ProjectList