var app = module.parent.exports.app
  , loginForm = require('../forms/login')
  , creteEmployeeForm = require('../forms/creteEmployee')
  , config = module.parent.exports.config
  , adminAuth;

adminAuth = function(req, res, next){
    //authorize role
    if(typeof req.user != "undefined" && typeof req.user.role != "undefined" && req.user.role == "admin"){
        next();
    }else{
        //Not authorized go to the login form
        res.redirect('/admin');
    }
}

app.get('/', function(req, res){
    res.render('index', { title: 'Employee Wiki', section: 'Welcome', user: req.user});
});

// Admin Panel URLs
app.get('/admin', function(req, res){
    if(typeof req.user != "undefined" && typeof req.user.role != "undefined" && req.user.role == "admin"){
        res.redirect('/panel');
    }else{
        res.render('admin/index', { title: 'Admin Panel', section: 'Admin Panel', form : loginForm });
    }
});

app.get('/panel', adminAuth, function(req, res){
    res.render('admin/panel', { title: 'Admin Panel', section: 'Admin Panel', user: req.user });
});

app.get('/panel/employees/new', adminAuth, function(req, res){
    res.render('admin/employees-new', { title: 'Admin Panel', section: 'Admin Panel', user: req.user, form : creteEmployeeForm });
});

