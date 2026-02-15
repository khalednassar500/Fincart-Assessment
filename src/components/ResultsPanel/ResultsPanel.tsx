import {
  Typography,
  Box,
  Grid,
  Fade,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useQuote } from "../../hooks/useQuote";
import { CourierCard } from "../CourierCard";
import { LoadingState } from "../LoadingState";
import { EmptyState } from "../EmptyState";
import { ErrorState } from "../ErrorState";

export function ResultsPanel() {
  const { fetchStatus, couriers, cheapestId, fastestId, resetQuoteData } =
    useQuote();

  if (fetchStatus === "idle") {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 10,
          px: 3,
          opacity: 0.5,
        }}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          📮
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Fill out the form to get instant courier quotes
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Compare rates from top carriers worldwide
        </Typography>
      </Box>
    );
  }

  if (fetchStatus === "loading") {
    return (
      <Fade in timeout={300}>
        <Box>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
            Finding best rates...
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Comparing prices from multiple carriers
          </Typography>
          <LoadingState />
        </Box>
      </Fade>
    );
  }

  if (fetchStatus === "error") {
    return <ErrorState />;
  }

  if (fetchStatus === "empty") {
    return <EmptyState />;
  }

  // Success
  return (
    <Fade in timeout={400}>
      <Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ mb: 3 }}
          spacing={2}
        >
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Available Couriers
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
              <Chip
                label={`${couriers.length} options found`}
                size="small"
                color="success"
                variant="outlined"
              />
            </Stack>
          </Box>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={resetQuoteData}
            size="small"
          >
            New Quote
          </Button>
        </Stack>

        <Grid container spacing={2.5}>
          {couriers.map((courier) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}
              key={courier.id}
            >
              <CourierCard
                courier={courier}
                isCheapest={courier.id === cheapestId}
                isFastest={courier.id === fastestId}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fade>
  );
}
