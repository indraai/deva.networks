export default {
  /**************
  method: networks
  params: packet
  describe: The global networks feature that installs with every agent
  ***************/
  networks(packet) {
    this.context('feature');
    return new Promise((resolve, reject) => {
      const networks = this.networks();
      const agent = this.agent();
      const global = [];
      networks.global.forEach((item,index) => {
        global.push(`::begin:global:${item.key}:${item.id}`);
        for (let x in item) {
          global.push(`${x}: ${item[x]}`);
        }
        global.push(`::end:global:${item.key}:${this.lib.hash(item)}`);
      });
      const concerns = [];
      networks.concerns.forEach((item, index) => {
        concerns.push(`${index + 1}. ${item}`);
      });
    
      const info = [
        '::BEGIN:NETWORKS',
        '### Client',
        `::begin:client:${networks.client_id}`,
        `id: ${networks.client_id}`,
        `client: ${networks.client_name}`,
        '**concerns**',
        concerns.join('\n'),
        `::end:client:${this.lib.hash(networks)}`,
        '### Global',
        global.join('\n'),
        '::END:NETWORKS',
      ].join('\n');
      this.question(`${this.askChr}feecting parse ${info}`).then(feecting => {
        return resolve({
          text: feecting.a.text,
          html: feecting.a.html,
          data: networks.concerns,
        });
      }).catch(err => {
        return this.error(err, packet, reject);
      });
    });
  },
};
