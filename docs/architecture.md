# System Architecture: NCRB BOOZE COMPARE

**Author:** Prashant Pandey  
**Project:** NCRB BOOZE COMPARE  
**Purpose:** Academic Demonstration Project - Fictional Data Only

---

## 1. High-Level Architecture Overview

NCRB BOOZE COMPARE is organized as a modern, decoupled client-server web architecture:

```
+------------------------------------------------------------------+
|                    CLIENT BROWSER (User Agent)                   |
|  - React.js Single Page Application (SPA)                       |
|  - Tailwind CSS Responsive Design System                         |
|  - Chart.js & React-Chartjs-2 Dynamic Visualizations             |
|  - Interactive Multi-Product Comparison Matrix                   |
|  - NCRB AI Assistant Floating Widget & Full-Page Interface        |
+---------------------------------+--------------------------------+
                                  |
                           HTTP / REST API
                       (JSON Payloads via CORS)
                                  |
                                  v
+---------------------------------+--------------------------------+
|                   PYTHON FLASK APPLICATION SERVER                |
|  - Flask Application Factory with Blueprint Routing              |
|  - REST Controllers:                                             |
|      * /api/products (CRUD for Sample Products)                  |
|      * /api/regions & /api/regions/demo-data (Regional Matrix)   |
|      * /api/comparison & /api/analytics (Chart Aggregations)     |
|      * /api/chatbot (AI Assistant with Offline Engine)           |
|      * /api/admin/reset (Demo Reseed Endpoint)                   |
|  - AI Engine: Live OpenAI Integration + Academic Rule Fallback   |
|  - Security Layer: Parameterized Queries, Refusal Filters        |
+---------------------------------+--------------------------------+
                                  |
                             SQLite3 API
                                  |
                                  v
+---------------------------------+--------------------------------+
|                 SQLITE RELATIONAL DATABASE                       |
|  File: database/ncrb_demo.db                                     |
|  Tables:                                                         |
|    - products                                                    |
|    - regions                                                     |
|    - regional_demo_data                                          |
|    - chatbot_history                                             |
|    - data_sources                                                |
+------------------------------------------------------------------+
```

---

## 2. Component Design & Data Flow

### 2.1 Product Comparison Flow
1. User selects 2 to 4 products from the catalog or comparison drawer.
2. The frontend triggers `GET /api/comparison?ids=1,2,3`.
3. The Flask backend queries `products` and `regional_demo_data` using parameterized SQL.
4. Backend computes variance metrics (min value, max value, delta difference) and returns structured JSON.
5. React renders the `ComparisonTable` component, highlighting attribute differences and regional price spreads.

### 2.2 Regional Analytics Flow
1. `GET /api/analytics` executes SQL aggregation queries (`COUNT`, `AVG`, `GROUP BY category`, `GROUP BY region`).
2. Chart.js datasets are formatted on the backend and mapped to:
   - Bar Chart: Regional Demo Values across Zones 1–4.
   - Doughnut Chart: Category Share (Category A, B, C, D).
   - Line Chart: Sample Value Tier Progression.

### 2.3 AI Assistant Guardrail Pipeline
1. Incoming query received at `POST /api/chatbot`.
2. Input query is analyzed by `check_purchase_or_location_query()`.
3. If user requests real shop locations, purchasing instructions, or commercial prices, the system triggers an immediate academic compliance refusal.
4. If valid academic or project query:
   - Live OpenAI API is invoked if `OPENAI_API_KEY` is present.
   - Intelligent offline academic fallback engine is used if offline or no key is present.
5. Query and response are stored in `chatbot_history`.

---

## 3. Database Schema (Entity-Relationship)

```
+------------------------+             +------------------------+
|        PRODUCTS        |             |        REGIONS         |
+------------------------+             +------------------------+
| id (PK)                |             | id (PK)                |
| name                   |             | region_name            |
| category               |             | description            |
| package_size           |             | is_fictional           |
| description            |             +-----------+------------+
| demo_value             |                         |
| is_fictional           |                         |
+-----------+------------+                         |
            |                                      |
            |           +----------------------+   |
            +---------->|  REGIONAL_DEMO_DATA  |<--+
                        +----------------------+
                        | id (PK)              |
                        | product_id (FK)      |
                        | region_id (FK)       |
                        | demo_value           |
                        | is_fictional         |
                        +----------------------+
```

---

## 4. Security & Compliance Measures

1. **Academic Demonstration Labeling**:
   - Every UI view contains the persistent disclaimer banner:
     `COLLEGE DEMONSTRATION PROJECT - FICTIONAL DATA ONLY`.
   - Every product and regional entry has `is_fictional = 1`.
2. **SQL Injection Prevention**:
   - 100% of database interactions use SQLite parameterized queries (`?` placeholders).
3. **Environment Security**:
   - Sensitive credentials (e.g. OpenAI keys) are stored strictly in `.env` and never bundled into frontend client code.
4. **CORS Isolation**:
   - Cross-Origin Resource Sharing is scoped to API routes (`/api/*`).
