import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({}); // State to store validation errors
    const navigate = useNavigate();

    // Simple email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation function
    const validate = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Email is not valid";
        }

        if (!password) {
            newErrors.password = "Password is required";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            // No validation errors, proceed with login
            axios.post('http://localhost:3001/login', { email, password })
                .then(result => {
                    console.log(result);
                    if (result.data === "Success") {
                        navigate('/home');  // Redirect to home if login is successful
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input 
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input 
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                    </div>

                    <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
                </form>

                <p>Don't Have an Account?</p>
                <Link to={'/register'} className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign up
                </Link>
            </div>
        </div>
    );
}

export default Login;
