/*global WildRydes _config*/

// Code modified from AWS WildRydes example for 474 Project. Modified by SM

var WildRydes = window.WildRydes || {};


(function rideScopeWrapper($) {
    var authToken;
    WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = './signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = './signin.html';
    });
    function getArticle(){
        $.ajax(
            {
                method: 'GET',
                url: _config.api.invokeUrl + '/update',
                headers: {
                        Authorization: authToken
                    },
                dataType: 'text',
                success: function(data) {
                window.alert(data.Title);
            }
        });
    }
    function createArticle(articleTitle, categoryID, tagID, content){
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/update',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                Article: {
                    Heading: articleTitle,
                    Category: categoryID,
                    Content: content,
                    TagID: tagID
                }
            }),
            contentType: 'application/json',
            success: function(){
                console.log("success");
            },
            error: function ajaxError(jqXHR) {
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
            }
        });
    }

    $(function onDocReady() {
        $('#update1').click(handleRequestClick);
        $('#update').click(handleSubmitClick);


        WildRydes.authToken.then(function updateAuthMessage(token) {
            if (token) {
                handleLogin();
                displayUpdate('You are authenticated. Click to see your <a href="#authTokenModal" data-toggle="modal">auth token</a>.');
                $('.authToken').text(token);
            }
        });
    });
    function handleRequestClick(event) {

        var dummyText = 'Dummy Test';

        handleLogin();
        event.preventDefault();
        getArticle();

    }
    
    function handleSubmitClick(event) {
        var articleTitle = document.getElementById('nameUpdate').value;
        var categoryID = document.getElementById('roleUpdate').value;
        var tagID = document.getElementById('tagUpdate').value;
        var content = document.getElementById('emailUpdate').value;
        createArticle(articleTitle, categoryID, tagID, content);
     
        event.preventDefault();

    }
    
    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li>'));
    }
    function handleLogin() {
        $('#signIn').hide();
        $('#signOut').show();
        alert("User Logged In " + $("#signin").text());
    }        



}(jQuery));
