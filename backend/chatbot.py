"""
AI Chatbot Engine for NCRB BOOZE COMPARE (NCRB AI ASSISTANT)
Supports OpenAI / Gemini API when configured via environment variables,
and includes an intelligent offline academic knowledge engine for viva presentations.
"""

import os
import re
import requests
from dotenv import load_dotenv

load_dotenv()

SYSTEM_PROMPT = """You are NCRB AI ASSISTANT.
Your job is to help users understand the NCRB BOOZE COMPARE academic demonstration application developed by Prashant Pandey.

You should:
- Explain the application's features (Comparison, Regional Demo, Analytics, Dashboard, Admin).
- Explain fictional sample data (Sample Brand A-E, Demo Zone 1-4).
- Help users understand comparison charts and statistics.
- Answer general educational, safety, and alcohol-awareness questions.
- Use simple, friendly, and understandable language.

You must NOT:
- Provide real alcohol shop locations or directions.
- Provide actual alcohol prices or brand inventories.
- Help users purchase alcohol or arrange deliveries.
- Provide directions to alcohol retailers.
- Encourage or recommend alcohol consumption or intoxication.

Clearly state whenever data is fictional demonstration data. If the user asks for real-world purchasing assistance, explain politely that this project is strictly an academic college demonstration and does not provide purchasing assistance.
"""

PURCHASE_QUERY_PATTERNS = [
    r"buy", r"purchase", r"shop", r"store", r"wine shop", r"liquor shop", r"theka",
    r"order", r"delivery", r"deliver", r"location", r"near me", r"address", r"direction",
    r"how much does .* cost in real", r"real price", r"discount coupon"
]

def check_purchase_or_location_query(query: str) -> bool:
    """Detect if query asks for real-world purchasing, directions, or physical shops."""
    query_lower = query.lower()
    for pattern in PURCHASE_QUERY_PATTERNS:
        if re.search(r"\b" + pattern + r"\b", query_lower):
            return True
    return False

