const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const session = require('express-session');

const { Collection1, Collection2} = require("./mongodb");

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')

app.set('view engine', 'hbs')
app.set('views', tempelatePath)

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/staffdetails', (req, res) => {
    res.render('staffdetails')
})
 

app.get('/studentdetailss', (req, res) => {
    res.render('studentdetails')
})

app.get('/stuattendy', (req, res) => {
    res.render('stuattendy')
})

app.get('/logout', (req, res) => {
    res.render('login')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/studentdetails.html');
  });
  
app.get('/home', (req, res) => {
    res.render('home')
 })
  

app.post('/signup', async (req, res) => {
    

    const data = {
        name: req.body.name,
        password: req.body.password
    }

    await Collection1.insertMany([data])
    res.render("home")
})
 
 
app.post('/login', async (req, res) => {
    try{
        const check=await Collection1.findOne({name:req.body.name})
        if(check.password===req.body.password){
            res.render("home",{stu:`<h1>Hello ${check.name}</h1>`})
        }
        else{
            res.render('login', { message: 'Invalid password,please try again' })
        }
    }
    catch(e){
        res.send("Login not working, kindly try again")
    }
})

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  }));

app.post('/stulogin', async (req, res) => {
    try{
        const check=await Collection2.findOne({name:req.body.name})
        if(check.regno===req.body.regno){
            req.session.gv = check.regno;
            res.render("stuhome",{stu:`<h1>Hello ${check.name}</h1>`} )

        }
        else{
            res.render('login', { message: 'Invalid reg no,please try again' })
        }
    }
    catch(e){
        res.send("Login not working, kindly try again")
    }
})



         

app.post('/addstudetails', async (req, res) => {
    
    const data = {
        name: req.body.name,
        roomno: req.body.roomno,
        regno: req.body.regno,
        phoneno: req.body.phoneno,
        email: req.body.email,
        parentname: req.body.parentname,
        parentno: req.body.parentno
        
    } 
     

    await Collection2.insertMany([data])
    
    
})




app.post('/search', (req, res) => {
    const regno = req.body.regno;
    
    Collection2.findOne({ regno: regno })
        .then(student => {
            if (!student) {
                console.log('Student not found');
                res.render('studentdetails',{mess:'Student not found'})
            } else {
                console.log('Student details:', student);
               // res.render('studentdetails', { student: student });
                res.render('studentdetails', {stu:`<h3>Name: ${student.name}</h3><h3>Room No: ${student.roomno}</h3><h3>Reg No: ${student.regno}</h3><h3>Email: ${student.email}</h3><h3>Parent Name: ${student.parentname}</h3>
                `})

                
                 
            }
        })  
        .catch(err => {
            console.log('Error searching for student:', err);
            res.send('Error searching for student');
        });
});




  app.get('/profile', async (req, res) => {
    try {
      const student = await Collection2.findOne({ regno: req.session.gv});
      if (!student) {
        res.render('stuprofile', { message: 'Student not found' });
      } else {
        res.render('stuprofile', { student: student});
        console.log(student)
        
      }
    } catch (err) {
      console.error(err);
      res.render('stuprofile', { message: 'Error getting student data' });
    }
  });

  
  app.get('/stuhome', async (req, res) => {
    try {
      const student = await Collection2.findOne({ regno: req.session.gv});
      if (!student) {
        res.render('stuhome', { message: 'Student not found' });
      } else {
        res.render('stuhome', { student: student});
        console.log(student)
        
      }
    } catch (err) {
      console.error(err);
      res.render('stuhome', { message: 'Error getting student data' });
    }
  });
    
   
  app.post('/addstaffdetails', async (req, res) => {
    
    const data = {
        name: req.body.name,
        password: req.body.password,
        floor: req.body.floor,
        phno: req.body.phno
    } 
     
    

    await Collection1.insertMany([data])
    
    res.render('home');
    
})
  

app.post('/searchstaff', (req, res) => {
    const floor = req.body.floor;
     
    Collection1.findOne({ floor: floor })
        .then(staff => {
            if (!staff) {
                console.log('Staff not found');
                res.render('staffdetails',{messs:'Staff not found'})
            } else {
                console.log(staff);
                //res.send(staff)
                //res.send('staffdetails', {st:`<h3>Name: ${staff.name}</h3><h3>Floor :${staff.floor}</h3><h3>Phone No: ${staff.phno}</h3>`})
                res.render('staffdetails', {staff: staff})
         
            }
        })  
        .catch(err => {
            console.log(err);
            res.send('Error searching for student');
        });
}); 





app.listen(3000, () => {
    console.log('port connected');
})

 
