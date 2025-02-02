import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import Autenticacao from '../../Modelos/AutenticacaoDTO';
import { login } from '../../Services/Service';
import './Login.css';
import { useDispatch } from 'react-redux';
import { addToken } from '../../Store/Tokens/Actions';
import { toast } from 'react-toastify';

function Login() {

    let navigate = useNavigate();

    const [token, setToken] = useLocalStorage('token');
    const [autenticacao, setAutenticacao] = useState<Autenticacao>(
        {
            email: "",
            senha: "",
        }
    );

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setAutenticacao({
            ...autenticacao,
            [e.target.name]: e.target.value
        })
    }


    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {

        e.preventDefault();

        try {

            await login(`/api/Autenticacao`, autenticacao, setToken);
            toast.info('Login realizado com sucesso!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                type: "success",
                theme: "colored"
            });

        } catch (error) {

            toast.info('Dados Inconsistentes', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                type: "warning",
                theme: "colored"
            });

        }
    }

    useEffect(() => {

        if (token !== '') {
            navigate('/home');
        }

    }, [token, navigate]);

    return (
        <>
            <Grid container direction='row' justifyContent='center' alignItems='center'>
                <Grid item xs={3} className='morangos'></Grid>
                <Grid item xs={6} alignItems='center'>
                    <Box paddingX={10}>
                        <form onSubmit={onSubmit}>
                            <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos3'>Login</Typography>

                            <TextField
                                value={autenticacao.email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                                id='email' label='E-mail' variant='outlined' name='email' margin='normal' type='email' fullWidth />

                            <TextField
                                value={autenticacao.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                                id='senha' label='Senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />

                            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                <Box marginY={2} textAlign='center'>
                                    <Link to='/cadastrousuario' className='text-decorator-none'>
                                        <Button type='submit' variant='contained' color='primary' className='btnCadastrar2'>
                                            Cadastre-se
                                        </Button>
                                    </Link>
                                </Box>
                                <Box marginY={2} textAlign='center'>
                                    <Button type='submit' variant='contained' color='primary' className='btnLogin'>
                                        Login
                                    </Button>
                                </Box>

                            </Grid>
                        </form>
                    </Box>
                </Grid>
                <Grid item xs={3} className='laranjas'></Grid>
            </Grid>
        </>
    );
}

export default Login;