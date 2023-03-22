import requests
from ms_graph import generate_access_token, GRAPH_API_ENDPOINT
from rich import console

console = console.Console()
APP_ID = '7ffb4085-5aac-496f-8dc1-94712a1a20cf'
SCOPES = ['Calendars.ReadWrite']

# Step 1: Generate access token
access_token = generate_access_token(APP_ID, SCOPES)
if access_token is None:
    console.print('Error generating access token')
    exit(1)

headers = {
    'Authorization': 'Bearer ' + access_token['access_token']
}

# Step 2: Fetch events
response = requests.get(GRAPH_API_ENDPOINT + '/me/events', headers=headers)
events = response.json()

# Step 3: Print events
for event in events['value']:
    console.print(event['subject'])
