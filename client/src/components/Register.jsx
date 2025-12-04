import React, { useEffect, useState } from 'react';
import { Container, Row, Col, FormGroup, Label, Button, Alert } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../features/UserSlice';
import { RegisterSchema } from '../validations/RegisterSchema';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [Prifilepic, setPic] = useState('');
    
    const dispatch = useDispatch();
    const isSuccess = useSelector((state) => state.users.isSuccess);
    const isError = useSelector((state) => state.users.isError);
    const message = useSelector((state) => state.users.message);
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    const onClose = () => setShow(false);

    const {
        register,
        handleSubmit: submitForm,
        formState: { errors }
    } = useForm({ 
        resolver: yupResolver(RegisterSchema)
    });

    const validate = () => {
        const data = {
            uname: name,
            email: email,
            password: password,
            profilepic: Prifilepic ? Prifilepic : "https://thumbs.dreamstime.com/b/faceless-male-avatar-hoodie-illustration-minimalist-default-photo-placeholder-wearing-light-gray-background-ideal-377566416.jpg"
        }
        dispatch(addUser(data));
    }


    useEffect(() => {
        if (isSuccess) {
            navigate("/login");
        } else if (isError || message) {
            setAlertMsg(message);
            setShow(true);
        }    
    }, [isSuccess, isError, message, navigate]);


    return (
        
        <div className="d-flex align-items-center justify-content-center mt-5 mb-5">

            <Alert
                color="danger"
                isOpen={show}
                fade={true}
                toggle={onClose}
                style={{
                    position: "fixed",
                    bottom: "3rem", 
                    left: "50%", 
                    transform: "translateX(-50%)", 
                    minWidth: "250px",
                    textAlign: "center",
                }}
            >
                {alertMsg}
            </Alert>
            
            <Container fluid>
                <Row className="justify-content-center">
                    <Col md="6" lg="5">
                        <div className="p-5 rounded-4 shadow-lg" style={{ backgroundColor: "#0F172A" }}>
                            <h2 className="text-white text-center mb-4 fw-bold display-6">Register</h2>
                            
                            <form className="div-form">
                                
                                <FormGroup>
                                    <Label className="text-light mb-2">Username</Label>
                                    <input
                                        {...register('name', {
                                            value: name,
                                            onChange: (e) => setName(e.target.value)
                                        })}
                                        type="text"
                                        className="form-control bg-slate-700 border-slate-600 text-white"
                                        style={{ backgroundColor: '#374151', borderColor: '#4B5563', color: 'white' }}
                                    />
                                    <p className="mt-3 mb-0" style={{ color: "#FF3838" }}>
                                        {errors.name?.message ? errors.name.message : ''}
                                    </p>
                                </FormGroup>

                                
                                <FormGroup>
                                    <Label className="text-light mb-2">Email</Label>
                                    <input
                                        {...register('email', {
                                            value: email,
                                            onChange: (e) => setEmail(e.target.value)
                                        })}
                                        type="email"
                                        className="form-control bg-slate-700 border-slate-600 text-white"
                                        style={{ backgroundColor: '#374151', borderColor: '#4B5563', color: 'white' }}
                                    />
                                    <p className="mt-3 mb-0" style={{ color: "#FF3838" }}>
                                        {errors.email?.message ? errors.email.message : ''}
                                    </p>
                                </FormGroup>

                                
                                <FormGroup>
                                    <Label className="text-light mb-2">Password</Label>
                                    <input
                                        {...register('password', {
                                            value: password,
                                            onChange: (e) => setPassword(e.target.value)
                                        })}
                                        type="password"
                                        className="form-control bg-slate-700 border-slate-600 text-white"
                                        style={{ backgroundColor: '#374151', borderColor: '#4B5563', color: 'white' }}
                                    />
                                    <p className="mt-3 mb-0" style={{ color: "#FF3838" }}>
                                        {errors.password?.message ? errors.password.message : ''}
                                    </p>
                                </FormGroup>

                                
                                <FormGroup>
                                    <Label className="text-light mb-2">Confirm Password</Label>
                                    <input
                                        {...register('confirmPassword', {
                                            value: confirmPassword,
                                            onChange: (e) => setConfirmPassword(e.target.value)
                                        })}
                                        type="password"
                                        className="form-control bg-slate-700 border-slate-600 text-white"
                                        style={{ backgroundColor: '#374151', borderColor: '#4B5563', color: 'white' }}
                                    />
                                    <p className="mt-3 mb-0" style={{ color: "#FF3838" }}>
                                        {errors.confirmPassword?.message ? errors.confirmPassword.message : ''}
                                    </p>
                                </FormGroup>


                                <FormGroup>
                                    <Label className="text-light mb-2">Profile Picture</Label>
                                    <input
                                        type="text"
                                        className="form-control bg-slate-700 border-slate-600 text-white"
                                        onChange={(e) => setPic(e.target.value)}
                                        style={{ backgroundColor: '#374151', borderColor: '#4B5563', color: 'white' }}
                                    />
                                </FormGroup>

                                
                                <FormGroup>
                                    <Button
                                        onClick={submitForm(validate)}
                                        className="w-100 py-2 fw-semibold border-0 mt-3"
                                        style={{ backgroundColor: '#2563eb' }}
                                    >
                                        Create Account
                                    </Button>
                                </FormGroup>

                                
                                <FormGroup className="text-center mt-3">
                                    <Label className="text-light">
                                        Already have an account? {'  '}
                                        <Link to="/login" className="text-blue-400 text-decoration-none">
                                            Sign In
                                        </Link>
                                    </Label>
                                </FormGroup>

                                <FormGroup className="text-center">
                                    <Label className="text-light">
                                        <Link to="/" className="text-blue-400 text-decoration-none">
                                            Back To Home
                                        </Link>
                                    </Label>
                                </FormGroup>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Register;