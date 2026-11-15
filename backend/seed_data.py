"""
Seed fictional demonstration data for NCRB BOOZE COMPARE.
Author: Prashant Pandey
Academic Purpose: College Demonstration Project - Fictional Data Only
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

    # 1. Insert Fictional Regions (Demo Zones)
    regions = [
        ("Demo Zone 1", "Fictional Demonstration North Sector (Simulated Urban Market)", 1),
        ("Demo Zone 2", "Fictional Demonstration Central Sector (Simulated Commercial Hub)", 1),
        ("Demo Zone 3", "Fictional Demonstration South Sector (Simulated Suburban Market)", 1),
        ("Demo Zone 4", "Fictional Demonstration East Sector (Simulated Metro Peripheral)", 1),
    ]
    cursor.executemany(
        "INSERT INTO regions (region_name, description, is_fictional) VALUES (?, ?, ?);",
        regions
    )

    # 2. Insert Fictional Products
    products = [
        (
            "Sample Brand A",
            "Category A",
            "750 ml Sample Bottle",
            "Fictional premium malt demonstration beverage with smooth simulated oak aroma. Strictly academic dummy data.",
            1200.00,
            1
        ),
        (
            "Sample Brand B",
            "Category A",
            "750 ml Sample Bottle",
            "Fictional reserve blend demonstration item crafted for comparison testing across simulated metro zones.",
            1500.00,
            1
        ),
        (
            "Sample Brand C",
            "Category B",
            "650 ml Sample Bottle",
            "Fictional crisp grain brew placeholder for demonstrating mid-tier pricing algorithms and tax variance curves.",
            950.00,
            1
        ),
        (
            "Sample Brand D",
            "Category B",
            "750 ml Sample Bottle",
            "Fictional botanical juniper essence sample record used to demonstrate multi-attribute comparison matrices.",
            1800.00,
            1
        ),
        (
            "Sample Brand E",
            "Category C",
            "750 ml Sample Bottle",
            "Fictional aged cane extract demo product utilized to demonstrate highest-quartile academic pricing distributions.",
            2000.00,
            1
        ),
        (
            "Sample Brand F",
            "Category C",
            "500 ml Sample Can",
            "Fictional refreshing malt demonstration can demonstrating compact volume price-per-ml analytics.",
            650.00,
            1
        ),
        (
            "Sample Brand G",
            "Category D",
            "750 ml Sample Bottle",
            "Fictional sparkling fermented demo beverage demonstrating sparkling category variance across zones.",
            2400.00,
            1
        ),
        (
            "Sample Brand H",
            "Category D",
            "750 ml Sample Bottle",
            "Fictional artisanal reserve sample record for multi-region outlier detection and statistical analysis.",
            2850.00,
            1
        ),
    ]

    cursor.executemany(
        """
        INSERT INTO products (name, category, package_size, description, demo_value, is_fictional)
        VALUES (?, ?, ?, ?, ?, ?);
        """,
        products
    )

    # 3. Insert Regional Demo Matrix
    # Product baseline vs Zone variations (Demo Zone 1=1.0x, Demo Zone 2=1.125x, Demo Zone 3=0.916x, Demo Zone 4=1.208x)
    zone_multipliers = {
        1: 1.000, # Demo Zone 1 baseline
        2: 1.125, # Demo Zone 2 (+12.5%)
        3: 0.917, # Demo Zone 3 (-8.3%)
        4: 1.208, # Demo Zone 4 (+20.8%)
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
                VALUES (?, ?, ?, 1);
                """,
                (p_id, z_id, regional_val)
            )

    # 4. Insert Educational / Awareness Data Sources
    sources = [
        (
            "National Institute on Alcohol Abuse and Alcoholism (NIAAA)",
            "https://www.niaaa.nih.gov",
            "Educational research regarding alcohol metabolism, health impacts, and awareness standards."
        ),
        (
            "World Health Organization (WHO) - Global Alcohol Action Plan",
            "https://www.who.int/publications/i/item/9789240052109",
            "Global public health frameworks and harm prevention evidence-based guidelines."
        ),
        (
            "National Legal Framework & Age Regulations (India/NCR Reference)",
            "https://delhi.gov.in/excise",
            "Academic legal reference on excise governance, regional statutory compliance, and MLDA statutory requirements."
        ),
        (
            "Alcohol & Drug Information Centre (ADIC) Helpline",
            "https://adic.org.in",
            "National student and community counseling directory and emergency support contact information."
        )
    ]
    cursor.executemany(
        """
        INSERT INTO data_sources (source_name, source_url, description)
        VALUES (?, ?, ?);
        """,
        sources
    )

    # 5. Insert Sample Chatbot Welcome History
    cursor.execute(
        """
        INSERT INTO chatbot_history (user_message, assistant_response)
        VALUES (
            'What is the purpose of this project?',
            'Welcome! I am NCRB AI ASSISTANT. This project, NCRB BOOZE COMPARE by Prashant Pandey, is a college academic demonstration showcasing product comparison algorithms, regional data visualization, and database management using fictional sample data only.'
        );
        """
    )

    conn.commit()
    conn.close()
    print("[Seed Data] Successfully seeded 8 demo products, 4 demo zones, 32 regional matrix records, and academic sources.")

if __name__ == "__main__":
    seed_database()
