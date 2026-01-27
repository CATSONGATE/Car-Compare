'use client'

import {
    Box,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Button,
    Paper,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
    fetchYears,
    fetchMakes,
    fetchModels,
    fetchTrims,
    fetchVehicleDetails,
} from '@/lib/api';
import { Make, Model, Trim, VehicleDetails } from '@/types/car';
import { updateQuery } from '@/lib/queryState';
import VehicleDetailsCard from './VehicleDetailsCard';

export default function VehicleSelector() {
    /* =========================
     Selection State
  ========================= */

  const [years, setYears] = useState<number[]>([]);
  const [makes, setMakes] = useState<Make[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [trims, setTrims] = useState<Trim[]>([]);

  const [year, setYear] = useState<number | ''>('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [trim, setTrim] = useState('');

  const [vehicle, setVehicle] = useState<VehicleDetails | null>(null);

  const [loading, setLoading] = useState(false);

  const [compareList, setCompareList] = useState<VehicleDetails[]>([]);

  /* =========================
     Initial Load (Years)
  ========================= */

  useEffect(() => {
    fetchYears()
    .then((res) => setYears(res.years))
    .catch(console.error);
  }, []);

   /* =========================
     Year → Makes
  ========================= */

  useEffect(() => {
    if (!year) return;

    setLoading(true);

    setLoading(true);
    setMake('');
    setMake('');
    setTrim('');
    setVehicle(null);
    setMakes([]);
    setModels([]);
    setModels([]);

    updateQuery({ year: String(year), make: undefined, model: undefined, model_id: undefined });

    fetchMakes(year)
      .then((res) => setMakes(res.makes))
      .finally(() => setLoading(false));
  }, {year});

    /* =========================
     Make → Models
  ========================= */

  useEffect(() => {
    if (!make || !year) return;

    setLoading(true);
    setModel('');
    setTrim('');
    setVehicle(null);
    setModels([]);
    setTrims([]);

    updateQuery({ make, model: undefined, model_id: undefined });

    fetchModels(make, year)
      .then((res) => setModels(res.models))
      .finally(() => setLoading(false));
  }, [make]);

   /* =========================
     Model → Trims
  ========================= */

  useEffect(() => {
    if (!model || !make || !year) return;

    setLoading(true);
    setTrim('');
    setVehicle(null);
    setTrims([]);

    updateQuery({ model, model_id: undefined });

    fetchTrims(make, model, year)
      .then((res) => setTrims(res.trims))
      .finally(() => setLoading(false));
  ), [model]);

  /* =========================
     Trim → Vehicle Details
  ========================= */

  useEffect(() => {
    if (!trim) return;

    setLoading(true);

    updateQuery({ model_id: trim });

    fetchVehicleDetails(trim)
      .then((res) => setVehicle(res.vehicle))
      .finally(() => setLoading(false));
  }, {trim});

   /* =========================
     Reset
  ========================= */

  function clearSelection() {
    setYear('');
    setMake('');
    setModel('');
    setTrim('');
    setVehicle(null);
    setMakes([]);
    setModels([]);
    setTrims([]);
    updateQuery({ year: undefined, make: undefined, model: undefined, model_id: undefined });
  }
   /* =========================
     Helpers
   ========================= */

  function handleAddToCompare(v: VehicleDetails) {
    setCompareList((prev) => {
        if (prev.some((x) => x.model_id === v.model_id)) return prev;
        if (prev.length >= 3) return prev;
        return [...prev, v];
    });
  }
  

  /* =========================
     Render
  ========================= */

  return (
    <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
            Select Vehicle
        </Typography>

        <Stack spacing={2}>
            <FormControl fullWidth>
                <InputLabel>Year</InputLabel>
                <Select
                  value={year}
                  label="Year"
                  onChange={(e) => setYear(Number(e.target.value))}
                >
                  {years.map((y) => (
                    <MenuItem key={y} value={y}>
                      {y}
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>

            <FormControl fullWidth disabled={!year || loading}>
              <InputLabel>Make</InputLabel>
              <Select
                value={make}
                label="Make"
                onChange={(e) => setMake(e.target.value)}
              >
                {makes.map((m) => (
                    <MenuItem key={m.make_id} value={m.make_id}>
                      {m.make_display}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth disabled={!make || loading}>
              <InputLabel>Model</InputLabel>
              <Select
                value={model}
                label="Model"
                onChange={(e) => setModel(e.target.value)}
              >
                {models.map((m) => (
                    <MenuItem key={m.model_name} value={m.model_name}>
                      {m.model_name}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth disabled={!model || loading}>
              <InputLabel>Trim</InputLabel>
              <Select
                value={trim}
                label="Trim"
                onChange={(e) => setTrim(e.target.value)}
              >
                {trims.map((t) => (
                  <MenuItem key={t.model_id} value={t.model_id}>
                    {t.model_trim || 'Base'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <VehicleDetailsCard
              vehicle={vehicle}
              onAdd={handleAddToCompare}
              disabled={
                !vehicle ||
                compareList.some((v) => v.model_id === vehicle.model_id) ||
                compareList.length >= 3
              }
            />

            {loading && (
              <Box display="flex" justifyContent="center">
                <CircularProgress size={24} />
              </Box>
            )}

            <Button variant="outlined" onClick={clearSelection}>
              Clear selectiion
            </Button>
        </Stack>
    </Paper>
  );
}