import { Paper, Typography, Box, Stack, Divider, Chip } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScaleIcon from "@mui/icons-material/Scale";
import StraightenIcon from "@mui/icons-material/Straighten";
import { useQuote } from "../../hooks/useQuote";
import { COUNTRIES } from "../../types/countries";
import { memo } from "react";

function getCountryName(code?: string) {
  if (!code) return "—";
  return COUNTRIES.find((c) => c.code === code)?.name ?? code;
}

function SidebarSummaryComponent() {
  const {
    quoteData,
    isInternational,
    fetchStatus,
    couriers,
    cheapestId,
    fastestId,
  } = useQuote();

  const cheapest = couriers.find((c) => c.id === cheapestId);
  const fastest = couriers.find((c) => c.id === fastestId);

  return (
    <Paper
      sx={{
        p: 3,
        position: "sticky",
        top: 24,
        background: "linear-gradient(180deg, #1B2A4A 0%, #2D4373 100%)",
        color: "#fff",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: "#fff" }}>
        📦 Quote Summary
      </Typography>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", mb: 2 }} />

      {/* Origin */}
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="flex-start"
        sx={{ mb: 2 }}
      >
        <LocationOnIcon sx={{ color: "#55EFC4", fontSize: 20, mt: 0.3 }} />
        <Box>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
            From
          </Typography>
          <Typography variant="body2" fontWeight={600} sx={{ color: "#fff" }}>
            {quoteData.originCity || "—"},{" "}
            {getCountryName(quoteData.originCountry)}
          </Typography>
          {quoteData.originPostalCode && (
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.5)" }}
            >
              {quoteData.originPostalCode}
            </Typography>
          )}
        </Box>
      </Stack>

      {/* Destination */}
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="flex-start"
        sx={{ mb: 2 }}
      >
        <PublicIcon sx={{ color: "#55EFC4", fontSize: 20, mt: 0.3 }} />
        <Box>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
            To
          </Typography>
          <Typography variant="body2" fontWeight={600} sx={{ color: "#fff" }}>
            {quoteData.destinationCity || "—"},{" "}
            {getCountryName(quoteData.destinationCountry)}
          </Typography>
          {quoteData.destinationPostalCode && (
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.5)" }}
            >
              {quoteData.destinationPostalCode}
            </Typography>
          )}
        </Box>
      </Stack>

      {/* International badge */}
      {isInternational && (
        <Chip
          label="🌍 International Shipping"
          size="small"
          sx={{
            bgcolor: "rgba(255,255,255,0.15)",
            color: "#55EFC4",
            fontWeight: 600,
            mb: 2,
            width: "100%",
          }}
        />
      )}

      <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", mb: 2 }} />

      {/* Weight & Dimensions */}
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
        <ScaleIcon sx={{ color: "#55EFC4", fontSize: 20 }} />
        <Box>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
            Weight
          </Typography>
          <Typography variant="body2" fontWeight={600} sx={{ color: "#fff" }}>
            {quoteData.weight ? `${quoteData.weight} kg` : "—"}
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
        <StraightenIcon sx={{ color: "#55EFC4", fontSize: 20 }} />
        <Box>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
            Dimensions (L × W × H)
          </Typography>
          <Typography variant="body2" fontWeight={600} sx={{ color: "#fff" }}>
            {quoteData.length && quoteData.width && quoteData.height
              ? `${quoteData.length} × ${quoteData.width} × ${quoteData.height} cm`
              : "—"}
          </Typography>
        </Box>
      </Stack>

      {/* Results summary */}
      {fetchStatus === "success" && cheapest && fastest && (
        <>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", mb: 2 }} />
          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.6)", mb: 1 }}
          >
            Quick Insights
          </Typography>
          <Stack spacing={1} sx={{ mt: 1 }}>
            <Box
              sx={{
                bgcolor: "rgba(243,156,18,0.2)",
                borderRadius: 2,
                p: 1.5,
              }}
            >
              <Typography variant="caption" sx={{ color: "#F39C12" }}>
                💰 Cheapest
              </Typography>
              <Typography
                variant="body2"
                fontWeight={700}
                sx={{ color: "#fff" }}
              >
                {cheapest.name} — ${cheapest.totalPrice.toFixed(2)}
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "rgba(52,152,219,0.2)",
                borderRadius: 2,
                p: 1.5,
              }}
            >
              <Typography variant="caption" sx={{ color: "#3498DB" }}>
                ⚡ Fastest
              </Typography>
              <Typography
                variant="body2"
                fontWeight={700}
                sx={{ color: "#fff" }}
              >
                {fastest.name} — {fastest.estimatedDays} day
                {fastest.estimatedDays !== 1 ? "s" : ""}
              </Typography>
            </Box>
          </Stack>
        </>
      )}
    </Paper>
  );
}

export const SidebarSummary = memo(SidebarSummaryComponent);
