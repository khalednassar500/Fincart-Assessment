import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Box,
  Fade,
  InputAdornment,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { packageSchema, type PackageFormData } from "../../schemas/quoteSchema";
import { useQuote } from "../../hooks/useQuote";
import { memo } from "react";

function PackageStepComponent() {
  const {
    quoteData,
    updateQuoteData,
    setActiveStep,
    searchCouriers,
    fetchStatus,
  } = useQuote();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PackageFormData>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      weight: quoteData.weight ?? ("" as unknown as number),
      length: quoteData.length ?? ("" as unknown as number),
      width: quoteData.width ?? ("" as unknown as number),
      height: quoteData.height ?? ("" as unknown as number),
    },
  });

  const onSubmit = async (data: PackageFormData) => {
    updateQuoteData(data);
    await searchCouriers(data);
  };

  return (
    <Fade in timeout={400}>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <InventoryIcon sx={{ color: "primary.main", fontSize: 28 }} />
          <Typography variant="h5" color="primary.main">
            Package Dimensions
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Enter the weight and dimensions of your package.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2.5}>
            <Controller
              name="weight"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value === "" ? "" : +e.target.value)
                  }
                  label="Weight"
                  type="number"
                  error={!!errors.weight}
                  helperText={errors.weight?.message}
                  fullWidth
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">kg</InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />
            <Stack direction="row" spacing={2}>
              <Controller
                name="length"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? "" : +e.target.value
                      )
                    }
                    label="Length"
                    type="number"
                    error={!!errors.length}
                    helperText={errors.length?.message}
                    fullWidth
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">cm</InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="width"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? "" : +e.target.value
                      )
                    }
                    label="Width"
                    type="number"
                    error={!!errors.width}
                    helperText={errors.width?.message}
                    fullWidth
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">cm</InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="height"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? "" : +e.target.value
                      )
                    }
                    label="Height"
                    type="number"
                    error={!!errors.height}
                    helperText={errors.height?.message}
                    fullWidth
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">cm</InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => setActiveStep("destination")}
                sx={{ flex: 1 }}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<SearchIcon />}
                disabled={fetchStatus === "loading"}
                sx={{ flex: 2 }}
              >
                {fetchStatus === "loading"
                  ? "Searching..."
                  : "Get Courier Quotes"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Fade>
  );
}

export const PackageStep = memo(PackageStepComponent);
