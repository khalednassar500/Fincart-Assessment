import { Card, CardContent, Skeleton, Stack, Box, Grid } from "@mui/material";
import { memo } from "react";

function SkeletonCardComponent() {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
          <Skeleton variant="rounded" width={48} height={48} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="40%" height={20} />
          </Box>
        </Stack>
        <Skeleton variant="rectangular" height={1} sx={{ mb: 2 }} />
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="60%" height={32} />
        </Stack>
        <Skeleton variant="rounded" height={44} sx={{ mb: 2 }} />
        <Stack spacing={0.8}>
          <Skeleton variant="text" width="80%" height={16} />
          <Skeleton variant="text" width="70%" height={16} />
          <Skeleton variant="text" width="60%" height={16} />
        </Stack>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Skeleton variant="rounded" height={40} />
      </Box>
    </Card>
  );
}

const SkeletonCard = memo(SkeletonCardComponent);

export function LoadingState() {
  return (
    <Grid container spacing={3}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={i}>
          <SkeletonCard />
        </Grid>
      ))}
    </Grid>
  );
}
