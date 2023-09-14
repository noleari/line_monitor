import flask

app = flask.Flask("Bar App")




@app.route('/frontend.html')
def frontend():
    

@app.route('/backend.html')
def backend():
    

@app.route('/')
def home():
    with open('htmlname.html') as f:
        html = f.read()
    return html

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, threaded=True)
    