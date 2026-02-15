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
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { originSchema, type OriginFormData } from "../../schemas/quoteSchema";
import { COUNTRIES } from "../../types/countries";
import { useQuote } from "../../hooks/useQuote";
import { memo } from "react";

function OriginStepComponent() {
  const { quoteData, updateQuoteData, setActiveStep } = useQuote();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OriginFormData>({
    resolver: zodResolver(originSchema),
    defaultValues: {
      originCountry: quoteData.originCountry ?? "",
      originCity: quoteData.originCity ?? "",
      originPostalCode: quoteData.originPostalCode ?? "",
    },
  });

  const onSubmit = (data: OriginFormData) => {
    updateQuoteData(data);
    setActiveStep("destination");
  };

  return (
    <Fade in timeout={400}>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <FlightTakeoffIcon sx={{ color: "primary.main", fontSize: 28 }} />
          <Typography variant="h5" color="primary.main">
            Origin Details
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Where is the package shipping from?
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2.5}>
            <Controller
              name="originCountry"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Country"
                  error={!!errors.originCountry}
                  helperText={errors.originCountry?.message}
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
              name="originCity"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  error={!!errors.originCity}
                  helperText={errors.originCity?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="originPostalCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Postal Code"
                  error={!!errors.originPostalCode}
                  helperText={errors.originPostalCode?.message}
                  fullWidth
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 1 }}
            >
              Continue to Destination
            </Button>
          </Stack>
        </form>
      </Box>
    </Fade>
  );
}

export const OriginStep = memo(OriginStepComponent);
