import React from 'react';
import { Box } from '@mui/material';
import { DISPLAY_ROW_STYLE, MAIN_DESCRIPTION_TEXT_STYLE } from '../default/style';

const StatusDisplay = ({ statusText }) => {
    return (
        <>
            <Box sx={{
                ...DISPLAY_ROW_STYLE,
                ...{ justifyContent: 'center', }
            }}>
                <p style={MAIN_DESCRIPTION_TEXT_STYLE}>
                    {statusText}
                </p>
            </Box>
        </>
    );
}

export default StatusDisplay;