from flask import Flask, jsonify, render_template, send_from_directory
import json
import os
import random
from flask_cors import CORS

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

facts_path = os.path.join(app.static_folder, "data.json")
with open(facts_path, "r", encoding="utf-8") as f:
    facts = json.load(f)

@app.route("/api/facts", methods=["GET"])
def get_facts():
    return jsonify(facts)

@app.route("/api/random-fact", methods=["GET"])
def get_random_fact():
    return jsonify(random.choice(facts))

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/static/<path:filename>")
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)