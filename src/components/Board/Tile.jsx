import React from "react";
import { Box, Typography, Paper, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import QuizIcon from "@mui/icons-material/Quiz";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import SecurityIcon from "@mui/icons-material/Security";
import PlayerToken from "./PlayerToken";

export default function Tile({
  tile,
  playersOnTile = [],
  isCurrentTurnTarget = false,
}) {
  const getTileIcon = (type) => {
    switch (type) {
      case "QUIZ":
        return <QuizIcon sx={{ fontSize: 20, color: "#00E5FF" }} />;
      case "CHALLENGE":
        return <FlashOnIcon sx={{ fontSize: 20, color: "#FFD700" }} />;
      case "LUCKY":
        return <CardGiftcardIcon sx={{ fontSize: 20, color: "#E040FB" }} />;
      case "TRAP":
        return <ReportProblemIcon sx={{ fontSize: 20, color: "#FF3D00" }} />;
      case "SAFE":
        return <SecurityIcon sx={{ fontSize: 20, color: "#00E676" }} />;
      default:
        return null;
    }
  };

  const isZoneBoundary =
    tile.number === 1 || tile.number === 11 || tile.number === 21;

  return (
    <Tooltip
      title={
        <Box sx={{ p: 0.5, textAlign: "center" }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 800, color: tile.zone.color }}
          >
            {tile.number}. {tile.title} ({tile.zone.name})
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", display: "block", mt: 0.5 }}
          >
            {tile.description}
          </Typography>
        </Box>
      }
      arrow
      placement="top"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        style={{ height: "100%" }}
      >
        <Paper
          elevation={isCurrentTurnTarget ? 8 : 2}
          sx={{
            p: 1,
            height: "100%",
            minHeight: 90,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: 2.5,
            position: "relative",
            border: isCurrentTurnTarget
              ? `2px solid ${tile.type.color}`
              : `1px solid ${tile.zone.color}44`,
            background: isCurrentTurnTarget
              ? `${tile.type.color}22`
              : "rgba(15, 23, 42, 0.75)",
            boxShadow: isCurrentTurnTarget
              ? `0 0 16px ${tile.type.color}88, inset 0 0 12px ${tile.type.color}33`
              : "none",
            backdropFilter: "blur(8px)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "pointer",
            overflow: "hidden",
          }}
        >
          {/* Top Zone Indicator Bar */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              backgroundColor: tile.zone.color,
            }}
          />

          {/* Top Row: Tile Number & Zone Badge */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "0.75rem",
                color: isZoneBoundary ? tile.zone.color : "text.primary",
                border: isZoneBoundary
                  ? `1px solid ${tile.zone.color}`
                  : "none",
              }}
            >
              {tile.number}
            </Box>

            <Typography sx={{ fontSize: "0.9rem", lineHeight: 1 }}>
              {tile.zone.icon}
            </Typography>
          </Box>

          {/* Center: Icon & Title */}
          <Box sx={{ textAlign: "center", my: 0.5 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {getTileIcon(tile.type.type)}
            </Box>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                fontWeight: 700,
                fontSize: "0.68rem",
                color: tile.type.color,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {tile.type.label}
            </Typography>
          </Box>

          {/* Bottom: Players Standing on this Tile */}
          <Box
            sx={{
              minHeight: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              flexWrap: "wrap",
            }}
          >
            {playersOnTile.map((p) => (
              <PlayerToken key={p.id} player={p} size={22} />
            ))}
          </Box>
        </Paper>
      </motion.div>
    </Tooltip>
  );
}
