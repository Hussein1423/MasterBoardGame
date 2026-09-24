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
import { ZONES, ZONES_LIST } from "../../data/tilesData";
import { useGame } from "../../context/GameContext";

export default function SetupScreen() {
  const { startGame } = useGame();

  const [players, setPlayers] = useState([
    {
      name: "اللاعب 1",
      avatarId: "naruto",
      symbol: AVATARS[0].symbol,
      color: AVATARS[0].color,
    },
    {
      name: "اللاعب 2",
      avatarId: "luffy",
      symbol: AVATARS[1].symbol,
      color: AVATARS[1].color,
    },
    {
      name: "اللاعب 3",
      avatarId: "eren",
      symbol: AVATARS[2].symbol,
      color: AVATARS[2].color,
    },
    {
      name: "اللاعب 4",
      avatarId: "goku",
      symbol: AVATARS[7].symbol,
      color: AVATARS[7].color,
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
            ⚔️ لعبة خارطة طريق الأنمي (4 Players) ⚔️
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.secondary", fontWeight: 600 }}
          >
            مواجهة رباعية وحماسية بين 4 أبطال عبر عوالم كونوها، جزيرة الحلوى،
            وأسوار باراديس!
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Players Configuration (4 Players Grid) */}
        {players.map((player, idx) => (
          <Grid item xs={12} md={6} key={idx}>
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
                <CardContent sx={{ p: 3.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2.5,
                    }}
                  >
                    <Chip
                      label={`اللاعب ${idx + 1} ${idx === 0 ? "🔴" : idx === 1 ? "🔵" : idx === 2 ? "🟢" : "🟡"}`}
                      sx={{
                        backgroundColor: player.color,
                        color: "#FFFFFF",
                        fontWeight: 900,
                        fontSize: "0.95rem",
                        px: 1,
                      }}
                    />
                    <Avatar
                      sx={{
                        bgcolor: player.color,
                        width: 58,
                        height: 58,
                        fontSize: "2rem",
                        boxShadow: `0 0 16px ${player.color}`,
                      }}
                    >
                      {player.symbol}
                    </Avatar>
                  </Box>

                  {/* Player Name Input */}
                  <TextField
                    fullWidth
                    label={`اسم اللاعب ${idx + 1}`}
                    variant="outlined"
                    value={player.name}
                    onChange={(e) => handleNameChange(idx, e.target.value)}
                    sx={{ mb: 3 }}
                    InputProps={{
                      sx: { borderRadius: 3, fontWeight: 700 },
                    }}
                  />

                  {/* Avatar Selector */}
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 800, mb: 1.5, color: "text.secondary" }}
                  >
                    اختر البطل المفضل:
                  </Typography>
                  <Grid container spacing={1.2}>
                    {AVATARS.map((avatar) => {
                      const isSelected = player.avatarId === avatar.id;
                      const isTakenByOther = players.some(
                        (p, pIdx) => pIdx !== idx && p.avatarId === avatar.id,
                      );

                      return (
                        <Grid item xs={3} key={avatar.id}>
                          <Tooltip
                            title={`${avatar.name} (${avatar.anime}) - "${avatar.tagline}"`}
                            arrow
                          >
                            <span>
                              <Paper
                                onClick={() =>
                                  !isTakenByOther &&
                                  handleAvatarSelect(idx, avatar)
                                }
                                sx={{
                                  p: 1.2,
                                  textAlign: "center",
                                  cursor: isTakenByOther
                                    ? "not-allowed"
                                    : "pointer",
                                  borderRadius: 2.5,
                                  backgroundColor: isSelected
                                    ? `${avatar.color}33`
                                    : "rgba(255, 255, 255, 0.03)",
                                  border: isSelected
                                    ? `2px solid ${avatar.color}`
                                    : "1px solid rgba(255, 255, 255, 0.08)",
                                  opacity: isTakenByOther ? 0.3 : 1,
                                  boxShadow: isSelected
                                    ? `0 0 12px ${avatar.color}`
                                    : "none",
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    transform: isTakenByOther
                                      ? "none"
                                      : "scale(1.05)",
                                    borderColor: avatar.color,
                                  },
                                }}
                              >
                                <Typography sx={{ fontSize: "1.8rem" }}>
                                  {avatar.symbol}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    display: "block",
                                    fontWeight: 700,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    fontSize: "0.75rem",
                                  }}
                                >
                                  {avatar.name.split(" ")[0]}
                                </Typography>
                              </Paper>
                            </span>
                          </Tooltip>
                        </Grid>
                      );
                    })}
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Target Laps Setting */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          background: "rgba(15, 23, 42, 0.8)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <FlagIcon sx={{ color: "#00E5FF" }} />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            عدد الدورات المطلوبة لإنهاء السباق:
          </Typography>
        </Box>

        <RadioGroup
          row
          value={targetLaps}
          onChange={(e) => setTargetLaps(Number(e.target.value))}
          sx={{ justifyContent: "center", gap: 3 }}
        >
          {[1, 2, 3].map((lap) => (
            <Paper
              key={lap}
              sx={{
                px: 3,
                py: 1,
                borderRadius: 3,
                backgroundColor:
                  targetLaps === lap
                    ? "rgba(0, 229, 255, 0.15)"
                    : "rgba(255, 255, 255, 0.03)",
                border:
                  targetLaps === lap
                    ? "2px solid #00E5FF"
                    : "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <FormControlLabel
                value={lap}
                control={<Radio sx={{ color: "#00E5FF" }} />}
                label={
                  <Typography sx={{ fontWeight: 800 }}>
                    {lap}{" "}
                    {lap === 1
                      ? "دورة (مباراة سريعة)"
                      : lap === 2
                        ? "دورتان (متوسطة)"
                        : "3 دورات (ماراثون)"}
                  </Typography>
                }
              />
            </Paper>
          ))}
        </RadioGroup>
      </Paper>

      {/* Anime Zones Overview */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          background: "rgba(15, 23, 42, 0.8)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 900, mb: 2, textAlign: "center" }}
        >
          🗺️ عوالم الخارطة الثلاثة
        </Typography>
        <Grid container spacing={2}>
          {(Array.isArray(ZONES_LIST)
            ? ZONES_LIST
            : Object.values(ZONES || {})
          ).map((zone) => (
            <Grid item xs={12} md={4} key={zone.id}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 3,
                  background: zone.bgGradient || "rgba(255, 255, 255, 0.05)",
                  border: `1.5px solid ${zone.borderColor || zone.color || "#00E5FF"}`,
                  height: "100%",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Typography sx={{ fontSize: "1.5rem" }}>
                    {zone.icon}
                  </Typography>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 800, color: zone.color || "#FFFFFF" }}
                    >
                      {zone.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", fontWeight: 700 }}
                    >
                      {zone.anime}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontSize: "0.85rem" }}
                >
                  {zone.subtext}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Start Match Button */}
      <Box sx={{ textAlign: "center" }}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleStart}
            startIcon={<SportsEsportsIcon sx={{ fontSize: 32 }} />}
            sx={{
              px: 8,
              py: 2,
              fontSize: "1.3rem",
              fontWeight: 900,
              borderRadius: 4,
              background: "linear-gradient(90deg, #FF7A00 0%, #FF4081 100%)",
              boxShadow: "0 0 30px rgba(255, 122, 0, 0.5)",
              border: "2px solid #FFFFFF",
            }}
          >
            بدء المواجهة (4 Players Start)
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
}
