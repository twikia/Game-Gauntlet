from flask import Flask, render_template

# Create a Flask application instance
app = Flask(__name__)

# Define a route for the root URL ("/")
@app.route("/")
def home():
    """
    This is the home page.
    """
    return render_template("home.html")

@app.route("/j")
def kango_jump():
    return render_template("jump_atem.html")

@app.route("/p")
def pop_lock():
    return render_template("pop_lock.html")

@app.route("/after_game")
def back_home():
    return render_template("home.html")

@app.route("/logicBoard")
def logicBoard():
    """
    This is the logic board.
    """
    return render_template("logicBoard.html")


@app.route("/chase")
def chase():
    return render_template("chase.html")

# Run the application if this script is executed directly
if __name__ == "__main__":
    # Start the Flask development server
    #   - debug=True enables debugging features (auto-reload on code changes, detailed error messages)
    #   - host='0.0.0.0' makes the app accessible from any IP address on your network (not just localhost)
    #   - port=5000 specifies the port number (default is 5000)
    app.run(debug=True, host='0.0.0.0', port=5001)
