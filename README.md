# NCRB-BOOZE-COMPARE

# MASTER_PROMPT.md

# PROJECT NAME: NCRB BOOZE COMPARE

## 1. PROJECT INFORMATION

**Project Name:** NCRB BOOZE COMPARE

**Student Name:** Prashant Pandey

**Project Type:** College Academic Project
  
**Project Purpose:** Educational and Academic Demonstration

**Application Type:** Full-Stack Web Application

The application is designed to demonstrate product-data comparison, regional data visualization, database management, and AI chatbot integration.

The project is intended for a college demonstration and is not intended for public commercial release.

All product prices, product records, and regional comparisons must use fictional sample data clearly marked as DEMO DATA.

---

# 2. PROJECT OBJECTIVE

Develop a modern web application named NCRB BOOZE COMPARE.

The application will demonstrate how a product comparison platform can organize sample product information and compare fictional values across different regions.

The application should include:

1. Sample product catalogue.
2. Product comparison dashboard.
3. Fictional regional comparison.
4. Sample price analytics.
5. Interactive charts and graphs.
6. Search and filtering functionality.
7. AI-powered chatbot.
8. Admin dashboard.
9. User-friendly interface.
10. Database integration.

All comparison values must be fictional and must not be represented as actual market prices or retailer information.

---

# 3. TECHNOLOGY STACK

Use the following technologies:

## Frontend
- React.js
- Vite
- HTML5
- CSS3
- JavaScript
- Tailwind CSS

## Backend
- Python
- Flask
- REST API

## Database
- SQLite

## Charts
- Chart.js
- React-Chartjs-2

## AI Chatbot
- OpenAI API or another supported AI API.
- Python Flask backend integration.
- Environment variables for API keys.

## Development Tools
- Visual Studio Code
- Git
- GitHub
- Postman
- Browser Developer Tools

Choose beginner-friendly implementations and explain each step.

Never expose API keys in frontend code.

---

# 4. APPLICATION STRUCTURE

Create the following application structure:

NCRB-BOOZE-COMPARE/

│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ComparisonTable.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Comparison.jsx
│   │   │   ├── RegionComparison.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Awareness.jsx
│   │   │   ├── About.jsx
│   │   │   └── Admin.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── backend/
│   ├── app.py
│   ├── database.py
│   ├── models.py
│   ├── chatbot.py
│   ├── routes/
│   │   ├── products.py
│   │   ├── comparison.py
│   │   └── chatbot_routes.py
│   │
│   ├── seed_data.py
│   └── requirements.txt
│
├── database/
│   └── ncrb_demo.db
│
├── docs/
│   ├── architecture.md
│   └── project_documentation.md
│
├── .env.example
├── .gitignore
└── README.md

---

# 5. MAIN APPLICATION MODULES

## MODULE 1: HOME PAGE

Create a professional landing page.

Include:

- Project logo and title.
- Navigation bar.
- Welcome section.
- Project introduction.
- Dashboard navigation.
- Comparison section.
- AI chatbot shortcut.
- College demonstration disclaimer.

Display a prominent notice:

"COLLEGE DEMONSTRATION PROJECT - FICTIONAL DATA ONLY"

## MODULE 2: DASHBOARD

Create an interactive dashboard.

Display:

- Total sample products.
- Number of sample categories.
- Number of demo regions.
- Comparison statistics.
- Regional sample-data chart.
- Category distribution chart.

Use cards and charts.

All displayed numbers must be generated from fictional sample data.

## MODULE 3: PRODUCT COMPARISON

Create a comparison page.

Use fictional products:

- Sample Brand A
- Sample Brand B
- Sample Brand C
- Sample Brand D
- Sample Brand E

Include fictional attributes:

- Product name
- Category
- Demonstration package size
- Fictional sample value
- Sample category
- Description

Allow users to select two or more sample products and compare their attributes.

Show the results in a comparison table.

Do not use actual alcohol brands or actual selling prices.

## MODULE 4: REGIONAL COMPARISON

Create a regional comparison interface.

Use fictional demonstration regions:

