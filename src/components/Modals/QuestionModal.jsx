import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Chip,
  Divider,
  Alert,
  TextField,
} from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpIcon from '@mui/icons-material/Help';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SecurityIcon from '@mui/icons-material/Security';
import SendIcon from '@mui/icons-material/Send';
import TimerProgress from '../Common/TimerProgress';
import { useGame } from '../../context/GameContext';
import { soundEffects } from '../../utils/soundEffects';

// Helper function to normalize Arabic text for forgiving comparison
function normalizeArabic(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[\u064B-\u065F]/g, '') // remove arabic diacritics
    .replace(/[^a-zA-Z0-9\u0621-\u064A]/g, ''); // remove punctuation/spaces
}

export default function QuestionModal({ open, tile }) {
  const { state, dispatch, resolveQuiz, deflectQuestion } = useGame();
  const { players, activePlayerIndex, activeModal } = state;
  const activePlayer = players[activePlayerIndex];
  const opponentIdx = 1 - activePlayerIndex;
  const opponent = players[opponentIdx];

  // The active question is strictly locked in state.activeModal.question
  const questionItem = activeModal?.question;

  const [selectedOption, setSelectedOption] = useState(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [typedFeedback, setTypedFeedback] = useState(null); // { isCorrect, message }
  const [isAnswered, setIsAnswered] = useState(false);
  const [isTimesUp, setIsTimesUp] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hintsUsedCount, setHintsUsedCount] = useState(0); // 0, 1, or 2
  const [deflectedToPlayerIdx, setDeflectedToPlayerIdx] = useState(null);
  const [shieldBlockedNotice, setShieldBlockedNotice] = useState(null);

  // Strict null safety check
  if (!open || !questionItem || !questionItem.data) {
    return null;
  }

  // Defensive array and object fallbacks
  const options = Array.isArray(questionItem?.data?.options)
    ? questionItem.data.options
    : [];
  const initialHint =
    questionItem?.data?.initialHint ||
    (Array.isArray(questionItem?.data?.clues)
      ? questionItem.data.clues[0]
      : '');
  const additionalHints = Array.isArray(questionItem?.data?.additionalHints)
    ? questionItem.data.additionalHints
    : Array.isArray(questionItem?.data?.clues)
    ? questionItem.data.clues.slice(1)
    : [];
  const avatarConfig = questionItem?.data?.avatarConfig || {
    symbol: '❓',
    color: '#00E5FF',
    hairStyle: '',
  };

  // Base Points & Dynamic Points with 50% progressive penalty on hint reveals
  const basePoints =
    questionItem.data.basePoints ||
    questionItem.data.points ||
    100;

  // Calculate current effective points: basePoints * (0.5 ^ hintsUsedCount)
  const effectivePoints =
    questionItem.kind === 'SILHOUETTE'
      ? Math.round(basePoints * Math.pow(0.5, hintsUsedCount))
      : basePoints;

  // Timer duration calculation: 60s default, 30s if halfTime debuff, +30s if bonusTime
  let duration = 60;
  if (activePlayer?.debuffs?.halfTime) duration = 30;
  if (activePlayer?.inventory?.bonusTime) duration += 30;

  const answeringPlayer =
    deflectedToPlayerIdx !== null
      ? players[deflectedToPlayerIdx]
      : activePlayer;

  const handleMCQSelect = (optionIdx) => {
    if (isAnswered || isTimesUp) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const isCorrect = optionIdx === questionItem.data.correctIndex;
    const pts = effectivePoints;

    setTimeout(() => {
      if (deflectedToPlayerIdx !== null) {
        if (isCorrect) {
          // If targeted opponent answers CORRECTLY:
          // Player who used deflection card gets FULL points (+pts); Target opponent gets 0 points
          soundEffects.playSuccess();
          dispatch({
            type: 'ADD_POINTS',
            payload: {
              playerIndex: activePlayerIndex,
              points: pts,
              reason: `مكافأة نجاح تحويل السؤال (${answeringPlayer.name} أجاب بشكل صحيح)`,
            },
          });
          dispatch({ type: 'NEXT_TURN' });
        } else {
          // If targeted opponent FAILS:
          // Target opponent loses HALF points (-0.5 * pts); Player who used deflection card gets 0 points
          soundEffects.playFail();
          const penaltyPoints = Math.round(pts * 0.5);
          dispatch({
            type: 'DEDUCT_POINTS',
            payload: {
              playerIndex: deflectedToPlayerIdx,
              points: penaltyPoints,
              reason: `إخفاق في إجابة سؤال محوّل (-${penaltyPoints})`,
            },
          });
          dispatch({ type: 'NEXT_TURN' });
        }
      } else {
        resolveQuiz(pts, isCorrect, `سؤال أنمي (${questionItem.data.anime || ''})`);
      }
    }, 1800);
  };

  const handleDirectVerdict = (isCorrect) => {
    if (isAnswered || isTimesUp) return;
    setIsAnswered(true);
    const pts = effectivePoints;

    setTimeout(() => {
      if (deflectedToPlayerIdx !== null) {
        if (isCorrect) {
          // If targeted opponent answers CORRECTLY:
          // Player who used deflection card gets FULL points (+pts); Target opponent gets 0 points
          soundEffects.playSuccess();
          dispatch({
            type: 'ADD_POINTS',
            payload: {
              playerIndex: activePlayerIndex,
              points: pts,
              reason: `مكافأة نجاح تحويل السؤال (${answeringPlayer.name} أجاب بشكل صحيح)`,
            },
          });
          dispatch({ type: 'NEXT_TURN' });
        } else {
          // If targeted opponent FAILS:
          // Target opponent loses HALF points (-0.5 * pts); Player who used deflection card gets 0 points
          soundEffects.playFail();
          const penaltyPoints = Math.round(pts * 0.5);
          dispatch({
            type: 'DEDUCT_POINTS',
            payload: {
              playerIndex: deflectedToPlayerIdx,
              points: penaltyPoints,
              reason: `إخفاق في إجابة سؤال محوّل (-${penaltyPoints})`,
            },
          });
          dispatch({ type: 'NEXT_TURN' });
        }
      } else {
        resolveQuiz(
          pts,
          isCorrect,
          `سؤال أنمي (${questionItem.data.anime || ''})`
        );
      }
    }, 1200);
  };

  // Text input submission handler for Silhouette
  const handleTextAnswerSubmit = () => {
    if (isAnswered || isTimesUp || !typedAnswer.trim()) return;

    const normInput = normalizeArabic(typedAnswer);
    const normTarget1 = normalizeArabic(questionItem.data.correctAnswer);
    const normTarget2 = normalizeArabic(questionItem.data.characterName);

    const isMatch =
      (normInput.length > 2 && normTarget1.includes(normInput)) ||
      (normInput.length > 2 && normTarget2.includes(normInput)) ||
      normInput === normTarget1;

    if (isMatch) {
      setTypedFeedback({ isCorrect: true, message: '🎉 إجابة صحيحة وممتازة!' });
      setIsRevealed(true);
      handleDirectVerdict(true);
    } else {
      setTypedFeedback({
        isCorrect: false,
        message: '❌ لم يتم التعرف على الاسم، حاول مرة أخرى أو استخدم زر كشف الإجابة والتحكيم!',
      });
    }
  };

  const handleTimeUp = () => {
    if (isAnswered || isTimesUp) return;
    setIsTimesUp(true);
    setIsAnswered(true);

    setTimeout(() => {
      if (deflectedToPlayerIdx !== null) {
        // Targeted opponent ran out of time: loses HALF points (-0.5 * pts); deflecting player gets 0 points
        soundEffects.playFail();
        const pts = effectivePoints;
        const penaltyPoints = Math.round(pts * 0.5);
        dispatch({
          type: 'DEDUCT_POINTS',
          payload: {
            playerIndex: deflectedToPlayerIdx,
            points: penaltyPoints,
            reason: `انتهاء الوقت لسؤال محوّل (-${penaltyPoints})`,
          },
        });
        dispatch({ type: 'NEXT_TURN' });
      } else {
        resolveQuiz(0, false, 'انتهى الوقت المحدد للسؤال');
      }
    }, 1500);
  };

  const handleDeflect = (targetIdx) => {
    const result = deflectQuestion(targetIdx);
    if (result?.blockedByShield) {
      setShieldBlockedNotice(
        `🛡️ تم استخدام درع الحماية لصد تحويل السؤال من قِبل ${result.targetName}! يعود السؤال إليك للإجابة عليه.`
      );
      setDeflectedToPlayerIdx(null);
    } else {
      setDeflectedToPlayerIdx(targetIdx);
      setShieldBlockedNotice(null);
    }
  };

  const handleRevealNextHint = () => {
    if (hintsUsedCount < additionalHints.length) {
      setHintsUsedCount((prev) => prev + 1);
    }
  };

  // Silhouette Visual Obscurity Filter calculation
  let silhouetteFilter = 'brightness(0) blur(6px) drop-shadow(0px 0px 8px #000)';
  if (isRevealed) {
    silhouetteFilter = 'none';
  } else if (hintsUsedCount === 1) {
    silhouetteFilter = 'brightness(0) blur(2px) drop-shadow(0px 0px 6px #00E5FF)';
  } else if (hintsUsedCount >= 2) {
    silhouetteFilter = 'brightness(0.65) blur(0px) drop-shadow(0px 0px 10px #00E5FF)';
  }

  const zoneBossTitle = tile?.zone?.bossTitle || '⚔️ مواجهة أنمي كبرى';

  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          border: `2px solid ${activePlayer?.color || '#FF7A00'}`,
          boxShadow: `0 0 50px ${activePlayer?.color || '#FF7A00'}66, inset 0 0 30px rgba(0,0,0,0.8)`,
          background: 'linear-gradient(180deg, #0D1322 0%, #060913 100%)',
          overflow: 'hidden',
        },
      }}
    >
      {/* Anime Boss Battle Header Banner */}
      <Box
        sx={{
          p: 2.2,
          px: 3,
          background: `linear-gradient(90deg, rgba(255, 122, 0, 0.25) 0%, rgba(0, 229, 255, 0.2) 100%)`,
          borderBottom: `2px solid ${activePlayer?.color || '#FF7A00'}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2.5,
              backgroundColor: '#00E5FF22',
              border: '2px solid #00E5FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(0, 229, 255, 0.5)',
            }}
          >
            <QuizIcon sx={{ color: '#00E5FF', fontSize: 28 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                color: '#FFFFFF',
                textShadow: '0 0 15px #00E5FF',
                lineHeight: 1.2,
              }}
            >
              {zoneBossTitle}
            </Typography>
            <Typography variant="caption" sx={{ color: '#00E5FF', fontWeight: 700 }}>
              {questionItem.kind === 'MCQ'
                ? 'سؤال خيارات من متعدد (MCQ)'
                : questionItem.kind === 'SILHOUETTE'
                ? 'خمن الشخصية من الظل والتلميحات'
                : 'سؤال أنمي مباشر (Direct)'}
              {' • '}أنمي: {questionItem.data.anime || ''} • الخانة {tile?.number} ({tile?.title || ''})
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {activePlayer?.inventory?.doublePoints && (
            <Chip
              icon={<LocalFireDepartmentIcon sx={{ color: '#FF7A00 !important' }} />}
              label="مضاعفة النقاط 2x مفعلة!"
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 122, 0, 0.25)',
                color: '#FF7A00',
                border: '1px solid #FF7A00',
                fontWeight: 900,
              }}
            />
          )}
          <Chip
            label={`+${effectivePoints} نقطة`}
            sx={{
              backgroundColor:
                hintsUsedCount > 0 ? 'rgba(255, 215, 0, 0.25)' : '#00E5FF28',
              color: hintsUsedCount > 0 ? '#FFD700' : '#00E5FF',
              border: hintsUsedCount > 0 ? '1.5px solid #FFD700' : '1.5px solid #00E5FF',
              fontWeight: 900,
              fontSize: '1rem',
              boxShadow: hintsUsedCount > 0 ? '0 0 15px rgba(255, 215, 0, 0.5)' : '0 0 15px rgba(0, 229, 255, 0.5)',
            }}
          />
        </Box>
      </Box>

      <DialogContent sx={{ py: 3, position: 'relative' }}>
        {/* Shield Block Notice */}
        {shieldBlockedNotice && (
          <Alert
            icon={<SecurityIcon sx={{ color: '#00E676' }} />}
            severity="info"
            sx={{
              mb: 3,
              borderRadius: 3,
              fontWeight: 900,
              backgroundColor: 'rgba(0, 230, 118, 0.15)',
              border: '1.5px solid #00E676',
              color: '#00E676',
            }}
          >
            {shieldBlockedNotice}
          </Alert>
        )}

        {/* Answering Player & Timer Row */}
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Paper
              sx={{
                px: 2.2,
                py: 1,
                borderRadius: 3,
                backgroundColor: `${answeringPlayer?.color || '#FF7A00'}22`,
                border: `2px solid ${answeringPlayer?.color || '#FF7A00'}`,
                boxShadow: `0 0 16px ${answeringPlayer?.color || '#FF7A00'}44`,
                display: 'flex',
                alignItems: 'center',
                gap: 1.2,
              }}
            >
              <Typography sx={{ fontSize: '1.4rem' }}>
                {answeringPlayer?.symbol}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 900, color: '#FFFFFF' }}
              >
                المجيب: {answeringPlayer?.name}{' '}
                {deflectedToPlayerIdx !== null && '(تم تحويل السؤال إليه!)'}
              </Typography>
            </Paper>
          </Box>

          {/* Countdown Timer */}
          <TimerProgress
            durationSeconds={duration}
            onTimeUp={handleTimeUp}
            isActive={!isAnswered && !isTimesUp}
          />
        </Box>

        {/* Time's Up Banner */}
        {isTimesUp && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2.5, fontWeight: 900, fontSize: '1rem' }}>
            ⏰ انتهى الوقت المحدد! جاري معالجة النتيجة وتحويل الدور...
          </Alert>
        )}

        {/* Direct 1v1 Deflect Button */}
        {activePlayer?.inventory?.deflections > 0 &&
          deflectedToPlayerIdx === null &&
          !opponent?.hasFinished &&
          !isAnswered &&
          !isTimesUp && (
            <Paper
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 3,
                backgroundColor: 'rgba(224, 64, 251, 0.15)',
                border: '1.5px solid rgba(224, 64, 251, 0.5)',
                boxShadow: '0 0 20px rgba(224, 64, 251, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1.5,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FlipCameraAndroidIcon sx={{ color: '#E040FB' }} />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 800, color: '#E040FB' }}
                >
                  لديك مرآة تحويل! هل ترغب في تحويل السؤال لمنافسك {opponent.name}؟
                </Typography>
              </Box>
              <Button
                size="medium"
                variant="contained"
                onClick={() => handleDeflect(opponentIdx)}
                sx={{
                  backgroundColor: opponent.color,
                  color: '#FFFFFF',
                  fontWeight: 900,
                  borderRadius: 3,
                  px: 3,
                  py: 1,
                  boxShadow: `0 0 15px ${opponent.color}66`,
                  '&:hover': {
                    backgroundColor: opponent.color,
                    filter: 'brightness(1.15)',
                    boxShadow: `0 0 20px ${opponent.color}`,
                  },
                }}
              >
                تحويل السؤال إلى {opponent.name} {opponent.inventory?.shields > 0 ? '🛡️' : ''}
              </Button>
            </Paper>
          )}

        {/* --- TYPE 1: MCQ QUESTION --- */}
        {questionItem.kind === 'MCQ' && (
          <Box>
            <Paper
              sx={{
                p: 2.5,
                mb: 3,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 900, lineHeight: 1.6, color: '#FFFFFF' }}
              >
                {questionItem.data.question}
              </Typography>
            </Paper>

            {options.length > 0 && (
              <Grid container spacing={2}>
                {options.map((option, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isCorrect = optIdx === questionItem.data.correctIndex;

                  let btnBg = 'rgba(255, 255, 255, 0.04)';
                  let btnBorder = 'rgba(255, 255, 255, 0.12)';
                  if (isAnswered) {
                    if (isCorrect) {
                      btnBg = 'rgba(0, 230, 118, 0.3)';
                      btnBorder = '#00E676';
                    } else if (isSelected) {
                      btnBg = 'rgba(255, 23, 68, 0.3)';
                      btnBorder = '#FF1744';
                    }
                  }

                  const isInteractive = !isAnswered && !isTimesUp;

                  return (
                    <Grid item xs={12} sm={6} key={optIdx}>
                      <Paper
                        onClick={() => isInteractive && handleMCQSelect(optIdx)}
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          cursor: isInteractive ? 'pointer' : 'default',
                          backgroundColor: btnBg,
                          border: `2px solid ${btnBorder}`,
                          opacity: isTimesUp && !isCorrect ? 0.6 : 1,
                          boxShadow: isAnswered && isCorrect ? '0 0 20px rgba(0, 230, 118, 0.5)' : 'none',
                          transition: 'all 0.25s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          '&:hover': {
                            transform: isInteractive ? 'scale(1.02) translateY(-2px)' : 'none',
                            borderColor: isInteractive ? '#00E5FF' : btnBorder,
                            boxShadow: isInteractive ? '0 0 15px rgba(0, 229, 255, 0.4)' : 'none',
                          },
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 800 }}>
                          {optIdx + 1}. {option}
                        </Typography>
                        {isAnswered && isCorrect && (
                          <CheckCircleIcon sx={{ color: '#00E676', filter: 'drop-shadow(0 0 6px #00E676)' }} />
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <CancelIcon sx={{ color: '#FF1744', filter: 'drop-shadow(0 0 6px #FF1744)' }} />
                        )}
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            )}

            {isAnswered && !isTimesUp && (
              <Alert
                severity={
                  selectedOption === questionItem.data.correctIndex
                    ? 'success'
                    : 'error'
                }
                sx={{ mt: 3, borderRadius: 3, fontWeight: 800 }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                  {selectedOption === questionItem.data.correctIndex
                    ? '🎉 إجابة شينوبي صحيحة!'
                    : '❌ إجابة خاطئة!'}
                </Typography>
                {questionItem.data.explanation && (
                  <Typography variant="body2">{questionItem.data.explanation}</Typography>
                )}
              </Alert>
            )}
          </Box>
        )}

        {/* --- TYPE 2: SILHOUETTE QUESTION WITH HOLOGRAPHIC SCANLINES --- */}
        {questionItem.kind === 'SILHOUETTE' && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 900, mb: 1.5 }}>
              {questionItem.data.question || 'من هي هذه الشخصية؟'}
            </Typography>

            {/* Penalty Status Badges */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.2, mb: 2.5 }}>
              <Chip
                label={`النقاط الأساسية: ${basePoints} نقطة`}
                size="small"
                variant="outlined"
                sx={{ color: '#94A3B8', borderColor: 'rgba(255,255,255,0.2)', fontWeight: 800 }}
              />
              <Chip
                label={
                  hintsUsedCount === 0
                    ? '⚡ 100% النقاط (بدون خصم)'
                    : hintsUsedCount === 1
                    ? '⚠️ خصم 50% (تلميح 1 مستخدم)'
                    : '☠️ خصم 75% (تلميحان مستخدمان)'
                }
                size="small"
                sx={{
                  backgroundColor:
                    hintsUsedCount === 0
                      ? 'rgba(0, 230, 118, 0.2)'
                      : 'rgba(255, 122, 0, 0.25)',
                  color: hintsUsedCount === 0 ? '#00E676' : '#FF7A00',
                  border: `1px solid ${hintsUsedCount === 0 ? '#00E676' : '#FF7A00'}`,
                  fontWeight: 900,
                }}
              />
            </Box>

            {/* Holographic Frame Box with Cyber Scanlines */}
            <Box
              className="hologram-box"
              sx={{
                width: 150,
                height: 150,
                mx: 'auto',
                mb: 3,
                borderRadius: 4,
                backgroundColor: 'rgba(0, 229, 255, 0.04)',
                border: `2.5px solid ${isRevealed ? '#00E5FF' : avatarConfig.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: isRevealed
                  ? `0 0 35px #00E5FF, inset 0 0 20px rgba(0, 229, 255, 0.4)`
                  : hintsUsedCount > 0
                  ? `0 0 25px ${avatarConfig.color}88, inset 0 0 15px ${avatarConfig.color}33`
                  : '0 0 20px rgba(0, 0, 0, 0.8)',
                transition: 'all 0.5s ease',
              }}
            >
              <Typography
                sx={{
                  fontSize: '5rem',
                  lineHeight: 1,
                  filter: silhouetteFilter,
                  transition: 'filter 0.5s ease',
                }}
              >
                {avatarConfig.symbol}
              </Typography>
            </Box>

            {/* Progressive Hints List */}
            <Box sx={{ textAlign: 'right', mb: 3, maxWidth: 620, mx: 'auto' }}>
              {initialHint && (
                <Paper
                  sx={{
                    p: 1.8,
                    mb: 1.5,
                    borderRadius: 3,
                    backgroundColor: 'rgba(0, 229, 255, 0.08)',
                    border: '1.5px solid rgba(0, 229, 255, 0.4)',
                    boxShadow: '0 0 15px rgba(0, 229, 255, 0.15)',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 900, color: '#00E5FF' }}>
                    💡 التلميح المبدئي (مكافأة 100%):
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5 }}>
                    {initialHint}
                  </Typography>
                </Paper>
              )}

              {additionalHints.slice(0, hintsUsedCount).map((hint, idx) => (
                <Paper
                  key={idx}
                  sx={{
                    p: 1.8,
                    mb: 1.5,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    border: '1.5px solid rgba(255, 215, 0, 0.5)',
                    boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 900, color: '#FFD700' }}>
                    🔍 التلميح الإضافي {idx + 1} (خصم {idx === 0 ? '50%' : '75%'} من النقاط):
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5 }}>
                    {hint}
                  </Typography>
                </Paper>
              ))}

              {!isRevealed &&
                !isTimesUp &&
                hintsUsedCount < additionalHints.length && (
                  <Box sx={{ textAlign: 'center', mt: 1.5 }}>
                    <Button
                      size="medium"
                      variant="outlined"
                      color="warning"
                      onClick={handleRevealNextHint}
                      startIcon={<HelpIcon />}
                      sx={{
                        fontWeight: 900,
                        borderRadius: 3,
                        borderColor: '#FFD700',
                        color: '#FFD700',
                        px: 3,
                        py: 1,
                        '&:hover': {
                          borderColor: '#FFE57F',
                          backgroundColor: 'rgba(255, 215, 0, 0.15)',
                          boxShadow: '0 0 15px rgba(255, 215, 0, 0.4)',
                        },
                      }}
                    >
                      كشف تلميح {hintsUsedCount + 1} (يخصم 50% من النقاط) 🔍
                    </Button>
                  </Box>
                )}
            </Box>

            {/* Input & Reveal Controls */}
            {!isRevealed ? (
              <Box sx={{ maxWidth: 540, mx: 'auto', mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                  <TextField
                    fullWidth
                    size="medium"
                    placeholder="اكتب اسم الشخصية هنا..."
                    value={typedAnswer}
                    onChange={(e) => {
                      setTypedAnswer(e.target.value);
                      if (typedFeedback) setTypedFeedback(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleTextAnswerSubmit();
                      }
                    }}
                    disabled={isAnswered || isTimesUp}
                    InputProps={{
                      sx: { borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.06)' },
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleTextAnswerSubmit}
                    disabled={isAnswered || isTimesUp || !typedAnswer.trim()}
                    endIcon={<SendIcon sx={{ transform: 'rotate(180deg)' }} />}
                    sx={{ px: 3.5, fontWeight: 900, borderRadius: 3, minWidth: 120 }}
                  >
                    تأكيد
                  </Button>
                </Box>

                {typedFeedback && (
                  <Alert
                    severity={typedFeedback.isCorrect ? 'success' : 'warning'}
                    sx={{ mb: 2, borderRadius: 3, textAlign: 'right', fontWeight: 800 }}
                  >
                    {typedFeedback.message}
                  </Alert>
                )}

                <Divider sx={{ my: 2.5, borderColor: 'rgba(255,255,255,0.12)' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                    أو
                  </Typography>
                </Divider>

                <Button
                  variant="outlined"
                  color="secondary"
                  disabled={isTimesUp}
                  onClick={() => setIsRevealed(true)}
                  startIcon={<VisibilityIcon />}
                  sx={{ px: 4, py: 1.4, fontWeight: 900, borderRadius: 3, fontSize: '1rem' }}
                >
                  كشف الإجابة والتحكيم المباشر (Reveal)
                </Button>
              </Box>
            ) : (
              <Box sx={{ maxWidth: 560, mx: 'auto' }}>
                <Paper
                  sx={{
                    p: 2.5,
                    mb: 3,
                    borderRadius: 3,
                    backgroundColor: 'rgba(0, 229, 255, 0.12)',
                    border: '2px solid #00E5FF',
                    boxShadow: '0 0 25px rgba(0, 229, 255, 0.3)',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 900, color: '#00E5FF', mb: 0.5 }}
                  >
                    الشخصية: {questionItem.data.characterName || questionItem.data.correctAnswer}
                  </Typography>
                  {avatarConfig.hairStyle && (
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', display: 'block', fontWeight: 600 }}
                    >
                      المظهر: {avatarConfig.hairStyle}
                    </Typography>
                  )}
                </Paper>

                {!isAnswered && !isTimesUp && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2.5 }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleDirectVerdict(true)}
                      startIcon={<CheckCircleIcon />}
                      sx={{ px: 4, py: 1.5, fontWeight: 900, borderRadius: 3, fontSize: '1.05rem' }}
                    >
                      إجابة صحيحة (+{effectivePoints} نقطة)
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDirectVerdict(false)}
                      startIcon={<CancelIcon />}
                      sx={{ px: 4, py: 1.5, fontWeight: 900, borderRadius: 3, fontSize: '1.05rem' }}
                    >
                      إجابة خاطئة (0 نقاط)
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        )}

        {/* --- TYPE 3: DIRECT QUESTIONS --- */}
        {questionItem.kind === 'DIRECT' && (
          <Box>
            <Paper
              sx={{
                p: 2.5,
                mb: 3,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 900, mb: 1, lineHeight: 1.6, color: '#FFFFFF' }}
              >
                {questionItem.data.question}
              </Typography>
            </Paper>

            {!isRevealed ? (
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={isTimesUp}
                  onClick={() => setIsRevealed(true)}
                  startIcon={<VisibilityIcon />}
                  sx={{ px: 5, py: 1.5, fontWeight: 900, borderRadius: 3, fontSize: '1.1rem' }}
                >
                  إظهار الإجابة النموذجية
                </Button>
              </Box>
            ) : (
              <Box>
                <Paper
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 3,
                    backgroundColor: 'rgba(0, 229, 255, 0.12)',
                    border: '2px solid #00E5FF',
                    boxShadow: '0 0 25px rgba(0, 229, 255, 0.25)',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 900, color: '#00E5FF', mb: 1 }}
                  >
                    الإجابة النموذجية:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 800, mb: 1 }}>
                    {questionItem.data.answer}
                  </Typography>
                  {questionItem.data.explanation && (
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', display: 'block', fontWeight: 600 }}
                    >
                      {questionItem.data.explanation}
                    </Typography>
                  )}
                </Paper>

                {!isAnswered && !isTimesUp && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2.5 }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleDirectVerdict(true)}
                      startIcon={<CheckCircleIcon />}
                      sx={{ px: 4, py: 1.5, fontWeight: 900, borderRadius: 3, fontSize: '1.05rem' }}
                    >
                      إجابة صحيحة (+{effectivePoints} نقطة)
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDirectVerdict(false)}
                      startIcon={<CancelIcon />}
                      sx={{ px: 4, py: 1.5, fontWeight: 900, borderRadius: 3, fontSize: '1.05rem' }}
                    >
                      إجابة خاطئة (0 نقاط)
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