def get_offline_academic_response(user_query: str) -> str:
    """Comprehensive academic fallback response engine for offline presentations."""
    q = user_query.strip().lower()

    # Safety refusal check
    if check_purchase_or_location_query(q):
        return (
            "⚠️ **Academic Notice & Compliance Disclaimer:**\n\n"
            "This application—**NCRB BOOZE COMPARE**—is an academic college demonstration project created by **Prashant Pandey**. "
            "It does **not** provide real-world alcohol purchasing assistance, store locations, retail directions, or live commercial prices.\n\n"
            "All product names (e.g., *Sample Brand A*) and regional values (e.g., *Demo Zone 1*) are fictional demonstration data generated solely for educational evaluation."
        )

    # Greeting / Identity
    if any(greet in q for greet in ["hello", "hi", "hey", "who are you", "what are you"]):
        return (
            "Hello! I am **NCRB AI ASSISTANT**, the built-in guide for the **NCRB BOOZE COMPARE** web application. "
            "I can explain our product comparison dashboard, regional sample metrics, Chart.js analytics, database design, "
            "and health awareness concepts. How can I assist your demonstration today?"
        )

    # Project purpose / Creator
    if any(k in q for k in ["project", "creator", "author", "student", "who made", "purpose"]):
        return (
            "**NCRB BOOZE COMPARE** was developed by **Prashant Pandey** as a college academic demonstration project. "
            "The purpose of this application is to demonstrate modern full-stack web development (React.js, Tailwind CSS, Python Flask, SQLite3), "
            "data visualization with Chart.js, multi-attribute product comparison logic, and AI assistant integration using simulated demonstration datasets."
        )

    # Comparison module
    if any(k in q for k in ["comparison", "compare", "difference", "how does compare work"]):
        return (
            "The **Product Comparison** module allows users to select two or more sample items (such as *Sample Brand A* and *Sample Brand B*) "
            "and view their attributes side-by-side in a comparative matrix. The system highlights attribute differences, simulated package sizes, "
            "and calculates regional price variances across our 4 demo zones."
        )

    # Regional comparison / Demo zones
    if any(k in q for k in ["region", "zone", "demo zone", "delhi", "gurugram", "noida", "ncr"]):
        return (
            "The **Regional Comparison** module models simulated market variance across 4 fictional demonstration sectors:\n"
            "- **Demo Zone 1**: Baseline reference zone (1.00x multiplier)\n"
            "- **Demo Zone 2**: Simulated commercial hub (+12.5% variation)\n"
            "- **Demo Zone 3**: Simulated suburban sector (-8.3% variation)\n"
            "- **Demo Zone 4**: Simulated peripheral sector (+20.8% variation)\n\n"
            "*Reminder: All zones and multipliers are purely fictional mathematical models for educational demonstration.*"
        )

    # Dashboard & Analytics / Charts
    if any(k in q for k in ["dashboard", "analytics", "chart", "graph", "chart.js"]):
        return (
            "The **Dashboard** and **Analytics** modules use **Chart.js** with `react-chartjs-2` to render real-time interactive visualizations "
            "pulled directly from the SQLite database:\n"
            "1. **Regional Bar Chart**: Compares average demo values across Demo Zones 1 through 4.\n"
            "2. **Category Doughnut Chart**: Shows the distribution of sample products across Category A, B, C, and D.\n"
            "3. **Value Progression Line Chart**: Visualizes sample value tiers."
        )

    # Database / Tech stack
    if any(k in q for k in ["database", "sqlite", "table", "backend", "tech stack", "flask"]):
        return (
            "**Technical Architecture:**\n"
            "- **Frontend**: React.js with Vite, Tailwind CSS, Lucide icons, and Chart.js.\n"
            "- **Backend**: Python Flask REST API with Blueprints, CORS support, and parameterized SQL queries.\n"
            "- **Database**: SQLite3 (`ncrb_demo.db`) containing `products`, `regions`, `regional_demo_data`, `chatbot_history`, and `data_sources`.\n"
            "- **Security**: API key isolation in `.env`, parameterized SQL queries to prevent SQL injection, and zero real customer PII collection."
        )

    # Alcohol Awareness & Health
    if any(k in q for k in ["awareness", "health", "safety", "legal age", "law", "mlda"]):
        return (
            "The **Alcohol Awareness** module provides educational facts regarding responsible health decisions:\n"
            "- **Legal Drinking Age in India**: Regulated by individual state excise acts (e.g., 25 years in Delhi NCR, Punjab, and Haryana; 21 years in Uttar Pradesh).\n"
            "- **Health Impacts**: Chronic consumption affects liver function, cardiovascular health, and nervous system coordination.\n"
            "- **Emergency Helpline**: National tele-counseling and de-addiction toll-free helplines provide free support (KIRAN: 1800-599-0019)."
        )

    # Admin module
    if any(k in q for k in ["admin", "crud", "add product", "edit", "reset"]):
        return (
            "The **Admin Dashboard** allows demonstration evaluators to perform CRUD operations on sample records:\n"
            "- Add new fictional products with custom demo values and package sizes.\n"
            "- Edit existing sample product specifications.\n"
            "- Delete records.\n"
            "- Reset the SQLite database back to original baseline seed data with a single click."
        )

    # Default informative fallback
    return (
        f"Thank you for your question: *'{user_query}'*.\n\n"
        "As the **NCRB AI ASSISTANT**, I can help you explore the **NCRB BOOZE COMPARE** academic demonstration application. "
        "You can ask me about:\n"
        "• How the product comparison matrix works\n"
        "• How regional variations (Demo Zones 1–4) are computed\n"
        "• Chart.js analytics and database schema (`products`, `regions`)\n"
        "• Academic background (Prashant Pandey, College Project)\n"
        "• Alcohol awareness, safety regulations, and legal guidelines\n\n"
        "*(Note: All product data and pricing are strictly fictional demonstration values.)*"
    )

def ask_chatbot(user_message: str) -> str:
    """Processes user query via OpenAI API if available, or returns offline response."""
    # Strict refusal check upfront
    if check_purchase_or_location_query(user_message):
        return get_offline_academic_response(user_message)

    openai_key = os.getenv("OPENAI_API_KEY", "").strip()
    if openai_key and not openai_key.startswith("your_openai"):
        try:
            headers = {
                "Authorization": f"Bearer {openai_key}",
                "Content-Type": "application/json"
            }
            model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
            payload = {
                "model": model,
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": user_message}
                ],
                "temperature": 0.5,
                "max_tokens": 400
            }
            resp = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload, timeout=8)
            if resp.status_code == 200:
                data = resp.json()
                return data["choices"][0]["message"]["content"].strip()
        except Exception as e:
            print(f"[Chatbot] Live API call encountered an error: {e}. Utilizing academic fallback.")

    # Fallback to local intelligent academic engine
    return get_offline_academic_response(user_message)
