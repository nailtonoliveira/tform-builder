"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Skeleton,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getListOfFormSchema } from "../services/home.services";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const query = useQuery({
    queryKey: ["forms"],
    queryFn: getListOfFormSchema,
  });

  if (query.isLoading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: 4, py: 6 }}>
        <Typography variant="h4" fontWeight="bold">
          Conheça e teste algumas opções de Forms disponiveis
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <Card
              sx={{ display: "flex", flexDirection: "column" }}
              key={index.toString()}
            >
              <CardHeader title={<Skeleton height={32} />} />
              <CardContent sx={{ mb: "auto" }}>
                <Skeleton variant="text" height={24} />
                <Skeleton variant="text" height={24} width={"80%"} />
              </CardContent>

              <CardActions sx={{ mt: "auto" }}>
                <Skeleton variant="rounded" height={36} width={80} />
                <Skeleton variant="rounded" height={36} width={80} />
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    );
  }

  const forms = query.data?.data;

  if (!forms || forms.length === 0) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: 4, py: 6 }}>
        <Typography variant="h4" fontWeight="bold">
          Nenhum formulário encontrado
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 4, py: 6 }}>
      <Typography variant="h4" fontWeight="bold">
        Conheça e teste algumas opções de Forms disponiveis
      </Typography>

      <Box
        sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        {forms.map((form) => (
          <Card sx={{ display: "flex", flexDirection: "column" }} key={form.id}>
            <CardContent sx={{ mb: "auto" }}>
              <Typography variant="h6">{form.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {form.description}
              </Typography>
            </CardContent>

            <CardActions sx={{ mt: "auto" }}>
              <Button
                color="info"
                size="small"
                onClick={() => router.push(`/form-by-id/${form.id}`)}
              >
                Ver por ID
              </Button>
              <Button size="small" onClick={() => router.push(`/${form.slug}`)}>
                Ver via Slug
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
