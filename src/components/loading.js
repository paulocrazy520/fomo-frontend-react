import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { RED_DEFAULT_COLOR } from '../default/color';
import { DISPLAY_ROW_STYLE } from '../default/style';

const Loading = () => {
    return (
        <>
            <Box sx={{
                ...DISPLAY_ROW_STYLE,
                ...{
                    justifyContent: 'center',
                }
            }}>
                <CircularProgress sx={{ color: RED_DEFAULT_COLOR, }} />
            </Box>
        </>
    );
}

export default Loading;