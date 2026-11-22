import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEMO_USER = {
  id: "user-demo-1",
  name: "Sarah Jenkins",
  email: "sarah.artisan@example.com",
  phone: "+91 98450 12345",
  password: "Password123!",
  joinedDate: "January 2025",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  shippingAddress: {
    street: "100 Feet Road, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    zipCode: "560038",
    country: "India"
  },
  orders: [
    {
      id: "ORD-89412",
      date: "October 22, 2026",
      status: "Delivered",
      total: 1597.00,
      items: [
        {
          id: "p1",
          name: "Hand-Thrown Terracotta Ceramic Mug",
          price: 499,
          quantity: 2,
          color: "Terracotta & Cream",
          image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80"
        },
        {
          id: "p31",
          name: "Hand-Poured Soy Wax Amber & Moss Candle",
          price: 599,
          quantity: 1,
          color: "Amber Glass",
          image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=300&q=80"
        }
      ]
    },
    {
      id: "ORD-92045",
      date: "November 08, 2026",
      status: "In Transit",
      total: 1699.00,
      items: [
        {
          id: "p13",
          name: "Custom Engraved Walnut Cutting Board",
          price: 1699,
          quantity: 1,
          color: "Rich Natural Walnut",
          customization: "The Jenkins Family | Est. 2019",
          image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=300&q=80"
        }
      ]
    }
  ]
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const storedSession = localStorage.getItem('auracraft_session');
      return storedSession ? JSON.parse(storedSession) : null;
    } catch {
      return null;
    }
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('auracraft_users');
      if (saved) {
        return JSON.parse(saved);
      }
      // Seed default demo user
      localStorage.setItem('auracraft_users', JSON.stringify([DEMO_USER]));
      return [DEMO_USER];
    } catch {
      return [DEMO_USER];
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('auracraft_session', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('auracraft_session');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const signUp = ({ name, email, phone, password }) => {
    // Check if email already registered
    const existing = registeredUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() || (phone && u.phone === phone)
    );
    if (existing) {
      throw new Error('An account with this email or mobile number already exists.');
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      phone: phone || '',
      password,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80`,
      shippingAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
      },
      orders: []
    };

    const updated = [...registeredUsers, newUser];
    setRegisteredUsers(updated);
    localStorage.setItem('auracraft_users', JSON.stringify(updated));
    setCurrentUser(newUser);
    return newUser;
  };

  const signIn = ({ identifier, password, rememberMe = true }) => {
    const cleanId = identifier.trim().toLowerCase();
    const user = registeredUsers.find(
      u => (u.email.toLowerCase() === cleanId || u.phone === cleanId)
    );

    if (!user) {
      throw new Error('No account found with this email or mobile number.');
    }

    if (user.password !== password) {
      throw new Error('Incorrect password. Please verify and try again.');
    }

    setCurrentUser(user);
    if (!rememberMe) {
      sessionStorage.setItem('auracraft_temp_session', JSON.stringify(user));
    }
    return user;
  };

  const logOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('auracraft_session');
    sessionStorage.removeItem('auracraft_temp_session');
  };

  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);

    const allUsers = registeredUsers.map(u => (u.id === updated.id ? updated : u));
    setRegisteredUsers(allUsers);
    localStorage.setItem('auracraft_users', JSON.stringify(allUsers));
  };

  const addOrder = (order) => {
    if (!currentUser) return;
    const updatedOrders = [order, ...(currentUser.orders || [])];
    updateProfile({ orders: updatedOrders });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        registeredUsers,
        isAuthenticated: !!currentUser,
        signIn,
        signUp,
        logOut,
        updateProfile,
        addOrder,
        demoCredentials: {
          email: DEMO_USER.email,
          password: DEMO_USER.password
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
