'use client';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { VehicleDetails } from '@/types/car';
import { loadCompare, saveCompare } from '@/lib/storage';
import { useEffect, useState } from 'react';

const FIELDS: { label: string; key: keyof VehicleDetails }[] = [
  { label: 'Year', key: 'model_year' },
  { label: 'Make', key: 'model_make_display' },
  { label: 'Model', key: 'model_name' },
  { label: 'Trim', key: 'model_trim' },
  { label: 'Engine', key: 'model_engine_type' },
  { label: 'Power (PS)', key: 'model_engine_power_ps' },
  { label: 'Torque (Nm)', key: 'model_engine_torque_nm' },
];

export default function CompareTable() {
  const [list, setList] = useState<VehicleDetails[]>([]);

    /* =========================
     Load + Persist
  ========================= */

  useEffect(() => {
    setList(loadCompare());
  }, []);

  useEffect(() => {
    saveCompare(list);
  }, [list]);

    /* =========================
     Remove
  ========================= */

  function remove(model_id: string) {
    setList((prev) => prev.filter((v) => v.model_id !== model_id));
  }

  if (list.length === 0) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Compare</Typography>
        <Typography color="text.secondary">
          Add vehicles to compare
        </Typography>
      </Paper>
    );
  }

    /* =========================
     Render
  ========================= */

  return (
    <Paper sx={{ p: 2, overflowX: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Compare Vehicles
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            {list.map((v) => (
              <TableCell key={v.model_id}>
                <Box display="flex" justifyContent="space-between">
                  {v.model_name}
                  <IconButton size="small" onClick={() => remove(v.model_id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            ))}  
          </TableRow>
        </TableHead>

        <TableBody>
          {FIELDS.map((field) => (
            <TableRow key={field.key}>
              <TableCell>{field.label}</TableCell>
              {list.map((v) => (
                <TableCell key={v.model_id}>
                  {v[field.key] || '-'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

