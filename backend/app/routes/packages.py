from flask import Blueprint, jsonify, request

from ..data import PACKAGES

packages_bp = Blueprint("packages", __name__)


@packages_bp.get("")
def list_packages():
    style = request.args.get("style")
    if style:
        filtered = [item for item in PACKAGES if style in item.get("styles", [])]
        return jsonify(filtered)
    return jsonify(PACKAGES)
