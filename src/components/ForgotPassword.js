import React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material"; // Import the back arrow icon
import { database } from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailVal = e.target.email.value;
        sendPasswordResetEmail(database, emailVal)
            .then(() => {
                alert("Check your email for password reset instructions");
                history("/");
            })
            .catch((err) => {
                alert(err.code);
            });
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <Typography variant="h4" gutterBottom>
                Forgot Password
            </Typography>
            <form onSubmit={(e) => handleSubmit(e)}>
                <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                />
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                    marginTop="1rem"
                >
                    {/* Back Button */}
                    <IconButton
                        onClick={() => history("/")}
                        color="primary"
                        aria-label="Back"
                    >
                        <ArrowBack />
                    </IconButton>
                    {/* Reset Password Button */}
                    <Button type="submit" variant="contained" color="primary">
                        Reset Password
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default ForgotPassword;
