"""
Product API endpoints for NCRB BOOZE COMPARE.
"""

from flask import Blueprint, request, jsonify
from models import ProductModel
from database import get_db_connection

products_bp = Blueprint('products', __name__)

@products_bp.route('/products', methods=['GET'])
def get_products():
    category = request.args.get('category')
    search = request.args.get('search')
    products = ProductModel.get_all(category=category, search=search)
    return jsonify({
        "status": "success",
        "count": len(products),
        "data": products
    }), 200

@products_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = ProductModel.get_by_id(product_id)
    if not product:
        return jsonify({"status": "error", "message": "Sample product not found"}), 404
    return jsonify({
        "status": "success",
        "data": product
    }), 200

@products_bp.route('/products', methods=['POST'])
def create_product():
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    category = data.get('category', '').strip()
    package_size = data.get('package_size', '').strip()
    description = data.get('description', '').strip()
    demo_value = data.get('demo_value')

    if not name or not category or not package_size or demo_value is None:
        return jsonify({
            "status": "error",
            "message": "Missing required fields: name, category, package_size, demo_value"
        }), 400

    try:
        val = float(demo_value)
        if val <= 0:
            raise ValueError()
    except ValueError:
        return jsonify({"status": "error", "message": "demo_value must be a positive number"}), 400

    new_id = ProductModel.create(name, category, package_size, description, val)
    return jsonify({
        "status": "success",
        "message": "Fictional sample product created successfully",
        "id": new_id
    }), 201

@products_bp.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    category = data.get('category', '').strip()
    package_size = data.get('package_size', '').strip()
    description = data.get('description', '').strip()
    demo_value = data.get('demo_value')

    if not name or not category or not package_size or demo_value is None:
        return jsonify({
            "status": "error",
            "message": "Missing required fields: name, category, package_size, demo_value"
        }), 400

    try:
        val = float(demo_value)
        if val <= 0:
            raise ValueError()
    except ValueError:
        return jsonify({"status": "error", "message": "demo_value must be a positive number"}), 400

    updated = ProductModel.update(product_id, name, category, package_size, description, val)
    if not updated:
        return jsonify({"status": "error", "message": "Product not found or not modified"}), 404

    return jsonify({
        "status": "success",
        "message": "Fictional sample product updated successfully"
    }), 200

@products_bp.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    deleted = ProductModel.delete(product_id)
    if not deleted:
        return jsonify({"status": "error", "message": "Product not found"}), 404

    return jsonify({
        "status": "success",
        "message": "Fictional sample product deleted successfully"
    }), 200

@products_bp.route('/categories', methods=['GET'])
def get_categories():
    conn = get_db_connection()
    cursor = conn.execute("SELECT DISTINCT category FROM products ORDER BY category ASC")
    rows = cursor.fetchall()
    conn.close()
    categories = [r['category'] for r in rows]
    return jsonify({
        "status": "success",
        "data": categories
    }), 200
