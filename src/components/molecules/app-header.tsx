import Box from "@mui/material/Box";
import { Logo } from "../atoms";

export function AppHeader() {
  return (
    <Box
      component="header"
      sx={{
        height: 64,
        width: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ maxWidth: "md", mx: "auto", width: 1, px: 4 }}>
        <Logo />
      </Box>
    </Box>
  );
}
