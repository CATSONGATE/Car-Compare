'use client';

import {
    Card,
    CardContent,
    CardAuctions,
    Typography,
    Button,
    Stack,
    Divider,
} from '@mui/material';
import { VehicleDetails } from '@/types/car';

interface Props {
    vehicle: VehicleDetails | null;
    onAdd: (vehicle: VehicleDetails) => void;
    disabled?: boolean;
}

export default function VehicleDetailsCard({
    vehicle,
    onAdd,
    disabled,
}: Props) {
    if (!vehicle) return null;

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Stack spacing={1}>
                    <Typography variant="h6">
                        {vehicle.model_year} {vehicle.model_make_display} {vehicle.model_model}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Trim: {vehicle.model_trim || 'Base'}
                    </Typography>

                    <Divider />

                    <Typography variant="body2">
                        Engine: {vehicle.model_engine_type || '-'}
                    </Typography>
                    <Typography variant="body2">
                        Power: {vehicle.model_engine_power_ps || '-'} PS
                    </Typography>
                    <Typography variant="body2">
                        Torque: {vehicle.model_engine_torque_nm || '-'} Nm
                    </Typography>
                </Stack>
            </CardContent>

            <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={disabled}
                  onClick={() => onAdd(vehicle)}
                >
                    Add to Compare
                </Button>
            </CardActions>
        </Card>
    );
}