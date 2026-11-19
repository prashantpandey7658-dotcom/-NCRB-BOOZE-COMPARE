"""
Vercel Serverless Function Entrypoint for NCRB BOOZE COMPARE Flask Backend.
"""

import os
import sys

# Ensure parent directory is in sys.path for backend and database imports
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PARENT_DIR = os.path.dirname(CURRENT_DIR)
if PARENT_DIR not in sys.path:
    sys.path.insert(0, PARENT_DIR)

from backend.app import create_app

# Expose WSGI application for Vercel
app = create_app()

if __name__ == "__main__":
    app.run()
