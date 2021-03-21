const { Etcd3 } = require('etcd3');
const client = new Etcd3(options = { hosts: '127.0.0.1:2379' });

const wan_key = '/vnf-agent/vpp1/config/vpp/v2/interfaces/G0';
const loop_key = '/vnf-agent/vpp1/config/vpp/v2/interfaces/loop0';
const if_key = '/vnf-agent/vpp1/config/vpp/v2/interfaces/';
const bd_key = '/vnf-agent/vpp1/config/vpp/l2/v2/bridge-domain/br-lan';

async function if_set(if_name, if_value) {
	var key = if_key + if_name;
	await client.put(key).value(if_value);	
}

async function bd_set(bd_value) {
	await client.put(bd_value).value(bd_value);
}

/* 
 * vpp wan operation 
 * key:
 * /vnf-agent/vpp1/config/vpp/v2/interfaces/G0
 * value:
 * '{"name":"G0","type":"DPDK","enabled":true,"ip_addresses":["wan_ip"]}'
 * '{"name":"G0","type":"DPDK","enabled":true,"set_dhcp_client":true}'
 *
 */
async function wan_op(req, res, next) {
	var if_name = req.if_name;
	var if_value = req.if_value;
	if_set(if_name, if_value);
	
	req.send({"result":"ok"});
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
async function lan_op(req, res, next) {
	var br_ip = req.body.br_ip;
	var if_lan = req.body.if_lan;
	var bd_value = {};
	var bd_bvi_value = {};
	var bvi_value = {};
	
	bd_value['name'] = "br-lan";
	bd_value['interfaces'] = [];
	
	bvi_value['name'] 	= 'loop0';
	bvi_value['type'] 	= 'SOFTWARE_LOOPBACK';
	bvi_value['enabled'] 	= true;
	bvi_value['ip_addressed']	= br_ip;
	if_set('loop0', bvi_value);
	
	bd_bvi_value['name'] 	= 'loop0';
	bd_bvi_value['bridged_virtual_interface'] = true;
	bd_value['interfaces'].push(bd_bvi_value);	
	
	for (var i = 0; i < if_lan.length(); i++)
	{
		var name = if_lan[i].name;
		var br_child_value = {};
		var bd_child_value = {};
		br_child_value['name'] 	= name;
		br_child_value['type'] 	= 'DPDK';
		br_child_value['enabled']	= true;
		if_set(name, br_child_value);
		
		bd_child_value['name'] = name;
		bd_value['interfaces'].push(bd_child_value);
	}
	
	bd_set(bd_value);
	
	req.send({"result":"ok"});
};

module.exports = {
	wan_op,
	lan_op
};
