"""
Chatbot and Admin API routes for NCRB BOOZE COMPARE.
"""

from flask import Blueprint, request, jsonify
from chatbot import ask_chatbot
from models import ChatbotModel
from database import get_db_connection
from seed_data import seed_database

chatbot_bp = Blueprint('chatbot', __name__)

@chatbot_bp.route('/chatbot', methods=['POST'])
def handle_chat():
    data = request.get_json() or {}
    user_message = data.get('message', '').strip()

    if not user_message:
        return jsonify({
            "status": "error",
            "message": "Message content cannot be empty."
        }), 400

    # Generate assistant response
    assistant_response = ask_chatbot(user_message)

    # Persist interaction into database
    try:
        ChatbotModel.log_interaction(user_message, assistant_response)
    except Exception as e:
        print(f"[Chatbot] Error logging interaction: {e}")

    return jsonify({
        "status": "success",
        "data": {
            "user_message": user_message,
            "response": assistant_response
        }
    }), 200

@chatbot_bp.route('/chatbot/history', methods=['GET'])
def get_chat_history():
    history = ChatbotModel.get_history(limit=30)
    return jsonify({
        "status": "success",
        "data": history
    }), 200

@chatbot_bp.route('/chatbot/clear', methods=['POST'])
def clear_chat_history():
    conn = get_db_connection()
    conn.execute("DELETE FROM chatbot_history;")
    conn.commit()
    conn.close()
    return jsonify({
        "status": "success",
        "message": "Chat history cleared successfully"
    }), 200

@chatbot_bp.route('/admin/reset', methods=['POST'])
def reset_database():
    try:
        seed_database()
        return jsonify({
            "status": "success",
            "message": "SQLite database re-seeded successfully with standard academic demonstration dataset."
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"Failed to reset database: {str(e)}"
        }), 500
