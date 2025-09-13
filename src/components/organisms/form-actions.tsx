"use client";

import { Box, Button } from "@mui/material";
import { ActionSchema } from "../../types/form";

interface Props {
  actions: ActionSchema[];
  isLoading?: boolean;
}

export function FormActions({ actions, isLoading }: Props) {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
      {actions.map((action) => (
        <Button
          key={action.label}
          variant={action.type === "route" ? "outlined" : "contained"}
          color={action.type === "route" ? "inherit" : "primary"}
          type={action.type === "rest" ? "submit" : "button"}
          onClick={() => {
            if (action.type === "route" && action.route) {
              window.location.href = action.route;
            }
          }}
          disabled={isLoading}
        >
          {action.label}
        </Button>
      ))}
    </Box>
  );
}
