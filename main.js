'use strict';

$(function() {
  $('#createGravatar').click(findGravatar);
  $('#findSum').click(findSum);
  $('#findSquare').click(findSquare);
  $('#sentenceCounter').click(findSentenceInfo);
  $('#findBirthdate').click(findBirthdate);

});



function findGravatar() {
  var email = $('#gravatar').val();
  $('#gravatar').val('');
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/gravatar/${email}`,
    success: function(gravatarUrl) {
      console.log(gravatarUrl);
      $('#img').find('#icon').attr("src", gravatarUrl);
    },
    error: function () {
      console.log('error!');
    }
  });
}
  


function findSum() {
  var num1 = $('#num1').val();
  var num2 = $('#num2').val();
  $('#num1').val('');
  $('#num2').val('');
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/sum/${num1}/${num2}`,
    success: function(sum) {
      console.log(sum);
      $('#sumFinder').find('#totalSum').text("Total Sum: " + sum);
    },
    error: function () {
      console.log('error!');
    }
  });
}



function findSquare() {
  var sqNum = $('#sqNum').val();
  $('#sqNum').val('');
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/square/${sqNum}`,
    success: function(squared) {
      console.log(squared);
      $('#squareFinder').find('#numSquared').text(sqNum + " Squared is " + squared);
    },
    error: function () {
      console.log('error!');
    }
  });
}



function findSentenceInfo() {
  var sentence1 = $('#sentence').val();
  console.log('sentence1', sentence1);
  console.log('sentence1type', typeof sentence1);
  $('#sentence').val('');
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/sentence/${sentence1}`,
    success: function(sentenceDecoded) {
      console.log('sentenceDecoded:', sentenceDecoded);
      $('#sentenceFinder').find('#sentenceDetails').text("Details: " + sentenceDecoded);
    },
    error: function () {
      console.log('error!');
    }
  });
}



function findBirthdate() {
  var birthday = $('#birthdate').val();
  console.log('birthday', birthday);
  console.log('birthdaytype', typeof birthday);
  $('#birthdate').val('');
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/birthdate/${birthday}`,
    success: function(birthdayInfo) {
      console.log('birthdayInfo:', birthdayInfo);
      $('#birthdateFinder').find('#birthdateInfo').text(birthdayInfo);
    },
    error: function () {
      console.log('error!');
    }
  });
}