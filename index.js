const express = require('express');
const request = require('request');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'software',
});
connection.connect((err) => {
  if (err) {
    console.log(err);
    return err;
  }
  });
  console.log('Database connected');
request('https://datausa.io/api/data?drilldowns=State&measures=Population&year=2020,2019,2018', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
// console.log('body:', body);  // Print the results of the received data
  // console.log(body);
  const result = JSON.parse(body); 
  const myArr = result['data'];

 


  for(let product of myArr){
    const id_state = product['ID State'];
    const state = product.State
    const id_year = product['ID Year'];
    const  year = product.Year;
    const population = product.Population;
    const slug_state = product['Slug State'];
     
    //To connect to your database just uncomment the sql query
   // var sql = connection.query("INSERT INTO rest (id,id_state,state,id_year,year,population,slug_state) VALUES ('','"+id_state+"', '"+state+"', '"+id_year+"', '"+year+"', '"+population+"', '"+slug_state+"')");
    console.log(product);
  }
});