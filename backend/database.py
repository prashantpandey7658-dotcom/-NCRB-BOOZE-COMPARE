"""
Database connection and initialization module for NCRB BOOZE COMPARE.
Uses SQLite3 with parameterized queries and foreign key constraints.
"""

import os
import sqlite3

# Define database file path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATABASE_DIR = os.path.join(BASE_DIR, 'database')
DATABASE_PATH = os.path.join(DATABASE_DIR, 'ncrb_demo.db')

def get_db_path():
    """Returns database path, copying to /tmp in Vercel serverless environment."""
    if os.getenv("VERCEL") or not os.access(DATABASE_DIR, os.W_OK):
        tmp_db = "/tmp/ncrb_demo.db"
        if not os.path.exists(tmp_db) and os.path.exists(DATABASE_PATH):
            import shutil
            shutil.copyfile(DATABASE_PATH, tmp_db)
        if os.path.exists(tmp_db):
            return tmp_db
    try:
        os.makedirs(DATABASE_DIR, exist_ok=True)
    except OSError:
        pass
    return DATABASE_PATH

def get_db_connection():
    """Create and return a database connection with dict-like row access."""
    db_path = get_db_path()
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn

def init_db():
    """Initialize database tables according to NCR beverage portal specifications."""
    conn = get_db_connection()
    cursor = conn.cursor()

    # Table 1: products
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        package_size TEXT NOT NULL,
        abv TEXT,
        description TEXT,
        demo_value REAL NOT NULL,
        brand_url TEXT,
        image_url TEXT,
        availability TEXT,
        is_fictional BOOLEAN DEFAULT 0
    );
    """)

    # Ensure optional columns exist if table was created earlier
    for col in [("brand_url", "TEXT"), ("image_url", "TEXT"), ("availability", "TEXT"), ("abv", "TEXT")]:
        try:
            cursor.execute(f"ALTER TABLE products ADD COLUMN {col[0]} {col[1]};")
        except sqlite3.OperationalError:
            pass # Column already exists

    # Table 2: regions
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS regions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        region_name TEXT NOT NULL UNIQUE,
        description TEXT,
        is_fictional BOOLEAN DEFAULT 1
    );
    """)

    # Table 3: regional_demo_data
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS regional_demo_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        region_id INTEGER NOT NULL,
        demo_value REAL NOT NULL,
        is_fictional BOOLEAN DEFAULT 1,
        FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
        FOREIGN KEY (region_id) REFERENCES regions (id) ON DELETE CASCADE,
        UNIQUE (product_id, region_id)
    );
    """)

    # Table 4: chatbot_history
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS chatbot_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_message TEXT NOT NULL,
        assistant_response TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Table 5: data_sources
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS data_sources (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source_name TEXT NOT NULL,
        source_url TEXT,
        description TEXT,
        last_verified DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    """)

    conn.commit()
    conn.close()
    print(f"[Database] Initialized tables in {DATABASE_PATH}")

if __name__ == "__main__":
    init_db()
