import { memo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  Divider,
  Button,
  Rating,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import type { Courier } from "../../types/courier";

interface CourierCardProps {
  courier: Courier;
  isCheapest: boolean;
  isFastest: boolean;
}

function CourierCardComponent({
  courier,
  isCheapest,
  isFastest,
}: CourierCardProps) {
  const getBorderColor = () => {
    if (isCheapest && isFastest) return "#00B894";
    if (isFastest) return "#3498DB";
    if (isCheapest) return "#F39C12";
    return "#E8ECF1";
  };

  return (
    <Card
      sx={{
        position: "relative",
        borderTop: `4px solid ${getBorderColor()}`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Badges */}
      {(isCheapest || isFastest) && (
        <Stack
          direction="row"
          spacing={0.8}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
          }}
        >
          {isCheapest && (
            <Chip
              label="Cheapest"
              size="small"
              sx={{
                bgcolor: "#F39C12",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.7rem",
              }}
            />
          )}
          {isFastest && (
            <Chip
              label="Fastest"
              size="small"
              sx={{
                bgcolor: "#3498DB",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.7rem",
              }}
            />
          )}
        </Stack>
      )}

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Header: Logo + Name */}
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
          <Box
            sx={{
              fontSize: 32,
              width: 48,
              height: 48,
              borderRadius: "12px",
              bgcolor: "background.default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {courier.logo}
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>
              {courier.name}
            </Typography>
            <Rating
              value={courier.rating}
              precision={0.1}
              size="small"
              readOnly
            />
          </Box>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* Pricing */}
        <Box sx={{ mb: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mb: 0.5 }}
          >
            <Typography variant="body2">Base Price</Typography>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              ${courier.basePrice.toFixed(2)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="body2">Tax & Surcharges</Typography>
            <Typography variant="body2" color="error.main" fontWeight={500}>
              +${courier.tax.toFixed(2)}
            </Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1" fontWeight={700}>
              Total
            </Typography>
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{
                color: isCheapest ? "warning.main" : "primary.main",
              }}
            >
              ${courier.totalPrice.toFixed(2)}
            </Typography>
          </Stack>
        </Box>

        {/* Delivery */}
        <Box
          sx={{
            bgcolor: "background.default",
            borderRadius: 2,
            p: 1.5,
            mb: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <AccessTimeIcon
              sx={{
                color: isFastest ? "info.main" : "text.secondary",
                fontSize: 20,
              }}
            />
            <Box>
              <Typography variant="body2" fontWeight={600} color="text.primary">
                {courier.estimatedDays} business day
                {courier.estimatedDays !== 1 ? "s" : ""}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Est. arrival: {courier.deliveryDate}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Features */}
        <Stack spacing={0.8}>
          {courier.features.map((feature) => (
            <Stack
              key={feature}
              direction="row"
              alignItems="center"
              spacing={0.8}
            >
              <CheckCircleOutlineIcon
                sx={{ fontSize: 16, color: "success.main" }}
              />
              <Typography variant="caption" color="text.secondary">
                {feature}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          variant={isCheapest || isFastest ? "contained" : "outlined"}
          fullWidth
          startIcon={<LocalShippingIcon />}
          color={isCheapest || isFastest ? "secondary" : "primary"}
          sx={{ fontWeight: 600 }}
        >
          Select Courier
        </Button>
      </Box>
    </Card>
  );
}

export const CourierCard = memo(CourierCardComponent);
