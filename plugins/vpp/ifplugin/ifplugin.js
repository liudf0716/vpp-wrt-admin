const { Etcd3 } = require('etcd3');
const client = new Etcd3(options = { hosts: '127.0.0.1:2379' });

const wan_key = '/vnf-agent/vpp1/config/vpp/v2/interfaces/G0';
const loop_key = '/vnf-agent/vpp1/config/vpp/v2/interfaces/loop0';
const if_key = '/vnf-agent/vpp1/config/vpp/v2/interfaces/';
const bd_key = '/vnf-agent/vpp1/config/vpp/l2/v2/bridge-domain/br-lan';

/* 
 * vpp wan operation 
 * key:
 * /vnf-agent/vpp1/config/vpp/v2/interfaces/G0
 * value:
 * '{"name":"G0","type":"DPDK","enabled":true,"ip_addresses":["wan_ip"]}'
 * '{"name":"G0","type":"DPDK","enabled":true,"set_dhcp_client":true}'
 *
 */
function wan_op(req, res, next) {
	await client.put(wan_key).value(req.body);
};

/*
 * vpp lan operation
 * key:
 * /vnf-agent/vpp1/config/vpp/l2/v2/bridge-domain/br-lan
 * /vnf-agent/vpp1/config/vpp/v2/interfaces/loop0
 * /vnf-agent/vpp1/config/vpp/v2/interfaces/G1
 * /vnf-agent/vpp1/config/vpp/v2/interfaces/G2
 * .....
 * value:
 * '{"name":"br-lan","interfaces":[{"name":"loop0","bridged_virtual_interface":true},{"name":"G1"},{"name":"G2"}, ...]}'
 * '{"name":"loop0","type":"SOFTWARE_LOOPBACK","enabled":true,"ip_addressed":["bridge_ip"]}'
 * '{"name":"G1","type":"DPDK","enabled":true}'
 * ...
 */
function lan_op(req, res, next) {
	var br_ip = req.body.br_ip;
	var if_lan = req.body.if_lan;
	await client.put(loop_key).value();
};

module.exports = {
	wan_op,
	lan_op
};
