"""
AI Chatbot Engine for NCRB BOOZE COMPARE (NCRB AI ASSISTANT)
Supports genuine brands, NCR regional variance (Delhi, Gurugram, Noida, Faridabad),
official brand links, and educational compliance.
"""

import os
import re
import requests
from dotenv import load_dotenv

load_dotenv()

SYSTEM_PROMPT = """You are NCRB AI ASSISTANT.
Your job is to help users understand the NCRB BOOZE COMPARE demonstration application developed by Prashant Pandey.

The application benchmarks popular genuine beverage brands across NCR regions:
- Brands: Kingfisher Premium, Bira 91 White, Budweiser Magnum, Corona Extra, Old Monk Rum, Bacardi Superior, Royal Stag, Blenders Pride, Jack Daniel's, Johnnie Walker Black Label, Glenfiddich 12YO, Absolut Vodka, Bombay Sapphire.
- Regions: Delhi Zone (NCT), Gurugram Zone (Haryana), Noida Zone (Uttar Pradesh), Faridabad Zone (Haryana).

You should:
- Explain comparison features, price differences, and regional tax/excise dynamics.
- Explain Chart.js analytics and database schema.
- Share verified educational alcohol-awareness and statutory drinking age laws in NCR.
- Provide official brand informational links when asked.

You must NOT:
- Facilitate alcohol purchasing, ordering, or home deliveries.
- Provide physical store addresses, directions, or contact numbers for liquor retailers.
- Encourage excessive alcohol consumption or intoxication.

If a user asks how to purchase alcohol or for store directions, politely explain that this application is an academic comparison tool and does not provide retail purchasing assistance.
"""

PURCHASE_QUERY_PATTERNS = [
    r"buy", r"purchase", r"shop", r"store", r"wine shop", r"liquor shop", r"theka",
    r"order", r"delivery", r"deliver", r"location", r"near me", r"address", r"direction",
    r"discount coupon", r"home delivery"
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
            "⚠️ **Educational Compliance Notice:**\n\n"
            "This application—**NCRB BOOZE COMPARE**—is an academic price-comparison and data visualization project created by **Prashant Pandey**. "
            "It does **not** sell alcohol, fulfill deliveries, or provide directions to local liquor vendors.\n\n"
            "All pricing information displayed is indicative Maximum Retail Price (MRP) benchmark data compiled from state excise reference rates for comparative analysis."
        )

    # Greeting / Identity
    if any(greet in q for greet in ["hello", "hi", "hey", "who are you", "what are you"]):
        return (
            "Hello! I am **NCRB AI ASSISTANT**, your guide for the **NCRB BOOZE COMPARE** platform. "
            "I can help you compare genuine beverage brands across Delhi, Gurugram, Noida, and Faridabad, "
            "explain regional excise duty differences, walk through our Chart.js analytics, and discuss responsible awareness guidelines. How can I assist you?"
        )

    # Project purpose / Creator
    if any(k in q for k in ["project", "creator", "author", "student", "who made", "purpose"]):
        return (
            "**NCRB BOOZE COMPARE** was developed by **Prashant Pandey** as a college academic project. "
            "It demonstrates full-stack web engineering (React.js, Tailwind CSS, Python Flask, SQLite3), "
            "dynamic multi-attribute comparison matrices, regional pricing models across NCR zones, and interactive Chart.js analytics."
        )

    # Brands / Products
    if any(k in q for k in ["brand", "kingfisher", "old monk", "bira", "budweiser", "jack daniel", "glenfiddich", "johnnie walker"]):
        return (
            "Our database tracks genuine benchmark brands across major categories:\n"
            "• **Beers**: Kingfisher Premium (₹140), Bira 91 White (₹170), Budweiser Magnum (₹200), Corona Extra (₹250)\n"
            "• **Whiskies & Malts**: Royal Stag (₹550), Blenders Pride (₹1,150), Jack Daniel's (₹2,800), Johnnie Walker Black Label (₹2,950), Glenfiddich 12YO (₹4,600)\n"
            "• **Rum & Spirits**: Old Monk XXX (₹480), Bacardi Superior (₹950), Absolut Vodka (₹1,650), Bombay Sapphire Gin (₹2,200)\n\n"
            "Each brand includes official manufacturer links for direct product specifications!"
        )

    # Regional comparison / NCR zones
    if any(k in q for k in ["region", "zone", "delhi", "gurugram", "gurgaon", "noida", "faridabad", "ncr", "tax", "excise"]):
        return (
            "The platform models regional price variances across 4 NCR sectors:\n"
            "- **Delhi Zone (NCT)**: Baseline reference MRP set under Delhi Excise Department policy.\n"
            "- **Gurugram Zone (Haryana)**: Often ~10% lower on beer and select spirits due to Haryana's liberalized retail licensing model.\n"
            "- **Noida Zone (Uttar Pradesh)**: Reflects UP State Excise duty structures, averaging ~8% higher on certain categories.\n"
            "- **Faridabad Zone (Haryana)**: South NCR sector operating under Haryana state excise parity."
        )

    # Comparison module
    if any(k in q for k in ["comparison", "compare", "difference"]):
        return (
            "In the **Comparison** tab (`/compare`), you can pick 2 to 4 brands side-by-side. "
            "The matrix displays bottle sizes, baseline prices, cross-zone prices across Delhi, Gurugram, Noida, and Faridabad, "
            "and highlights the lowest and highest price spreads automatically."
        )

    # Dashboard & Analytics
    if any(k in q for k in ["dashboard", "analytics", "chart", "graph"]):
        return (
            "The **Dashboard** and **Analytics** modules use **Chart.js** to visualize real-time database figures:\n"
            "1. **Regional Comparison Bar Chart**: Average prices across Delhi, Gurugram, Noida, and Faridabad.\n"
            "2. **Category Volume Pie Chart**: Distribution across Beers, Whiskies, Rum, Vodka, and Gin.\n"
            "3. **Price Progression Line Chart**: Visualizing budget through ultra-premium price curves."
        )

    # Awareness / Legal age
    if any(k in q for k in ["awareness", "legal age", "law", "mlda", "health"]):
        return (
            "**Statutory Regulations & Health Awareness:**\n"
            "- **Delhi & Haryana**: Minimum Legal Drinking Age is 25 years (21 for mild beer/wine in Haryana).\n"
            "- **Uttar Pradesh**: Legal Drinking Age is 21 years.\n"
            "- **Helplines**: National Tele-MANAS (14416 / 1800-891-4416) and KIRAN De-Addiction (1800-599-0019) provide free 24/7 counseling support."
        )

    # Default fallback
    return (
        f"Thank you for your question: *'{user_query}'*.\n\n"
        "As the **NCRB AI ASSISTANT**, I can provide details on:\n"
        "• Price comparisons between popular brands (Kingfisher, Old Monk, Jack Daniel's, etc.)\n"
        "• Excise and price differences across Delhi, Gurugram, Noida, and Faridabad\n"
        "• Chart.js analytics and technical architecture (React, Flask, SQLite3)\n"
        "• Statutory drinking age regulations and public health guidelines in NCR"
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
