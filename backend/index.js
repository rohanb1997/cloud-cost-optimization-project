const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// Dummy pricing data for estimation
const dummyPricing = {
  aws: {
    computeRates: {
      't2.micro': 0.0116,
      't2.small': 0.023,
      't2.medium': 0.0464
    },
    storage: {
      ssd: 0.10,
      hdd: 0.05
    },
    bandwidth: 0.09
  },
  gcp: {
    computeRates: {
      'n1-standard-1': 0.0475,
      'e2-micro': 0.0076,
      'e2-small': 0.015
    },
    storage: {
      ssd: 0.12,
      hdd: 0.06
    },
    bandwidth: 0.12
  }
}

// Estimate cost endpoint
app.post('/api/estimate', (req, res) => {
  const { provider, instanceType, hours, storageType, storageGB, bandwidthGB } = req.body

  try {
    if (!dummyPricing[provider]) {
      return res.status(400).json({ error: 'Invalid provider' })
    }

    const computeRate = parseFloat(dummyPricing[provider].computeRates[instanceType]) || 0.025
    const storageRate = parseFloat(dummyPricing[provider].storage[storageType]) || 0.1
    const bandwidthRate = parseFloat(dummyPricing[provider].bandwidth) || 0.1

    const computeHours = Number.isFinite(Number(hours)) ? Number(hours) : 0
    const storageAmount = Number.isFinite(Number(storageGB)) ? Number(storageGB) : 0
    const bandwidthAmount = Number.isFinite(Number(bandwidthGB)) ? Number(bandwidthGB) : 0

    const computeCost = computeHours * computeRate
    const storageCost = storageAmount * storageRate
    const bandwidthCost = bandwidthAmount * bandwidthRate

    const totalCost = (computeCost + storageCost + bandwidthCost).toFixed(2)

    const suggestions = []

    if (computeHours >= 600) {
      suggestions.push('Consider using Reserved Instances or Savings Plans for long-running workloads.')
    }

    if (bandwidthAmount >= 100) {
      suggestions.push('Consider using a CDN or checking for regions with lower outbound data costs.')
    }

    if (storageRate >= 0.1 && storageAmount > 50) {
      suggestions.push('Switching from SSD to HDD may reduce storage costs.')
    }

    res.json({
      estimatedCost: totalCost,
      breakdown: {
        compute: computeCost.toFixed(2),
        storage: storageCost.toFixed(2),
        bandwidth: bandwidthCost.toFixed(2)
      },
      suggestions
    })

  } catch (err) {
    console.error('Estimation error:', err.message)
    res.status(500).json({ error: 'Estimation failed' })
  }
})

app.listen(5000, () => {
  console.log('Backend running at http://localhost:5000')
})