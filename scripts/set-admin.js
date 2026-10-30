const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const { MongoClient } = require('mongodb');

async function main() {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://webuxhimanshu_db_user:ZS5PrDzOEDRs2LBw@greanandyoung.mbdm1rj.mongodb.net/greenandyoung';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const res = await client.db().collection('user').updateMany(
      { email: { $in: ['admin@greenandyoung.in', 'admin@gmail.com'] } },
      { $set: { role: 'ADMIN' } }
    );
    console.log('Admin role updated count:', res.modifiedCount);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
