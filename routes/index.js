var express = require('express');
var shortid = require('shortid');
var router = express.Router();
var Shorten = require('../models/shorten');


/* GET home page. */
router.get('/', function(req, res) {
  //console.log(2);
  return res.render('index', { title: 'URL Shortener' });
});



router.get('/:str',function(req,res){
  //console.log(11111111111111);
  var str1 = req.params.str;
  Shorten.findOne({ outputurl : str1 }).exec(function(err, outer){
  //console.log('!!!!!!!!!!!!!',outer);
   if(err){
           console.log(err);
   }
   else if(str1!=null && outer !== null && outer.inputurl!=null){
  //console.log(outer);
    res.redirect(outer.inputurl);
   }
   else {
     console.log("CHECK FOR ERROR");
    //  return res.json({error: true})
    res.redirect('/')
   }

   });

});






router.post('/',function(req,res){
       var oldurl = req.body.forshort;
      // console.log(oldurl);
       var newgen = shortid.generate();
       //console.log(newgen);
       var pair = {
         inputurl : oldurl,
         outputurl : newgen
       }
    console.log(pair);
    var store = new Shorten(pair);
  //  console.log(store);
    store.save(function(err,result){
            if(err){
              return res.json({
                           error : true,
                           reason: err
              });
            }else{
              //var storeid = result._id,
              //console.log(result._id)
              return res.json({
                          error : false,
                        storeid : result._id,
                          given : result.inputurl,
                       produced : result.outputurl
              });
            }

    });

});

module.exports = router;
