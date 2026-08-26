import React from "react";
import { Box, Tooltip, Avatar } from "@mui/material";
import { motion } from "framer-motion";

export default function PlayerToken({ player, isActive = false, size = 32 }) {
  return (
    <Tooltip title={`${player.name} (نقاط: ${player.score})`} arrow>
      <motion.div
        animate={{
          scale: isActive ? [1, 1.15, 1] : 1,
          y: isActive ? [0, -4, 0] : 0,
        }}
        transition={{
          repeat: isActive ? Infinity : 0,
          duration: 1.2,
          ease: "easeInOut",
        }}
        style={{ display: "inline-block", zIndex: isActive ? 10 : 2 }}
      >
        <Avatar
          sx={{
            width: size,
            height: size,
            bgcolor: player.color,
            fontSize: `${size * 0.55}px`,
            border: isActive
              ? "2px solid #FFFFFF"
              : "1.5px solid rgba(255,255,255,0.6)",
            boxShadow: isActive
              ? `0 0 12px ${player.color}, 0 0 20px ${player.color}88`
              : `0 2px 6px rgba(0,0,0,0.5)`,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          {player.symbol}
        </Avatar>
      </motion.div>
    </Tooltip>
  );
}
