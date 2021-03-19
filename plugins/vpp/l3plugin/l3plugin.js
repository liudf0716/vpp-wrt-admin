const { Etcd3 } = require('etcd3');
const client = new Etcd3(options = { hosts: '127.0.0.1:2379' });

/*
 * vpp default gw
 * key:
 * /vnf-agent/vpp1/config/vpp/v2/route/vrf/0/dst/0.0.0.0/0/gw/<next_hop_addr>
 * value:
 * '{"dst_network":"0.0.0.0/0","next_hop_addr":"next_hop_addr","outgoing_interface":"G0"}'
 * 
 */
function gw_op(req, res, next) {
};

/*
 * vpp route operation
 * key:
 * /vnf-agent/vpp1/config/vpp/v2/route/vrf/0/dst/<dst_network>
 * value:
 * '{"dst_network":"dst_network","next_hop_addr":"next_hop_addr","outgoing_interface":"out_if_name"}'
 */
function route_op(op, req, res, next) {
};

function route_add_op(req, res, next) {
  route_op(1, req, res, next);
};

function route_del_op(req, res, next) {
  route_op(0, req, res, next);
};

module.exports = {
	gw_op,
  route_add_op,
  route_del_op
};
