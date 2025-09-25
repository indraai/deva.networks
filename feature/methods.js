"use strict";
// Copyright ©2025 Quinn A Michaels; All rights reserved. 
// Legal Signature Required For Lawful Use.
// Distributed under VLA:28046590011143337501 LICENSE.md

export default {
  /**************
  method: Networks
  params: packet
  describe: The global service feature that installs with every agent
  ***************/
  networks(packet) {
    this.context('feature');
    return new Promise((resolve, reject) => {
      const networks = this.networks();
      const agent = this.agent();
      const global = [];
      networks.global.forEach((item,index) => {
        global.push(`::begin:${item.key}:${item.id}`);
        for (let x in item) {
          global.push(`${x}: ${item[x]}`);
        }
        const thehash = this.lib.hash(item);
        global.push(`hash: ${thehash}`);
        global.push(`::end:${item.key}:${thehash}`);
      });
      const concerns = [];
      networks.concerns.forEach((item, index) => {
        concerns.push(`${index + 1}. ${item}`);
      })
      
      const info = [
        '::BEGIN:NETWORKS',
        `::begin:client`,
        '## Client',
        `id: ${networks.client_id}`,
        `client: ${networks.client_name}`,
        `::end:client}`,
        concerns.length ? `::begin:concerns` : '',
        concerns.length ? '## Concerns' : '',
        concerns.length ? concerns.join('\n') : '',
        concerns.length ? `::end:concerns` : '',
        '::begin:global',
        '## Global',
        global.join('\n'),
        '::end:global',
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
      })
    });
  },
};