- Demo Zone 1
- Demo Zone 2
- Demo Zone 3
- Demo Zone 4

Show fictional regional statistics.

Features:

- Region selection.
- Comparison charts.
- Sample value differences.
- Regional data table.

Do not display real alcohol retailers, shop addresses, maps, distances, or directions.

## MODULE 5: ANALYTICS

Create an analytics page using Chart.js.

Include:

1. Bar chart.
2. Pie chart.
3. Line chart.
4. Regional sample-data comparison.
5. Category distribution.

Charts must be generated dynamically from the SQLite database.

Display the following notice:

"All figures shown are fictional demonstration data."

## MODULE 6: AI CHATBOT

Create an AI chatbot integrated into the application.

Chatbot name:

NCRB AI ASSISTANT

### Chatbot features

- Answer questions about the project.
- Explain dashboard features.
- Explain comparison tables.
- Explain sample datasets.
- Explain charts.
- Answer general alcohol-awareness questions.
- Guide users through the application.

### Chatbot interface

Include:

- Chat window.
- User message bubbles.
- Assistant message bubbles.
- Message input field.
- Send button.
- Loading indicator.
- Clear chat option.

### Chatbot integration

Use:

Frontend:
React.js

Backend:
Python Flask

AI:
OpenAI API or another supported AI provider.

API keys must be stored in environment variables.

### Chatbot system instructions

You are NCRB AI ASSISTANT.

Your job is to help users understand the NCRB BOOZE COMPARE academic demonstration application.

You should:

- Explain the application's features.
- Explain fictional sample data.
- Help users understand comparison charts.
- Answer general educational and safety questions.
- Use simple and understandable language.

You must not:

- Provide real alcohol shop locations.
- Provide actual alcohol prices or availability.
- Help users purchase alcohol.
- Provide directions to alcohol retailers.
- Recommend alcohol consumption or intoxication.

Clearly explain when information is fictional.

If a user asks for real-world purchasing information, politely explain that this application is an academic demonstration and does not provide purchasing assistance.

---

# 6. FICTIONAL SAMPLE DATA

Create a fictional dataset for demonstration purposes.

IMPORTANT:

All names and values below are illustrative placeholders, not actual products or market prices.

Example dataset:

| ID | Product Name | Category | Demo Value |
|----|--------------|----------|------------|
| 1 | Sample Brand A | Category A | ₹1,200 |
| 2 | Sample Brand B | Category A | ₹1,500 |
| 3 | Sample Brand C | Category B | ₹950 |
| 4 | Sample Brand D | Category B | ₹1,800 |
| 5 | Sample Brand E | Category C | ₹2,000 |

Example regional dataset:

| Region | Sample Value |
|--------|--------------|
| Demo Zone 1 | ₹1,200 |
| Demo Zone 2 | ₹1,350 |
| Demo Zone 3 | ₹1,100 |
| Demo Zone 4 | ₹1,450 |

These values must always be labelled:

DEMO DATA - NOT REAL

Do not associate these fictional records with actual stores or actual market conditions.

---

# 7. DATABASE DESIGN

Use SQLite.

Create the following tables.

## TABLE 1: products

| Column | Type |
|--------|------|
| id | INTEGER PRIMARY KEY |
| name | TEXT |
| category | TEXT |
| package_size | TEXT |
| description | TEXT |
| demo_value | REAL |
| is_fictional | BOOLEAN |

## TABLE 2: regions

| Column | Type |
|--------|------|
| id | INTEGER PRIMARY KEY |
| region_name | TEXT |
| description | TEXT |
| is_fictional | BOOLEAN |

## TABLE 3: regional_demo_data

| Column | Type |
|--------|------|
| id | INTEGER PRIMARY KEY |
| product_id | INTEGER |
| region_id | INTEGER |
| demo_value | REAL |
| is_fictional | BOOLEAN |

Use foreign keys to connect products and regions.

## TABLE 4: chatbot_history

| Column | Type |
|--------|------|
| id | INTEGER PRIMARY KEY |
| user_message | TEXT |
| assistant_response | TEXT |
| created_at | DATETIME |

