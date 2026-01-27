/* =========================
   Dropdown / List Types
========================= */
export interface Make {
    make_id: string;
    make_display: string;
}

export interface Model {
    model_name: string:
}

export interface Trim {
    model_id: string;
    model_trim: string;
    model_year: string;
}

/**
 * Normalized vehicle details returned by `/api/details`
 * CarQuery sends MANY fields — we allow extras
 * but enforce stable identifiers.
 */
export interface VehicleDetails {
    // Stable  identifier
    model_id: string;

    // Core Identity
    model_year?: string;
    model_make_id?: string;
    model_make_display?: string;
    model_name?: string;
    model_trim?: string;

    // Engine (optional, varies by vehicle)
    model_engine_position?: string;
    model_engine_power_ps?: string;
    model_engine_torque_nm?: string;
    model_engine_type?: string;

    // Allow future fields without breaking UI
    [key: string]: unknown;
}
