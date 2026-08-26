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
  InputAdornment,
} from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpIcon from '@mui/icons-material/Help';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SendIcon from '@mui/icons-material/Send';
import TimerProgress from '../Common/TimerProgress';
import { useGame } from '../../context/GameContext';

// Helper function to normalize Arabic text for forgiving comparison
function normalizeArabic(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[\u064B-\u065F]/g, '') // remove arabic tashkeel/diacritics
    .replace(/[^a-zA-Z0-9\u0621-\u064A]/g, ''); // remove punctuation/spaces
}

export default function QuestionModal({ open, tile }) {
  const { state, dispatch, resolveQuiz, deflectQuestion } = useGame();
  const { players, activePlayerIndex, activeModal } = state;
  const activePlayer = players[activePlayerIndex];

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
    (questionItem.kind === 'MCQ' ? 0.5 : 3);

  // Calculate current effective points: basePoints * (0.5 ^ hintsUsedCount)
  const effectivePoints =
    questionItem.kind === 'SILHOUETTE'
      ? parseFloat((basePoints * Math.pow(0.5, hintsUsedCount)).toFixed(2))
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
          resolveQuiz(
            1,
            true,
            `إجابة صحيحة من ${answeringPlayer.name} المحوّل له السؤال`,
            activePlayerIndex
          );
        } else {
          resolveQuiz(
            0,
            false,
            `إجابة خاطئة من ${answeringPlayer.name} المحوّل له السؤال`,
            activePlayerIndex
          );
          dispatch({
            type: 'DEDUCT_POINTS',
            payload: {
              playerIndex: deflectedToPlayerIdx,
              points: 1,
              reason: 'فشل في سؤال محوّل',
            },
          });
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
          resolveQuiz(
            1,
            true,
            `إجابة صحيحة من ${answeringPlayer.name} المحوّل له السؤال`,
            activePlayerIndex
          );
        } else {
          resolveQuiz(
            0,
            false,
            `إجابة خاطئة من ${answeringPlayer.name} المحوّل له السؤال`,
            activePlayerIndex
          );
          dispatch({
            type: 'DEDUCT_POINTS',
            payload: {
              playerIndex: deflectedToPlayerIdx,
              points: 1,
              reason: 'فشل في سؤال محوّل',
            },
          });
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
      resolveQuiz(0, false, 'انتهى الوقت المحدد للسؤال');
    }, 1500);
  };

  const handleDeflect = (targetIdx) => {
    deflectQuestion(targetIdx);
    setDeflectedToPlayerIdx(targetIdx);
  };

  const handleRevealNextHint = () => {
    if (hintsUsedCount < additionalHints.length) {
      setHintsUsedCount((prev) => prev + 1);
    }
  };

  // Silhouette Visual Obscurity Filter calculation
  let silhouetteFilter = 'brightness(0) blur(5px) drop-shadow(0px 0px 4px #000)';
  if (isRevealed) {
    silhouetteFilter = 'none';
  } else if (hintsUsedCount === 1) {
    silhouetteFilter = 'brightness(0) blur(1.5px) drop-shadow(0px 0px 4px #000)';
  } else if (hintsUsedCount >= 2) {
    silhouetteFilter = 'brightness(0.6) blur(0px) drop-shadow(0px 0px 6px #00E5FF)';
  }

  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          border: `2px solid ${activePlayer?.color || '#FF7A00'}`,
          boxShadow: `0 0 40px ${activePlayer?.color || '#FF7A00'}55`,
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
            <QuizIcon sx={{ color: '#00E5FF', fontSize: 32 }} />
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 900, color: '#00E5FF' }}
              >
                {questionItem.kind === 'MCQ'
                  ? 'سؤال خيارات من متعدد (MCQ)'
                  : questionItem.kind === 'SILHOUETTE'
                  ? 'خمن الشخصية (Silhouette)'
                  : 'سؤال أنمي مباشر (Direct)'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                أنمي: {questionItem.data.anime || ''} • الخانة: {tile?.title || ''}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {activePlayer?.inventory?.doublePoints && (
              <Chip
                icon={
                  <LocalFireDepartmentIcon
                    sx={{ color: '#FF7A00 !important' }}
                  />
                }
                label="مضاعفة النقاط 2x مفعلة!"
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 122, 0, 0.2)',
                  color: '#FF7A00',
                  fontWeight: 800,
                }}
              />
            )}
            <Chip
              label={`+${effectivePoints} نقطة`}
              sx={{
                backgroundColor:
                  hintsUsedCount > 0 ? 'rgba(255, 215, 0, 0.2)' : '#00E5FF22',
                color: hintsUsedCount > 0 ? '#FFD700' : '#00E5FF',
                border: hintsUsedCount > 0 ? '1px solid #FFD700' : 'none',
                fontWeight: 900,
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
              }}
            />
          </Box>
        </Box>
      </DialogTitle>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      <DialogContent sx={{ py: 3 }}>
        {/* Answering Player Banner */}
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
                px: 2,
                py: 0.8,
                borderRadius: 3,
                backgroundColor: `${answeringPlayer?.color || '#FF7A00'}22`,
                border: `1.5px solid ${answeringPlayer?.color || '#FF7A00'}`,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography sx={{ fontSize: '1.2rem' }}>
                {answeringPlayer?.symbol}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 800, color: '#FFFFFF' }}
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
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2.5, fontWeight: 800 }}>
            ⏰ انتهى الوقت المحدد! لم يتم احتساب أي نقاط، جاري تحويل الدور...
          </Alert>
        )}

        {/* Deflect Question Option if Available and not yet deflected */}
        {activePlayer?.inventory?.deflections > 0 &&
          deflectedToPlayerIdx === null &&
          !isAnswered &&
          !isTimesUp && (
            <Paper
              sx={{
                p: 1.5,
                mb: 3,
                borderRadius: 2.5,
                backgroundColor: 'rgba(224, 64, 251, 0.12)',
                border: '1px solid rgba(224, 64, 251, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FlipCameraAndroidIcon sx={{ color: '#E040FB' }} />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: '#E040FB' }}
                >
                  لديك مرآة تحويل! هل ترغب في توجيه هذا السؤال لأحد منافسيك؟
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {players
                  .map((p, idx) => ({ ...p, originalIdx: idx }))
                  .filter((p) => p.originalIdx !== activePlayerIndex)
                  .map((p) => (
                    <Button
                      key={p.id}
                      size="small"
                      variant="outlined"
                      onClick={() => handleDeflect(p.originalIdx)}
                      sx={{
                        borderColor: p.color,
                        color: p.color,
                        fontWeight: 800,
                      }}
                    >
                      تحويل لـ {p.name}
                    </Button>
                  ))}
              </Box>
            </Paper>
          )}

        {/* --- TYPE 1: MCQ QUESTION --- */}
        {questionItem.kind === 'MCQ' && (
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, mb: 3, lineHeight: 1.5 }}
            >
              {questionItem.data.question}
            </Typography>

            {options.length > 0 && (
              <Grid container spacing={2}>
                {options.map((option, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isCorrect = optIdx === questionItem.data.correctIndex;

                  let btnBg = 'rgba(255, 255, 255, 0.05)';
                  let btnBorder = 'rgba(255, 255, 255, 0.12)';
                  if (isAnswered) {
                    if (isCorrect) {
                      btnBg = 'rgba(0, 230, 118, 0.25)';
                      btnBorder = '#00E676';
                    } else if (isSelected) {
                      btnBg = 'rgba(255, 23, 68, 0.25)';
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
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          '&:hover': {
                            transform: isInteractive ? 'scale(1.02)' : 'none',
                            borderColor: isInteractive ? '#00E5FF' : btnBorder,
                          },
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                          {optIdx + 1}. {option}
                        </Typography>
                        {isAnswered && isCorrect && (
                          <CheckCircleIcon sx={{ color: '#00E676' }} />
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <CancelIcon sx={{ color: '#FF1744' }} />
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
                sx={{ mt: 3, borderRadius: 2.5 }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                  {selectedOption === questionItem.data.correctIndex
                    ? '🎉 إجابة صحيحة!'
                    : '❌ إجابة خاطئة!'}
                </Typography>
                <Typography variant="body2">
                  {questionItem.data.explanation}
                </Typography>
              </Alert>
            )}
          </Box>
        )}

        {/* --- TYPE 2: SILHOUETTE GUESSING QUESTION (OPEN-ENDED WITHOUT MCQ) --- */}
        {questionItem.kind === 'SILHOUETTE' && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
              {questionItem.data.question || 'من هي هذه الشخصية؟'}
            </Typography>

            {/* Penalty Status Notice */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
              <Chip
                label={`النقاط الأساسية: ${basePoints} نقطة`}
                size="small"
                variant="outlined"
                sx={{ color: 'text.secondary', borderColor: 'rgba(255,255,255,0.2)' }}
              />
              <Chip
                label={
                  hintsUsedCount === 0
                    ? '100% النقاط (بدون خصم)'
                    : hintsUsedCount === 1
                    ? 'خصم 50% (تلميح 1 مستخدم)'
                    : 'خصم 75% (تلميحان مستخدمان)'
                }
                size="small"
                sx={{
                  backgroundColor:
                    hintsUsedCount === 0
                      ? 'rgba(0, 230, 118, 0.2)'
                      : 'rgba(255, 122, 0, 0.2)',
                  color: hintsUsedCount === 0 ? '#00E676' : '#FF7A00',
                  fontWeight: 800,
                }}
              />
            </Box>

            {/* Silhouette Box with Dynamic Blur Filter */}
            <Box
              sx={{
                width: 140,
                height: 140,
                mx: 'auto',
                mb: 3,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: `3px solid ${avatarConfig.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: isRevealed
                  ? `0 0 30px ${avatarConfig.color}`
                  : hintsUsedCount > 0
                  ? `0 0 20px ${avatarConfig.color}66`
                  : 'none',
                transition: 'all 0.5s ease',
              }}
            >
              <Typography
                sx={{
                  fontSize: '4.5rem',
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
              {/* Initial Hint (Always Visible - 0% Penalty) */}
              {initialHint && (
                <Paper
                  sx={{
                    p: 1.5,
                    mb: 1.5,
                    borderRadius: 2,
                    backgroundColor: 'rgba(0, 229, 255, 0.08)',
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#00E5FF' }}>
                    💡 التلميح المبدئي (مكافأة 100%):
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                    {initialHint}
                  </Typography>
                </Paper>
              )}

              {/* Revealed Additional Hints */}
              {additionalHints.slice(0, hintsUsedCount).map((hint, idx) => (
                <Paper
                  key={idx}
                  sx={{
                    p: 1.5,
                    mb: 1.5,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 215, 0, 0.08)',
                    border: '1px solid rgba(255, 215, 0, 0.4)',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#FFD700' }}>
                    🔍 التلميح الإضافي {idx + 1} (خصم {idx === 0 ? '50%' : '75%'} من النقاط):
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                    {hint}
                  </Typography>
                </Paper>
              ))}

              {/* Reveal Additional Hint Button */}
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
                        fontWeight: 800,
                        borderRadius: 3,
                        borderColor: '#FFD700',
                        color: '#FFD700',
                        '&:hover': {
                          borderColor: '#FFE54C',
                          backgroundColor: 'rgba(255, 215, 0, 0.1)',
                        },
                      }}
                    >
                      كشف تلميح {hintsUsedCount + 1} (يخصم 50% من النقاط) 🔍
                    </Button>
                  </Box>
                )}
            </Box>

            {/* Open-Ended Input & Referee Controls */}
            {!isRevealed ? (
              <Box sx={{ maxWidth: 520, mx: 'auto', mb: 3 }}>
                {/* Text Input Field */}
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
                      sx: { borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.05)' },
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleTextAnswerSubmit}
                    disabled={isAnswered || isTimesUp || !typedAnswer.trim()}
                    endIcon={<SendIcon sx={{ transform: 'rotate(180deg)' }} />}
                    sx={{ px: 3, fontWeight: 800, borderRadius: 3, minWidth: 120 }}
                  >
                    تأكيد
                  </Button>
                </Box>

                {typedFeedback && (
                  <Alert
                    severity={typedFeedback.isCorrect ? 'success' : 'warning'}
                    sx={{ mb: 2, borderRadius: 2.5, textAlign: 'right' }}
                  >
                    {typedFeedback.message}
                  </Alert>
                )}

                <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    أو
                  </Typography>
                </Divider>

                {/* Referee / Reveal Button */}
                <Button
                  variant="outlined"
                  color="secondary"
                  disabled={isTimesUp}
                  onClick={() => setIsRevealed(true)}
                  startIcon={<VisibilityIcon />}
                  sx={{ px: 4, py: 1.2, fontWeight: 800, borderRadius: 3 }}
                >
                  كشف الإجابة والتحكيم المباشر (Reveal)
                </Button>
              </Box>
            ) : (
              <Box sx={{ maxWidth: 550, mx: 'auto' }}>
                <Paper
                  sx={{
                    p: 2.5,
                    mb: 3,
                    borderRadius: 3,
                    backgroundColor: 'rgba(0, 229, 255, 0.1)',
                    border: '2px solid #00E5FF',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 900, color: '#00E5FF', mb: 0.5 }}
                  >
                    الشخصية: {questionItem.data.characterName}
                  </Typography>
                  {avatarConfig.hairStyle && (
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', display: 'block' }}
                    >
                      المظهر: {avatarConfig.hairStyle}
                    </Typography>
                  )}
                </Paper>

                {!isAnswered && !isTimesUp && (
                  <Box
                    sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleDirectVerdict(true)}
                      startIcon={<CheckCircleIcon />}
                      sx={{ px: 4, py: 1.4, fontWeight: 800, borderRadius: 3 }}
                    >
                      إجابة صحيحة (+{effectivePoints} نقطة)
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDirectVerdict(false)}
                      startIcon={<CancelIcon />}
                      sx={{ px: 4, py: 1.4, fontWeight: 800, borderRadius: 3 }}
                    >
                      إجابة خاطئة (0 نقاط)
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        )}

        {/* --- TYPE 3: DIRECT QUESTION --- */}
        {questionItem.kind === 'DIRECT' && (
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, mb: 3, lineHeight: 1.5 }}
            >
              {questionItem.data.question}
            </Typography>

            {!isRevealed ? (
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={isTimesUp}
                  onClick={() => setIsRevealed(true)}
                  startIcon={<VisibilityIcon />}
                  sx={{ px: 4, py: 1.2, fontWeight: 800, borderRadius: 3 }}
                >
                  إظهار الإجابة النموذجية
                </Button>
              </Box>
            ) : (
              <Box>
                <Paper
                  sx={{
                    p: 2.5,
                    mb: 3,
                    borderRadius: 3,
                    backgroundColor: 'rgba(0, 229, 255, 0.1)',
                    border: '2px solid #00E5FF',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 900, color: '#00E5FF', mb: 1 }}
                  >
                    الإجابة النموذجية:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, mb: 1 }}>
                    {questionItem.data.answer}
                  </Typography>
                  {questionItem.data.explanation && (
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary' }}
                    >
                      {questionItem.data.explanation}
                    </Typography>
                  )}
                </Paper>

                {!isAnswered && !isTimesUp && (
                  <Box
                    sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleDirectVerdict(true)}
                      startIcon={<CheckCircleIcon />}
                      sx={{ px: 4, py: 1.2, fontWeight: 800, borderRadius: 3 }}
                    >
                      إجابة صحيحة (+{effectivePoints} نقطة)
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDirectVerdict(false)}
                      startIcon={<CancelIcon />}
                      sx={{ px: 4, py: 1.2, fontWeight: 800, borderRadius: 3 }}
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
