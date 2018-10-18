import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var token = localStorage.getItem('id')
    console.log(token);
    $(document).ready(function () {
      $.ajax({
        url: 'http://34.213.106.173/api/user/UserStatics',
        type: 'GET',
        dataType: 'json',
        headers: { 'Authorization': token },

        success: function (response) {
          console.log(response.data.details);
          var array = response.data.details
          var html = "";
          for (let i = 0; i < array.length; i++) {
            html += "<div class=' col-xs-6 col-sm-6 col-md-6 col-lg-6'style='margin-top:5%;'background-color: lightgrey'>"
            html += "<div class='card-header'style='text-align:center;background-color: lightyellow;'><h5><u>" + array[i].service + "</u></h5></div>"
            html += "<div class='card-body'style='text-align:center;background-color: lightgrey'>" + array[i].count + "</div></div>"
          }
          $("#services").html(html);
        },
        error: function (errorThrown) {
          console.log(errorThrown);
        }

      });

      // $(document).ready(function () {
      //   $(function(){
      $.ajax({
        url: 'http://34.213.106.173/api/user/getAdminUserList',
        type: 'GET',
        // headers:{'Authorization':token},
        success: function (response) {
          console.log(response);
          var array = [];
          // array=response.data.data;
          // console.log(array);
          // console.log(array.length)
          // console.log(array[0].firstName);
          for (var j = 0; j < response.data.data.length; j++) {
            array.push([j, response.data.data[j].firstName, response.data.data[j].lastName, response.data.data[j].email, response.data.data[j].service])
            // console.log(array[j].firstName)
          }

          $('#example').DataTable({
            data: array
          });
          console.log(array)
        },
        error: function (err) {
          console.log(err);
        }
      });
      return false;
    })
  }
}