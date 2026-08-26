import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Avatar,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Container,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FlagIcon from "@mui/icons-material/Flag";
import StarIcon from "@mui/icons-material/Star";
import { AVATARS } from "../../data/questionsData";
import { ZONES } from "../../data/tilesData";
import { useGame } from "../../context/GameContext";

export default function SetupScreen() {
  const { startGame } = useGame();

  const [players, setPlayers] = useState([
    {
      name: "ناروتو",
      avatarId: "naruto",
      symbol: AVATARS[0].symbol,
      color: AVATARS[0].color,
    },
    {
      name: "لوفي",
      avatarId: "luffy",
      symbol: AVATARS[1].symbol,
      color: AVATARS[1].color,
    },
    {
      name: "إيرين",
      avatarId: "eren",
      symbol: AVATARS[2].symbol,
      color: AVATARS[2].color,
    },
  ]);

  const [targetLaps, setTargetLaps] = useState(1);

  const handleNameChange = (index, newName) => {
    const updated = [...players];
    updated[index].name = newName;
    setPlayers(updated);
  };

  const handleAvatarSelect = (playerIndex, avatar) => {
    const updated = [...players];
    updated[playerIndex] = {
      ...updated[playerIndex],
      avatarId: avatar.id,
      symbol: avatar.symbol,
      color: avatar.color,
    };
    setPlayers(updated);
  };

  const handleStart = () => {
    startGame(players, targetLaps);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              background:
                "linear-gradient(90deg, #FF7A00 0%, #FF4081 50%, #00E5FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 30px rgba(255, 122, 0, 0.3)",
              mb: 1,
            }}
          >
            ⚔️ لعبة خارطة طريق الأنمي ⚔️
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.secondary", fontWeight: 600 }}
          >
            سباق المعرفة والتحدي بين 3 أبطال عبر عوالم كونوها، جزيرة الحلوى،
            وأسوار باراديس!
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        {/* Players Configuration */}
        {players.map((player, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <Card
                sx={{
                  background: "rgba(15, 23, 42, 0.85)",
                  border: `2px solid ${player.color}`,
                  boxShadow: `0 8px 32px ${player.color}33`,
                  borderRadius: 4,
                  height: "100%",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Chip
                      label={`اللاعب ${idx + 1}`}
                      sx={{
                        backgroundColor: player.color,
                        color: "#FFFFFF",
                        fontWeight: 900,
                        fontSize: "0.9rem",
                      }}
                    />
                    <Avatar
                      sx={{
                        bgcolor: player.color,
                        width: 52,
                        height: 52,
                        fontSize: "1.8rem",
                        boxShadow: `0 0 16px ${player.color}`,
                      }}
                    >
                      {player.symbol}
                    </Avatar>
                  </Box>

                  <TextField
                    fullWidth
                    label="اسم اللاعب"
                    variant="outlined"
                    value={player.name}
                    onChange={(e) => handleNameChange(idx, e.target.value)}
                    sx={{ mb: 2.5 }}
                    size="small"
                  />

                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1, color: "text.secondary" }}
                  >
                    اختر شخصية / رمز البطل:
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 1,
                    }}
                  >
                    {AVATARS.map((av) => {
                      const isSelected = player.avatarId === av.id;
                      return (
                        <Tooltip
                          key={av.id}
                          title={`${av.name} (${av.anime})`}
                          arrow
                        >
                          <Paper
                            onClick={() => handleAvatarSelect(idx, av)}
                            sx={{
                              p: 1,
                              textAlign: "center",
                              cursor: "pointer",
                              border: isSelected
                                ? `2px solid ${av.color}`
                                : "1px solid rgba(255,255,255,0.08)",
                              backgroundColor: isSelected
                                ? `${av.color}22`
                                : "rgba(255,255,255,0.03)",
                              borderRadius: 2,
                              transition: "all 0.2s ease",
                              "&:hover": {
                                transform: "scale(1.1)",
                                borderColor: av.color,
                              },
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "1.5rem", lineHeight: 1 }}
                            >
                              {av.symbol}
                            </Typography>
                          </Paper>
                        </Tooltip>
                      );
                    })}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}

        {/* Laps Configuration & Map Preview */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                background: "rgba(15, 23, 42, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={5}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      mb: 1.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <FlagIcon sx={{ color: "primary.main" }} /> طول السباق (عدد
                    الدورات):
                  </Typography>

                  <RadioGroup
                    row
                    value={targetLaps}
                    onChange={(e) => setTargetLaps(parseInt(e.target.value))}
                    sx={{ gap: 2 }}
                  >
                    {[1, 2, 3].map((lap) => (
                      <Paper
                        key={lap}
                        sx={{
                          p: 1.5,
                          px: 2.5,
                          borderRadius: 3,
                          cursor: "pointer",
                          border:
                            targetLaps === lap
                              ? "2px solid #FF7A00"
                              : "1px solid rgba(255,255,255,0.1)",
                          backgroundColor:
                            targetLaps === lap
                              ? "rgba(255, 122, 0, 0.15)"
                              : "transparent",
                        }}
                        onClick={() => setTargetLaps(lap)}
                      >
                        <FormControlLabel
                          value={lap}
                          control={
                            <Radio
                              sx={{
                                color: "#FF7A00",
                                "&.Mui-checked": { color: "#FF7A00" },
                              }}
                            />
                          }
                          label={
                            <Typography sx={{ fontWeight: 800 }}>
                              {lap === 1
                                ? "دورة واحدة (سريع ⚡)"
                                : lap === 2
                                  ? "دورتان (متوازن ⚔️)"
                                  : "3 دورات (ملحمي 🏆)"}
                            </Typography>
                          }
                          sx={{ m: 0 }}
                        />
                      </Paper>
                    ))}
                  </RadioGroup>
                </Grid>

                <Grid item xs={12} md={7}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.secondary", mb: 1 }}
                  >
                    خارطة العوالم الثلاثة (30 خانة):
                  </Typography>
                  <Grid container spacing={1.5}>
                    <Grid item xs={4}>
                      <Paper
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          border: `1px solid ${ZONES.KONOHA.color}`,
                          background: ZONES.KONOHA.bgGradient,
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h6">
                          {ZONES.KONOHA.icon}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 800, color: ZONES.KONOHA.color }}
                        >
                          {ZONES.KONOHA.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          الخانات 1 - 10
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={4}>
                      <Paper
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          border: `1px solid ${ZONES.WHOLE_CAKE.color}`,
                          background: ZONES.WHOLE_CAKE.bgGradient,
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h6">
                          {ZONES.WHOLE_CAKE.icon}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 800,
                            color: ZONES.WHOLE_CAKE.color,
                          }}
                        >
                          {ZONES.WHOLE_CAKE.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          الخانات 11 - 20
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={4}>
                      <Paper
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          border: `1px solid ${ZONES.PARADIS.color}`,
                          background: ZONES.PARADIS.bgGradient,
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h6">
                          {ZONES.PARADIS.icon}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 800, color: ZONES.PARADIS.color }}
                        >
                          {ZONES.PARADIS.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          الخانات 21 - 30
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleStart}
                  startIcon={<SportsEsportsIcon sx={{ fontSize: 28 }} />}
                  sx={{
                    px: 6,
                    py: 1.8,
                    fontSize: "1.25rem",
                    fontWeight: 900,
                    borderRadius: 4,
                  }}
                >
                  🚀 انطلاق اللعبة والسباق!
                </Button>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}
