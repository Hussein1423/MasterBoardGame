import { createTheme } from "@mui/material/styles";

export const animeColors = {
  konoha: {
    primary: "#FF6B00",
    secondary: "#FFA726",
    accent: "#4CAF50",
    bg: "linear-gradient(135deg, rgba(255, 107, 0, 0.15) 0%, rgba(76, 175, 80, 0.1) 100%)",
    border: "#FF8A3D",
    glow: "0 0 15px rgba(255, 107, 0, 0.5)",
  },
  wholeCake: {
    primary: "#E91E63",
    secondary: "#FF4081",
    accent: "#FFD54F",
    bg: "linear-gradient(135deg, rgba(233, 30, 99, 0.15) 0%, rgba(255, 213, 79, 0.1) 100%)",
    border: "#FF5983",
    glow: "0 0 15px rgba(233, 30, 99, 0.5)",
  },
  paradis: {
    primary: "#00E5FF",
    secondary: "#00B0FF",
    accent: "#76FF03",
    bg: "linear-gradient(135deg, rgba(0, 229, 255, 0.15) 0%, rgba(118, 255, 3, 0.1) 100%)",
    border: "#29B6F6",
    glow: "0 0 15px rgba(0, 229, 255, 0.5)",
  },
  tileTypes: {
    quiz: {
      color: "#00E5FF",
      bg: "rgba(0, 229, 255, 0.12)",
      border: "rgba(0, 229, 255, 0.4)",
      glow: "0 0 12px rgba(0, 229, 255, 0.4)",
    },
    challenge: {
      color: "#FFD700",
      bg: "rgba(255, 215, 0, 0.12)",
      border: "rgba(255, 215, 0, 0.4)",
      glow: "0 0 12px rgba(255, 215, 0, 0.4)",
    },
    lucky: {
      color: "#E040FB",
      bg: "rgba(224, 64, 251, 0.12)",
      border: "rgba(224, 64, 251, 0.4)",
      glow: "0 0 12px rgba(224, 64, 251, 0.4)",
    },
    trap: {
      color: "#FF3D00",
      bg: "rgba(255, 61, 0, 0.15)",
      border: "rgba(255, 61, 0, 0.5)",
      glow: "0 0 12px rgba(255, 61, 0, 0.5)",
    },
    safe: {
      color: "#00E676",
      bg: "rgba(0, 230, 118, 0.12)",
      border: "rgba(0, 230, 118, 0.4)",
      glow: "0 0 12px rgba(0, 230, 118, 0.4)",
    },
  },
};

export const animeTheme = createTheme({
  direction: "rtl",
  palette: {
    mode: "dark",
    primary: {
      main: "#FF7A00",
      light: "#FF9E40",
      dark: "#C44E00",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#00E5FF",
      light: "#6EFFFF",
      dark: "#00B2CC",
      contrastText: "#0A0F1D",
    },
    success: {
      main: "#00E676",
      light: "#66FFA6",
      dark: "#00B248",
    },
    error: {
      main: "#FF1744",
      light: "#FF616F",
      dark: "#C4001D",
    },
    warning: {
      main: "#FFD700",
      light: "#FFE54C",
      dark: "#C7A600",
    },
    info: {
      main: "#D500F9",
      light: "#E14CFA",
      dark: "#9E00C5",
    },
    background: {
      default: "#070B14",
      paper: "rgba(15, 23, 42, 0.85)",
    },
    text: {
      primary: "#F8FAFC",
      secondary: "#94A3B8",
    },
  },
  typography: {
    fontFamily: '"Cairo", "Tajawal", "Segoe UI", Roboto, sans-serif',
    h1: { fontWeight: 900, letterSpacing: "-0.5px" },
    h2: { fontWeight: 800, letterSpacing: "-0.5px" },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    button: { fontWeight: 700, textTransform: "none" },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#070B14",
          color: "#F8FAFC",
          fontFamily: '"Cairo", "Tajawal", "Segoe UI", Roboto, sans-serif',
          backgroundImage: `
            radial-gradient(circle at 15% 15%, rgba(255, 107, 0, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 85% 20%, rgba(233, 30, 99, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 50% 85%, rgba(0, 229, 255, 0.08) 0%, transparent 50%),
            linear-gradient(180deg, #070B14 0%, #0B1120 50%, #070B14 100%)
          `,
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          overflowX: "hidden",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "8px 22px",
          fontWeight: 700,
          boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #FF7A00 0%, #FF3D00 100%)",
          boxShadow: "0 4px 16px rgba(255, 122, 0, 0.35)",
          "&:hover": {
            background: "linear-gradient(135deg, #FF8A20 0%, #FF521A 100%)",
            boxShadow: "0 6px 24px rgba(255, 122, 0, 0.55)",
          },
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #00E5FF 0%, #0091EA 100%)",
          color: "#070B14",
          boxShadow: "0 4px 16px rgba(0, 229, 255, 0.35)",
          "&:hover": {
            background: "linear-gradient(135deg, #33EBFF 0%, #1DA1F2 100%)",
            boxShadow: "0 6px 24px rgba(0, 229, 255, 0.55)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(15, 23, 42, 0.92)",
          backdropFilter: "blur(20px)",
          borderRadius: 20,
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7)",
        },
      },
    },
  },
});
