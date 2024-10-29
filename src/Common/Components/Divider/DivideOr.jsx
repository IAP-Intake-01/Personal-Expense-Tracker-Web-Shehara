import { Box, Divider, Typography, FormLabel, Button, Input } from '@mui/joy';

export default function DividerOr() {
    return (
        <Box display="flex" alignItems="center" my={2} style={{ marginTop: '30px' }}>
            <Divider style={{ flexGrow: 1 }} />
            <Typography variant="body2" color="textSecondary" style={{ marginTop: '-12px' }}>
                OR
            </Typography>
            <Divider style={{ flexGrow: 1 }} />
        </Box>
    )
}