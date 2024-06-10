from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import pandas as pd

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///projects.db'
db = SQLAlchemy(app)

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    progress = db.Column(db.Float, nullable=False)
    budget = db.Column(db.Float, nullable=False)
    resources = db.Column(db.Integer, nullable=False)

db.create_all()

@app.route('/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([{
        'id': project.id,
        'name': project.name,
        'progress': project.progress,
        'budget': project.budget,
        'resources': project.resources
    } for project in projects])

@app.route('/projects', methods=['POST'])
def add_project():
    data = request.json
    new_project = Project(
        name=data['name'],
        progress=data['progress'],
        budget=data['budget'],
        resources=data['resources']
    )
    db.session.add(new_project)
    db.session.commit()
    return jsonify({'message': 'Project added successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True)
