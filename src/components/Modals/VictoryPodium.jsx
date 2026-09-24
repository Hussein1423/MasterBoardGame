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

  useEffect(() => {
    soundEffects.playFanfare();

    // Trigger celebratory confetti fireworks for 1v1 finale
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }

      confetti({
        startVelocity: 35,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ["#FF7A00", "#FFD700", "#00E5FF", "#E040FB", "#00E676"],
      });
    }, 280);

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
              fontSize: 80,
              color: "#FFD700",
              filter: "drop-shadow(0 0 25px #FFD700)",
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
            🏆 حفل التتويج والنصر (1v1) 🏆
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.secondary", fontWeight: 700 }}
          >
            تهانينا للبطلين على خوض هذه المواجهة الملحمية وإكمال خارطة طريق
            الأنمي!
          </Typography>
        </Box>
      </motion.div>

      {/* 2-Tier Podium (1st and 2nd Place) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: { xs: 2, sm: 5 },
          my: 5,
          minHeight: 360,
        }}
      >
        {/* 2nd Place (Runner-up) */}
        {second && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ flex: 1, maxWidth: 260 }}
          >
            <Box sx={{ mb: 1.5 }}>
              <Avatar
                sx={{
                  bgcolor: second.color,
                  width: 68,
                  height: 68,
                  mx: "auto",
                  fontSize: "2.2rem",
                  border: "3px solid #C0C0C0",
                  boxShadow: `0 0 20px ${second.color}`,
                }}
              >
                {second.symbol}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 800, mt: 1 }}>
                {second.name}
              </Typography>
              <Chip
                label={`🥈 وصيف البطولة • ${second.score} نقطة`}
                sx={{
                  backgroundColor: "rgba(192, 192, 192, 0.2)",
                  color: "#C0C0C0",
                  border: "1.5px solid #C0C0C0",
                  fontWeight: 900,
                  fontSize: "0.85rem",
                  mt: 0.5,
                }}
              />
            </Box>

            <Paper
              sx={{
                height: 160,
                borderRadius: "20px 20px 0 0",
                background:
                  "linear-gradient(180deg, rgba(192, 192, 192, 0.3) 0%, rgba(15, 23, 42, 0.95) 100%)",
                border: "2px solid #C0C0C0",
                boxShadow: "0 0 20px rgba(192, 192, 192, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h2"
                sx={{ fontWeight: 900, color: "#C0C0C0" }}
              >
                2
              </Typography>
            </Paper>
          </motion.div>
        )}

        {/* 1st Place (Champion Winner - Tallest) */}
        {first && (
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ flex: 1.2, maxWidth: 300 }}
          >
            <Box sx={{ mb: 1.5 }}>
              <Typography sx={{ fontSize: "2.8rem", lineHeight: 1 }}>
                👑
              </Typography>
              <Avatar
                sx={{
                  bgcolor: first.color,
                  width: 86,
                  height: 86,
                  mx: "auto",
                  fontSize: "2.8rem",
                  border: "4px solid #FFD700",
                  boxShadow: `0 0 30px #FFD700, 0 0 20px ${first.color}`,
                }}
              >
                {first.symbol}
              </Avatar>
              <Typography
                variant="h5"
                sx={{ fontWeight: 900, mt: 1, color: "#FFD700" }}
              >
                {first.name}
              </Typography>
              <Chip
                label={`🥇 بطل المواجهة • ${first.score} نقطة`}
                sx={{
                  backgroundColor: "#FFD700",
                  color: "#070B14",
                  fontWeight: 900,
                  fontSize: "0.95rem",
                  mt: 0.5,
                  boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)",
                }}
              />
            </Box>

            <Paper
              sx={{
                height: 230,
                borderRadius: "24px 24px 0 0",
                background:
                  "linear-gradient(180deg, rgba(255, 215, 0, 0.4) 0%, rgba(15, 23, 42, 0.98) 100%)",
                border: "3px solid #FFD700",
                boxShadow: "0 0 35px rgba(255, 215, 0, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h1"
                sx={{ fontWeight: 900, color: "#FFD700" }}
              >
                1
              </Typography>
            </Paper>
          </motion.div>
        )}
      </Box>

      {/* Match Summary Stats */}
      <Paper
        sx={{
          p: 3.5,
          mb: 4,
          borderRadius: 4,
          background: "rgba(15, 23, 42, 0.85)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
          📊 ملخص أداء البطلين
        </Typography>
        <Grid container spacing={3}>
          {rankings.slice(0, 2).map((player, idx) => (
            <Grid item xs={12} sm={6} key={player.id}>
              <Paper
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: `1.5px solid ${player.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Typography variant="h5" sx={{ fontWeight: 900 }}>
                    {idx === 0 ? "🥇" : "🥈"}
                  </Typography>
                  <Avatar sx={{ bgcolor: player.color, width: 42, height: 42 }}>
                    {player.symbol}
                  </Avatar>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                      {player.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      أتم {player.lap} دورة
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="h6"
                  sx={{ fontWeight: 900, color: "#FFD700" }}
                >
                  {player.score} نقطة
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={handlePlayAgain}
          sx={{
            px: 5,
            py: 1.8,
            fontSize: "1.15rem",
            fontWeight: 900,
            borderRadius: 3,
            background: "linear-gradient(90deg, #FF7A00 0%, #FF4081 100%)",
            boxShadow: "0 0 25px rgba(255, 122, 0, 0.4)",
          }}
        >
          مباراة جديدة بنفس الأبطال 🔄
        </Button>

        <Button
          variant="outlined"
          size="large"
          onClick={resetGame}
          sx={{
            px: 5,
            py: 1.8,
            fontSize: "1.15rem",
            fontWeight: 900,
            borderRadius: 3,
            borderColor: "rgba(255, 255, 255, 0.3)",
            color: "#FFFFFF",
            "&:hover": {
              borderColor: "#00E5FF",
              backgroundColor: "rgba(0, 229, 255, 0.1)",
            },
          }}
        >
          تغيير الإعدادات والأبطال ⚙️
        </Button>
      </Box>
    </Container>
  );
}
