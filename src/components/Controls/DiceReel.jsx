import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Button, Chip } from "@mui/material";
import { motion } from "framer-motion";
import CasinoIcon from "@mui/icons-material/Casino";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useGame } from "../../context/GameContext";

export default function DiceReel() {
  const { state, dispatch, rollDice, rerollDice } = useGame();
  const {
    isRolling,
    isMoving,
    lastRollValue,
    players,
    activePlayerIndex,
    activeModal,
    turnLog,
  } = state;
  const activePlayer = players[activePlayerIndex];

  const [displayNumber, setDisplayNumber] = useState(1);

  // Rapid blur reel shuffling during rolling
  useEffect(() => {
    let interval;
    if (isRolling) {
      interval = setInterval(() => {
        if (activePlayer?.inventory?.highDice) {
          const highNumbers = [4, 5, 6];
          setDisplayNumber(highNumbers[Math.floor(Math.random() * highNumbers.length)]);
        } else {
          setDisplayNumber(Math.floor(Math.random() * 6) + 1);
        }
      }, 70);
    } else if (lastRollValue) {
      setDisplayNumber(lastRollValue);
    }
    return () => clearInterval(interval);
  }, [isRolling, lastRollValue, activePlayer?.inventory?.highDice]);

  const isDisabled =
    isRolling || isMoving || !!activeModal || activePlayer.hasFinished;

  const diceCardSymbols = ["➊", "➋", "➌", "➍", "➎", "➏"];

  const handleRefereeSkipTurn = () => {
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({ type: "NEXT_TURN" });
    dispatch({
      type: "SET_NOTIFICATION",
      payload: {
        text: `⚖️ تم تخطي دور ${activePlayer.name} بواسطة الحكم`,
        type: "warning",
      },
    });
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
        background: "rgba(15, 23, 42, 0.9)",
        border: `2px solid ${activePlayer.color}66`,
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px ${activePlayer.color}22`,
        backdropFilter: "blur(16px)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Active Player Banner & Tactical Indicators */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          mb: 2,
          flexWrap: "wrap",
        }}
      >
        <Chip
          label={`دور: ${activePlayer.name}`}
          sx={{
            backgroundColor: activePlayer.color,
            color: "#FFFFFF",
            fontWeight: 900,
            fontSize: "1rem",
            py: 2,
            px: 1,
            boxShadow: `0 0 15px ${activePlayer.color}`,
          }}
          icon={
            <Typography sx={{ fontSize: "1.3rem", mr: 0.5 }}>
              {activePlayer.symbol}
            </Typography>
          }
        />

        {activePlayer.inventory?.highDice && (
          <Chip
            label="🎯 نرد الأرقام العليا مفعل [4 - 6]"
            size="small"
            sx={{
              backgroundColor: "rgba(0, 229, 255, 0.2)",
              color: "#00E5FF",
              border: "1.5px solid #00E5FF",
              fontWeight: 900,
              fontSize: "0.85rem",
              py: 1.5,
              animation: "pulse 1.5s infinite",
            }}
          />
        )}
      </Box>

      {/* Digital Dice Reel Box */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1.5,
          my: 2.5,
        }}
      >
        <motion.div
          animate={{
            scale: isRolling ? [1, 1.12, 1] : 1,
            rotate: isRolling ? [0, -5, 5, 0] : 0,
          }}
          transition={{ repeat: isRolling ? Infinity : 0, duration: 0.2 }}
        >
          <Paper
            sx={{
              width: 110,
              height: 110,
              borderRadius: 3.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
              border: `3px solid ${activePlayer.color}`,
              boxShadow: `0 0 25px ${activePlayer.color}66, inset 0 0 15px rgba(255,255,255,0.1)`,
              filter: isRolling ? "blur(1.5px)" : "none",
              transition: "filter 0.15s ease",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                color: "#FFFFFF",
                textShadow: `0 0 15px ${activePlayer.color}`,
                lineHeight: 1,
              }}
            >
              {displayNumber}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: activePlayer.color,
                fontWeight: 800,
                letterSpacing: 1,
                mt: 0.5,
              }}
            >
              {isRolling ? "جاري السحب..." : `خطوات: ${displayNumber}`}
            </Typography>
          </Paper>
        </motion.div>
      </Box>

      {/* Action Buttons: Roll Dice, Reroll & Referee Skip Turn */}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={rollDice}
          disabled={isDisabled}
          startIcon={
            isMoving ? (
              <DirectionsRunIcon sx={{ fontSize: 28 }} />
            ) : (
              <CasinoIcon sx={{ fontSize: 28 }} />
            )
          }
          sx={{
            px: 5,
            py: 1.6,
            fontSize: "1.2rem",
            fontWeight: 900,
            borderRadius: 3.5,
            background: `linear-gradient(135deg, ${activePlayer.color} 0%, #FF3D00 100%)`,
            boxShadow: `0 4px 20px ${activePlayer.color}66`,
            "&:hover": {
              background: `linear-gradient(135deg, ${activePlayer.color} 0%, #FF6D00 100%)`,
              boxShadow: `0 6px 28px ${activePlayer.color}`,
            },
            "&:disabled": {
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.3)",
            },
          }}
        >
          {isRolling
            ? "جاري تدوير القرص... 🎲"
            : isMoving
              ? "الرمز يتحرك في الخارطة... 🏃"
              : "تحريك / Roll 🎲"}
        </Button>

        {/* Tactical Reroll Button */}
        {activePlayer.inventory?.rerolls > 0 && !isDisabled && (
          <Button
            variant="contained"
            size="large"
            onClick={rerollDice}
            disabled={isRolling || isMoving}
            startIcon={<AutorenewIcon sx={{ fontSize: 26 }} />}
            sx={{
              px: 3.5,
              py: 1.6,
              fontSize: "1.05rem",
              fontWeight: 900,
              borderRadius: 3.5,
              background: "linear-gradient(135deg, #7C4DFF 0%, #E040FB 100%)",
              boxShadow: "0 4px 20px rgba(124, 77, 255, 0.4)",
              color: "#FFFFFF",
              "&:hover": {
                background: "linear-gradient(135deg, #651FFF 0%, #D500F9 100%)",
                boxShadow: "0 6px 25px rgba(224, 64, 251, 0.6)",
              },
            }}
          >
            إعادة التدوير ({activePlayer.inventory.rerolls}×) 🔄
          </Button>
        )}

        {/* Referee Turn Skip Button */}
        <Button
          variant="outlined"
          color="warning"
          size="large"
          onClick={handleRefereeSkipTurn}
          disabled={isRolling || isMoving}
          startIcon={<SkipNextIcon sx={{ fontSize: 26 }} />}
          sx={{
            px: 3.5,
            py: 1.6,
            fontSize: "1.05rem",
            fontWeight: 900,
            borderRadius: 3.5,
            borderColor: "rgba(255, 152, 0, 0.6)",
            color: "#FFB74D",
            background: "rgba(255, 152, 0, 0.05)",
            "&:hover": {
              borderColor: "#FFA726",
              backgroundColor: "rgba(255, 152, 0, 0.15)",
              boxShadow: "0 0 20px rgba(255, 152, 0, 0.35)",
            },
          }}
        >
          تخطي الدور (الحكم) ⏩
        </Button>
      </Box>

      {/* Recent Game Log */}
      {turnLog.length > 0 && (
        <Box
          sx={{
            p: 1.2,
            borderRadius: 2,
            backgroundColor: "rgba(0, 0, 0, 0.25)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            maxWidth: 550,
            mx: "auto",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              display: "block",
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            📜 {turnLog[0]}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
