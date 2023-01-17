import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMock: MongoMemoryServer;

const connectDB = async () => {
  const mongoMock = await MongoMemoryServer.create();
  const uri = mongoMock.getUri();
  mongoose.set('runValidators', true);
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri);
};

const dropDB = async () => {
  if (mongoMock) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoMock.stop();
  }
};

const dropDBCollections = async () => {
  if (mongoMock) {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
};

export { connectDB, dropDB, dropDBCollections };
