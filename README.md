# ☁️ Cloud Cost Optimization Tool

A modern web tool to **estimate cloud infrastructure costs** across AWS and GCP. Input your configuration to get a visual cost breakdown and actionable cost-saving suggestions.

---

## 📸 Preview

> A responsive UI with cost breakdown charts, form input, and smart tips to help reduce cloud spend.

---

## 🧰 Tech Stack

- **Frontend**: Vue 3 + Vite + Tailwind CSS + Chart.js (via vue-chartjs)
- **Backend**: Node.js + Express (with dummy pricing logic)
- **Chart**: Doughnut chart to visualize cost distribution

---

## 🧱 Project Structure

```
cloud-cost-optimization-project/
├── backend/            # Node.js Express API
│   └── index.js
├── frontend/           # Vue 3 App
│   ├── components/
│   │   └── CostChart.vue
│   ├── App.vue
│   └── main.js
├── README.md
└── .gitignore
```

---

## 🚦 Requirements

- Node.js `v16+`
- npm `v8+`
- Git (for version control)

---

## ✨ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rohanb1997/cloud-cost-optimization-project.git
cd cloud-cost-optimization-project
```

---

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 3. Run the Project

#### Start Backend (API Server on Port 5000)

```bash
cd backend
node index.js
```

This starts the Express server at `http://localhost:5000`

#### Start Frontend (Vite Dev Server on Port 5173)

```bash
cd ../frontend
npm run dev
```

Now open your browser at: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Example Payload (Backend API: `/api/estimate`)

```json
{
  "provider": "aws",
  "instanceType": "t2.micro",
  "region": "us-east-1",
  "hours": "730",
  "storageType": "ssd",
  "storageGB": "60",
  "bandwidthGB": "150"
}
```

---

## 💡 Cost-Saving Suggestions

The app may recommend the following based on usage:

- ✅ Use Reserved Instances for workloads > 600 hours/month
- ✅ Switch from SSD to HDD if high storage capacity is used
- ✅ Use CDN or a different region to optimize bandwidth cost

---

## 📊 Features

- Visual breakdown using Doughnut Chart
- Real-time form-based cost estimator
- Auto-generated cost optimization tips
- Simple UX with modern design
- Uses dummy data (easily extendable to real cloud APIs)

---

## 🤛🏼 Author

Created with 💜 by [@rohanb1997](https://github.com/rohanb1997)
