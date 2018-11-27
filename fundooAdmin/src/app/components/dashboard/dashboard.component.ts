// In order to bind the tasks using ngOnInit we are importing the module from library
import { Component, OnInit } from '@angular/core';
// importing jQuery and its methods are accessing using dollar sign
import * as $ from 'jquery';
// impoting the datatables which works with npm and webpack
import 'datatables.net';
// Decorator that marks a class as an Angular component and provides configuration metadata 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
// Dashboard component can implement OnInit interface to define its own initialization method.
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var rowData;

    // Getting the item from the local storage and storing in a variable token
    var token = localStorage.getItem('id')
    console.log(token);
    try{
   // call jQuery's $ function, passing to it the document Inside the function passed to the ready method
    $(document).ready(function () {
      // $.get() method to retrieve data from a file on the server to get the services
      $.ajax({
        url: 'http://34.213.106.173/api/user/UserStatics',
        type: 'GET',
        dataType: 'json',
        headers: { 'Authorization': token },
        // returns success data after calling ajax 
        success: function (response) {
          console.log(response.data.details);
          // storing the data while retrieve from a server in array 
          var array = response.data.details
          //initializing the data based on the array length and sending to cards
          var html = "";
          for (let i = 0; i < array.length; i++) {
            html += "<div class=' col-xs-6 col-sm-6 col-md-6 col-lg-6'style='margin-top:5%;'background-color: lightgrey'>"
            html += "<div class='card-header'style='text-align:center;background-color: lightyellow;'><h5><u>" + array[i].service + "</u></h5></div>"
            html += "<div class='card-body'style='text-align:center;background-color: lightgrey'>" + array[i].count + "</div></div>"
          }
          // Binding the data to Html page and printing it on the cards
          $("#services").html(html);
        },
        error: function (errorThrown) {
          console.log(errorThrown);
        }

      }).fail(function (xhr, status, error) {
        // error handling
        console.log("Something bad is happened in getting data on cards: "+error)
      });



      // $.get() method to retrieve data from a file on the server to get the user data
      $.ajax({
        url: 'http://34.213.106.173/api/user/getAdminUserList',
        type: 'GET',
        // headers:{'Authorization':token},
        success: function (response) {
          console.log(response);
          var array = [];
          // Loop is initialized according to the users registered and is pushing in an array
          for (var j = 0; j < response.data.data.length; j++) {
            array.push([j, response.data.data[j].firstName, response.data.data[j].lastName, response.data.data[j].email, response.data.data[j].service])
            // console.log(array[j].firstName)
          }
          // sending the array data into html as a datatable
     var table= $('#example').DataTable({
               "data": array,
            columnDefs: [ {
              targets: 5,
              render: function () {
                return '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">USERDATA</button>'
              }
            }]
           });
           $("#example").on('click', 'tr', function() {
            rowData=table.row(this).index();
            console.log(rowData);
            console.log(response.data.data[rowData].firstName);
            // alert('Row index: ' + $(this).closest('tr').index());
             $('#FirstName').text("FirstName :"+response.data.data[rowData].firstName);
             $('#lastName').text("LastName :"+ response.data.data[rowData].lastName);
             $('#email').text("Email :"+response.data.data[rowData].email);
             $('#phoneNumber').text("PhoneNumber :"+response.data.data[rowData].phoneNumber);
             $('#service').text("Service :"+response.data.data[rowData].service);
             $('#createdDate').text("CreatedDate :"+response.data.data[rowData].createdDate);
             $('#FullName').text([response.data.data[rowData].firstName+response.data.data[rowData].lastName]);
          });

          console.log(array)
        },
        error: function (err) {
          console.log(err);
        }
      }).fail(function (xhr, status, error) {
        // error handling
        console.log("Something bad is happened in getting data on tables:"+error)
      });



      // Attach a function to the button click event:
      $('#btn').click(function () {
        // The $.post() method requests data from the server using an HTTP POST request for logout
        $.ajax({
          url: 'http://34.213.106.173/api/user/logout',
          type: 'POST',
          headers: { 'Authorization': token },
          // returns success data after calling ajax 
          success: function (response) {
            console.log(response);
            // after clicking on logout removing the token from the storage
            localStorage.removeItem("id")
            // Redirecting to the loginpage 
            window.location.href = "/adminLogin";

          },
          error: function (error) {
            console.log(error)
          }
        }).fail(function (xhr, status, error) {
          // error handling
          if(error){
          console.log("Something bad is happened in posting logout data: "+error)
          }
          else if(status){
            console.log("Something bad is happened in posting logout data: "+status)
          }
          else{
            console.log("Something bad is happened in posting logout data: "+xhr)

          }
        });
        return false;
      })
    })
  }catch(e)
  {
    console.log(e);
        if (e instanceof ReferenceError
            || e instanceof SyntaxError || e instanceof TypeError || e instanceof RangeError) {
                console.log("Something bad happened. Please contact system administrator")
        } 
    }
  }
}