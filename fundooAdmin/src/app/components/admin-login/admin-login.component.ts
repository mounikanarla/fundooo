// In order to bind the tasks using ngOnInit we are importing the module from library
import { Component, OnInit } from '@angular/core';
// importing jQuery and its methods are accessing using dollar sign
import * as $ from 'jquery';
// Decorator that marks a class as an Angular component and provides configuration metadata 
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
// AdminLogincomponent can implement OnInit interface to define its own initialization method.
export class AdminLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Checking Wheather the token is present or not and redirecting to dashboard
    if (localStorage.getItem('id') != null) {
      window.location.href = "/dashboard";
    }
    // call jQuery's $ function, passing to it the document Inside the function passed to the ready method
    $(document).ready(function () {
      // Attach a function to the button click event:
      $('#button').click(function () {
        // input text area coming to the variable email
        var email = $('#email').val();
        // input text area coming to the variable password
        var password = $('#pwd').val();
        // this.value = {
        //   "email": "",
        //   "password": ""
        // }
        // if the email value is empty then message is displayed below textbox
        if (email == "") {
          $('#emailval').text(' Email Required');
        }
        else {
          $('#emailval').text('');

        }
        // if the password value is empty then message is displayed below textbox
        if (password == "") {
          $('#pass').text('password Required');
        }
        else {
          $('#pass').text('');
        }
        // The $.post() method requests data from the server using an HTTP POST request.
        $.ajax({
          url: 'http://34.213.106.173/api/user/adminLogin',
          type: 'POST',
          dataType: 'json',
          data: {
            "email": email,
            "password": password
          },
          // returns success data after calling ajax 
          success: function (data) {
            console.log(data);
            console.log("login successfull")
            // if the login is successful then token is set to localstorage and it is redirect to dashboard
            if (data) {
              localStorage.setItem('id', data.id)
              window.location.href = "/dashboard";
            }
          },
          // returns success data after calling ajax 
          error: function (error) {
            // if the email and password value is empty then message is displayed below textbox
            if (email == "" && password == "")
              $('#msg').text('Enter email and password');
            else
              $('#msg').text('Invalid email or password');

            console.log('Error in Operation');
          }

        }) .fail(function(xhr, status, error) {
          // error handling
          console.log("Something bad is happened in posting data: "+error)
      });
    });

  });

  }

}
