let $ = require('jquery')
let MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
let url = "mongodb://localhost:27017/";



$('#continue').on('click', () => {
   let firstname = $('#FirstName').val()
   let lastname =  $('#LastName').val()
   let dateofbirth = $('DateOfBirth').val()
   let zipcode = $('#ZipCode').val()
   $('#DateOfBirth').datetimepicker();

   addEntry(firstname)
   MongoClient.connect(url, { useUnifiedTopology: true , useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myobj = { FirstName: firstname , LastName: lastname, DateOfBirth: dateofbirth, ZipCode: zipcode };
      dbo.collection("customers").insertOne(myobj, function(err) {
        if (err) throw err;
        console.log("Customer Inserted!");
        db.close();
      });
    });
})

function addEntry(firstname) {
   if(firstname) {
      let updateString = 'Great to meet you, '+ firstname +'!'          
      $('#contact-list').html(updateString)
   }
}