Store only necessary chatbot information. Avoid collecting sensitive personal information.

## TABLE 5: data_sources

| Column | Type |
|--------|------|
| id | INTEGER PRIMARY KEY |
| source_name | TEXT |
| source_url | TEXT |
| description | TEXT |
| last_verified | DATETIME |

Use this table for educational information sources.

---

# 8. USER INTERFACE DESIGN

Design a modern and professional interface.

### Theme

- Dark navy background.
- White cards.
- Blue accent colors.
- Clean typography.
- Rounded cards.
- Subtle animations.
- Responsive layout.

### Navigation

Create a sidebar containing:

1. Home
2. Dashboard
3. Comparison
4. Region Demo
5. Analytics
6. Awareness
7. AI Assistant
8. About

### Responsive design

The application must work on:

- Desktop.
- Laptop.
- Tablet.
- Mobile phones.

Use reusable React components.

---

# 9. ADMIN DASHBOARD

Create an admin dashboard for managing the fictional demonstration dataset.

Admin features:

- Add sample product.
- Edit sample product.
- Delete sample product.
- Add fictional region.
- Update sample values.
- View dashboard statistics.

All records must remain fictional.

Do not add real retailer or alcohol inventory management.

---

# 10. API ENDPOINTS

Create REST API endpoints.

Products:

GET /api/products

GET /api/products/<id>

POST /api/products

PUT /api/products/<id>

DELETE /api/products/<id>

Regions:

GET /api/regions

GET /api/regions/demo-data

Comparison:

GET /api/comparison

GET /api/analytics

Chatbot:

POST /api/chatbot

All endpoints must validate input and return appropriate error responses.

---

# 11. SECURITY REQUIREMENTS

- Keep API keys in environment variables.
- Validate user input.
- Use parameterized SQL queries.
- Avoid storing unnecessary personal data.
- Add appropriate API error handling.
- Restrict admin functionality.
- Never expose secret credentials in GitHub.
- Clearly label all fictional records.

---

# 12. TESTING REQUIREMENTS

Test the following:

1. Home page loads correctly.
2. Dashboard displays sample data.
3. Comparison table works.
4. Region selection works.
5. Charts display correctly.
6. Chatbot responds to educational questions.
7. Chatbot refuses real-world purchasing requests.
8. Database operations work.
9. Responsive layout works.
10. Invalid inputs show appropriate errors.

---

# 13. INSTALLATION AND EXECUTION

Provide beginner-friendly installation instructions.

Frontend:

npm install

npm run dev

Backend:

python -m venv venv

Activate the virtual environment.

Install requirements:

pip install -r requirements.txt

Run backend:

python app.py

Explain how to configure environment variables and initialize the SQLite database.

---

# 14. DOCUMENTATION

Create a complete README.md containing:

- Project introduction.
- Project objectives.
- Technology stack.
- Project structure.
- Database design.
- Features.
- Installation instructions.
- Execution instructions.
- Screenshots checklist.
- Limitations.
- Future scope.

Also prepare:

- Project architecture diagram.
- Database ER diagram.
- Application flowchart.
- College presentation explanation.
- Viva questions and answers.

---

# 15. DEVELOPMENT INSTRUCTIONS

Build the application step by step.

Do not generate incomplete code.

For every file:

1. Give its filename.
2. Explain its purpose.
3. Provide complete working code.
4. Explain where to save it.
5. Provide terminal commands.
6. Explain how to test it.

Use clean, readable code.

Keep the implementation beginner-friendly.

Do not skip database setup, API integration, or chatbot testing.

First provide the project architecture and UI plan.

After that, wait for my approval before generating the complete source code.

---

# FINAL PROJECT REQUIREMENT

The exact project title is:

NCRB BOOZE COMPARE

Student:

Prashant Pandey

Project Type:

College Academic Demonstration.

The project must demonstrate full-stack development, database management, data comparison, charts, and chatbot integration.

All product and regional comparison values must be fictional and visibly labelled as demonstration data.
