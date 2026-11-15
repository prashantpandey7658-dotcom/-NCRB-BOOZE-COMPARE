"""
Data models and helper functions for NCRB BOOZE COMPARE.
"""

from database import get_db_connection

class ProductModel:
    @staticmethod
    def get_all(category=None, search=None):
        conn = get_db_connection()
        query = "SELECT * FROM products WHERE 1=1"
        params = []

        if category:
            query += " AND category = ?"
            params.append(category)
        if search:
            query += " AND (name LIKE ? OR description LIKE ?)"
            term = f"%{search}%"
            params.extend([term, term])

        query += " ORDER BY id ASC"
        cursor = conn.execute(query, params)
        rows = cursor.fetchall()
        conn.close()
        return [dict(row) for row in rows]

    @staticmethod
    def get_by_id(product_id):
        conn = get_db_connection()
        cursor = conn.execute("SELECT * FROM products WHERE id = ?", (product_id,))
        row = cursor.fetchone()
        conn.close()
        return dict(row) if row else None

    @staticmethod
    def create(name, category, package_size, description, demo_value, brand_url=""):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO products (name, category, package_size, description, demo_value, brand_url, is_fictional)
            VALUES (?, ?, ?, ?, ?, ?, 0)
            """,
            (name, category, package_size, description, float(demo_value), brand_url)
        )
        new_id = cursor.lastrowid

        # Also create baseline regional records for default zones
        cursor.execute("SELECT id FROM regions")
        regions = cursor.fetchall()
        for r in regions:
            zone_id = r["id"]
            variation = 1.0 + (zone_id * 0.05 - 0.1) # slight variance
            regional_val = round(float(demo_value) * variation, 2)
            cursor.execute(
                """
                INSERT OR REPLACE INTO regional_demo_data (product_id, region_id, demo_value, is_fictional)
                VALUES (?, ?, ?, 0)
                """,
                (new_id, zone_id, regional_val)
            )

        conn.commit()
        conn.close()
        return new_id

    @staticmethod
    def update(product_id, name, category, package_size, description, demo_value, brand_url=""):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            UPDATE products
            SET name = ?, category = ?, package_size = ?, description = ?, demo_value = ?, brand_url = ?
            WHERE id = ?
            """,
            (name, category, package_size, description, float(demo_value), brand_url, product_id)
        )
        # Update baseline regional values too
        cursor.execute("SELECT id FROM regions")
        regions = cursor.fetchall()
        for r in regions:
            zone_id = r["id"]
            variation = 1.0 + (zone_id * 0.05 - 0.1)
            regional_val = round(float(demo_value) * variation, 2)
            cursor.execute(
                """
                UPDATE regional_demo_data
                SET demo_value = ?
                WHERE product_id = ? AND region_id = ?
                """,
                (regional_val, product_id, zone_id)
            )
        conn.commit()
        affected = cursor.rowcount
        conn.close()
        return affected > 0

    @staticmethod
    def delete(product_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM products WHERE id = ?", (product_id,))
        conn.commit()
        affected = cursor.rowcount
        conn.close()
        return affected > 0

class RegionModel:
    @staticmethod
    def get_all():
        conn = get_db_connection()
        cursor = conn.execute("SELECT * FROM regions ORDER BY id ASC")
        rows = cursor.fetchall()
        conn.close()
        return [dict(row) for row in rows]

    @staticmethod
    def get_regional_matrix():
        conn = get_db_connection()
        cursor = conn.execute("""
            SELECT 
                r.id as region_id,
                r.region_name,
                r.description as region_description,
                p.id as product_id,
                p.name as product_name,
                p.category as product_category,
                p.package_size,
                p.brand_url,
                rd.demo_value as regional_demo_value,
                p.demo_value as base_demo_value
            FROM regional_demo_data rd
            JOIN regions r ON rd.region_id = r.id
            JOIN products p ON rd.product_id = p.id
            ORDER BY r.id ASC, p.id ASC
        """)
        rows = cursor.fetchall()
        conn.close()
        return [dict(row) for row in rows]

class ChatbotModel:
    @staticmethod
    def log_interaction(user_message, assistant_response):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO chatbot_history (user_message, assistant_response)
            VALUES (?, ?)
            """,
            (user_message, assistant_response)
        )
        conn.commit()
        conn.close()

    @staticmethod
    def get_history(limit=50):
        conn = get_db_connection()
        cursor = conn.execute(
            "SELECT * FROM chatbot_history ORDER BY id DESC LIMIT ?",
            (limit,)
        )
        rows = cursor.fetchall()
        conn.close()
        return [dict(row) for row in rows]
