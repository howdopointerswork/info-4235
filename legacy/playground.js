"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var script = document.createElement('script');
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
script.type = "text/javascript";
function getUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(`http://localhost:3000/User/username/${username}`);
        const user = yield resp.json();
        if (user == null) {
            alert("user not found");
            return null;
        }
        else {
            alert("user found");
            return user;
        }
    });
}
function addUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = {
            username: username,
            password: password
        };
        try {
            const res = yield fetch('http://localhost:3000/User', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const data = yield res.json();
        }
        catch (e) {
            console.error("Error: ", e);
        }
    });
}
script.onload = function () {
    $(document).ready(function () {
        $('#login').click(function () {
            return __awaiter(this, void 0, void 0, function* () {
                const check_user = ($('#username').val() != '' && $('#username').val() != undefined);
                const check_pw = ($('#password').val() != '' && $('#password').val() != undefined);
                if (check_user && check_pw) {
                    alert("Good!");
                    const username = $('#username').val();
                    const password = $('#password').val();
                    console.log("Username: " + username);
                    console.log(typeof username);
                    const findUser = yield getUser(username);
                    if (findUser == null) {
                        console.log('Signing up...');
                        yield addUser(username, password);
                    }
                    else {
                        console.log('Logging in...');
                        //match password
                        if (findUser.password == password) {
                            console.log("log in successful!");
                        }
                        else {
                            console.log("invalid credentials");
                        }
                    }
                    /*	if(findUser == null){
                            alert("Signing up...");
                        //	addUser(username
        
                        }else{
                            alert("Logging in...");
                        }*/
                }
                else {
                    alert("Bad!");
                }
            });
        });
    });
};
document.head.appendChild(script);
