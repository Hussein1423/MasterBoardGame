import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function TimerProgress({
  durationSeconds,
  onTimeUp,
  isActive = true,
}) {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const hasFiredRef = useRef(false);

  useEffect(() => {
    setTimeLeft(durationSeconds);
    hasFiredRef.current = false;
  }, [durationSeconds]);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      if (!hasFiredRef.current) {
        hasFiredRef.current = true;
        if (onTimeUp) onTimeUp();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!hasFiredRef.current) {
            hasFiredRef.current = true;
            if (onTimeUp) onTimeUp();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isActive, onTimeUp]);

  const percentage = (timeLeft / durationSeconds) * 100;

  // Determine color based on time remaining
  let color = '#00E5FF';
  let glow = '0 0 10px rgba(0, 229, 255, 0.4)';
  if (percentage <= 25) {
    color = '#FF1744';
    glow = '0 0 15px rgba(255, 23, 68, 0.7)';
  } else if (percentage <= 50) {
    color = '#FFD700';
    glow = '0 0 12px rgba(255, 215, 0, 0.5)';
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={56}
          thickness={4.5}
          sx={{ color: 'rgba(255, 255, 255, 0.1)' }}
        />
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={56}
          thickness={4.5}
          sx={{
            color,
            position: 'absolute',
            left: 0,
            filter: glow,
            transition: 'stroke-dashoffset 0.5s ease 0s',
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            sx={{
              fontWeight: 900,
              fontSize: '1rem',
              color: timeLeft <= 5 ? '#FF1744' : '#FFFFFF',
              animation: timeLeft <= 5 ? 'pulse 0.6s infinite' : 'none',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.2)' },
                '100%': { transform: 'scale(1)' },
              },
            }}
          >
            {timeLeft}s
          </Typography>
        </Box>
      </Box>

      <Box>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <AccessTimeIcon sx={{ fontSize: 16, color }} /> الوقت المتبقي
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: timeLeft <= 10 ? 'error.main' : 'text.primary',
            fontWeight: 700,
          }}
        >
          {timeLeft === 0
            ? '⏰ انتهى الوقت!'
            : timeLeft <= 5
            ? '⚡ أسرع! أوشك الوقت على النفاد!'
            : `${timeLeft} ثانية`}
        </Typography>
      </Box>
    </Box>
  );
}
