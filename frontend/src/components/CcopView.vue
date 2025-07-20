<template>
    <form v-if="!costResult && !loader" @submit.prevent="getCostEstimate" class="flex flex-col gap-4 bg-white rounded-[8px] p-6 mb-4">
        <label for="cloud-provider">Cloud Provider</label>
        <select v-model="reqBody.provider" name="cloud-provider" id="cloud-provider">
            <option value="aws">AWS</option>
            <option value="gcp">GCP</option>
        </select>
        <label for="instance-type">Instance Type</label>
        <select v-model="reqBody.instanceType" name="instance-type" id="instance-type">
            <option v-for="instance in instanceTypeOptions[reqBody.provider]" :key="instance" :value="instance">{{ instance }}</option>
        </select>
        <label for="region">Region</label>
        <select v-model="reqBody.region" name="region" id="region">
            <option value="us-east-1">us-east-1</option>
            <option value="us-central1">us-central1</option>
        </select>
        <label for="instance-hours-pm">Instance Hours per Month</label>
        <input v-model="reqBody.hours" type="text" class="w-full" placeholder="Enter Instance Hours Per Month" id="instance-hours-pm" name="instance-hours-pm">
        <label for="storage-type">Storage Type</label>
        <select v-model="reqBody.storageType" name="storage-type" id="storage-type">
            <option value="ssd">SSD</option>
            <option value="hdd">HDD</option>
        </select>
        <label for="storage-size">Storage Size (GB)</label>
        <input v-model="reqBody.storageGB" type="text" class="w-full" placeholder="Enter Storage Size" id="storage-size" name="storage-size">
        <label for="outbound-bandwith">Outbound Bandwith (GB)</label>
        <input v-model="reqBody.bandwidthGB" type="text" class="w-full" placeholder="Enter Outbound Bandwith" id="outbound-bandwith" name="outbound-bandwith">
        <button class="outline-none border-2 border-[#7531FA] rounded-[8px] bg-white px-4 py-2 cursor-pointer text-[#7531FA] mt-4 w-full hover:bg-[#7531FA] hover:text-white transition-all">Submit</button>
    </form>
    <div v-if="costResult && !loader" class="bg-white rounded-[8px] p-6 w-full">
        <CostChart :costData="costResult" />
    </div>
    <div v-if="loader" class="flex justify-center rounded-[8px] p-6 w-[100px] absolute top-[calc(50%-68px)] left-[50%]">
        <div class="spinner"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import CostChart from './CostChart.vue'

let reqBody = ref({
    provider: 'aws',
    instanceType: 't2.micro',
    region: 'us-east-1',
    hours: '730',
    storageType: 'ssd',
    storageGB: '1024',
    bandwidthGB: '1024'
})

const costResult = ref(null)

const instanceTypeOptions = ref({
    aws: ['t2.micro', 't2.small', 't2.medium'],
    gcp: ['n1-standard-1', 'e2-micro', 'e2-small']
})

let loader = ref(false)

const getCostEstimate = async () => {
    loader.value = true
    try {
        const response = await axios.post('https://cloud-cost-optimization-project.onrender.com/api/estimate', reqBody.value, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = response.data
        costResult.value = result
    } catch (error) {
        console.error(error)
    }
    loader.value = false
}
</script>

<style lang="css">
input, select {
  outline: none;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 8px 12px;
}
select::after {
    margin-right: 10px;
    appearance: none;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top: 4px solid #7531FA;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>