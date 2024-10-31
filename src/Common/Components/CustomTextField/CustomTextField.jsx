import { FormLabel, Input } from '@mui/joy';
import * as React from 'react';

export default function CustomTextField({ label, placeholder }) {
    return (
        <div style={{ marginBottom: '15px', width:'100%' }}>
            <FormLabel style={{ color: 'black', margin: '5px 0px'}}>{label}</FormLabel>
            <Input style={{ margin: '5px 0px', width:'100%'}} placeholder={placeholder} />
        </div>
    );
}
