//bounded function to send data to api 
window.addEventListener("winner", (e) => {
    console.log("event emitter WINNER", e.detail.wins, e.detail.losses);
    console.log(e.detail);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(e.detail);
    console.log(raw);
    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };
    const url = new URL("http://localhost:3001/api");

    fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
});
