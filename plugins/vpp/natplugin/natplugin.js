const { Etcd3 } = require('etcd3');
const client = new Etcd3(options = { hosts: '127.0.0.1:2379' });

// https://docs.ligato.io/en/latest/user-guide/reference/
// https://github.com/ligato/vpp-agent/blob/master/proto/ligato/vpp/nat/nat.proto

/*
 * vpp snat operation
 * key:
 * /vnf-agent/vpp1/config/vpp/nat/v2/nat44-global/<settings>
 * value:
 * 
 */
function snat_op(req, res, next) {
}

/*
 * vpp dnat operation
 * key:
 * /vnf-agent/vpp1/config/vpp/nat/v2/dnat44/<label>
 * value:
 * 
 */
function dnat_op(req, res, next) {
}

module.exports = {
        snat_op,
	dnat_op
};
