/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect,
  Recipe = require('../../app/models/recipe'),
// Mongo = require('mongodb');
  connect = require('../../app/lib/mongodb'),
  cp = require('child_process'),
  db = 'iron-chef-test';

describe('Recipe', function(){
  before(function(done){
    connect(db, function(){
      done();
    });
  });
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd: __dirname + '/../scripts'}, function(err, stdout, stderr){
      //console.log(err, stdout, stderr);
      done();
    });
  });
  describe('constructor', function(){
    it('should create a new recipe object', function(){
      var r = new Recipe({name:'BBQ', photo:'BBQ.jpg', ingredients:['bbq'], directions:['make bbq']});
      expect(r.name).to.equal('BBQ');
      expect(r.photo).to.equal('BBQ.jpg');
      expect(r.ingredients).to.have.length(1);
      expect(r.directions).to.have.length(1);
    });
  });
  describe('.find', function(){
    it('should return all recipes in the database', function(done){
      Recipe.find(function(err, recipes){
        expect(recipes).to.have.length(3);
        done();
      });
    });
  });
});
