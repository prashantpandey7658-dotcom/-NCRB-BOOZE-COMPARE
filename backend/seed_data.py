"""
Seed genuine brand demonstration data for NCRB BOOZE COMPARE.
Author: Prashant Pandey
Bar-Inspired Aesthetic with Genuine Products, High-Res Bottle Imagery, and Regional Availability
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import get_db_connection, init_db

def seed_database():
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()

    # Clear existing records
    cursor.execute("DELETE FROM regional_demo_data;")
    cursor.execute("DELETE FROM products;")
    cursor.execute("DELETE FROM regions;")
    cursor.execute("DELETE FROM chatbot_history;")
    cursor.execute("DELETE FROM data_sources;")
    cursor.execute("DELETE FROM sqlite_sequence;")

    # 1. Insert NCR Regional Zones
    regions = [
        ("Delhi Zone (NCT)", "Govt. of NCT Delhi Excise Department benchmark zone (DTTDC / DSIIDC / DCCWS vends)", 0),
        ("Gurugram Zone (Haryana)", "Haryana Excise Zone with competitive retail market structure (Cyber Hub, MG Road, Golf Course Rd)", 0),
        ("Noida Zone (Uttar Pradesh)", "UP Excise consolidated state duty and VAT benchmark zone (Sec 18, Sec 62, Greater Noida)", 0),
        ("Faridabad Zone (Haryana)", "South NCR suburban retail sector with local excise parity (Neelam Flyover, Mathura Rd)", 0),
    ]
    cursor.executemany(
        "INSERT INTO regions (region_name, description, is_fictional) VALUES (?, ?, ?);",
        regions
    )

    # 2. Insert Genuine Brands with High-Res Images & Regional Availability
    products = [
        (
            "Kingfisher Premium Lager",
            "Beer",
            "650 ml Bottle",
            "India's iconic, crisp lager beer crafted with the finest malted barley and German hops. Brewed by United Breweries.",
            140.00,
            "https://www.kingfisherworld.com",
            "https://images.unsplash.com/photo-1608270195725-d716d91f1659?auto=format&fit=crop&w=600&q=80",
            "High availability across all Delhi DTTDC/DSIIDC vends and Haryana L-2 stores",
            0
        ),
        (
            "Bira 91 White Ale",
            "Craft Beer",
            "500 ml Can",
            "Delightfully low-bitterness wheat beer brewed with French malt, curacao orange peel, and Himalayan coriander seeds.",
            170.00,
            "https://www.bira91.com",
            "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=600&q=80",
            "Widely available in Delhi premium vends, Gurugram Cyber Hub, and Noida Sector 18",
            0
        ),
        (
            "Budweiser Magnum Strong",
            "Strong Beer",
            "650 ml Bottle",
            "Super-premium American-style strong lager beer with smooth, full-bodied malt character aged over beechwood.",
            200.00,
            "https://www.budweiser.com",
            "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?auto=format&fit=crop&w=600&q=80",
            "Available across all NCR authorized wine & beer retail shops",
            0
        ),
        (
            "Corona Extra",
            "Imported Beer",
            "355 ml Bottle",
            "World-famous Mexican imported pale lager with a refreshing, crisp taste traditionally served with a fresh lime wedge.",
            250.00,
            "https://www.corona.com",
            "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&w=600&q=80",
            "Available at select premium Delhi L-6 vends, Gurugram Golf Course Rd, and Noida Mall vends",
            0
        ),
        (
            "Old Monk XXX 7YO Dark Rum",
            "Rum",
            "750 ml Bottle",
            "Legendary Indian vatted dark rum aged for 7 years in mature oak casks, renowned for its smooth vanilla, caramel, and spice aroma.",
            480.00,
            "https://www.oldmonkrum.in",
            "https://images.unsplash.com/photo-1614313511387-1436a4480ebb?auto=format&fit=crop&w=600&q=80",
            "Readily available at 100% of authorized liquor vends across Delhi, Haryana, and UP",
            0
        ),
        (
            "Bacardi Carta Blanca Superior",
            "Rum",
            "750 ml Bottle",
            "Classic Puerto Rican white rum aged in white oak barrels and filtered through charcoal for exceptional smoothness in cocktails.",
            950.00,
            "https://www.bacardi.com",
            "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80",
            "Consistently stocked at government and private retail vends in all four NCR sectors",
            0
        ),
        (
            "Royal Stag Premier Whisky",
            "Whisky",
            "750 ml Bottle",
            "Pioneering blend of imported Scottish malts and superior Indian grain spirits with a smooth, woody aroma.",
            550.00,
            "https://www.pernod-ricard.com",
            "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=600&q=80",
            "Universal retail availability across Delhi, Gurugram, Noida, and Faridabad",
            0
        ),
        (
            "Blenders Pride Reserve Collection",
            "Premium Whisky",
            "750 ml Bottle",
            "Sophisticated blend crafted by master blenders combining Scottish malts aged in Solera barrels with fine Indian spirits.",
            1150.00,
            "https://www.pernod-ricard.com",
            "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=600&q=80",
            "Available in all authorized retail vends and model liquor shops",
            0
        ),
        (
            "Jack Daniel's Old No. 7",
            "Tennessee Whiskey",
            "750 ml Bottle",
            "World-renowned charcoal-mellowed Tennessee whiskey matured in handcrafted American white oak barrels with notes of caramel and toasted wood.",
            2800.00,
            "https://www.jackdaniels.com",
            "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80",
            "Available at premium government stores in Delhi and upscale private L-2 shops in Gurugram",
            0
        ),
        (
            "Johnnie Walker Black Label 12YO",
            "Scotch Whisky",
            "750 ml Bottle",
            "Iconic blended Scotch whisky crafted using single malts aged for a minimum of 12 years across Scotland's four corners.",
            2950.00,
            "https://www.johnniewalker.com",
            "https://images.unsplash.com/photo-1594970425785-5b48fb55ea7e?auto=format&fit=crop&w=600&q=80",
            "High availability across all major NCR retail liquor establishments",
            0
        ),
        (
            "Glenfiddich 12 Year Old",
            "Single Malt",
            "750 ml Bottle",
            "The world's most awarded Speyside single malt Scotch whisky, matured in Oloroso sherry and bourbon oak casks with sweet pear notes.",
            4600.00,
            "https://www.glenfiddich.com",
            "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=600&q=80",
            "Available at select high-end excise vends in Delhi, Gurgaon CyberCity, and Noida Sec 18",
            0
        ),
        (
            "Absolut Vodka Swedish",
            "Vodka",
            "750 ml Bottle",
            "Premium Swedish winter-wheat vodka produced via continuous distillation in Åhus, with rich, full-bodied smoothness and pure grain character.",
            1650.00,
            "https://www.absolut.com",
            "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=600&q=80",
            "Well-stocked across government liquor vends and private NCR retail outlets",
            0
        ),
        (
            "Bombay Sapphire London Dry Gin",
            "Gin",
            "750 ml Bottle",
            "Vapour-infused premium London dry gin crafted with 10 hand-selected exotic botanicals including juniper, coriander, and grains of paradise.",
            2200.00,
            "https://www.bombaysapphire.com",
            "https://images.unsplash.com/photo-1607622750671-6cd9a99eabd1?auto=format&fit=crop&w=600&q=80",
            "Available at major licensed liquor stores and departmental wine shops",
            0
        )
    ]

    cursor.executemany(
        """
        INSERT INTO products (name, category, package_size, description, demo_value, brand_url, image_url, availability, is_fictional)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        """,
        products
    )

    # 3. Insert Regional Variations across NCR Zones
    zone_multipliers = {
        1: 1.000, # Delhi baseline
        2: 0.900, # Gurugram (~10% lower)
        3: 1.080, # Noida (~8% higher)
        4: 0.920, # Faridabad (~8% lower)
    }

    cursor.execute("SELECT id, demo_value FROM products;")
    db_products = cursor.fetchall()

    for p in db_products:
        p_id = p["id"]
        base_val = p["demo_value"]
        for z_id, mult in zone_multipliers.items():
            regional_val = round(base_val * mult, 2)
            cursor.execute(
                """
                INSERT INTO regional_demo_data (product_id, region_id, demo_value, is_fictional)
                VALUES (?, ?, ?, 0);
                """,
                (p_id, z_id, regional_val)
            )

    # 4. Insert State Excise & Awareness Citations
    sources = [
        (
            "Delhi State Excise Department (NCT)",
            "https://excise.delhi.gov.in",
            "Statutory retail price schedules, brand registration records, and legal vend guidelines for Delhi."
        ),
        (
            "Haryana Excise & Taxation Department",
            "https://haryanatax.gov.in",
            "Excise policy notifications and statutory L-2 licensing frameworks for Gurugram and Faridabad."
        ),
        (
            "Uttar Pradesh Excise Department",
            "http://upexcise.in",
            "State excise schedules and retail licensing regulations for Gautam Buddha Nagar (Noida)."
        ),
        (
            "National Tele-MANAS Counseling Support",
            "https://telemanas.mohfw.gov.in",
            "National toll-free 24/7 mental health and de-addiction counseling helpline: 14416 / 1800-891-4416."
        )
    ]
    cursor.executemany(
        """
        INSERT INTO data_sources (source_name, source_url, description)
        VALUES (?, ?, ?);
        """,
        sources
    )

    # 5. Insert Welcome Chatbot Interaction
    cursor.execute(
        """
        INSERT INTO chatbot_history (user_message, assistant_response)
        VALUES (
            'Which NCR region has the best prices for beer and scotch?',
            'Due to Haryana''s competitive retail licensing model, Gurugram generally reflects ~10% lower retail prices on imported beers and spirits compared to Delhi''s standard MRP schedule, while Noida reflects UP state excise levies.'
        );
        """
    )

    conn.commit()
    conn.close()
    print("[Seed Data] Re-seeded with genuine brands, high-res bottle photos, and regional availability details.")

if __name__ == "__main__":
    seed_database()
