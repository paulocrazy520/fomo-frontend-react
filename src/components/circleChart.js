import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { BLACK_DEFAULT_COLOR } from '../default/color';

const CircleChart = ({ value1, value2, title, color1, color2, size }) => {
    return (
        <>
            <Box sx={{
                width: `${size}px`,
                height: `${size}px`,
                position: 'relative'
            }}>
                <CircularProgress value={100 * value1 / (value1 + value2)}
                    variant='determinate'
                    color='primary'
                    size={size}
                    thickness={2}
                    sx={{
                        position: 'absolute',
                        color: color1,
                    }}
                />
                <CircularProgress value={- 100 * value2 / (value1 + value2)}
                    variant='determinate'
                    color='warning'
                    size={size}
                    thickness={2}
                    sx={{
                        position: 'absolute',
                        color: color2,
                    }}
                />
                <Box sx={{
                    ...DISPLAY_COLUMN_STYLE,
                    ...{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }
                }}>
                    <Typography sx={{
                        color: color1,
                        fontSize: `${size / 8}px`,
                        fontWeight: '700',
                    }}>
                        {title}
                    </Typography>
                    <Typography sx={{
                        fontSize: `${size / 12}px`,
                        fontColor: BLACK_DEFAULT_COLOR,
                    }}>
                        {`${value1} / ${value1 + value2} (${parseFloat(100 * value1 / (value1 + value2)).toFixed(2)}%)`}
                    </Typography>
                </Box>
            </Box>
        </>
    );
}

export default CircleChart;