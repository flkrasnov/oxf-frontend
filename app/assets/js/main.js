function stringValidation() {
  var pattern = /[A-Za-z]+/;

  var inputValue = document.activeElement.value;
  var inputId = document.activeElement.id;
  var inputElt = document.getElementById(inputId);

  if(inputValue.match(pattern)) {
    if (inputElt.className.indexOf('inputValid') === -1) {
      inputElt.className = ' inputValid';
    }
  } else {
    if (inputElt.className.indexOf('inputInvalid') === -1) {
      inputElt.className = ' inputInvalid';
    }
  }
}

function numberValidation() {
  var pattern = /[0-9]+/;

  var inputValue = document.activeElement.value;
  var inputId = document.activeElement.id;
  var inputElt = document.getElementById(inputId);

  if(inputValue.match(pattern)) {
    if (inputElt.className.indexOf('inputValid') === -1) {
      inputElt.className = ' inputValid';
    }
  } else {
    if (inputElt.className.indexOf('inputInvalid') === -1) {
      inputElt.className = ' inputInvalid';
    }
  }
}

function documentsAdded() {
  var allFiles = document.getElementById('docs').files;
  console.log(allFiles);

  for (var i = 0; i < allFiles.length; i++) {
    var file = allFiles[i];
    console.log(file.name);

    document.getElementById('documentsAdded').innerHTML += '<li>' + file.name + '</li>';

    //document.getElementById('documentsAdded').appendChild('<li>' + file.name + '</li>');
  }
}
