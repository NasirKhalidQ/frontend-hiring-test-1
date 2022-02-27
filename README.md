# 💻 TuringTech - Frontend technical test (Intermediate)

This test is a part of the hiring process at TuringTech for the Frontend Engineer position.

Website is deployed [here]()

## Technologies used ⚙

- ReactJS with [CRA](https://create-react-app.dev/) v5.0+
- [Bootsrap](https://react-bootstrap.github.io/) for design
- [Dayjs](https://day.js.org/) for formatting dates and calculating difference
- [Axios](https://axios-http.com/docs/intro) for making HTTP requests

## Tasks Completed ✅

- Display a paginated list of calls retrieved from the API
- Display the call details view if the user clicks on a call
- Archive one or several calls
- Group calls by date
- Filter calls by type

## Demo:

### Main Page
![image](https://user-images.githubusercontent.com/75773436/155866728-88673114-90c9-44cd-af82-c73404ba2f95.png)

Before displaying any data the user must be authenticated. A POST request is made with a username and password which are retrieved from environment variables. An auth token is returned on a successfull request and it gets stored in the local storage. No need to authenticate by clicking on the button since the authentication happens when the page loads. A timestamp is stored in localstorage when the token is generated. A useEffect runs every 30 seconds to check if the time lapsed between the token generated and current time is greated than 9 minutes. If it is, a new POST request is made to the refresh token endpoint using existing token to get new token and stored in local storage. This cycle continues indefinitely.

### Call Details
![image](https://user-images.githubusercontent.com/75773436/155866737-cf82053f-93f9-490b-af04-2605aa876227.png)

All call details which are returned in the nodes payload for each call are displayed including notes in a popover.

### Archive Call
![image](https://user-images.githubusercontent.com/75773436/155866741-ebeb1b6e-3cb4-4873-97c9-7e6821118160.png)

Each button click is accompanied by a toast on top of the page to notify the success of the action. Call is archived by making a PUT request with the id of the call.

### Multiple Archive
![image](https://user-images.githubusercontent.com/75773436/155866747-d343f153-66c0-4110-bdbd-60e37ce75651.png)
![image](https://user-images.githubusercontent.com/75773436/155866757-9485a83d-c8f9-4450-ac05-a2783cf342b7.png)

Archive multiple calls by selecting each call with a checkbox which gets stored in an array. Then the archive all button takes each PUT request one by one and executes it using [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).

### Add Note
![image](https://user-images.githubusercontent.com/75773436/155866763-3288bf57-86d0-4e3e-8701-fe931ca4b810.png)

A note can be added to a call using popover.

### Pagination
![image](https://user-images.githubusercontent.com/75773436/155866780-4d7bd541-9bd2-40c1-b693-372f3057b390.png)

Pagination works by storing the offset in a state and updating the state by 10 on each button click. This offset gets used in each subsequent GET request for fetching calls.

### Filtering
![image](https://user-images.githubusercontent.com/75773436/155866783-4e00faec-7edd-446c-976d-a0dd1db3c9e0.png)

Filter call by type such as archived, missed, answered, etc.

## Error

### Pusher
![image](https://user-images.githubusercontent.com/75773436/155866788-1d67ce02-3415-476c-be4e-3484f2043ca9.png)
![image](https://user-images.githubusercontent.com/75773436/155866792-f2d7c624-26df-4f9c-95dd-06db4cfdbf9b.png)

Unfortunately, using the pusher sdk I was not able to subscribe to real time data to update my state. I kept getting 403 error as authentication was not working.
