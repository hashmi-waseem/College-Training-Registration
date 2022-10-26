const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const https=require("https")
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("Public"))

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req,res){
  var fName=req.body.fName
  var lName=req.body.lName
  var email=req.body.email
  var pass=req.body.pass
  var data = {
    members : [
      {
        email_address : email,
        status : "subscribed",
        merge_fields : {
          FNAME : fName,
          LNAME : lName,
          PASSWORD : pass
        }
      }
    ]
  }

  var json=JSON.stringify(data);

  const url="https://us21.api.mailchimp.com/3.0/lists/f4ee9f7ccb"
  const options = {
    method : "POST",
    auth: "WaseemHashmi:d39b80865135a02702a3546dad9af91f-us21"
  }
  const requests = https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname + "/success.html")
    }
    else {
      res.sendFile(__dirname+ "/failure.html")
    }

    response.on("data",function(data){
      console.log(JSON.parse(data))
    })
  })
  requests.write(json)
  requests.end()
})

app.post("/failure",function(req,res){
  res.redirect("/")
})
app.listen(process.env.PORT || 3000,function(req,res){
   console.log("Server Started")
})


//d39b80865135a02702a3546dad9af91f-us21
//f4ee9f7ccb
