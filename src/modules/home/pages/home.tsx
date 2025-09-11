import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { AppHeader } from "~/components";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <AppHeader />
      <Container maxWidth="md">
        <Box
          sx={{ display: "flex", flexDirection: "column", rowGap: 4, py: 6 }}
        >
          <Typography variant="h4" fontWeight="bold">
            Conheça e teste algumas opções de Forms disponiveis
          </Typography>

          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Form simples" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Container>
    </Box>
  );
}
