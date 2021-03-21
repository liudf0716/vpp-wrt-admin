const { Etcd3 } = require('etcd3');
const client = new Etcd3(options = { hosts: '127.0.0.1:2379' });

// https://docs.ligato.io/en/latest/user-guide/reference/
// https://github.com/ligato/vpp-agent/blob/master/proto/ligato/vpp/nat/nat.proto

/*
 * vpp snat operation
 * key:
 * /vnf-agent/vpp1/config/vpp/nat/v2/nat44-global/snat
 * value:
 * '{"forwarding":true,"nat_interfaces":[{"name":"G0","is_inside":false,"output_feature":true}]}'
 *
 */
function snat_op(req, res, next) {
}

/*
 * vpp dnat operation
 * key:
 * /vnf-agent/vpp1/config/vpp/nat/v2/dnat44/<label>
 * value:
 * '{"label":"label","st_mappings":
 * [{"external_interface":"G0","external_port":ex_port,"local_ips":
 * [{"local_ip":"local_ip","local_port":loc_port}]}],"protocol":TCP-0|UDP-1|ICMP-3}'
 *
 */
function dnat_op(req, res, next) {
}

module.exports = {
        snat_op,
	dnat_op
};
