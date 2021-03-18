const { Etcd3 } = require('etcd3');
const client = new Etcd3(options = { hosts: '127.0.0.1:2379' });

function if_op(req, res, next) {
}

module.exports = {
	if_op
};
