"""
Comparison and Analytics API endpoints for NCRB BOOZE COMPARE.
"""

from flask import Blueprint, request, jsonify
from models import RegionModel, ProductModel
from database import get_db_connection

comparison_bp = Blueprint('comparison', __name__)

@comparison_bp.route('/regions', methods=['GET'])
def get_regions():
    regions = RegionModel.get_all()
    return jsonify({
        "status": "success",
        "count": len(regions),
        "data": regions
    }), 200

@comparison_bp.route('/regions/demo-data', methods=['GET'])
def get_regional_demo_data():
    matrix = RegionModel.get_regional_matrix()
    return jsonify({
        "status": "success",
        "count": len(matrix),
        "data": matrix
    }), 200

@comparison_bp.route('/comparison', methods=['GET'])
def get_comparison():
    ids_param = request.args.get('ids', '')
    if not ids_param:
        # Default to first 3 products if none specified
        all_prods = ProductModel.get_all()
        selected_ids = [p['id'] for p in all_prods[:3]]
    else:
        try:
            selected_ids = [int(x.strip()) for x in ids_param.split(',') if x.strip()]
        except ValueError:
            return jsonify({"status": "error", "message": "Invalid IDs format"}), 400

    if not selected_ids:
        return jsonify({"status": "error", "message": "No product IDs selected"}), 400

    conn = get_db_connection()
    placeholders = ','.join(['?'] * len(selected_ids))
    query = f"SELECT * FROM products WHERE id IN ({placeholders}) ORDER BY id ASC"
    products = [dict(r) for r in conn.execute(query, selected_ids).fetchall()]

    # Fetch regional data for these products
    reg_query = f"""
        SELECT rd.product_id, r.id as region_id, r.region_name, rd.demo_value
        FROM regional_demo_data rd
        JOIN regions r ON rd.region_id = r.id
        WHERE rd.product_id IN ({placeholders})
        ORDER BY r.id ASC
    """
    reg_rows = [dict(r) for r in conn.execute(reg_query, selected_ids).fetchall()]
    conn.close()

    # Map regional demo values to each product
    for p in products:
        p_id = p['id']
        p['regional_values'] = [
            {"region_id": r['region_id'], "region_name": r['region_name'], "demo_value": r['demo_value']}
            for r in reg_rows if r['product_id'] == p_id
        ]

    # Calculate comparison insights
    values = [p['demo_value'] for p in products]
    min_val = min(values) if values else 0
    max_val = max(values) if values else 0
    diff = round(max_val - min_val, 2)

    return jsonify({
        "status": "success",
        "data": {
            "products": products,
            "metrics": {
                "count": len(products),
                "min_demo_value": min_val,
                "max_demo_value": max_val,
                "max_difference": diff
            }
        }
    }), 200

@comparison_bp.route('/analytics', methods=['GET'])
def get_analytics():
    conn = get_db_connection()

    # 1. Total products and avg value
    p_stats = conn.execute("SELECT COUNT(*) as total_count, AVG(demo_value) as avg_value, MIN(demo_value) as min_val, MAX(demo_value) as max_val FROM products").fetchone()

    # 2. Category distribution
    cat_rows = conn.execute("""
        SELECT category, COUNT(*) as count, AVG(demo_value) as avg_value
        FROM products
        GROUP BY category
        ORDER BY category ASC
    """).fetchall()

    # 3. Regional averages
    reg_rows = conn.execute("""
        SELECT r.id, r.region_name, AVG(rd.demo_value) as avg_regional_value, COUNT(rd.product_id) as sample_count
        FROM regions r
        LEFT JOIN regional_demo_data rd ON r.id = rd.region_id
        GROUP BY r.id, r.region_name
        ORDER BY r.id ASC
    """).fetchall()

    # 4. Regional breakdown per category
    matrix_rows = conn.execute("""
        SELECT r.region_name, p.category, AVG(rd.demo_value) as avg_val
        FROM regional_demo_data rd
        JOIN regions r ON rd.region_id = r.id
        JOIN products p ON rd.product_id = p.id
        GROUP BY r.region_name, p.category
        ORDER BY r.region_name, p.category
    """).fetchall()

    # 5. Data sources for awareness & citations
    sources = [dict(r) for r in conn.execute("SELECT * FROM data_sources").fetchall()]

    conn.close()

    return jsonify({
        "status": "success",
        "data": {
            "overview": {
                "total_products": p_stats["total_count"] or 0,
                "avg_demo_value": round(p_stats["avg_value"] or 0, 2),
                "min_demo_value": round(p_stats["min_val"] or 0, 2),
                "max_demo_value": round(p_stats["max_val"] or 0, 2),
                "total_regions": len(reg_rows),
                "total_categories": len(cat_rows)
            },
            "category_distribution": [
                {
                    "category": r["category"],
                    "count": r["count"],
                    "avg_value": round(r["avg_value"], 2)
                } for r in cat_rows
            ],
            "regional_averages": [
                {
                    "region_id": r["id"],
                    "region_name": r["region_name"],
                    "avg_regional_value": round(r["avg_regional_value"] or 0, 2)
                } for r in reg_rows
            ],
            "matrix": [dict(r) for r in matrix_rows],
            "data_sources": sources
        }
    }), 200
