'use client';

import React, { useContext, useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import api from '@/server/api';
import { login } from '@/server/auth';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/UserContext';

export default function Login() {
  const router = useRouter()
  const { user, setUser } = useContext(UserContext)
  const [email, setEmail] = useState('Email');
  const [password, setPassword] = useState('Password');

  const handleLogin = async () => {
    const data = {
      email,
      password
    }
    try {
      const response = await login(data)
      setUser(response)
      router.push("/")
    } catch (error) {
      console.log("error ao tentar", error)
      throw error
    }
  };

  console.log(user)

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: 400,
          textAlign: 'center',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label={email}
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label={password}
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={() => handleLogin()}
          >
            Login
          </Button>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
          Don't have an account? <a href="/register">Sign Up</a>
        </Typography>
      </Paper>
    </Box>
  );
}
