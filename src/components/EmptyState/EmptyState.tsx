import { Box, Typography, Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useQuote } from "../../hooks/useQuote";

export function EmptyState() {
  const { resetQuoteData } = useQuote();

  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        px: 3,
      }}
    >
      <SearchOffIcon
        sx={{
          fontSize: 80,
          color: "text.secondary",
          opacity: 0.4,
          mb: 2,
        }}
      />
      <Typography variant="h5" gutterBottom fontWeight={600}>
        No Couriers Available
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 3, maxWidth: 400, mx: "auto" }}
      >
        Unfortunately, no courier services are available for this route. Please
        try a different origin or destination.
      </Typography>
      <Button variant="contained" onClick={resetQuoteData}>
        Start New Quote
      </Button>
    </Box>
  );
}
