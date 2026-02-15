import { Box, Typography, Button, Alert } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useQuote } from "../../hooks/useQuote";

export function ErrorState() {
  const { errorMessage, searchCouriers, resetQuoteData } = useQuote();

  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
        px: 3,
      }}
    >
      <ErrorOutlineIcon
        sx={{
          fontSize: 72,
          color: "error.main",
          opacity: 0.7,
          mb: 2,
        }}
      />
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Something Went Wrong
      </Typography>
      <Alert
        severity="error"
        sx={{ mb: 3, maxWidth: 480, mx: "auto", textAlign: "left" }}
      >
        {errorMessage ||
          "An unexpected error occurred while fetching courier rates."}
      </Alert>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, maxWidth: 400, mx: "auto" }}
      >
        This could be a temporary issue with one of the courier rate services.
        Please try again in a moment.
      </Typography>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <Button variant="contained" onClick={() => searchCouriers()}>
          Retry
        </Button>
        <Button variant="outlined" onClick={resetQuoteData}>
          Start Over
        </Button>
      </Box>
    </Box>
  );
}
