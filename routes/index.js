var express = require('express');
var router = express.Router();

var v_ifplugin = require('../plugins/vpp/ifplugin/ifplugin.js');
var v_natplugin = require('../plugins/vpp/natplugin/natplugin.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* vpp interface operation */
router.get('if_op', function(req, res, next) {
	v_ifplugin.if_op(req, res, next);
});

/* vpp snat operation */
router.get('snat_op', function(req, res, next) {
	v_natplugin.snat_op(req, res, next);
});

/* vpp dnat operation */
router.get('dnat_op', function(req, res, next) {
	v_natplugin.dnat_op(req, res, next);
});

module.exports = router;
