import React from "react";
import { Box, Typography, Paper, Grid, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { TILES_DATA, ZONES } from "../../data/tilesData";
import { useGame } from "../../context/GameContext";
import Tile from "./Tile";

export default function BoardMap() {
  const { state } = useGame();
  const activePlayer = state.players[state.activePlayerIndex];

  // Group tiles by zone
  const konohaTiles = TILES_DATA.slice(0, 10);
  const wholeCakeTiles = TILES_DATA.slice(10, 20);
  const paradisTiles = TILES_DATA.slice(20, 30);

  const zonesConfig = [
    { zone: ZONES.KONOHA, tiles: konohaTiles, range: "الخانات 1 - 10" },
    { zone: ZONES.WHOLE_CAKE, tiles: wholeCakeTiles, range: "الخانات 11 - 20" },
    { zone: ZONES.PARADIS, tiles: paradisTiles, range: "الخانات 21 - 30" },
  ];

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      {zonesConfig.map(({ zone, tiles, range }, zoneIdx) => {
        // Check if any player is in this zone
        const isPlayerInZone = state.players.some(
          (p) => p.position >= zoneIdx * 10 && p.position < (zoneIdx + 1) * 10,
        );

        return (
          <motion.div
            key={zone.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: zoneIdx * 0.1 }}
          >
            <Paper
              sx={{
                p: 2,
                mb: 2.5,
                borderRadius: 3.5,
                background: zone.bgGradient,
                border: `1.5px solid ${zone.color}55`,
                boxShadow: isPlayerInZone ? `0 0 20px ${zone.color}22` : "none",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Zone Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1.5,
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="h5" sx={{ lineHeight: 1 }}>
                    {zone.icon}
                  </Typography>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 900,
                        color: zone.color,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {zone.name}
                      <Chip
                        label={zone.anime}
                        size="small"
                        sx={{
                          backgroundColor: `${zone.color}33`,
                          color: "#FFFFFF",
                          border: `1px solid ${zone.color}88`,
                          fontWeight: 800,
                          fontSize: "0.75rem",
                        }}
                      />
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      {zone.subtext}
                    </Typography>
                  </Box>
                </Box>

                <Chip
                  label={range}
                  variant="outlined"
                  sx={{
                    borderColor: `${zone.color}88`,
                    color: zone.color,
                    fontWeight: 700,
                  }}
                />
              </Box>

              {/* 10 Tiles Grid */}
              <Grid container spacing={1}>
                {tiles.map((tile) => {
                  const playersOnTile = state.players.filter(
                    (p) => p.position === tile.index,
                  );
                  const isCurrentTarget =
                    activePlayer && activePlayer.position === tile.index;

                  return (
                    <Grid item xs={6} sm={4} md={2.4} lg={1.2} key={tile.index}>
                      <Tile
                        tile={tile}
                        playersOnTile={playersOnTile}
                        isCurrentTurnTarget={isCurrentTarget}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
          </motion.div>
        );
      })}
    </Box>
  );
}
