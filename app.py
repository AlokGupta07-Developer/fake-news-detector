from flask import Flask, render_template, request, jsonify
from ml_model import predict_news

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyze_text', methods=['POST'])
def analyze_text():
    data = request.get_json()
    text = data.get('text', '')
    
    if not text.strip():
        return jsonify({"status": "error", "message": "Text cannot be empty."}), 400
        
    result = predict_news(text)
    return jsonify(result)

@app.route('/analyze_url', methods=['POST'])
def analyze_url():
    data = request.get_json()
    url = data.get('url', '')
    
    if not url.strip():
        return jsonify({"status": "error", "message": "URL cannot be empty."}), 400
        
    result = predict_news(url) 
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5500)
