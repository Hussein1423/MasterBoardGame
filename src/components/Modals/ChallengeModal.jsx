import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Button,
  Paper,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import GavelIcon from '@mui/icons-material/Gavel';
import TimerProgress from '../Common/TimerProgress';
import { useGame } from '../../context/GameContext';

export default function ChallengeModal({ open, tile }) {
  const { state, resolveChallenge } = useGame();
  const { players, activePlayerIndex, activeModal } = state;
  const activePlayer = players[activePlayerIndex];

  // Challenge is strictly locked in state.activeModal.challenge
  const challenge = activeModal?.challenge;

  const [isAnswered, setIsAnswered] = useState(false);
  const [isTimesUp, setIsTimesUp] = useState(false);

  if (!open || !challenge) {
    return null;
  }

  const handleRefereeDecision = (isPassed) => {
    if (isAnswered) return;
    setIsAnswered(true);

    setTimeout(() => {
      resolveChallenge(
        isPassed ? challenge.points : 0,
        isPassed,
        isPassed
          ? `اجتياز تحدي السرعة (${challenge.title}) بنجاح`
          : `إخفاق في تحدي السرعة (${challenge.title})`
      );
    }, 1000);
  };

  const handleTimeUp = () => {
    if (!isTimesUp) {
      setIsTimesUp(true);
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          border: '2px solid #FFD700',
          boxShadow: '0 0 40px rgba(255, 215, 0, 0.4)',
          background: 'linear-gradient(180deg, #0F172A 0%, #070B14 100%)',
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FlashOnIcon sx={{ color: '#FFD700', fontSize: 32 }} />
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 900, color: '#FFD700' }}
              >
                ⚡ تحدي السرعة الفوري ({challenge.title})
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                الخانة: {tile?.title || ''}
              </Typography>
            </Box>
          </Box>

          <Chip
            label={`+${challenge.points} نقطة`}
            sx={{
              backgroundColor: '#FFD70022',
              color: '#FFD700',
              fontWeight: 900,
              fontSize: '0.95rem',
              border: '1px solid #FFD70066',
            }}
          />
        </Box>
      </DialogTitle>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      <DialogContent sx={{ py: 3 }}>
        {/* Top Player & Timer Banner */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Paper
            sx={{
              px: 2,
              py: 0.8,
              borderRadius: 3,
              backgroundColor: `${activePlayer?.color || '#FF7A00'}22`,
              border: `1.5px solid ${activePlayer?.color || '#FF7A00'}`,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography sx={{ fontSize: '1.2rem' }}>
              {activePlayer?.symbol}
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFFFFF' }}>
              المتحدي: {activePlayer?.name}
            </Typography>
          </Paper>

          <TimerProgress
            durationSeconds={30}
            onTimeUp={handleTimeUp}
            isActive={!isAnswered && !isTimesUp}
          />
        </Box>

        {/* Time's Up Banner */}
        {isTimesUp && !isAnswered && (
          <Alert severity="warning" sx={{ mb: 3, borderRadius: 2.5, fontWeight: 800 }}>
            ⏰ انتهت مهلة الـ 30 ثانية! بانتظار قرار الحكم للفصل في الإجابة...
          </Alert>
        )}

        {/* Challenge Core Prompt Box */}
        <Paper
          sx={{
            p: 3.5,
            mb: 3,
            borderRadius: 3,
            backgroundColor: 'rgba(255, 215, 0, 0.08)',
            border: '2px solid #FFD700',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, color: '#FFFFFF', lineHeight: 1.5 }}
          >
            {challenge.prompt}
          </Typography>
        </Paper>

        {/* Single Referee Decision Controls */}
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              mb: 2.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              color: '#00E5FF',
            }}
          >
            <GavelIcon sx={{ fontSize: 26 }} /> قرار الحكم
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2.5,
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="contained"
              color="success"
              size="large"
              disabled={isAnswered}
              onClick={() => handleRefereeDecision(true)}
              startIcon={<CheckCircleIcon sx={{ fontSize: 24 }} />}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 900,
                fontSize: '1.05rem',
                borderRadius: 3,
                boxShadow: '0 4px 16px rgba(0, 230, 118, 0.35)',
              }}
            >
              إجابة صحيحة (احتساب النقاط +{challenge.points})
            </Button>

            <Button
              variant="contained"
              color="error"
              size="large"
              disabled={isAnswered}
              onClick={() => handleRefereeDecision(false)}
              startIcon={<CancelIcon sx={{ fontSize: 24 }} />}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 900,
                fontSize: '1.05rem',
                borderRadius: 3,
                boxShadow: '0 4px 16px rgba(255, 23, 68, 0.35)',
              }}
            >
              إجابة خاطئة / لم يكتمل التحدي (0 نقاط)
            </Button>
          </Box>
        </Paper>

        {isAnswered && (
          <Alert severity="info" sx={{ mt: 2.5, borderRadius: 2, fontWeight: 800 }}>
            تم تسجيل قرار الحكم وتحديث النتيجة!
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}
