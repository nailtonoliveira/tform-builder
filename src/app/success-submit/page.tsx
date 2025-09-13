import Box from "@mui/material/Box";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Typography from "@mui/material/Typography";

export default function SuccessSubmit() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        py: 8,
      }}
    >
      <ThumbUpIcon sx={{ fontSize: 120 }} color="success" />
      <Typography variant="h1">Sucesso!</Typography>
    </Box>
  );
}
