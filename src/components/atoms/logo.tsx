import Box from "@mui/material/Box";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";

export function Logo() {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: "bold" }}
    >
      <DynamicFormIcon />
      TFORM BUILDER
    </Box>
  );
}
