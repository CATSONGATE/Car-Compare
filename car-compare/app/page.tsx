'use client';

import { Container, Grid } from '@mui/material';
import VehicleSelector from '@/components/VehicleSelector';
import CompareTable from '@/components/CompareTable';

export default function Page() {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <VehicleSelector />
        </Grid>
        <Grid item xs={12} md={7}>
          <CompareTable />
        </Grid>
      </Grid>
    </Container>
  );
}