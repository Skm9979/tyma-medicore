from flask import Flask, request, jsonify
from model.predictor import predict_outbreak

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json.get('data', [])
    result = predict_outbreak(data)
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True) 