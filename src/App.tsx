import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  Fab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { useState } from "react";
import { QuoteForm } from "./components/QuoteForm";
import { SidebarSummary } from "./components/SidebarSummary";
import { ResultsPanel } from "./components/ResultsPanel";

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* App Bar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#fff",
          borderBottom: "1px solid #E8ECF1",
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: "linear-gradient(135deg, #1B2A4A 0%, #00B894 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: 16,
              }}
            >
              F
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: "primary.main",
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              Fincart
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              ml: 2,
              color: "text.secondary",
              display: { xs: "none", sm: "block" },
            }}
          >
            Quick Quote Engine
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer for Sidebar */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{ sx: { width: 300, p: 0 } }}
        >
          <SidebarSummary />
        </Drawer>
      )}

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {/* Sidebar - Desktop only */}
          {!isMobile && (
            <Grid size={{ md: 3 }}>
              <SidebarSummary />
            </Grid>
          )}

          {/* Form */}
          <Grid size={{ xs: 12, md: isMobile ? 12 : 4 }}>
            <QuoteForm />
          </Grid>

          {/* Results */}
          <Grid size={{ xs: 12, md: isMobile ? 12 : 5 }}>
            <ResultsPanel />
          </Grid>
        </Grid>
      </Container>

      {/* Mobile FAB for summary */}
      {isMobile && (
        <Fab
          color="primary"
          onClick={() => setDrawerOpen(true)}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <SummarizeIcon />
        </Fab>
      )}
    </Box>
  );
}

export default App;
