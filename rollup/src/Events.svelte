<script>
  import { onMount } from "svelte";
  import { BarChartSimple } from "@carbon/charts-svelte";

  let chart;

  function barMouseOver(e) {
    console.log(e.detail);
  }

  onMount(() => {
    chart.services.events.addEventListener("bar-mouseover", barMouseOver);

    return () => {
      chart?.services.events.removeEventListener("bar-mouseover", barMouseOver);
    };
  });
</script>

<BarChartSimple
  bind:chart
  data={[
    { group: "Qty", value: 65000 },
    { group: "More", value: 29123 },
    { group: "Sold", value: 35213 },
    { group: "Restocking", value: 51213 },
    { group: "Misc", value: 16932 },
  ]}
  options={{
    title: "Simple bar (discrete)",
    height: "400px",
    axes: {
      left: { mapsTo: "value" },
      bottom: { mapsTo: "group", scaleType: "labels" },
    },
  }}
/>
