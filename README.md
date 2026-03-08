# 🚦 Safe-Travel

### Community Powered Safety Navigation

Safe-Travel is a **community-driven safety navigation platform** that helps users choose **safer routes while traveling**.  
Instead of only showing the shortest path, Safe-Travel analyzes **community reviews, safety reports, and real-time feedback** to classify areas as **Green, Orange, or Red zones**.

The goal is to help people **travel safely by avoiding risky areas and choosing safer routes**.

---

## 🌍 Problem

Most navigation systems like Google Maps focus on:

- Shortest distance
- Fastest route
- Traffic conditions

But they **do not consider safety factors** such as:

- Crime-prone areas
- Unsafe roads
- Poor lighting
- Harassment reports
- Dangerous neighborhoods

People often unknowingly travel through **unsafe locations**.

Safe-Travel solves this problem by **crowdsourcing safety intelligence from the community**.

---

## 💡 Solution

Safe-Travel integrates with **Google Maps** and uses **user reviews + AI analysis** to identify safe and unsafe areas.

The system classifies locations into **three safety zones**:

🟢 **Green Zone** – Safe area  
🟠 **Orange Zone** – Moderate risk / caution  
🔴 **Red Zone** – Unsafe area

Zones change dynamically based on:

- User reviews
- Verified reports
- Local traveler feedback
- News data

---

## 🧠 How It Works

1. Users travel through areas.
2. They leave **safety feedback** about locations or routes.
3. The system analyzes feedback using **keyword detection and sentiment analysis**.
4. Areas are marked as **Green, Orange, or Red zones**.
5. Routes are suggested based on **safety instead of just distance**.

---

## 🚀 Key Features

### 🗺️ Safety Zone Mapping
Locations are displayed on the map using safety colors.

- Green → Safe
- Orange → Caution
- Red → Unsafe

---

### 📍 Google Maps Integration

- Route navigation
- Safety-based path suggestions
- Avoid dangerous zones
- Show safest route available

---

### 👥 Community Reviews

Users can report safety issues such as:

- Crime or robbery
- Harassment
- Unsafe roads
- Poor lighting
- Suspicious activity
- Bad behavior

The system analyzes **keywords and sentiment** to determine safety levels.

---

### 🔐 Verified User System

Higher credibility feedback from:

- Verified users
- Local residents
- Frequent travelers

These reports influence zone classification more strongly.

---

### 📰 Safety Blogs & Reports

Each **Red or Orange zone** includes:

- Explanation of risk
- Incident reports
- Community discussions
- Safety advice

---

### ⏱️ Time-Based Safety

Areas may change safety level depending on time.

Example:

| Time | Safety Zone |
|-----|-------------|
| Day | Green |
| Evening | Orange |
| Night | Red |

---

### 🏪 Shop & Business Safety

Shops and businesses can also be tagged:

- Safe location
- Suspicious activity
- Unsafe environment

---

## 🏗️ Tech Stack

### Frontend
- React
- JavaScript
- Google Maps API
- Tailwind / CSS

### Backend
- Spring Boot / Node.js
- REST APIs

### Database
- MongoDB / PostgreSQL

### AI / Data Analysis
- Sentiment Analysis
- Keyword Detection
- Safety Score Algorithm

---

## 📊 Safety Classification Logic
