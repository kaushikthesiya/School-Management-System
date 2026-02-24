const dns = require('dns').promises;

(async () => {
    try {
        const resolver = new dns.Resolver();
        resolver.setServers(['8.8.8.8']);
        const addresses = await resolver.resolveSrv('_mongodb._tcp.cluster0.o5ujhw1.mongodb.net');
        console.log('✅ SRV Addresses Resolved via 8.8.8.8:', addresses);
    } catch (err) {
        console.error('❌ DNS SRV Resolution Error via 8.8.8.8:', err);
    }
})();
