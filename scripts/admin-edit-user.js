'use strict';

document.querySelector('#search-user').addEventListener("click", function (event) {
  let searchInput = {
    username: document.querySelector('#search-input').value
  }
  document.querySelector('#search-input').value = "";
  document.querySelector('.edit-submit').innerHTML = "Edit Account";
  sendSearch(searchInput);
  event.preventDefault();
})

async function sendSearch(data) {
  try {
    let response = await fetch('/search-user', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(data)
    });
    if (response.status == 200) {
      let data = await response.text();
      let dataParsed = JSON.parse(data);
      popUserData(dataParsed.rows);
    }
  } catch (err) {
    if (err) throw err;
  }
}

let username_block = document.querySelector('input[name=\'username\']');
let email_block = document.querySelector('input[name=\'email\']');
let email_verify_block = document.querySelector('input[name=\'emailVerify\']');
let company_name_block = document.querySelector('input[name=\'cName\']');
let biz_type_block = document.querySelector('input[name=\'bType\']');
let first_name_block = document.querySelector('input[name=\'fName\']');
let last_name_block = document.querySelector('input[name=\'lName\']');
let phone_num_block = document.querySelector('input[name=\'phoneNo\']');
let location_block = document.querySelector('input[name=\'location\']');
let description_block = document.querySelector('input[name=\'description\']');
let checkbox_block = document.querySelector('input[name=\'isAdmin\']');
let edit_password = false;

function popUserData(rows) {
  username_block.value = (rows[0].username != undefined && rows[0].username != null) ? rows[0].username : '';
  email_block.value = (rows[0].email != undefined && rows[0].email != null) ? rows[0].email : '';
  company_name_block.value = (rows[0].cName != undefined && rows[0].cName != null) ? rows[0].cName : '';
  biz_type_block.value = (rows[0].bType != undefined && rows[0].bType != null) ? rows[0].bType : '';
  first_name_block.value = (rows[0].fName != undefined && rows[0].fName != null) ? rows[0].fName : '';
  last_name_block.value = (rows[0].lName != undefined && rows[0].lName != null) ? rows[0].lName : '';
  phone_num_block.value = (rows[0].phoneNo != undefined && rows[0].phoneNo != null) ? rows[0].phoneNo : '';
  location_block.value = (rows[0].location != undefined && rows[0].location != null) ? rows[0].location : '';
  description_block.value = (rows[0].description != undefined && rows[0].description != null) ? rows[0].description : '';
}

let username_block_ori = username_block.value;
let email_block_ori = email_block.value;
let company_name_block_ori = company_name_block.value;
let biz_type_block_ori = biz_type_block.value;
let first_name_block_ori = first_name_block.value;
let last_name_block_ori = last_name_block.value;
let phone_num_block_ori = phone_num_block.value;
let location_block_ori = location_block.value;
let description_block_ori = description_block.value;

function verifySame(data1, data2) {
  return data1 == data2;
}

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

email_block.addEventListener("click", function (event) {
  email_verify_block.setAttribute('required', '');
})

document.querySelector('#edit-submit').addEventListener("click", function (event) {
  let username_sent = username_block.value;
  if (!checkEmpty(username_sent)) {
    username_sent = username_block_ori;
  };

  if (email_verify_block == null) {
    email_verify_block == '';
  };

  let email_sent = email_block.value;
  if (verifySame(email_block.value, email_verify_block)) {
    if (!checkEmpty(email_sent)) {
      username_sent = username_block_ori;
    };
  } else {
    email_sent = email_block_ori;
  };

  let cName_sent = company_name_block.value;
  if (!checkEmpty(cName_sent)) {
    cName_sent = company_name_block_ori;
  };

  let biz_type_sent = biz_type_block.value;
  if (!checkEmpty(biz_type_sent)) {
    biz_type_sent = biz_type_block_ori;
  };

  let fName_sent = first_name_block.value;
  if (!checkEmpty(fName_sent)) {
    fName_sent = first_name_block_ori;
  };

  if (verifySame(email_block.value, email_verify_block)) {
    let email_sent = email_block.value;
    if (!checkEmpty(email_sent)) {
      username_sent = username_block_ori;
    };

    let phoneNo_sent = phone_num_block.value;
    if (!checkEmpty(phoneNo_sent)) {
      phoneNo_sent = phone_num_block_ori;
    };

    let location_sent = location_block.value;
    if (!checkEmpty(location_sent)) {
      location_sent = location_block_ori;
    };

    let description_sent = description_block.value;
    if (!checkEmpty(description_sent)) {
      description_sent = description_block_ori;
    };
    document.querySelector('.edit-submit').innerHTML = "Sent!";
  }
});