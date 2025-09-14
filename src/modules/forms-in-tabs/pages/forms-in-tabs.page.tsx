"use client";

import { useEffect, useState } from "react";
import { Box, Skeleton, Grid, Tabs, Tab, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { getListOfFormSchema } from "~/modules/home/services/home.services";
import { FormBuilder } from "~/components";

function a11yProps(tab: string) {
  return {
    id: `simple-tab-${tab}`,
    "aria-controls": `simple-tabpanel-${tab}`,
  };
}

export default function FormsInTabsPage() {
  const [activeTab, setActiveTab] = useState("");

  const query = useQuery({
    queryKey: ["forms"],
    queryFn: getListOfFormSchema,
  });
  const forms = query.data?.data;

  const onChangeTabHandler = (_: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (!forms || !forms.length) return;

    const [firstFormSchema] = forms;

    setActiveTab(firstFormSchema.slug);
  }, [forms]);

  if (query.isLoading)
    return (
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: 4, py: 6 }}>
        <Box>
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

  if (!forms || !forms?.length)
    return (
      <Box>
        <Typography variant="body1" color="textSecondary">
          Formulários não encontrados
        </Typography>
      </Box>
    );

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={onChangeTabHandler}
          aria-label="basic tabs forms example"
        >
          {forms.map((form) => (
            <Tab
              key={form.id}
              label={form.title}
              value={form.slug}
              {...a11yProps(form.slug)}
            />
          ))}
        </Tabs>
      </Box>
      {forms.map((form) => (
        <Box
          key={form.id}
          role="tabpanel"
          hidden={activeTab !== form.slug}
          id={`simple-tabpanel-${form.slug}`}
          aria-labelledby={`simple-tab-${form.slug}`}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", rowGap: 4, py: 4 }}
          >
            <Typography variant="body2" color="textSecondary">
              {form.description}
            </Typography>

            <FormBuilder formSchema={form} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
