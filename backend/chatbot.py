"""
AI Sommelier & Regional Excise Intelligence Engine for NCRB BOOZE COMPARE
Integrates Google Gemini API (gemini-1.5-flash / gemini-2.0-flash) with intelligent
luxury sommelier fallback covering 141+ authentic brands, mixology, food pairings,
and regional price benchmarks across Delhi, Gurugram, Noida, and Faridabad.
"""

import os
import re
import requests
from dotenv import load_dotenv

load_dotenv()

SYSTEM_PROMPT = """You are the Chief Cellar Master & AI Sommelier for NCRB BOOZE COMPARE (The Grand Cellar).
You are an expert luxury sommelier, spirits curator, cocktail mixologist, and NCR regional beverage price advisor.

About NCRB BOOZE COMPARE:
The premier luxury beverage discovery and regional price benchmark portal for the National Capital Region (NCR).
- Curated Catalog: 141+ genuine products across Single Malts, Blended Scotch, Bourbons, Indian Whiskies, Craft Beers, Rums, Vodkas, Gins, Tequilas, and Fine Wines.
- Regions Benchmarked:
  1. Delhi Zone (NCT): Baseline statutory Maximum Retail Price (MRP) established by the Department of Excise, Entertainment & Luxury Tax.
  2. Gurugram Zone (Haryana): Typically ~10% lower on imported beers, malts, and premium spirits due to Haryana's liberalized retail licensing model.
  3. Noida Zone (Uttar Pradesh): Governed by UP State Excise duty structures and special development cess, averaging ~8% higher on select categories.
  4. Faridabad Zone (Haryana): South NCR corridor with competitive Haryana state excise parity (~8% lower than Delhi baseline).

Your Role & Tone:
- Sophisticated, warm, authoritative, and helpful, like the head sommelier at an exclusive 5-star lounge or private cellar club.
- Recommend pairings (e.g., peated Islay single malts with smoky grilled tandoori or aged cheddar; crisp Witbier with citrus salads; rich Cabernet Sauvignon with braised lamb).
- Provide classic cocktail recipes and mixology techniques (Old Fashioned, Negroni, Whiskey Sour, Espresso Martini, French 75).
- Explain regional excise and price variations factually.
- Provide official brand informational context.
- Uphold responsible drinking standards and statutory minimum legal drinking ages (25 in Delhi & Haryana; 21 in Uttar Pradesh).

Compliance & Guidelines:
- Under Indian state excise law, commercial online ordering, direct alcohol shipping, and door-to-door delivery are strictly prohibited in the NCR.
- If a user asks how to order online or for delivery, clarify that direct delivery is prohibited by state excise regulations, and mention that authentic inventory is retailed through licensed L-2 / L-10 authorized state excise vends and premium retail cellars (such as Discovery Wines, Select Citywalk, DLF Cyber Hub, and Mall of India vends).
- Never encourage excessive drinking or intoxication. Always remind users to drink responsibly and never drink and drive.
"""

# Restricted query keywords (delivery / direct purchasing requests)
DELIVERY_QUERY_PATTERNS = [
    r"home delivery", r"deliver to my home", r"door delivery", r"order online",
    r"ship to me", r"courier alcohol", r"deliver to door", r"swiggy booze", r"zomato liquor"
]

def check_delivery_query(query: str) -> bool:
    """Detect if query asks for home delivery or unlawful direct ordering."""
    query_lower = query.lower()
    for pattern in DELIVERY_QUERY_PATTERNS:
        if re.search(r"\b" + pattern + r"\b", query_lower):
            return True
    return False

def get_delivery_policy_notice() -> str:
    """Returns statutory notification explaining online delivery restrictions in NCR."""
    return (
        "🍷 **Regional Excise Regulatory Notice:**\n\n"
        "Under current Delhi, Haryana, and Uttar Pradesh State Excise Department policies, **commercial online home delivery and courier shipment of alcoholic beverages are strictly prohibited**.\n\n"
        "All genuine bottles benchmarked on **NCRB BOOZE COMPARE** are available exclusively through government-licensed physical retail cellars and authorized excise vends (e.g., premium vends at DLF Cyber Hub, Golf Course Road Gurugram, Select Citywalk Delhi, and Mall of India Sector 18 Noida).\n\n"
        "You can inspect live comparative MRP rates and regional tax variances across all 141+ bottles in our **Comparison Matrix**."
    )

