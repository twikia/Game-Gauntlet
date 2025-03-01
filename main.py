from flask import Flask, render_template

# Create a Flask application instance
app = Flask(__name__)

# Define a route for the root URL ("/")
@app.route("/")
def hello_world():
    """
    This function will be executed when a user accesses the root URL.
    It returns the string "Hello, World!".
    """
    return "Hello, World!"

@app.route("/my_page")
def my_page():
    return render_template("test.html")


# Run the application if this script is executed directly
if __name__ == "__main__":
    # Start the Flask development server
    #   - debug=True enables debugging features (auto-reload on code changes, detailed error messages)
    #   - host='0.0.0.0' makes the app accessible from any IP address on your network (not just localhost)
    #   - port=5000 specifies the port number (default is 5000)
    app.run(debug=True, host='0.0.0.0', port=5001)
