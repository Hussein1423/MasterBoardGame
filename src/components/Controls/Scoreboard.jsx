import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  ButtonGroup,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import FlagIcon from "@mui/icons-material/Flag";
import SecurityIcon from "@mui/icons-material/Security";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import GavelIcon from "@mui/icons-material/Gavel";
import { useGame } from "../../context/GameContext";
import { TILES_DATA } from "../../data/tilesData";

export default function Scoreboard() {
  const { state, dispatch } = useGame();
  const { players, activePlayerIndex, targetLaps } = state;

  // Manual Score Edit Dialog State
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [tempScore, setTempScore] = useState(0);

  const handleOpenScoreEdit = (player) => {
    setEditingPlayer(player);
    setTempScore(player.score ?? 0);
    setEditDialogOpen(true);
  };

  const handleCloseScoreEdit = () => {
    setEditDialogOpen(false);
    setEditingPlayer(null);
  };

  const handleSaveScore = () => {
    if (!editingPlayer) return;
    dispatch({
      type: "UPDATE_PLAYER_SCORE",
      payload: {
        playerId: editingPlayer.id,
        newPoints: Math.max(0, Math.round(Number(tempScore) || 0)),
      },
    });
    handleCloseScoreEdit();
  };

  const handleAdjustTempScore = (delta) => {
    setTempScore((prev) => Math.max(0, Math.round((Number(prev) || 0) + delta)));
  };

  return (
    <Box sx={{ width: "100%", mb: 3, position: "relative" }}>
      <Grid container spacing={3} alignItems="stretch">
        {players.slice(0, 2).map((player, idx) => {
          const isActive = idx === activePlayerIndex;
          const isFinished = player.lap >= targetLaps || player.hasFinished;
          const isFrozen = player.debuffs?.isFrozen || player.isFrozen;
          const currentTile = TILES_DATA[player.position];

          return (
            <Grid item xs={12} md={6} key={player.id}>
              <motion.div
                animate={{
                  scale: isActive && !isFinished ? 1.02 : 1,
                  opacity: isFinished ? 0.85 : 1,
                }}
                transition={{ duration: 0.3 }}
                style={{ height: "100%" }}
              >
                <Paper
                  sx={{
                    p: 2.5,
                    borderRadius: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: isFinished
                      ? "2px solid #00E676"
                      : isFrozen
                      ? "2px solid #00E5FF"
                      : isActive
                      ? `2px solid ${player.color}`
                      : "1px solid rgba(255, 255, 255, 0.08)",
                    background: isFinished
                      ? "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(0, 230, 118, 0.15) 100%)"
                      : isFrozen
                      ? "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(0, 229, 255, 0.15) 100%)"
                      : isActive
                      ? `linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, ${player.color}28 100%)`
                      : "rgba(15, 23, 42, 0.75)",
                    boxShadow: isFinished
                      ? "0 0 24px rgba(0, 230, 118, 0.35)"
                      : isFrozen
                      ? "0 0 24px rgba(0, 229, 255, 0.35)"
                      : isActive
                      ? `0 0 25px ${player.color}55`
                      : "none",
                    backdropFilter: "blur(12px)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {isActive && !isFinished && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        left: 0,
                        height: 4,
                        backgroundColor: player.color,
                        boxShadow: `0 0 10px ${player.color}`,
                      }}
                    />
                  )}

                  {/* Header: Avatar, Name & Turn Chip */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.8 }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: player.color,
                          width: 50,
                          height: 50,
                          fontSize: "1.6rem",
                          border: isFinished
                            ? "2px solid #00E676"
                            : isActive
                            ? "2px solid #FFFFFF"
                            : "none",
                          boxShadow: isFinished
                            ? "0 0 14px #00E676"
                            : isActive
                            ? `0 0 14px ${player.color}`
                            : "none",
                        }}
                      >
                        {player.symbol}
                      </Avatar>
                      <Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 900, lineHeight: 1.2 }}
                          >
                            {player.name}
                          </Typography>
                          <Chip
                            label={`P${idx + 1}`}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: "0.65rem",
                              fontWeight: 900,
                              backgroundColor: `${player.color}33`,
                              color: player.color,
                              border: `1px solid ${player.color}`,
                            }}
                          />
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary", fontWeight: 600, mt: 0.3, display: "block" }}
                        >
                          الخانة {currentTile.number}: {currentTile.title}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Status Badge */}
                    {isFinished ? (
                      <Chip
                        icon={<CheckCircleIcon sx={{ color: "#00E676 !important" }} />}
                        label="مكتمل الجولات 🏁"
                        size="small"
                        sx={{
                          backgroundColor: "rgba(0, 230, 118, 0.2)",
                          color: "#00E676",
                          border: "1.5px solid #00E676",
                          fontWeight: 900,
                          fontSize: "0.8rem",
                          px: 0.5,
                        }}
                      />
                    ) : isFrozen ? (
                      <Chip
                        icon={<AcUnitIcon sx={{ color: "#00E5FF !important" }} />}
                        label="مجمّد ❄️"
                        size="small"
                        sx={{
                          backgroundColor: "rgba(0, 229, 255, 0.2)",
                          color: "#00E5FF",
                          border: "1.5px solid #00E5FF",
                          fontWeight: 900,
                          fontSize: "0.8rem",
                        }}
                      />
                    ) : isActive ? (
                      <Chip
                        label="الدور الحالي 🎯"
                        size="small"
                        sx={{
                          backgroundColor: player.color,
                          color: "#FFFFFF",
                          fontWeight: 900,
                          fontSize: "0.8rem",
                          px: 0.5,
                          animation: "pulse 1.5s infinite",
                          "@keyframes pulse": {
                            "0%": { opacity: 0.85, transform: "scale(1)" },
                            "50%": { opacity: 1, transform: "scale(1.04)" },
                            "100%": { opacity: 0.85, transform: "scale(1)" },
                          },
                        }}
                      />
                    ) : null}
                  </Box>

                  {/* Stats Row: Score (Clickable for Manual Edit) & Lap */}
                  <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
                    <Tooltip title="اضغط لتعديل نقاط اللاعب يدوياً بواسطة الحكم ⚖️" arrow>
                      <Paper
                        onClick={() => handleOpenScoreEdit(player)}
                        sx={{
                          flex: 1,
                          p: 1.2,
                          borderRadius: 2.5,
                          backgroundColor: "rgba(255, 215, 0, 0.08)",
                          border: "1.5px solid rgba(255, 215, 0, 0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            backgroundColor: "rgba(255, 215, 0, 0.16)",
                            borderColor: "#FFD700",
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)",
                          },
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                          <StarIcon sx={{ color: "#FFD700", fontSize: 24 }} />
                          <Box>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "text.secondary",
                                display: "block",
                                lineHeight: 1,
                                fontSize: "0.75rem",
                              }}
                            >
                              النقاط (تعديل ✏️)
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 900, color: "#FFD700" }}
                            >
                              {player.score} نقطة
                            </Typography>
                          </Box>
                        </Box>
                        <EditIcon sx={{ fontSize: 18, color: "#FFD700", opacity: 0.7 }} />
                      </Paper>
                    </Tooltip>

                    <Paper
                      sx={{
                        flex: 1,
                        p: 1.2,
                        borderRadius: 2.5,
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        display: "flex",
                        alignItems: "center",
                        gap: 1.2,
                      }}
                    >
                      <FlagIcon sx={{ color: "#00E5FF", fontSize: 24 }} />
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            display: "block",
                            lineHeight: 1,
                            fontSize: "0.75rem",
                          }}
                        >
                          الدورة الحالية
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 900, color: isFinished ? "#00E676" : "#00E5FF" }}
                        >
                          {isFinished
                            ? "🏁 اكتملت"
                            : `${player.lap + 1} / ${targetLaps}`}
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>

                  {/* Inventory Buffs & Debuffs */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 0.8,
                      flexWrap: "wrap",
                      minHeight: 28,
                    }}
                  >
                    {player.inventory.shields > 0 && (
                      <Tooltip
                        title={`درع حماية متوفر (${player.inventory.shields}) - يمتص الفخ أو يصد تحويل السؤال`}
                        arrow
                      >
                        <Chip
                          icon={
                            <SecurityIcon
                              sx={{
                                fontSize: "14px !important",
                                color: "#00E676 !important",
                              }}
                            />
                          }
                          label={`درع ×${player.inventory.shields}`}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(0, 230, 118, 0.15)",
                            color: "#00E676",
                            border: "1px solid rgba(0, 230, 118, 0.4)",
                            fontWeight: 800,
                            fontSize: "0.72rem",
                          }}
                        />
                      </Tooltip>
                    )}

                    {player.inventory.doublePoints && (
                      <Tooltip title="مضاعفة نقاط السؤال القادم (2x)" arrow>
                        <Chip
                          icon={
                            <LocalFireDepartmentIcon
                              sx={{
                                fontSize: "14px !important",
                                color: "#FF7A00 !important",
                              }}
                            />
                          }
                          label="نقاط 2x"
                          size="small"
                          sx={{
                            backgroundColor: "rgba(255, 122, 0, 0.15)",
                            color: "#FF7A00",
                            border: "1px solid rgba(255, 122, 0, 0.4)",
                            fontWeight: 800,
                            fontSize: "0.72rem",
                          }}
                        />
                      </Tooltip>
                    )}

                    {player.inventory.bonusTime && (
                      <Tooltip
                        title="وقت إضافي +30 ثانية في السؤال القادم"
                        arrow
                      >
                        <Chip
                          icon={
                            <AccessTimeIcon
                              sx={{
                                fontSize: "14px !important",
                                color: "#00E5FF !important",
                              }}
                            />
                          }
                          label="+30s وقت"
                          size="small"
                          sx={{
                            backgroundColor: "rgba(0, 229, 255, 0.15)",
                            color: "#00E5FF",
                            border: "1px solid rgba(0, 229, 255, 0.4)",
                            fontWeight: 800,
                            fontSize: "0.72rem",
                          }}
                        />
                      </Tooltip>
                    )}

                    {player.inventory.deflections > 0 && (
                      <Tooltip
                        title={`مرآة تحويل السؤال متوفرة (${player.inventory.deflections})`}
                        arrow
                      >
                        <Chip
                          icon={
                            <FlipCameraAndroidIcon
                              sx={{
                                fontSize: "14px !important",
                                color: "#E040FB !important",
                              }}
                            />
                          }
                          label={`تحويل ×${player.inventory.deflections}`}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(224, 64, 251, 0.15)",
                            color: "#E040FB",
                            border: "1px solid rgba(224, 64, 251, 0.4)",
                            fontWeight: 800,
                            fontSize: "0.72rem",
                          }}
                        />
                      </Tooltip>
                    )}

                    {player.debuffs.isFrozen && (
                      <Tooltip
                        title="اللاعب مجمد! سيتم تخطي دوره القادم"
                        arrow
                      >
                        <Chip
                          icon={
                            <AcUnitIcon
                              sx={{
                                fontSize: "14px !important",
                                color: "#00E5FF !important",
                              }}
                            />
                          }
                          label="مجمد ❄️"
                          size="small"
                          sx={{
                            backgroundColor: "rgba(0, 229, 255, 0.25)",
                            color: "#00E5FF",
                            border: "1px solid #00E5FF",
                            fontWeight: 800,
                            fontSize: "0.72rem",
                          }}
                        />
                      </Tooltip>
                    )}

                    {player.debuffs.halfTime && (
                      <Tooltip
                        title="نصف الوقت على السؤال القادم (30 ثانية)"
                        arrow
                      >
                        <Chip
                          icon={
                            <WarningAmberIcon
                              sx={{
                                fontSize: "14px !important",
                                color: "#FF3D00 !important",
                              }}
                            />
                          }
                          label="نصف الوقت ⚠️"
                          size="small"
                          sx={{
                            backgroundColor: "rgba(255, 61, 0, 0.2)",
                            color: "#FF3D00",
                            border: "1px solid #FF3D00",
                            fontWeight: 800,
                            fontSize: "0.72rem",
                          }}
                        />
                      </Tooltip>
                    )}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>

      {/* Manual Score Edit Dialog (Referee Quick Adjust) */}
      <Dialog
        open={editDialogOpen}
        onClose={handleCloseScoreEdit}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            border: "2px solid #FFD700",
            background: "linear-gradient(180deg, #1E293B 0%, #0F172A 100%)",
            boxShadow: "0 0 40px rgba(255, 215, 0, 0.35)",
          },
        }}
      >
        <DialogTitle sx={{ pb: 1, textAlign: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
            <GavelIcon sx={{ color: "#FFD700", fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 900, color: "#FFD700" }}>
              تعديل نقاط اللاعب يدوياً (الحكم)
            </Typography>
          </Box>
          {editingPlayer && (
            <Chip
              avatar={<Avatar sx={{ bgcolor: editingPlayer.color }}>{editingPlayer.symbol}</Avatar>}
              label={editingPlayer.name}
              sx={{
                backgroundColor: `${editingPlayer.color}22`,
                color: editingPlayer.color,
                border: `1.5px solid ${editingPlayer.color}`,
                fontWeight: 900,
                fontSize: "0.9rem",
              }}
            />
          )}
        </DialogTitle>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        <DialogContent sx={{ py: 3 }}>
          <TextField
            fullWidth
            type="number"
            label="النقاط الجديدة"
            value={tempScore}
            onChange={(e) => setTempScore(Math.max(0, Math.round(Number(e.target.value) || 0)))}
            InputProps={{
              sx: {
                borderRadius: 3,
                fontSize: "1.3rem",
                fontWeight: 900,
                textAlign: "center",
              },
            }}
            sx={{ mb: 3 }}
          />

          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, display: "block", mb: 1.5 }}>
            أزرار التعديل السريع:
          </Typography>

          <Grid container spacing={1.2}>
            {[
              { label: "+50", val: 50, color: "success" },
              { label: "+100", val: 100, color: "success" },
              { label: "+200", val: 200, color: "success" },
              { label: "-50", val: -50, color: "error" },
              { label: "-100", val: -100, color: "error" },
              { label: "-200", val: -200, color: "error" },
            ].map((btn, idx) => (
              <Grid item xs={4} key={idx}>
                <Button
                  fullWidth
                  variant="outlined"
                  color={btn.color}
                  size="small"
                  onClick={() => handleAdjustTempScore(btn.val)}
                  sx={{
                    fontWeight: 900,
                    borderRadius: 2,
                    fontSize: "0.9rem",
                    py: 0.8,
                  }}
                >
                  {btn.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, pt: 0, justifyContent: "center", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleCloseScoreEdit}
            sx={{
              borderRadius: 3,
              fontWeight: 800,
              px: 3,
              color: "text.secondary",
              borderColor: "rgba(255,255,255,0.2)",
            }}
          >
            إلغاء
          </Button>

          <Button
            variant="contained"
            color="warning"
            onClick={handleSaveScore}
            sx={{
              borderRadius: 3,
              fontWeight: 900,
              px: 4,
              py: 1,
              background: "linear-gradient(135deg, #FFD700 0%, #FFA000 100%)",
              color: "#070B14",
              boxShadow: "0 4px 15px rgba(255, 215, 0, 0.4)",
            }}
          >
            حفظ التعديل 💾
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
