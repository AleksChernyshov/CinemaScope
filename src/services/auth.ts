import type { User } from '../types/auth';

interface StoredUser extends User {
  password: string;
}

const USERS_KEY = 'cinemascope_users';
const CURRENT_USER_KEY = 'cinemascope_current_user';

// Helper to get users from localStorage
const getUsers = (): Record<string, StoredUser> => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : {};
};

// Helper to save users to localStorage
const saveUsers = (users: Record<string, StoredUser>) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Helper to save current user
const saveCurrentUser = (user: User) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const register = async (username: string, password: string): Promise<void> => {
  const users = getUsers();
  
  if (users[username]) {
    throw new Error('Username already exists');
  }

  const newUser: StoredUser = {
    username,
    password,
    favorites: [],
    avatar: ''
  };

  users[username] = newUser;
  saveUsers(users);
};

export const login = async (username: string, password: string): Promise<User> => {
  const users = getUsers();
  const user = users[username];

  if (!user || user.password !== password) {
    throw new Error('Invalid username or password');
  }

  const { password: _, ...userWithoutPassword } = user;
  saveCurrentUser(userWithoutPassword);
  return userWithoutPassword;
};

export const logout = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const addToFavorites = (userId: string, movieId: string): void => {
  const users = getUsers();
  const user = users[userId];
  
  if (!user) return;
  
  if (!user.favorites.includes(movieId)) {
    user.favorites.push(movieId);
    saveUsers(users);
    
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.username === userId) {
      currentUser.favorites = user.favorites;
      saveCurrentUser(currentUser);
    }
  }
};

export const removeFromFavorites = (userId: string, movieId: string): void => {
  const users = getUsers();
  const user = users[userId];
  
  if (!user) return;
  
  user.favorites = user.favorites.filter(id => id !== movieId);
  saveUsers(users);
  
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.username === userId) {
    currentUser.favorites = user.favorites;
    saveCurrentUser(currentUser);
  }
};

export const updateUserAvatar = async (username: string, avatar: string): Promise<void> => {
  const users = getUsers();
  const user = users[username];
  
  if (!user) {
    throw new Error('User not found');
  }

  user.avatar = avatar;
  users[username] = user;
  saveUsers(users);

  const currentUser = getCurrentUser();
  if (currentUser && currentUser.username === username) {
    saveCurrentUser({ ...currentUser, avatar });
  }
}; 