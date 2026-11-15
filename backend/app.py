"""
Flask Backend Application for NCRB BOOZE COMPARE.
Author: Prashant Pandey
Platform: NCR Regional Beverage & Excise Benchmark Portal
"""

import os
import sys

# Ensure backend directory is in Python path for reliable module imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment configuration
load_dotenv()

from database import init_db, DATABASE_PATH
from seed_data import seed_database
from routes.products import products_bp
from routes.comparison import comparison_bp
from routes.chatbot_routes import chatbot_bp

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'ncrb-luxury-cellar-secret-key-2026')

    # Enable Cross-Origin Resource Sharing (CORS)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register API Blueprints
    app.register_blueprint(products_bp, url_prefix='/api')
    app.register_blueprint(comparison_bp, url_prefix='/api')
    app.register_blueprint(chatbot_bp, url_prefix='/api')

    @app.route('/')
    def root():
        return jsonify({
            "project": "NCRB BOOZE COMPARE",
            "developer": "Prashant Pandey",
            "platform": "NCR Regional Beverage & Excise Price Benchmark",
            "api_documentation": "/api/health",
            "status": "Online"
        })

    @app.route('/api/health')
    def health():
        return jsonify({
            "status": "healthy",
            "database": os.path.exists(DATABASE_PATH),
            "platform": "NCRB BOOZE COMPARE Production API"
        })

    # Auto-initialize and seed database if missing or empty
    if not os.path.exists(DATABASE_PATH):
        print("[App] Database not found. Initializing and seeding sample demonstration data...")
        seed_database()

    return app

app = create_app()

if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 5050))
    debug = os.getenv('FLASK_ENV', 'development') == 'development'
    print(f"🚀 Starting NCRB BOOZE COMPARE backend on port {port} (debug={debug})...")
    app.run(host='0.0.0.0', port=port, debug=debug)
