import dash
from dash import dcc, html
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output
import requests
import plotly.express as px
import pandas as pd

app = dash.Dash(__name__)
server = app.server

app.layout = html.Div([
    html.H1('Construction Projects Dashboard'),
    dcc.Interval(id='interval-component', interval=5*1000, n_intervals=0),  # Update every 5 seconds
    dcc.Graph(id='progress-graph'),
    dcc.Graph(id='budget-graph'),
    dcc.Graph(id='resources-graph')
])

@app.callback(
    [Output('progress-graph', 'figure'),
     Output('budget-graph', 'figure'),
     Output('resources-graph', 'figure')],
    [Input('interval-component', 'n_intervals')]
)
def update_graphs(n):
    response = requests.get('http://localhost:5000/projects')
    data = response.json()
    df = pd.DataFrame(data)
    
    progress_fig = px.bar(df, x='name', y='progress', title='Project Progress')
    budget_fig = px.bar(df, x='name', y='budget', title='Project Budget')
    resources_fig = px.bar(df, x='name', y='resources', title='Resource Allocation')

    return progress_fig, budget_fig, resources_fig

if __name__ == '__main__':
    app.run_server(debug=True)
