# NCRB BOOZE COMPARE (The Grand Cellar)

> **NCR Regional Beverage Price & Specification Benchmark Portal**  
> Curated by **Prashant Pandey**  
> Comprehensive full-stack discovery and regional price benchmark platform tracking 141+ authentic beers, single malts, whiskies, fine wines, and luxury spirits across Delhi, Gurugram, Noida, and Faridabad.

---

## 1. Platform Overview

- **Platform Name:** NCRB BOOZE COMPARE (The Grand Cellar)
- **Developer:** Prashant Pandey
- **Architecture:** Full-Stack Decoupled Web Platform (React 18 + Tailwind CSS + Python 3.14 Flask + SQLite3)
- **Intelligence Layer:** Google Gemini Generative AI (gemini-1.5-flash) with built-in luxury AI Sommelier knowledge engine
- **Scope & Coverage:** Delhi Zone (NCT baseline), Gurugram Zone (Haryana ~10% lower), Noida Zone (Uttar Pradesh duty structure), and Faridabad Zone (Haryana parity).

---

## 2. Key Features

1. **Curated Luxury Catalog (141+ Authentic Bottles):**
   - Covers Single Malts (Glenfiddich, Macallan, Laphroaig, Talisker, Balvenie, Glenlivet, Amrut, Indri, Rampur, Paul John), Blended Scotch (Johnnie Walker Black/Double Black/Gold/Blue, Chivas Regal, Monkey Shoulder), Bourbons (Jack Daniel's, Jim Beam, Maker's Mark, Woodford Reserve), Craft Beers & Lagers (Bira 91, Hoegaarden, Corona, Budweiser, Heineken, Guinness, Simba), Gins (Roku, Hendrick's, Bombay Sapphire, Tanqueray, Hapusa, Greater Than), Rums (Old Monk, Bacardi, Captain Morgan), Vodkas (Grey Goose, Absolut, Belvedere, Ketel One), Tequilas (Patrón, Don Julio, Jose Cuervo), and Fine Wines (Sula, Fratelli, Jacob's Creek, Cloudy Bay, Moët & Chandon Champagne).
2. **Interactive Product Details Modal:**
   - Bottle photography, alcohol strength (ABV %), bottle package sizes, sensory tasting notes, verified retail availability across licensed excise vends, and official brand website portals.
3. **Cross-Zone Brand Comparison Matrix:**
   - Multi-attribute side-by-side comparison (2 to 4 brands) highlighting lowest retail MRP (Best Value), highest MRP, and cross-border price divergence.
4. **Regional Excise Modeling:**
   - Explains statutory tax variance between Delhi NCT, Haryana private auction retail, and Uttar Pradesh consolidated duty structures.
5. **Interactive Chart.js Analytics:**
   - Real-time regional average bar charts, category distribution pie charts, and budget-to-luxury price progression curves.
6. **Gemini AI Sommelier & Cellar Master:**
   - Integrated Google Gemini API (`gemini-1.5-flash`) providing tasting notes, food pairings, mixology cocktail recipes, and NCR price advice with built-in regulatory compliance guardrails.
7. **Statutory Legal Compliance & Public Health:**
   - Minimum Legal Drinking Age (MLDA) guides across NCR (25 in Delhi/Haryana, 21 in UP) and 24/7 national counseling helplines (Tele-MANAS, KIRAN).

---

## 3. Technology Stack

### Frontend
- **Framework:** React.js 18 (Vite SPA)
- **Styling:** Tailwind CSS with custom luxury bar-lounge dark amber palette and glassmorphism
- **Icons:** Lucide React
- **Visualizations:** Chart.js & React-Chartjs-2 (Bar, Pie, Line charts)
- **Routing:** React Router v6
- **HTTP Client:** Axios with backend proxy

### Backend
- **Language & Framework:** Python 3.14 + Flask 3.1
- **API Architecture:** RESTful API with modular Flask Blueprints
- **CORS:** Flask-CORS for cross-origin resource sharing
- **Environment Management:** python-dotenv

### Database
- **Engine:** SQLite3 (`database/ncrb_demo.db`)
- **Query Method:** 100% Parameterized SQL queries preventing SQL injection
- **Data Integrity:** Foreign key enforcement (`PRAGMA foreign_keys = ON`)

### AI Sommelier
- **Engine:** Google Gemini API (`gemini-1.5-flash` or `gemini-2.0-flash`)
- **Fallback:** Expert local sommelier engine with 141+ brand tasting notes, cocktails, and regional price dynamics
- **Compliance:** Intercepts unlawful delivery queries and directs users to authorized physical state excise vends

---

## 4. Setup & Running Instructions

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### Backend Setup
```bash
# Activate virtual environment
source venv/bin/activate

# Install dependencies (if needed)
pip install -r requirements.txt

# Run database seed (populates 141+ authentic products)
python backend/seed_data.py

# Start Flask backend on port 5050
python backend/app.py
```

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# The application will be live at http://localhost:5173
```

### Environment Configuration (.env)
```env
FLASK_APP=backend/app.py
FLASK_ENV=development
FLASK_PORT=5050
SECRET_KEY=ncrb-luxury-cellar-secret-key-2026

# Optional: Add your Google Gemini API key to activate live Gemini AI sommelier
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
```

### Deploying to Vercel
This repository is pre-configured with `vercel.json`, `api/index.py` (Flask serverless backend), and `requirements.txt` for 1-click zero-config Vercel deployment:
1. Push this repository to GitHub: `https://github.com/prashantpandey7658-dotcom/-NCRB-BOOZE-COMPARE`
2. Go to [vercel.com](https://vercel.com) and click **"Add New" → "Project"**.
3. Import the `-NCRB-BOOZE-COMPARE` repository.
4. (Optional) Add your environment variables in the Vercel dashboard:
   - `GEMINI_API_KEY`: *(Your Google Gemini API Key for the live AI Sommelier)*
   - `SECRET_KEY`: `ncrb-luxury-cellar-secret-key-2026`
5. Click **Deploy**. Vercel will build the React SPA, launch the Python serverless API, and host your app live!

---

## 5. Statutory Compliance

Under the Seventh Schedule of the Constitution of India, liquor regulation and excise duties fall exclusively within state jurisdiction.
This platform provides indicative retail Maximum Retail Prices (MRP) for consumer awareness and comparison. All alcohol sales in the National Capital Region are subject to statutory Minimum Legal Drinking Age regulations (21 / 25 years). Commercial online delivery of liquor is prohibited by regional state excise authorities.