def get_sommelier_response(user_query: str) -> str:
    """Comprehensive, intelligent luxury sommelier response engine."""
    q = user_query.strip().lower()

    if check_delivery_query(q):
        return get_delivery_policy_notice()

    # Greetings & Identity
    if any(greet in q for greet in ["hello", "hi", "hey", "who are you", "what can you do", "help me"]):
        return (
            "Welcome to **The Grand Cellar • NCRB BOOZE COMPARE**! 🥂\n\n"
            "I am your **AI Sommelier & Regional Cellar Master**. I can assist you with:\n"
            "• **Curated Recommendations**: Finding the ideal single malt, fine wine, or craft beer for any occasion.\n"
            "• **NCR Price Benchmarking**: Comparing indicative retail MRPs across Delhi, Gurugram, Noida, and Faridabad.\n"
            "• **Tasting Notes & Palate Profiles**: Peat levels, oak aging, botanical bouquets, and grape varietals.\n"
            "• **Food Pairings & Mixology**: Chef-level pairings and signature cocktail recipes.\n"
            "• **Excise Regulations**: Explaining regional tax structures and statutory age limits.\n\n"
            "What spirits or styles are you exploring today?"
        )

    # Single Malts & Scotch
    if any(k in q for k in ["single malt", "scotch", "whisky", "whiskey", "glenfiddich", "macallan", "laphroaig", "talisker", "black label", "blue label", "chivas"]):
        return (
            "🥃 **Cellar Master's Whisky Selection:**\n\n"
            "Our cellar indexes the finest single malts and blended scotches available in NCR:\n\n"
            "• **Glenfiddich 12 Year Old** (Speyside, 40% ABV): Notes of fresh pear, subtle oak, and creamy malt. *Delhi MRP: ~₹4,600 | Gurugram: ~₹4,140*\n"
            "• **The Macallan Double Cask 12YO** (Speyside, 40% ABV): Rich candied orange, honey, and sherry-seasoned oak. *Delhi MRP: ~₹9,500 | Gurugram: ~₹8,550*\n"
            "• **Laphroaig 10 Year Old** (Islay, 40% ABV): Intensely peated with medicinal smoke, seaweed, and sweet vanilla. *Delhi MRP: ~₹5,800 | Gurugram: ~₹5,220*\n"
            "• **Johnnie Walker Black Label 12YO** (Blended Scotch, 40% ABV): Benchmark blend with dark fruits and peat embers. *Delhi MRP: ~₹2,950 | Gurugram: ~₹2,650*\n"
            "• **Amrut Fusion & Indri Trini** (Indian Single Malts, 50% & 46% ABV): Internationally awarded malts with tropical fruit, warm spices, and gentle peat.\n\n"
            "💡 *Pairing Tip: Enjoy peated malts alongside tandoori smoked lamb chops or sharp aged cheddar.*"
        )

    # Beers & Craft Beers
    if any(k in q for k in ["beer", "craft beer", "bira", "kingfisher", "budweiser", "corona", "hoegaarden", "guinness", "wheat beer", "ipa"]):
        return (
            "🍺 **NCR Craft Beer & Lager Index:**\n\n"
            "Whether you favor crisp European lagers or aromatic Belgian-style wheat ales:\n\n"
            "• **Bira 91 White** (330ml / 500ml, 4.7% ABV): Low-bitterness wheat beer spiced with coriander and orange peel. *Delhi MRP: ₹170 | Gurugram: ~₹150*\n"
            "• **Kingfisher Ultra & Premium** (650ml, 4.8%–5% ABV): Crisp golden lagers with light barley sweetness. *Delhi MRP: ₹140–₹190*\n"
            "• **Hoegaarden Witbier** (330ml, 4.9% ABV): Authentic Belgian wheat brewed with Curacao orange peel and coriander. *Delhi MRP: ~₹240*\n"
            "• **Corona Extra** (330ml, 4.5% ABV): Iconic pale lager; best served chilled with a fresh lime wedge. *Delhi MRP: ₹250*\n"
            "• **Guinness Draught** (440ml Can, 4.2% ABV): Rich nitrogenated Irish dry stout with roasted barley and cocoa notes. *Delhi MRP: ~₹350*\n\n"
            "📍 *Price Advantage: Haryana (Gurugram) typically offers the best volume pricing on imported and craft beer cases.*"
        )

    # Gins & Botanicals
    if any(k in q for k in ["gin", "bombay sapphire", "tanqueray", "roku", "hendrick", "hapusa", "greater than", "monkey 47"]):
        return (
            "🍸 **Artisanal Gin & Botanical Spirits:**\n\n"
            "Gin continues its tremendous renaissance across Delhi-NCR's luxury cocktail bars:\n\n"
            "• **Bombay Sapphire** (47% ABV): Vapor-infused with 10 hand-selected botanicals including cubeb berries and grains of paradise. *Delhi MRP: ~₹2,200*\n"
            "• **Roku Japanese Gin** (43% ABV): Featuring 6 unique Japanese botanicals: Sakura flower, Sencha tea, Sansho pepper, and Yuzu peel. *Delhi MRP: ~₹3,400*\n"
            "• **Hendrick's Gin** (41.4% ABV): Infused with Bulgarian rose petals and crisp cucumber. *Delhi MRP: ~₹4,200*\n"
            "• **Hapusa Himalayan Gin** (43% ABV): Distilled with wild Himalayan juniper, turmeric, raw mango, and gondhoraj lime. *Delhi MRP: ~₹2,800*\n\n"
            "🍸 *Signature Serve: Pair 50ml Roku Gin with 150ml elderflower tonic, served over clear block ice with freshly sliced ginger.*"
        )

    # Wines & Champagne
    if any(k in q for k in ["wine", "red wine", "white wine", "sula", "jacob's creek", "fratelli", "champagne", "sauvignon", "cabernet", "chardonnay", "moet"]):
        return (
            "🍇 **Cellar Selection: Fine Wines & Champagne:**\n\n"
            "Our cellar catalog features benchmark Indian estate wines and celebrated global vintages:\n\n"
            "• **Sula Dindori Reserve Shiraz** (Nashik Valley, 13.5% ABV): Full-bodied with lush black fruits, vanilla, and oak tannins. *Delhi MRP: ~₹1,450*\n"
            "• **Fratelli Sette** (Akluj, Maharashtra, 13.5% ABV): Premium barrel-aged Sangiovese-Cabernet blend with dark cherry and tobacco notes. *Delhi MRP: ~₹2,100*\n"
            "• **Jacob's Creek Double Barrel Cabernet Sauvignon** (Barossa, Australia, 14% ABV): Aged in Irish whiskey barrels for extraordinary smoothness. *Delhi MRP: ~₹2,400*\n"
            "• **Cloudy Bay Sauvignon Blanc** (Marlborough, NZ, 13% ABV): Vibrant tropical lime, passionfruit, and crisp mineral acidity. *Delhi MRP: ~₹4,800*\n"
            "• **Moët & Chandon Brut Impérial Champagne** (Épernay, France, 12% ABV): Vibrant green apple, white floral notes, and delicate brioche elegance. *Delhi MRP: ~₹7,800*"
        )

    # Cocktails & Mixology
    if any(k in q for k in ["cocktail", "recipe", "mixology", "old fashioned", "negroni", "whiskey sour", "margarita", "martini"]):
        return (
            "🍸 **Master Mixology Recipes from The Grand Cellar:**\n\n"
            "1. **The Classic Old Fashioned:**\n"
            "   • 60ml Bourbon (Maker's Mark or Woodford Reserve)\n"
            "   • 1 Brown Sugar Cube + 3 Dashes Angostura Bitters\n"
            "   • Splash of soda to dissolve sugar; stir with a large ice sphere; express orange peel oil.\n\n"
            "2. **The Venetian Negroni:**\n"
            "   • 30ml London Dry Gin (Tanqueray or Bombay Sapphire)\n"
            "   • 30ml Campari Bitter\n"
            "   • 30ml Sweet Red Vermouth (Carpano Antica or Martini Rosso)\n"
            "   • Stir with ice for 30 seconds; strain over fresh ice and garnish with an orange twist.\n\n"
            "3. **Smoked Whiskey Sour:**\n"
            "   • 60ml Blended Scotch or Bourbon, 25ml Fresh Lemon Juice, 15ml Rich Simple Syrup, 1 Egg White (or Aquafaba).\n"
            "   • Dry shake vigorously, then shake with ice; strain into a coupe glass with 3 drops of bitters."
        )

    # Regional Differences (Delhi vs Gurugram vs Noida vs Faridabad)
    if any(k in q for k in ["delhi vs gurugram", "delhi vs gurgaon", "difference", "region", "excise", "tax", "cheaper", "rates", "noida", "faridabad"]):
        return (
            "⚖️ **NCR Regional Price Dynamics & Excise Variance:**\n\n"
            "Under the Seventh Schedule of the Constitution of India, liquor taxation is strictly a state jurisdiction, resulting in substantial retail price differences across the NCR:\n\n"
            "• **Gurugram Zone (Haryana)**: Operates under a liberalized open-market retail auction policy. With lower excise tariffs on imported malts and beers, prices in Gurugram are typically **10% to 15% lower** than Delhi baseline MRPs.\n"
            "• **Delhi Zone (NCT)**: Governed by the Delhi Excise Department through government-run retail corporations (DSIIDC, DTTDC, DCCWS). MRPs are statutorily fixed, offering predictable catalog rates across all vends.\n"
            "• **Noida Zone (Uttar Pradesh)**: Uttar Pradesh applies a consolidated state excise duty structure plus special cowshed and infrastructure cess, leading to retail rates roughly **8% higher** on select premium spirits.\n"
            "• **Faridabad Zone (Haryana)**: Follows Haryana state excise parity, providing competitive pricing comparable to Gurugram (~8%–10% lower than Delhi).\n\n"
            "🔍 *Use our 'Brand Comparison' and 'Regional Zones' tabs to see live interactive charts and mathematical variances for any bottle!*"
        )

    # Statutory Regulations & Legal Drinking Age
    if any(k in q for k in ["legal age", "drinking age", "law", "mlda", "helpline", "rules", "age limit"]):
        return (
            "🛡️ **Statutory Legal Drinking Ages & Public Health Guidelines:**\n\n"
            "• **Delhi (NCT)**: Minimum Legal Drinking Age is **25 Years** (Delhi Excise Act, 2009).\n"
            "• **Haryana (Gurugram / Faridabad)**: Minimum Legal Drinking Age is **25 Years** for hard spirits (21 Years for mild beer and wine).\n"
            "• **Uttar Pradesh (Noida / Ghaziabad)**: Minimum Legal Drinking Age is **21 Years** (United Provinces Excise Act).\n\n"
            "📞 **Statutory Helplines:**\n"
            "• **National Tele-MANAS**: 14416 / 1800-891-4416 (Free 24/7 tele-counseling)\n"
            "• **KIRAN Mental Health & De-Addiction**: 1800-599-0019 (24/7 toll-free support)\n"
            "• **National Emergency Service**: 112"
        )

    # Default Sommelier Consultation
    return (
        f"Thank you for your question regarding *'{user_query}'*.\n\n"
        "As your **AI Sommelier**, I am at your service to explore:\n"
        "• **Brand Profiles & Prices**: Check indicative MRPs and ABV for 141+ authentic beers, malts, wines, and spirits.\n"
        "• **Regional Spreads**: Compare how prices diverge between Delhi, Gurugram, Noida, and Faridabad.\n"
        "• **Sommelier Pairings**: Fine dining food pairings, glassware recommendations, and serving temperatures.\n"
        "• **Mixology**: Classic and modern cocktail recipes tailored to your preferred spirits.\n\n"
        "Try asking: *'What are the best single malts under ₹6,000?'* or *'How does Gurugram pricing compare to Delhi for craft beer?'*"
    )

