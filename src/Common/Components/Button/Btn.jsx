import { Button } from '@mui/joy';
import React from 'react';

export default function Btn({ name, onClick }) {
    return (
        <Button
            variant="solid"
            color="primary"
            onClick={onClick}
            style={{ marginTop: '20px', width: '100%' }}
        >
            {name}
        </Button>
    );
}
