import requests
from ms_graph import generate_access_token, GRAPH_API_ENDPOINT
from rich import console



console =console.Console()
APP_ID ='7ffb4085-5aac-496f-8dc1-94712a1a20cf'
SCOPES =['Calendars.ReadWrite']


#Step 1
access_token = generate_access_token(APP_ID, SCOPES)
if access_token is None:
    console.print('Error generating access token')
    exit(1)

headers = {
    'Authorization': 'Bearer ' + access_token['access_token']
}

#creating an event
def construct_event_detail(event_name, **event_details):
    request_body={
        'subject':event_name
    }
    for key,val in event_details.items():
        request_body[key]=val
    return request_body

response1_create =requests.post(
    GRAPH_API_ENDPOINT +f'/me/events',
    headers =headers,
    json = construct_event_detail('Movie Night')
)
console.print(response1_create.json())