def call_gemini_api(user_message: str, api_key: str) -> str:
    """Invokes Google Gemini Generative Language API."""
    model = os.getenv("GEMINI_MODEL", "gemini-1.5-flash").strip()
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"

    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [
                    {
                        "text": f"{SYSTEM_PROMPT}\n\nUser Question: {user_message}"
                    }
                ]
            }
        ],
        "generationConfig": {
            "temperature": 0.65,
            "maxOutputTokens": 600
        }
    }

    resp = requests.post(url, headers=headers, json=payload, timeout=10)
    if resp.status_code == 200:
        data = resp.json()
        candidates = data.get("candidates", [])
        if candidates:
            parts = candidates[0].get("content", {}).get("parts", [])
            if parts:
                return parts[0].get("text", "").strip()
    else:
        print(f"[Gemini API] Request failed with HTTP {resp.status_code}: {resp.text}")
    return None

def call_openai_api(user_message: str, api_key: str) -> str:
    """Invokes OpenAI Chat Completion API."""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message}
        ],
        "temperature": 0.65,
        "max_tokens": 500
    }
    resp = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload, timeout=8)
    if resp.status_code == 200:
        data = resp.json()
        return data["choices"][0]["message"]["content"].strip()
    return None

def ask_chatbot(user_message: str) -> str:
    """Main chatbot entrypoint: checks delivery refusal, queries Gemini / OpenAI, or falls back to Sommelier engine."""
    # Statutory delivery refusal check
    if check_delivery_query(user_message):
        return get_delivery_policy_notice()

    # 1. Try Gemini API
    gemini_key = os.getenv("GEMINI_API_KEY", "").strip()
    if gemini_key and not gemini_key.startswith("your_gemini"):
        try:
            gemini_res = call_gemini_api(user_message, gemini_key)
            if gemini_res:
                return gemini_res
        except Exception as e:
            print(f"[Chatbot] Gemini API exception: {e}")

    # 2. Try OpenAI API
    openai_key = os.getenv("OPENAI_API_KEY", "").strip()
    if openai_key and not openai_key.startswith("your_openai"):
        try:
            openai_res = call_openai_api(user_message, openai_key)
            if openai_res:
                return openai_res
        except Exception as e:
            print(f"[Chatbot] OpenAI API exception: {e}")

    # 3. Intelligent Local Sommelier Knowledge Engine
    return get_sommelier_response(user_message)
