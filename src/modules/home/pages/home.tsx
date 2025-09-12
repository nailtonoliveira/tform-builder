import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 4, py: 6 }}>
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
  );
}
