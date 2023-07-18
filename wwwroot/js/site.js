// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

"use strict"

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

document.getElementById("sendButton").disabled = true;
document.getElementById("deleteButton").disabled = true;


connection.on("ReceiveMessage", function (user, message) 
{
    var li = document.createElement("li");
    li.textContent = `${user} : ${message}`;
    document.getElementById("messagesList").appendChild(li);
});

connection.on("DeleteMessage", function () 
{
    var messagesList = document.getElementById("messagesList");
    messagesList.removeChild(messagesList.firstChild);
});


connection.start().then(function () 
{
    document.getElementById("sendButton").disabled = false;
}
).catch(function (err) 
    {
        return console.error(err.toString());
    }
);

document.getElementById("sendButton").addEventListener("click", function (event) 
{   
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    
    connection.invoke("SendMessage", user, message).catch(function (err) 
    {
        return console.error(err.toString());
    });
    event.preventDefault();

    document.getElementById("deleteButton").disabled = false;
});


document.getElementById("deleteButton").addEventListener("click", function (event) 
{   
    connection.invoke("DeleteMessage").catch(function (err) 
    {
        return console.error(err.toString());
    });
    event.preventDefault();
});


