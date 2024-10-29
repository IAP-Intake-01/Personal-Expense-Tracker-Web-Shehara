import { FormLabel, Input } from '@mui/joy';
import * as React from 'react';

export default function CustomTextField({ label, placeholder }) {
    return (
        <div style={{ marginBottom: '15px' }}>
            <FormLabel style={{ color: 'white', margin: '5px 0px' }}>{label}</FormLabel>
            <Input placeholder={placeholder} />
        </div>
    );
}
