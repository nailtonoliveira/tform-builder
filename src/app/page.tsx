import { Box, Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          p: [0, 4],
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Bem-vindo ao TForm Builder!
        </Typography>
      </Box>
    </Container>
  );
}
