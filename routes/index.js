var express = require('express');
var router = express.Router();

var v_ifplugin = require('../plugins/vpp/ifplugin/ifplugin.js');
var v_natplugin = require('../plugins/vpp/natplugin/natplugin.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// reference doc
// https://docs.ligato.io/en/latest/user-guide/reference/
// 

/* 
 * vpp wan operation 
 */
router.all('/config/interfaces/wan', function(req, res, next) {
	v_ifplugin.wan_op(req, res, next);
});

/*
 * vpp lan operation
 */
router.all('/config/interfaces/lan', function(req, res, next) {
	v_ifplugin.lan_op(req, res, next);
});

/*
 * vpp default route
 */
router.all('/config/route/gw', function(req, res, next) {
	v_l3plugin.gw_op(req, res, next);
});

/*
 *
 */
router.all('/config/route/add', function(req, res, next) {
	v_l3plugin.route_add_op(req, res, next);
});

/*
 *
 */
router.all('/config/route/del', function(req, res, next) {
	v_l3plugin.route_del_op(req, res, next);
});


/* vpp snat operation */
router.all('/config/nat/snat', function(req, res, next) {
	v_natplugin.snat_op(req, res, next);
});

/* vpp dnat operation */
router.all('/config/nat/dnat', function(req, res, next) {
	v_natplugin.dnat_op(req, res, next);
});

module.exports = router;
