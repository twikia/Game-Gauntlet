from flask import Flask, render_template
import random

# Create a Flask application instance
app = Flask(__name__)

refs = ["jump_atem.html","pop_lock.html","bottle_flip.html","logicBoard.html","mathgameL1.html","waldo.html","chase.html","cs.html"]
index = random.randint(0, len(refs)-1)

# Define a route for the root URL ("/")
@app.route("/")
def home():
    """
    This is the home page.
    """

    first_game = refs[index]
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
    return render_template("between.html")

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

@app.route("/between")
def between():
    global index, refs
    if (len(refs) > 0):  # Check if there are games left
        next_game = refs[index]
        refs.pop(index)  # Remove first game
        index = random.randint(0, len(refs))
        return render_template(next_game)
    else:
        return render_template("endpage.html")


@app.route("/end")
def end():
    return render_template("end.html")



# Run the application if this script is executed directly
if __name__ == "__main__":
    # Start the Flask development server
    #   - debug=True enables debugging features (auto-reload on code changes, detailed error messages)
    #   - host='0.0.0.0' makes the app accessible from any IP address on your network (not just localhost)
    #   - port=5000 specifies the port number (default is 5000)
    app.run(debug=True, host='0.0.0.0', port=5001)

