'use strict';
docLoaded(() => {

    const bizInfo = {
        cName: document.querySelector('.business-name-block'),
        fName: document.querySelector('.business-owner-fname-block'),
        lName: document.querySelector('.business-owner-lname-block'),
        bType: document.querySelector('.business-type-block'),
        email: document.querySelector('.business-email-block'),
        phoneNo: document.querySelector('.business-phone-block'),
        location: document.querySelector('.business-location-block'),
        description: document.querySelector('.business-description-block')
    };

    const bizInfoDefaults = {
        cName: "Enter business name here",
        fName: "first name",
        lName: "last name",
        bType: "Enter business type",
        email: "Enter email",
        phoneNo: "Enter phone number",
        location: "Enter location",
        description: "Enter description"
    };

    let edit_button = document.getElementById("edit-button");
    let save_button = document.getElementById("save-button");

    async function getData() {
        try {
            let response = await fetch('/get-user', {
                method: 'GET'
            });
            if (response.status == 200) {
                let data = await response.text();
                popThaSpots(JSON.parse(data));
            }
        } catch (err) {

        }
    }
    getData();

    function popThaSpots(data) {
        document.querySelector("#profile-picture").src = "./avatars/" + data[0].profilePic;
        bizInfo.cName.innerHTML = (data[0].cName != undefined && data[0].cName != null) ? data[0].cName : '';
        bizInfo.fName.innerHTML = (data[0].fName != undefined && data[0].fName != null) ? data[0].fName : '';
        bizInfo.lName.innerHTML = (data[0].lName != undefined && data[0].lName != null) ? data[0].lName : '';
        bizInfo.bType.innerHTML = (data[0].bType != undefined && data[0].bType != null) ? data[0].bType : '';
        bizInfo.email.innerHTML = (data[0].email != undefined && data[0].email != null) ? data[0].email : '';
        bizInfo.phoneNo.innerHTML = (data[0].phoneNo != undefined && data[0].phoneNo != null) ? data[0].phoneNo : '';
        bizInfo.location.innerHTML = (data[0].location != undefined && data[0].location != null) ? data[0].location : '';
        bizInfo.description.innerHTML = (data[0].description != undefined && data[0].description != null) ? data[0].description : '';
    }

    function clickEdit(section) {
        section.contentEditable = true;
        section.style.color = "#2c598e";
        section.style.borderRadius = "5px";
        section.style.padding = "10px";
        section.style.backgroundColor = "rgb(246, 255, 179)";
    }

    document.getElementById("edit-button").addEventListener("click", (event) => {
        for (const [key, value] of Object.entries(bizInfo)) {
            clickEdit(value);
        }

        // clickEdit(bizInfo.biz_name);
        // clickEdit(bizInfo.biz_owner_fName);
        // clickEdit(bizInfo.biz_owner_lName);
        // clickEdit(bizInfo.biz_type);
        // clickEdit(bizInfo.biz_email);
        // clickEdit(bizInfo.biz_phone);
        // clickEdit(bizInfo.biz_location);
        // clickEdit(bizInfo.biz_description);

        document.getElementById("edit-status").innerHTML = "";
        edit_button.innerHTML = "";
        save_button.innerHTML = "Save";
        event.preventDefault();
    });

    function saved(data) {
        console.log(data.innerHTML);
        data.contentEditable = false;
        data.style.color = '#ffd500';
    };

    function checkEmpty(data) {
        let checkEmpty = data.trim();
        let checkSpace = data.replace('/&nbsp;/g', '');
        let checkEnter = data.replace('/<div><br></div>/g', '');

        if (checkEmpty == '' || checkSpace.trim() == '' || checkEnter.trim() == '') {
            return false;
        } else {
            return true;
        }
    };


    document.getElementById("save-button").addEventListener("click", async (event) => {
        let dataToSend = { };
        for (const [key, value] of Object.entries(bizInfo)) {
            saved(value);
            if (!checkEmpty(value.innerHTML)) {
                value.innerHTML = bizInfoDefaults[key];  
            }
            dataToSend[key] = value.innerHTML;
        }
        dataToSend["username"] = new URLSearchParams(document.location.search).get("user");

        document.getElementById("edit-status").innerHTML = "";
        edit_button.innerHTML = "Edit Profile";
        save_button.innerHTML = "";

        console.log(dataToSend);
        sendData(JSON.stringify(dataToSend));
        location.reload();
    });
});

async function sendData(data) {
    try {
        console.log(data);
        await fetch('/update-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        });
    } catch (err) {
        console.log(err);
    }
}

function docLoaded(action) {
    if (document.readyState != 'loading')
        action();
    else
        document.addEventListener('DOMContentLoaded', action);
}
