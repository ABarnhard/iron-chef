'use strict';

var Mongo = require('mongodb');

function Recipe(o){
  this.created = new Date();
  this.name = o.name.trim();
  this.photo = o.photo.trim();
  this.category = o.category;
  this.ingredients = o.ingredients.split(',').map(function(s){return s.trim();});
  this.directions = o.directions.split(';').map(function(s){return s.trim();});
}

Object.defineProperty(Recipe, 'collection', {
  get: function(){return global.mongodb.collection('recipes');}
});

Recipe.find = function(cb){
  Recipe.collection.find({}, {sort:{created: -1}}).toArray(cb);
};

Recipe.create = function(obj, cb){
  var r = new Recipe(obj);
  r.name = r.name || 'Why you no use form right???';
  r.photo = r.photo || 'http://www.xblafans.com/wp-content/uploads//2011/09/WHY-NO-WORK.jpg';
  r.ingredients = (r.ingredients[0].length) ? r.ingredients : ['It\'s 2014', 'sort it out chump'];
  r.directions = (r.directions[0].length) ? r.directions : ['Your recipe probably sucked anyway'];
  Recipe.collection.save(r, cb);
};

Recipe.remove = function(id, cb){
  id = Mongo.ObjectID(id);
  Recipe.collection.remove({_id:id}, function(){
    cb({id:id.toString()});
  });
};

module.exports = Recipe;
