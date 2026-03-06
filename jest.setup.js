import '@testing-library/jest-dom';

// Stub NextAuth
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(() => Promise.resolve({ user: { id: 'user_xxx', email: 'test@example.com' } })),
  default: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({ data: { user: { name: 'Test', email: 'test@example.com' } }, status: 'authenticated' })),
  signIn: jest.fn(),
  signOut: jest.fn(),
  SessionProvider: ({ children }) => children,
}));

// Stub MongoDB/Mongoose
jest.mock('@/lib/mongodb', () => ({
  connectDB: jest.fn(() => Promise.resolve({})),
}));

jest.mock('mongoose', () => ({
  connect: jest.fn(),
  model: jest.fn(),
  Schema: jest.fn(),
  models: {},
}));

// Stub fetch for AI routes
global.fetch = jest.fn();
