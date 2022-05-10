import {useContext} from "react";
import {Button, Grid, TextField} from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import {useFormik} from "formik";
import * as yup from "yup";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router";
import {Context} from "../../index";


const RegistrationPage = observer(() => {
    const {userStore} = useContext(Context)
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            telephoneNumber: "",
            password: ""
        },
        validateOnChange: true,
        validationSchema: yup.object({
            email: yup.string()
                .email("Wrong format")
                .required("Required"),
            password: yup.string()
                .required("Required")
                .min(8, "Minimum 8 characters"),
            fullName: yup.string()
                .required("Required"),
            telephoneNumber: yup.string().required("Required")
        }),
        onSubmit: (values => {
            userStore?.registration(values.fullName, values.email, values.telephoneNumber, values.password)
                .then(() => {
                    navigate("/login")
                })
        })
    })

    return (
        <Grid
            container
            rowSpacing={1}
            direction="column"
            alignItems={"center"}
            justifyContent={"center"}
            style={{minHeight: '60vh'}}
        >
            <div id={"alertAfterRegistration"} />
            <Grid item xs={5}>
                <TextField
                    id="fullName"
                    name="fullName"
                    error={formik.errors.fullName != null}
                    helperText={formik.errors.fullName}
                    label="Инициалы"
                    type={"text"}
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                />
            </Grid>
            <Grid item xs={5}>
                <TextField
                    id="email"
                    name="email"
                    error={formik.errors.email != null}
                    helperText={formik.errors.email}
                    label="Эл. почта"
                    type={"text"}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
            </Grid>
            <Grid item xs={5}>
                <TextField
                    value={formik.values.telephoneNumber}
                    onChange={formik.handleChange}
                    error={formik.errors.telephoneNumber != null}
                    helperText={formik.errors.telephoneNumber}
                    id="telephoneNumber"
                    name="telephoneNumber"
                    label="Номер телефона"
                    type={"tel"}
                />
            </Grid>
            <Grid item xs={5}>
                <TextField
                    id="password"
                    name="password"
                    error={formik.errors.password != null}
                    helperText={formik.errors.password}
                    label="Пароль"
                    type={"password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    startIcon={<HowToRegIcon />}
                    variant={"contained"}
                    color={"success"}
                    onClick={formik.handleSubmit}
                >
                    Зарегистрироваться
                </Button>
            </Grid>
        </Grid>
    )
})

export default RegistrationPage;