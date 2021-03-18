const { Etcd3 } = require('etcd3');
const client = new Etcd3(options = { hosts: '127.0.0.1:2379' });

function snat_op(req, res, next) {
}

function dnat_op(req, res, next) {
}

module.exports = {
        snat_op,
	dnat_op
};
