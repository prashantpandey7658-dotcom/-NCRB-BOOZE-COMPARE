# Comprehensive Project Documentation: NCRB BOOZE COMPARE

**Author:** Prashant Pandey  
**Project:** NCRB BOOZE COMPARE  
**Project Type:** College Academic Project  
**Purpose:** Educational and Academic Demonstration  
**Stack:** React.js, Vite, Tailwind CSS, Python Flask, SQLite3, Chart.js  

---

## 1. Project Background & Academic Objectives

The **NCRB BOOZE COMPARE** project was conceptualized and developed by **Prashant Pandey** to demonstrate practical competence in full-stack web engineering, database architecture, data analytics visualization, and AI system design.

### Core Objectives:
1. **Interactive Comparison Engine**: Provide multi-attribute product comparison logic allowing side-by-side analysis of sample items.
2. **Regional Variance Modeling**: Demonstrate relational data mapping between products and geographic zones (simulated Demo Zones 1 through 4).
3. **Data Analytics & Visualizations**: Dynamic charts using Chart.js powered by real-time SQLite aggregate queries.
4. **AI Chatbot with Ethical Guardrails**: Deploy an AI Assistant (NCRB AI Assistant) that assists academic reviewers while enforcing strict safety refusal filters against real-world purchasing or alcohol procurement.
5. **Administrative Data Management**: Implement full Create-Read-Update-Delete (CRUD) capabilities with database re-seed functionality.

> [!IMPORTANT]
> **Strict Demonstration Policy**: All data, product brands (Sample Brands A–H), regional values (Demo Zones 1–4), and currency amounts are entirely fictional dummy data generated for evaluation and grading purposes.

---

## 2. Main Application Modules

### Module 1: Home Landing Page
- Modern dark navy responsive interface with glowing accents.
- Welcome banner detailing project title and creator credentials.
- Persistent academic disclaimer badge.
- Quick navigation shortcuts into Dashboard, Comparison Matrix, Regional Demo, and AI Chatbot.

### Module 2: Dashboard
- Summary statistics cards: Total Sample Products, Total Categories, Total Demo Zones, and Average Demo Value.
- Dynamic Regional Comparison Bar Chart showing zone averages.
- Category Breakdown Doughnut Chart showing sample distribution.
- Recent products quick-view list with immediate comparison action.

### Module 3: Product Comparison Matrix
- Multi-product selector allowing users to check 2, 3, or 4 products.
- Comparative matrix table displaying:
  * Product Name
  * Category
  * Package Volume (e.g. 750ml, 650ml)
  * Baseline Demo Value
  * Regional Zone Variations (Demo Zone 1 through 4)
  * Difference highlighter emphasizing lowest vs highest values.

### Module 4: Regional Comparison
- Zone selector interface to isolate simulated sectors.
- Comparative deviation analytics showing percentage divergence from baseline prices.
- Interactive regional summary table.

### Module 5: Analytics Studio
- Chart.js integration powered by `react-chartjs-2`:
  * Bar Chart: Regional Demo Values across zones.
  * Doughnut Chart: Category share.
  * Line Chart: Simulated price tier progression.
- Dynamically synchronized with backend database state.

### Module 6: Alcohol Awareness & Public Safety
- Educational overview highlighting legal age frameworks across India (e.g. 25 years in Delhi NCR/Haryana/Punjab, 21 years in UP).
- Medical facts on metabolic health impacts and chronic risk factors.
- National de-addiction helplines (Tele-MANAS, KIRAN 1800-599-0019).

### Module 7: AI Chatbot (NCRB AI Assistant)
- Floating widget accessible across all pages plus dedicated full-page experience.
- Handles project architecture queries, chart explanations, and feature walkthroughs.
- Automatic refusal filter for any retail/purchasing query.
- Multi-tier AI engine: Live OpenAI / Gemini API support + offline academic knowledge engine.

### Module 8: Admin Dashboard
- Complete CRUD controls for fictional product catalog.
- Form validation preventing negative pricing or blank entries.
- One-click "Reset Database" button to restore initial baseline state.

### Module 9: About & Viva Preparation
- Project metadata and developer credits (Prashant Pandey).
- System architecture diagram and relational database design.
- Comprehensive viva interview preparation guide.

---

## 3. College Presentation Guide & Viva Q&A

### Question 1: What is the primary purpose of this project?
**Answer:** The purpose of NCRB BOOZE COMPARE is an academic demonstration of full-stack web development. It showcases how complex product-data comparison logic, regional price simulations, relational database design (SQLite), and AI chatbot integration can be structured cleanly using React.js and Python Flask.

### Question 2: Why are all product prices and brands fictional?
**Answer:** Because this is an educational project, actual alcohol prices and commercial retailer information are strictly avoided to ensure legal and institutional compliance. All records are clearly marked as `DEMO DATA - NOT REAL` with `is_fictional = 1` in the database.

### Question 3: How is data persisted and structured?
**Answer:** The backend uses SQLite3 (`database/ncrb_demo.db`). We have 5 structured tables: `products`, `regions`, `regional_demo_data` (linking products and regions via foreign keys), `chatbot_history`, and `data_sources`. All SQL queries use parameterized placeholders (`?`) to prevent SQL injection.

### Question 4: How does the AI chatbot enforce compliance?
**Answer:** The chatbot pipeline implements a multi-tier safety filter (`check_purchase_or_location_query`). If a user inputs queries asking for shop locations, directions, or purchase options, the system immediately intercepts the request and responds with an academic compliance notice rather than attempting to answer.

### Question 5: How are the charts generated?
**Answer:** The frontend uses `Chart.js` via `react-chartjs-2`. The backend calculates statistical aggregates via `/api/analytics` (`COUNT`, `AVG`, `GROUP BY`) from the SQLite database. The frontend renders responsive Bar, Doughnut, and Line charts dynamically based on the returned JSON.

### Question 6: How does the application support both online and offline operation?
**Answer:** The Flask backend chatbot module is built with dual intelligence: if an `OPENAI_API_KEY` is configured in `.env`, it can query live LLM APIs. However, if offline or without API credits, it utilizes an embedded academic knowledge engine that recognizes project queries and responds intelligently during oral presentations.

---

## 4. Setup and Execution Instructions

### Backend Setup:
```bash
# 1. Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# 2. Install dependencies
pip install -r backend/requirements.txt

# 3. Seed SQLite database
python backend/seed_data.py

# 4. Start Flask server
python backend/app.py
# Backend runs at http://localhost:5000
```

### Frontend Setup:
```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# Frontend runs at http://localhost:5173
```
