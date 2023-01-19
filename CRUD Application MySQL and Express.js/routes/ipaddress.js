var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 
// display ipaddress page
router.get('/', function(req, res, next) {
      
    dbConn.query('SELECT * FROM ipaddress ORDER BY id desc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/ipaddress/index.ejs
            res.render('ipaddress',{data:''});   
        } else {
            // render to views/ipaddress/index.ejs
            res.render('ipaddress',{data:rows});
        }
    });
});

// display add ipaddress page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    res.render('add', {
        name: '',
        city: '',
        image: ''
    })
})

// add a new ipaddress
router.post('/add', function(req, res, next) {    

    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    

    let name = req.body.name;
    let city = req.body.city;
    var file = req.files.uploaded_image;
    var img_name=file.name;
    let errors = false;

    

    if(name.length === 0 || city.length === 0) {
        errors = true;
        

        // set flash message
        req.flash('error', "Please enter name and city");
        // render to add.ejs with flash message
        res.render('add', {
            name: name,
            city: city,
            image: img_name
        })
    }

    // if no error
    if(!errors) {


        if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
            file.mv('public/images/uploaded_images/'+file.name, function(err) {
                           
                if (err)

                  return res.status(500).send(err);
                     });
        } else {
          req.flash('error', "This format is not allowed , please upload file with '.png','.gif','.jpg'");
          res.render('add', {
            name: name,
            city: city,
            image: img_name
        });
        }


        var form_data = {
            name: name,
            city: city,
            image: img_name
        }
        
        // insert query
        dbConn.query('INSERT INTO ipaddress SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('add', {
                    name: form_data.name,
                    city: form_data.city ,
                    image: img_name                
                })
            } else {                
                req.flash('success', 'ipaddress successfully added');
                res.redirect('/ipaddress');
            }
        })
    }
})

// display edit ipaddress page
router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    dbConn.query('SELECT * FROM ipaddress WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'ipaddress not found with id = ' + id)
            res.redirect('/ipaddress')
        }
        // if ipaddress found
        else {
            // render to edit.ejs
            res.render('edit', {
                title: 'Edit ipaddress', 
                id: rows[0].id,
                name: rows[0].name,
                city: rows[0].city
            })
        }
    })
})

// update ipaddress data
router.post('/update/:id', function(req, res, next) {

    let id = req.params.id;
    let name = req.body.name;
    let city = req.body.city;
    let errors = false;

    if(name.length === 0 || city.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Please enter name and city");
        // render to add.ejs with flash message
        res.render('edit', {
            id: req.params.id,
            name: name,
            city: city
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            name: name,
            city: city
        }
        // update query
        dbConn.query('UPDATE ipaddress SET ? WHERE id = ' + id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('edit', {
                    id: req.params.id,
                    name: form_data.name,
                    city: form_data.city
                })
            } else {
                req.flash('success', 'ipaddress successfully updated');
                res.redirect('/ipaddress');
            }
        })
    }
})
   
// delete ipaddress
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    dbConn.query('DELETE FROM ipaddress WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to ipaddress page
            res.redirect('/ipaddress')
        } else {
            // set flash message
            req.flash('success', 'ipaddress successfully deleted! ID = ' + id)
            // redirect to ipaddress page
            res.redirect('/ipaddress')
        }
    })
})

module.exports = router;