var express = require('express');
var moviesRouter = express.Router();
var fs = require('fs');

var movies=[
    {
        "_id": "5ab12612f36d2879268f284a",
        "name": "Black Panther",
        "language": "ENGLISH",
        "rate": 4.5,
        "type": "Action Adventure Fantasy",
        "imageUrl": "https://image.ibb.co/f0hhZc/bp.jpg"
      },
      {
        "_id": "5ab12666f36d2879268f2902",
        "name": "Death Wish",
        "language": "ENGLISH",
        "type": "Action Crime Thriller",
        "rate": 3.2,
        "imageUrl": "https://image.ibb.co/gC9PfH/dw.jpg"
      },
      {
        "_id": "5ab12678f36d2879268f291d",
        "name": "Coco",
        "language": "ENGLISH",
        "type": "Adventure Animation Family",
        "rate": 5,
        "imageUrl": "https://image.ibb.co/dQwWSx/coco.jpg"
      }
]


function router(menu){

    moviesRouter.route('/')
        .get( function(req,res){
          res.render('movies',{title:'Movies Page',movie:movies,menu})
    });

    moviesRouter.route('/details')
        .get(function(req,res){
            res.send('Movies Detail Page')
    });

    return moviesRouter
}


module.exports = router;



/*moviesRouter.route('/')
    .get( function(req,res){
        fs.readFile('db.json','utf-8',function(err,data){
            if(err) throw err;
            // res.send(data);
            res.render('movies',{title:'Movies Page',movie:data})
        })
    });



    function add(a,b){
        return a+b
    }

    add(1,2)
*/
///
// data:data   === data