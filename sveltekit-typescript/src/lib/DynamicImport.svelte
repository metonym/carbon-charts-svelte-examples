<script lang="ts">
  import { onMount, type ComponentType } from "svelte";
  import type { BarChartOptions, ScaleTypes } from "@carbon/charts-svelte";

  let chart: ComponentType<import("@carbon/charts-svelte").BarChartSimple>;

  const options: BarChartOptions = {
    title: "Simple bar (discrete)",
    height: "400px",
    axes: {
      left: { mapsTo: "value" },
      bottom: { mapsTo: "group", scaleType: "labels" as ScaleTypes.LABELS },
    },
  };

  onMount(async () => {
    const charts = await import("@carbon/charts-svelte");
    chart = charts.BarChartSimple;
  });
</script>

<svelte:component
  this={chart}
  data={[
    { group: "Qty", value: 65000 },
    { group: "More", value: 29123 },
    { group: "Sold", value: 35213 },
    { group: "Restocking", value: 51213 },
    { group: "Misc", value: 16932 },
  ]}
  {options}
/>
