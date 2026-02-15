import { Stepper, Step, StepLabel, Paper, Box } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useQuote } from "../../hooks/useQuote";
import { OriginStep } from "./OriginStep";
import { DestinationStep } from "./DestinationStep";
import { PackageStep } from "./PackageStep";
import type { QuoteStep } from "../../types/courier";

const STEPS: { key: QuoteStep; label: string; icon: React.ReactElement }[] = [
  { key: "origin", label: "Origin", icon: <FlightTakeoffIcon /> },
  { key: "destination", label: "Destination", icon: <FlightLandIcon /> },
  { key: "package", label: "Package", icon: <InventoryIcon /> },
];

export function QuoteForm() {
  const { activeStep } = useQuote();

  const activeIndex = STEPS.findIndex((s) => s.key === activeStep);

  return (
    <Paper sx={{ p: { xs: 2.5, md: 4 }, height: "100%" }}>
      <Box sx={{ mb: 3 }}>
        <Stepper activeStep={activeIndex} alternativeLabel>
          {STEPS.map((step) => (
            <Step key={step.key}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {activeStep === "origin" && <OriginStep />}
      {activeStep === "destination" && <DestinationStep />}
      {activeStep === "package" && <PackageStep />}
    </Paper>
  );
}
