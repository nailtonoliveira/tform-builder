import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { AppHeader } from "~/components";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <AppHeader />
      <Container maxWidth="md">{children}</Container>
    </Box>
  );
}
