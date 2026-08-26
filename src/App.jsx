import React, { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Tooltip,
  Paper,
  Grid,
  Chip,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import QuizIcon from "@mui/icons-material/Quiz";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import SecurityIcon from "@mui/icons-material/Security";

import { animeTheme } from "./theme/animeTheme";
import { GameProvider, useGame } from "./context/GameContext";
import { soundEffects } from "./utils/soundEffects";
import SetupScreen from "./components/Setup/SetupScreen";
import BoardMap from "./components/Board/BoardMap";
import Scoreboard from "./components/Controls/Scoreboard";
import DiceReel from "./components/Controls/DiceReel";
import QuestionModal from "./components/Modals/QuestionModal";
import ChallengeModal from "./components/Modals/ChallengeModal";
import EventModal from "./components/Modals/EventModal";
import VictoryPodium from "./components/Modals/VictoryPodium";

function GameContent() {
  const { state, resetGame } = useGame();
  const { screen, activeModal, notification } = state;

  const [isMuted, setIsMuted] = useState(soundEffects.isMuted);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const handleToggleMute = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Navbar */}
      <AppBar
        position="sticky"
        sx={{
          background: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Title / Logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <SportsEsportsIcon sx={{ color: "primary.main", fontSize: 32 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  background:
                    "linear-gradient(90deg, #FF7A00 0%, #00E5FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                }}
                onClick={resetGame}
              >
                خارطة طريق الأنمي | Anime Board Game
              </Typography>
            </Box>

            {/* Quick Actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Tooltip title="قواعد ودليل اللعبة" arrow>
                <Button
                  color="inherit"
                  startIcon={<MenuBookIcon />}
                  onClick={() => setRulesOpen(true)}
                  sx={{ fontWeight: 700, borderRadius: 2 }}
                >
                  قواعد اللعبة
                </Button>
              </Tooltip>

              <Tooltip
                title={isMuted ? "تفعيل المؤثرات الصوتية" : "كتم الصوت"}
                arrow
              >
                <IconButton onClick={handleToggleMute} color="inherit">
                  {isMuted ? (
                    <VolumeOffIcon sx={{ color: "#FF5252" }} />
                  ) : (
                    <VolumeUpIcon sx={{ color: "#00E676" }} />
                  )}
                </IconButton>
              </Tooltip>

              {screen === "PLAYING" && (
                <Tooltip title="إعادة تشغيل اللعبة من البداية" arrow>
                  <IconButton
                    onClick={() => setConfirmResetOpen(true)}
                    color="inherit"
                  >
                    <RestartAltIcon sx={{ color: "#FFA726" }} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main View Area */}
      <Box sx={{ flex: 1, py: 3 }}>
        {screen === "SETUP" && <SetupScreen />}

        {screen === "PLAYING" && (
          <Container maxWidth="xl">
            {/* 3-Player Status Header */}
            <Scoreboard />

            {/* Center Controls & Dice Reel */}
            <Box sx={{ maxWidth: 650, mx: "auto", mb: 3.5 }}>
              <DiceReel />
            </Box>

            {/* 30-Tile 3-Zone Board */}
            <BoardMap />
          </Container>
        )}

        {screen === "VICTORY" && <VictoryPodium />}
      </Box>

      {/* Modals Manager */}
      {activeModal && activeModal.type === "QUIZ" && (
        <QuestionModal open={true} tile={activeModal.tile} />
      )}

      {activeModal && activeModal.type === "CHALLENGE" && (
        <ChallengeModal open={true} tile={activeModal.tile} />
      )}

      {activeModal &&
        (activeModal.type === "LUCKY" || activeModal.type === "TRAP") && (
          <EventModal
            open={true}
            tile={activeModal.tile}
            type={activeModal.type}
          />
        )}

      {/* Rules & Guide Dialog */}
      <Dialog
        open={rulesOpen}
        onClose={() => setRulesOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: "linear-gradient(180deg, #0F172A 0%, #070B14 100%)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 3.5,
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MenuBookIcon sx={{ color: "#FF7A00" }} />
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            📖 دليل وقواعد لعبة خارطة طريق الأنمي
          </Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 800, color: "#FF7A00", mb: 1 }}
          >
            🎯 الهدف والفوز:
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.8 }}>
            يتنافس 3 لاعبين بالتناوب في سباق عبر 30 خانة مقسمة إلى 3 عوالم أنمي
            أيقونية (كونوها، جزيرة الحلوى، وأسوار باراديس). عند إكمال عدد
            الدورات المحدد (1 أو 2 أو 3 دورات)، يتوج اللاعب صاحب أعلى رصيد نقاط
            بالمركز الأول!
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 800, color: "#00E5FF", mb: 1 }}
          >
            🗺️ أنواع الخانات في الخارطة (30 خانة):
          </Typography>
          <Grid container spacing={1.5} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Paper
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: "rgba(0, 229, 255, 0.08)",
                  border: "1px solid #00E5FF44",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 800,
                    color: "#00E5FF",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <QuizIcon fontSize="small" /> سؤال أنمي (14 خانة)
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  أسئلة خيارات من متعدد (+0.5 نقطة)، خمن الشخصية من الظل (+1 إلى
                  +3)، أو أسئلة مباشرة.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: "rgba(255, 215, 0, 0.08)",
                  border: "1px solid #FFD70044",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 800,
                    color: "#FFD700",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <FlashOnIcon fontSize="small" /> تحدي سرعة (5 خانات)
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  تحدٍ شفهي خلال 30 ثانية يتم تحكيمه وتصويته بواسطة اللاعبين
                  الآخرين (+1 إلى +3 نقاط).
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: "rgba(224, 64, 251, 0.08)",
                  border: "1px solid #E040FB44",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 800,
                    color: "#E040FB",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <CardGiftcardIcon fontSize="small" /> صندوق المفاجآت (4 خانات)
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  يمنحك درع حماية، مضاعفة نقاط 2x، وقت إضافي +30s، تقدم إضافي،
                  أو كرت تحويل السؤال.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: "rgba(255, 61, 0, 0.08)",
                  border: "1px solid #FF3D0044",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 800,
                    color: "#FF3D00",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <ReportProblemIcon fontSize="small" /> فخ / عقوبة (4 خانات)
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  خصم نقاط، تراجع للخلف، تجميد الدور القادم، أو تقليص وقت
                  السؤال. يحميك درع السوسانو تلقائياً!
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            variant="contained"
            onClick={() => setRulesOpen(false)}
            sx={{ fontWeight: 800 }}
          >
            فهمت، لنبدأ اللعب!
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Reset Dialog */}
      <Dialog
        open={confirmResetOpen}
        onClose={() => setConfirmResetOpen(false)}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>
          هل ترغب في إعادة بدء اللعبة؟
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            سيؤدي هذا إلى إنهاء الجولة الحالية والعودة لشاشة إعداد اللاعبين.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setConfirmResetOpen(false)} color="inherit">
            إلغاء
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setConfirmResetOpen(false);
              resetGame();
            }}
          >
            تأكيد والبدء من جديد
          </Button>
        </DialogActions>
      </Dialog>

      {/* Global Notification Toast */}
      <Snackbar
        open={Boolean(notification)}
        autoHideDuration={3500}
        onClose={() =>
          state.dispatch({ type: "SET_NOTIFICATION", payload: null })
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={notification?.type || "info"}
          sx={{
            fontWeight: 800,
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          {notification?.text}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={animeTheme}>
      <CssBaseline />
      <GameProvider>
        <GameContent />
      </GameProvider>
    </ThemeProvider>
  );
}
