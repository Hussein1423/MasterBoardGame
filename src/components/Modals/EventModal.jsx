import React, { useState, useMemo, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  Paper,
  Chip,
  Divider,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { LUCKY_BUFFS, TRAP_PENALTIES } from "../../data/questionsData";
import { useGame } from "../../context/GameContext";

export default function EventModal({ open, tile, type }) {
  const { state, resolveLucky, resolveTrap } = useGame();
  const { players, activePlayerIndex } = state;
  const activePlayer = players[activePlayerIndex];

  const isLucky = type === "LUCKY";

  const eventItem = useMemo(() => {
    if (isLucky) {
      return LUCKY_BUFFS[Math.floor(Math.random() * LUCKY_BUFFS.length)];
    } else {
      return TRAP_PENALTIES[Math.floor(Math.random() * TRAP_PENALTIES.length)];
    }
  }, [open, isLucky]);

  const [hasClaimed, setHasClaimed] = useState(false);
  const [shieldBlocked, setShieldBlocked] = useState(false);

  useEffect(() => {
    if (open) {
      setHasClaimed(false);
      setShieldBlocked(false);
    }
  }, [open]);

  const handleAction = () => {
    if (hasClaimed) return;
    setHasClaimed(true);
    if (isLucky) {
      resolveLucky(eventItem);
    } else {
      const result = resolveTrap(eventItem);
      if (result?.blockedByShield) {
        setShieldBlocked(true);
      }
    }
  };

  const hasShield = activePlayer?.inventory?.shields > 0;

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          border: isLucky ? "2px solid #E040FB" : "2px solid #FF3D00",
          boxShadow: isLucky
            ? "0 0 40px rgba(224, 64, 251, 0.4)"
            : "0 0 40px rgba(255, 61, 0, 0.4)",
          background: "linear-gradient(180deg, #0F172A 0%, #070B14 100%)",
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isLucky ? (
              <CardGiftcardIcon sx={{ color: "#E040FB", fontSize: 32 }} />
            ) : (
              <ReportProblemIcon sx={{ color: "#FF3D00", fontSize: 32 }} />
            )}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  color: isLucky ? "#E040FB" : "#FF3D00",
                }}
              >
                {isLucky
                  ? "🎁 صندوق المفاجآت السحري"
                  : "☠️ وقعت في فخ الشينوبي!"}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                الخانة: {tile?.title}
              </Typography>
            </Box>
          </Box>

          <Chip
            label={isLucky ? "مكافأة إيجابية" : "عقوبة"}
            sx={{
              backgroundColor: isLucky
                ? "rgba(224, 64, 251, 0.2)"
                : "rgba(255, 61, 0, 0.2)",
              color: isLucky ? "#E040FB" : "#FF3D00",
              fontWeight: 800,
            }}
          />
        </Box>
      </DialogTitle>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

      <DialogContent sx={{ py: 3, textAlign: "center" }}>
        {/* Player Tag */}
        <Box
          sx={{ display: "inline-flex", alignItems: "center", gap: 1, mb: 3 }}
        >
          <Paper
            sx={{
              px: 2,
              py: 0.8,
              borderRadius: 3,
              backgroundColor: `${activePlayer.color}22`,
              border: `1.5px solid ${activePlayer.color}`,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography sx={{ fontSize: "1.2rem" }}>
              {activePlayer.symbol}
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
              اللاعب: {activePlayer.name}
            </Typography>
          </Paper>
        </Box>

        {/* Big Icon Animation */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: isLucky ? [0, -5, 5, 0] : [0, 5, -5, 0],
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Box
            sx={{
              width: 100,
              height: 100,
              mx: "auto",
              mb: 2.5,
              borderRadius: 4,
              backgroundColor: isLucky
                ? "rgba(224, 64, 251, 0.15)"
                : "rgba(255, 61, 0, 0.15)",
              border: isLucky ? "2px solid #E040FB" : "2px solid #FF3D00",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isLucky
                ? "0 0 30px rgba(224, 64, 251, 0.4)"
                : "0 0 30px rgba(255, 61, 0, 0.4)",
            }}
          >
            <Typography sx={{ fontSize: "3.5rem", lineHeight: 1 }}>
              {eventItem.icon}
            </Typography>
          </Box>
        </motion.div>

        {/* Event Title & Description */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 900,
            mb: 1.5,
            color: isLucky ? "#E040FB" : "#FF5252",
          }}
        >
          {eventItem.name}
        </Typography>

        <Paper
          sx={{
            p: 2,
            mb: 2.5,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            {eventItem.description}
          </Typography>
        </Paper>

        {/* Trap Shield Defense Notice */}
        {!isLucky && (
          <Box sx={{ mb: 2 }}>
            {hasShield ? (
              <Alert
                icon={<SecurityIcon sx={{ color: "#00E676" }} />}
                severity="success"
                sx={{
                  borderRadius: 2.5,
                  backgroundColor: "rgba(0, 230, 118, 0.15)",
                  border: "1px solid #00E676",
                  color: "#00E676",
                  textAlign: "right",
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                  🛡️ لديك درع حماية نشط!
                </Typography>
                <Typography variant="caption">
                  سيتم استهلاك درع واحد وامتصاص هذا الفخ بالكامل دون التعرض لأي
                  عقوبة!
                </Typography>
              </Alert>
            ) : (
              <Alert
                severity="warning"
                sx={{ borderRadius: 2.5, textAlign: "right" }}
              >
                لا تمتلك درع حماية، سيتم تطبيق العقوبة على الفور.
              </Alert>
            )}
          </Box>
        )}

        <Button
          variant="contained"
          size="large"
          onClick={handleAction}
          disabled={hasClaimed}
          sx={{
            px: 5,
            py: 1.4,
            fontWeight: 900,
            fontSize: "1.1rem",
            borderRadius: 3,
            background: isLucky
              ? "linear-gradient(135deg, #E040FB 0%, #7C4DFF 100%)"
              : "linear-gradient(135deg, #FF3D00 0%, #D50000 100%)",
          }}
        >
          {isLucky
            ? "🎁 استلام المكافأة ومتابعة اللعب"
            : "⚠️ تنفيذ العقوبة ومتابعة اللعب"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
