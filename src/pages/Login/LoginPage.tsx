import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useAuthAtom } from '../../hooks/useAuthAtom';

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const { login } = useAuthAtom();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormValues) => {
    login({
      id: '1',
      name: 'Letícia Lima',
      email: data.email,
    });

    navigate('/', { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper sx={{ p: 4, width: 360 }}>
        <Typography variant="h6" mb={2}>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register('email')}
          />

          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
          />

          <Button type="submit" fullWidth sx={{ mt: 2 }}>
            Entrar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
