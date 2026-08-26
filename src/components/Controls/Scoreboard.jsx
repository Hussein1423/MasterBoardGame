import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  Tooltip,
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
import { useGame } from "../../context/GameContext";
import { TILES_DATA } from "../../data/tilesData";

export default function Scoreboard() {
  const { state } = useGame();
  const { players, activePlayerIndex, targetLaps } = state;

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <Grid container spacing={2}>
        {players.map((player, idx) => {
          const isActive = idx === activePlayerIndex;
          const currentTile = TILES_DATA[player.position];

          return (
            <Grid item xs={12} md={4} key={player.id}>
              <motion.div
                animate={{
                  scale: isActive ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    border: isActive
                      ? `2px solid ${player.color}`
                      : "1px solid rgba(255, 255, 255, 0.08)",
                    background: isActive
                      ? `linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, ${player.color}22 100%)`
                      : "rgba(15, 23, 42, 0.7)",
                    boxShadow: isActive ? `0 0 20px ${player.color}44` : "none",
                    backdropFilter: "blur(12px)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {isActive && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        left: 0,
                        height: 3,
                        backgroundColor: player.color,
                      }}
                    />
                  )}

                  {/* Header: Avatar, Name & Turn Chip */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1.5,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: player.color,
                          width: 44,
                          height: 44,
                          fontSize: "1.4rem",
                          border: isActive ? "2px solid #FFFFFF" : "none",
                          boxShadow: isActive
                            ? `0 0 12px ${player.color}`
                            : "none",
                        }}
                      >
                        {player.symbol}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 800, lineHeight: 1.2 }}
                        >
                          {player.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          الخانة {currentTile.number}: {currentTile.title}
                        </Typography>
                      </Box>
                    </Box>

                    {isActive && (
                      <Chip
                        label="الدور الحالي 🎯"
                        size="small"
                        sx={{
                          backgroundColor: player.color,
                          color: "#FFFFFF",
                          fontWeight: 900,
                          fontSize: "0.75rem",
                          animation: "pulse 1.5s infinite",
                          "@keyframes pulse": {
                            "0%": { opacity: 0.8 },
                            "50%": { opacity: 1 },
                            "100%": { opacity: 0.8 },
                          },
                        }}
                      />
                    )}
                  </Box>

                  {/* Stats Row: Score & Lap */}
                  <Box sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
                    <Paper
                      sx={{
                        flex: 1,
                        p: 1,
                        borderRadius: 2,
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <StarIcon sx={{ color: "#FFD700", fontSize: 20 }} />
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            display: "block",
                            lineHeight: 1,
                          }}
                        >
                          النقاط
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 900, color: "#FFD700" }}
                        >
                          {player.score} نقطة
                        </Typography>
                      </Box>
                    </Paper>

                    <Paper
                      sx={{
                        flex: 1,
                        p: 1,
                        borderRadius: 2,
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <FlagIcon sx={{ color: "#00E5FF", fontSize: 20 }} />
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            display: "block",
                            lineHeight: 1,
                          }}
                        >
                          الدورة
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 900, color: "#00E5FF" }}
                        >
                          {player.hasFinished
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
                        title={`درع حماية متوفر (${player.inventory.shields})`}
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
                            fontWeight: 700,
                            fontSize: "0.7rem",
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
                            fontWeight: 700,
                            fontSize: "0.7rem",
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
                            fontWeight: 700,
                            fontSize: "0.7rem",
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
                            fontWeight: 700,
                            fontSize: "0.7rem",
                          }}
                        />
                      </Tooltip>
                    )}

                    {player.debuffs.isFrozen && (
                      <Tooltip
                        title="المستخدم مجمد! سيتم تخطي دوره القادم"
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
                            fontSize: "0.7rem",
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
                            fontSize: "0.7rem",
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
    </Box>
  );
}
