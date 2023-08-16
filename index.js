// get express module
const express = require('express');
// get path module
const path = require('path');
// create a port number
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

// set ejs as view engine
app.set('view engine', 'ejs');

// tell where u have placed views
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use(express.urlencoded());
app.use(express.static('assets'));



//middleware1
// app.use(function(req,res,next){
//     console.log("middleware1");
//     next();
// })
// //middleware2
// app.use(function(req,res,next){
//     console.log("middleware2");
//     next();
// })

// var contactList = [
//     {name: "Subha",
//     phone: "12345"},
//     {name: "Alok",
//     phone: "67890"},
//     {name: "Ashutosh",
//     phone: "634893"}
// ];


app.get('/' /* route */ , function(req, res){ //controller Function
    Contact.find({}, function(err, contacts){
        if(err){
            console.log("error in fethich contacts from DB");
            return;
        }
        return res.render('contacts',{
            title: 'Contacts List',
            contact_list: contacts
        });
    });
    
    // return res.render('contacts', {
    //     title: "Contact List",
    //     contact_list : contactList
    // });
})

app.post('/create-contact', function(req,res){
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error in creating contact');
            return;
        }

        // console.log('*************', newContact);
        return res.redirect('back');
    });

    // as req.body has same name and phone so directly push the body to list
    // contactList.push(req.body);
    // return res.redirect('back');

    //  create contact and pust it to contact list then redirect to practice page
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // return res.redirect('practice');
    
    // check what is there in the req.body and redirect to practice page
    // console.log(req.body);
    // return res.redirect('practice');
})
app.get('/delete-contact/', function(req,res){

    // using id from DB to delete the contact
    let id= req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleteing the contact from DB');
            return;
        }
        return res.redirect('back');
    });

    // using name and phone to find the contct nd delete it
    // let phone1 =req.params;
    // console.log(req.query);

    // let name = req.query.name;
    // let phone = req.query.phone;
    // // console.log(phone);
    // let contactIndex = contactList.findIndex(contact => contact.name == name && contact.phone == phone );
    // // console.log(contactIndex);
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }
    // return res.redirect('back');
    
})




// app.get('/practice', function(req, res){
//     return res.render('practice', {
//         title: "Practice"
//     });
// })
// app.get('/', function(req, res){
//     // directly print on the page
//     // res.send('<h1>Good</h1>')
    
//     // for rendering an ejs page
//     return res.render('home', {title: "HomeComing"});
// })


app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})