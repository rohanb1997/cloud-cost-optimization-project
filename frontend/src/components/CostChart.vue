<template>
  <div class="w-full flex flex-col items-center gap-4">
    <Doughnut :data="chartData" :options="chartOptions" />
    <div v-if="costData.suggestions?.length" class="mt-4 p-4 bg-yellow-100 border border-yellow-300 text-sm text-gray-800 rounded-lg">
      <h4 class="font-semibold mb-2">Cost-Saving Suggestions</h4>
      <ul class="list-disc list-inside space-y-1">
        <li v-for="(tip, index) in costData.suggestions" :key="index">{{ tip }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps({
  costData: Object
})

const { breakdown } = props.costData

const chartData = {
  labels: ['Compute', 'Storage', 'Bandwidth'],
  datasets: [
    {
      label: 'Cost Breakdown ($)',
      backgroundColor: ['#4B9CD3', '#90C290', '#FFC857'],
      data: [
        parseFloat(breakdown.compute),
        parseFloat(breakdown.storage),
        parseFloat(breakdown.bandwidth)
      ]
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 16,
        boxHeight: 12,
        boxWidth: 12,
        generateLabels: (chart) => {
          const dataset = chart.data.datasets[0];
          return chart.data.labels.map((label, i) => ({
            text: `${label}: $${dataset.data[i].toFixed(2)}`,
            fillStyle: dataset.backgroundColor[i],
            strokeStyle: dataset.backgroundColor[i],
            pointStyle: 'circle',
            index: i
          }));
        }
      }
    },
    title: {
      display: true,
      text: `Total Estimated Cost: $${(
        parseFloat(breakdown.compute) +
        parseFloat(breakdown.storage) +
        parseFloat(breakdown.bandwidth)
      ).toFixed(2)}`,
      font: {
        size: 16
      },
      padding: {
        top: 10,
        bottom: 10
      }
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const label = context.label || '';
          const value = context.raw || 0;
          return `${label}: $${value.toFixed(2)}`;
        }
      }
    }
  }
}
</script>