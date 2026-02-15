import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  MenuItem,
  Button,
  Stack,
  Typography,
  Box,
  Fade,
} from "@mui/material";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  destinationSchema,
  type DestinationFormData,
} from "../../schemas/quoteSchema";
import { COUNTRIES } from "../../types/countries";
import { useQuote } from "../../hooks/useQuote";
import { memo } from "react";

function DestinationStepComponent() {
  const { quoteData, updateQuoteData, setActiveStep } = useQuote();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DestinationFormData>({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      destinationCountry: quoteData.destinationCountry ?? "",
      destinationCity: quoteData.destinationCity ?? "",
      destinationPostalCode: quoteData.destinationPostalCode ?? "",
    },
  });

  const onSubmit = (data: DestinationFormData) => {
    updateQuoteData(data);
    setActiveStep("package");
  };

  return (
    <Fade in timeout={400}>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <FlightLandIcon sx={{ color: "primary.main", fontSize: 28 }} />
          <Typography variant="h5" color="primary.main">
            Destination Details
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Where should the package be delivered?
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2.5}>
            <Controller
              name="destinationCountry"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Country"
                  error={!!errors.destinationCountry}
                  helperText={errors.destinationCountry?.message}
                  fullWidth
                >
                  {COUNTRIES.map((c) => (
                    <MenuItem key={c.code} value={c.code}>
                      {c.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="destinationCity"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  error={!!errors.destinationCity}
                  helperText={errors.destinationCity?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="destinationPostalCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Postal Code"
                  error={!!errors.destinationPostalCode}
                  helperText={errors.destinationPostalCode?.message}
                  fullWidth
                />
              )}
            />
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => setActiveStep("origin")}
                sx={{ flex: 1 }}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ flex: 2 }}
              >
                Continue to Package
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Fade>
  );
}

export const DestinationStep = memo(DestinationStepComponent);
