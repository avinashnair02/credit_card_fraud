from flask import Flask, request, jsonify,render_template
import util
import os

app = Flask(__name__)
@app.route('/')
def home():
   return render_template('app.html')


@app.route('/isfraud', methods=['POST'])
def get_myy():
    time = float(request.form['time'])
    amount = float(request.form['amount'])
    
    result = util.check_fraud(time,amount)
    print('RESULT   ',result)

    response = jsonify({
        'message': result
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port)
