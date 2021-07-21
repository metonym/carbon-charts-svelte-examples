<script>
  import { onMount } from "svelte";
  import { BarChartSimple } from "@carbon/charts-svelte";
  import "@carbon/charts/styles.min.css";

  let chart;

  function barMouseOver(e) {
    console.log(e.detail);
  }

  onMount(() => {
    return () => {
      if (chart)
        chart.services.events.removeEventListener(
          "bar-mouseover",
          barMouseOver
        );
    };
  });

  $: if (chart)
    chart.services.events.addEventListener("bar-mouseover", barMouseOver);
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
