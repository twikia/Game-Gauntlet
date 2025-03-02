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

@app.route("/b")
def bottle_flip():
    return render_template("bottle_flip.html")

@app.route("/after_game")
def back_home():
    return render_template("home.html")

@app.route("/logicBoard")
def logicBoard():
    """
    This is the logic board.
    """
    return render_template("logicBoard.html")

@app.route("/level1")
def level1():
    """
    Math Game Level 1
    """
    return render_template("mathgameL1.html")

@app.route("/level2")
def level2():
    """
    Math Game Level 2
    """
    return render_template("mathgameL2.html")
@app.route("/level3")
def level3():
    """
    Math Game Level 3
    """
    return render_template("mathgameL3.html")

@app.route("/waldo")
def waldo():
    return render_template("waldo.html")

@app.route("/chase")
def chase():
    return render_template("chase.html")

@app.route("/csgame")
def csgame():
    return render_template("cs.html")

@app.route("/cs2")
def cs2():
    return render_template("cs2.html")

@app.route("/cs3")
def cs3():
    return render_template("cs3.html")

@app.route("/colorblocksudoku")
def colorblocksudoku():
    return render_template("colorblocksudoku.html")
# Run the application if this script is executed directly
if __name__ == "__main__":
    # Start the Flask development server
    #   - debug=True enables debugging features (auto-reload on code changes, detailed error messages)
    #   - host='0.0.0.0' makes the app accessible from any IP address on your network (not just localhost)
    #   - port=5000 specifies the port number (default is 5000)
    app.run(debug=True, host='0.0.0.0', port=5001)
