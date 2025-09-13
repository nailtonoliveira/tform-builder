"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Grid, Skeleton, Typography } from "@mui/material";

import { FormBuilder } from "~/components";

import { getFormSchemaBySlug } from "../services/form-by-slug.services";

interface SimpleFormProps {
  params: Promise<{ formSlug: string }>;
}

export default function FormBySlugPage({ params }: SimpleFormProps) {
  const formSlug = use(params).formSlug;

  const query = useQuery({
    queryKey: ["form", formSlug],
    queryFn: () => getFormSchemaBySlug(formSlug),
  });

  if (query.isLoading)
    return (
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: 4, py: 6 }}>
        <Box>
          <Skeleton variant="text" height={32} width={200} />
          <Skeleton variant="text" height={24} width={350} />
        </Box>

        <Grid
          container
          spacing={2}
          sx={{
            p: 4,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "text.disabled",
            borderRadius: 2,
          }}
        >
          <Grid size={7}>
            <Skeleton variant="rounded" height={56} />
          </Grid>
          <Grid size={5}>
            <Skeleton variant="rounded" height={56} />
          </Grid>
          <Grid size="grow">
            <Skeleton variant="rounded" height={56} />
          </Grid>
        </Grid>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
        >
          <Skeleton variant="rounded" height={36} width={100} />
          <Skeleton variant="rounded" height={36} width={100} />
        </Box>
      </Box>
    );

  const formSchema = query.data?.data;

  if (!formSchema)
    return (
      <Box>
        <Typography variant="body1" color="textSecondary">
          Formulário não encontrado
        </Typography>
      </Box>
    );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 4, py: 6 }}>
      <Box>
        <Typography variant="h5" fontWeight="bold">
          {formSchema.title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {formSchema.description}
        </Typography>
      </Box>
      <FormBuilder formSchema={formSchema} />
    </Box>
  );
}
