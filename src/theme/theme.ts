import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1B2A4A",
      light: "#2D4373",
      dark: "#0F1A2E",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#00B894",
      light: "#55EFC4",
      dark: "#00856A",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#E74C3C",
    },
    warning: {
      main: "#F39C12",
    },
    info: {
      main: "#3498DB",
    },
    success: {
      main: "#00B894",
    },
    background: {
      default: "#F5F7FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1B2A4A",
      secondary: "#6B7C93",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    body2: {
      color: "#6B7C93",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 10,
          padding: "10px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #1B2A4A 0%, #2D4373 100%)",
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #00B894 0%, #55EFC4 100%)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          border: "1px solid #E8ECF1",
          transition: "all 0.25s ease",
          "&:hover": {
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          padding: "16px 0",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
