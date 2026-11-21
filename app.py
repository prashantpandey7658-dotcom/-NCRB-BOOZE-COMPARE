"""
Root entrypoint for Render, Vercel, and WSGI servers.
Exposes the Flask application as `app` so both:
  1. gunicorn app:app          (Render default)
  2. gunicorn backend.app:app  (Explicit module path)
work seamlessly out of the box.
"""

import os
import sys

# Ensure project root and backend directory are in sys.path
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(ROOT_DIR, 'backend')

if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from backend.app import app, create_app

if __name__ == '__main__':
    port = int(os.getenv('PORT', os.getenv('FLASK_PORT', 5050)))
    debug = os.getenv('FLASK_ENV', 'development') == 'development'
    print(f"🚀 Starting NCRB BOOZE COMPARE on port {port} (debug={debug})...")
    app.run(host='0.0.0.0', port=port, debug=debug)
