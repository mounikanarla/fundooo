import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('#button').click(function(){
         var email= $('#email').val();
          var password=$('#pwd').val();
          this.value={
            "email":"",
            "password":""
          }
          if(email=="")
          {
              $('#emailval').text(' Email Required');
          }
          else{
            $('#emailval').text('');

          }
          if(password=="")
          {
              $('#pass').text('password Required');
          }
          else{
              $('#pass').text('');
          }
          
          $.ajax({  
            url: 'http://34.213.106.173/api/user/adminLogin',  
            type: 'POST',  
            dataType: 'json',  
            data:{
              "email":email,
              "password":password
            } ,  
            success: function (data) {  
                console.log(data); 
                console.log("login successfull") 
                if(data){
                  localStorage.setItem('id',data.id)
                  window.location.href="/dashboard";
                }
            },  
            error: function (error) {  
              if(email=="" && password=="")
              $('#msg').text('Enter email and password');
              else
              $('#msg').text('Invalid email or password');

                console.log('Error in Operation'); 
               }
             
        });  
  
      });
      
  });

  }

}
