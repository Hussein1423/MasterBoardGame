import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Container,
  Grid,
  Avatar,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ReplayIcon from "@mui/icons-material/Replay";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";
import FlagIcon from "@mui/icons-material/Flag";
import { useGame } from "../../context/GameContext";
import { getRankings } from "../../utils/gameLogic";
import { soundEffects } from "../../utils/soundEffects";

export default function VictoryPodium() {
  const { state, resetGame, startGame } = useGame();
  const { players, targetLaps } = state;

  const rankings = getRankings(players);
  const first = rankings[0];
  const second = rankings[1];
  const third = rankings[2];

  useEffect(() => {
    soundEffects.playFanfare();

    // Trigger celebratory confetti fireworks
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }

      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ["#FF7A00", "#FFD700", "#00E5FF", "#E040FB", "#00E676"],
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const handlePlayAgain = () => {
    startGame(
      players.map((p) => ({
        name: p.name,
        avatarId: p.avatarId,
        symbol: p.symbol,
        color: p.color,
      })),
      targetLaps,
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 5, textAlign: "center" }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ mb: 4 }}>
          <EmojiEventsIcon
            sx={{
              fontSize: 72,
              color: "#FFD700",
              filter: "drop-shadow(0 0 20px #FFD700)",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              background:
                "linear-gradient(90deg, #FFD700 0%, #FF7A00 50%, #00E5FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            🏆 حفل التتويج والنصر 🏆
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.secondary", fontWeight: 700 }}
          >
            تهانينا للأبطال على إكمال خارطة طريق الأنمي بنجاح وإثارة!
          </Typography>
        </Box>
      </motion.div>

      {/* 3-Tier Podium */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: { xs: 1, sm: 3 },
          my: 5,
          minHeight: 340,
        }}
      >
        {/* 2nd Place (Left) */}
        {second && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ flex: 1, maxWidth: 220 }}
          >
            <Box sx={{ mb: 1 }}>
              <Avatar
                sx={{
                  bgcolor: second.color,
                  width: 60,
                  height: 60,
                  mx: "auto",
                  fontSize: "2rem",
                  border: "3px solid #C0C0C0",
                  boxShadow: `0 0 16px ${second.color}`,
                }}
              >
                {second.symbol}
              </Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, mt: 1 }}>
                {second.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#C0C0C0", fontWeight: 700 }}
              >
                🥈 المركز الثاني ({second.score} نقطة)
              </Typography>
            </Box>

            <Paper
              sx={{
                height: 150,
                borderRadius: "16px 16px 0 0",
                background:
                  "linear-gradient(180deg, rgba(192, 192, 192, 0.3) 0%, rgba(15, 23, 42, 0.9) 100%)",
                border: "2px solid #C0C0C0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontWeight: 900, color: "#C0C0C0" }}
              >
                2
              </Typography>
            </Paper>
          </motion.div>
        )}

        {/* 1st Place (Center - Tallest) */}
        {first && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ flex: 1.2, maxWidth: 260 }}
          >
            <Box sx={{ mb: 1 }}>
              <Typography sx={{ fontSize: "2.5rem", lineHeight: 1 }}>
                👑
              </Typography>
              <Avatar
                sx={{
                  bgcolor: first.color,
                  width: 76,
                  height: 76,
                  mx: "auto",
                  fontSize: "2.5rem",
                  border: "4px solid #FFD700",
                  boxShadow: `0 0 25px #FFD700, 0 0 15px ${first.color}`,
                }}
              >
                {first.symbol}
              </Avatar>
              <Typography
                variant="h6"
                sx={{ fontWeight: 900, mt: 1, color: "#FFD700" }}
              >
                {first.name}
              </Typography>
              <Chip
                label={`🥇 البطل الفائز • ${first.score} نقطة`}
                sx={{
                  backgroundColor: "#FFD700",
                  color: "#070B14",
                  fontWeight: 900,
                  fontSize: "0.85rem",
                  mt: 0.5,
                }}
              />
            </Box>

            <Paper
              sx={{
                height: 210,
                borderRadius: "20px 20px 0 0",
                background:
                  "linear-gradient(180deg, rgba(255, 215, 0, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)",
                border: "3px solid #FFD700",
                boxShadow: "0 0 30px rgba(255, 215, 0, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h2"
                sx={{ fontWeight: 900, color: "#FFD700" }}
              >
                1
              </Typography>
            </Paper>
          </motion.div>
        )}

        {/* 3rd Place (Right) */}
        {third && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            style={{ flex: 1, maxWidth: 220 }}
          >
            <Box sx={{ mb: 1 }}>
              <Avatar
                sx={{
                  bgcolor: third.color,
                  width: 54,
                  height: 54,
                  mx: "auto",
                  fontSize: "1.8rem",
                  border: "3px solid #CD7F32",
                  boxShadow: `0 0 16px ${third.color}`,
                }}
              >
                {third.symbol}
              </Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, mt: 1 }}>
                {third.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#CD7F32", fontWeight: 700 }}
              >
                🥉 المركز الثالث ({third.score} نقطة)
              </Typography>
            </Box>

            <Paper
              sx={{
                height: 110,
                borderRadius: "16px 16px 0 0",
                background:
                  "linear-gradient(180deg, rgba(205, 127, 50, 0.3) 0%, rgba(15, 23, 42, 0.9) 100%)",
                border: "2px solid #CD7F32",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 900, color: "#CD7F32" }}
              >
                3
              </Typography>
            </Paper>
          </motion.div>
        )}
      </Box>

      {/* Detailed Final Table */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
          background: "rgba(15, 23, 42, 0.85)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          mb: 4,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          📊 الإحصائيات النهائية للسباق
        </Typography>

        <Grid container spacing={2}>
          {rankings.map((p, idx) => (
            <Grid item xs={12} sm={4} key={p.id}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: `1.5px solid ${p.color}`,
                  backgroundColor: `${p.color}11`,
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Avatar sx={{ bgcolor: p.color, width: 36, height: 36 }}>
                    {p.symbol}
                  </Avatar>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    {p.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    مجموع النقاط:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 800, color: "#FFD700" }}
                  >
                    {p.score} نقطة
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    الدورات المكتملة:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 800, color: "#00E5FF" }}
                  >
                    {p.lap} / {targetLaps}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Navigation / Action Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handlePlayAgain}
          startIcon={<ReplayIcon />}
          sx={{ px: 4, py: 1.5, fontWeight: 900, borderRadius: 3 }}
        >
          إعادة اللعب بنفس الأبطال 🔄
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={resetGame}
          startIcon={<SettingsIcon />}
          sx={{ px: 4, py: 1.5, fontWeight: 900, borderRadius: 3 }}
        >
          إعداد لعبة جديدة ⚙️
        </Button>
      </Box>
    </Container>
  );
}
