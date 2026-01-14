
import React from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FindWorkers from './pages/FindWorkers';
import JobVisualizer from './pages/JobVisualizer';
import WorkerRegistration from './pages/WorkerRegistration';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import { Wrench, Facebook, Twitter, Instagram, ShieldCheck, Heart } from 'lucide-react';
import { WorkerProvider } from './context/WorkerContext';
import { UserProvider } from './context/UserContext';
import { BookingProvider } from './context/BookingContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PreferencesProvider } from './context/PreferencesContext';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Root Redirect Component
const RootRedirect: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      
      {/* Protected Routes */}
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/find-workers" element={<ProtectedRoute><FindWorkers /></ProtectedRoute>} />
      <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/ai-visualizer" element={<ProtectedRoute><JobVisualizer /></ProtectedRoute>} />
      <Route path="/register-worker" element={<ProtectedRoute><WorkerRegistration /></ProtectedRoute>} />
      
      {/* Admin Route - Ideally protected by role, but open for demo/dev purposes */}
      <Route path="/admin" element={<AdminDashboard />} />
      
      {/* Public Pages */}
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/contact" element={<Contact />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <PreferencesProvider>
      <AuthProvider>
        <WorkerProvider>
          <UserProvider>
            <BookingProvider>
              <HashRouter>
                <div className="flex flex-col min-h-screen font-sans bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
                  <Navbar />
                  <main className="flex-grow">
                    <AppRoutes />
                  </main>
                  
                  <footer className="bg-slate-900 dark:bg-black text-slate-300 pt-20 pb-10 border-t border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        
                        {/* Brand */}
                        <div className="col-span-1 md:col-span-2 lg:col-span-1">
                          <Link to="/" className="flex items-center gap-3 mb-6">
                              <div className="bg-gradient-to-br from-primary-600 to-secondary-500 p-2 rounded-xl">
                                <Wrench className="h-6 w-6 text-white" />
                              </div>
                              <span className="text-2xl font-bold text-white tracking-tight">WorkNearby</span>
                            </Link>
                            <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                              The smartest way to find local services. Powered by AI, driven by community, designed for you.
                            </p>
                            <div className="flex space-x-3">
                              <a href="#" className="hover:text-white hover:bg-slate-800 transition-all p-2.5 rounded-full bg-slate-800/50"><Facebook className="w-4 h-4"/></a>
                              <a href="#" className="hover:text-white hover:bg-slate-800 transition-all p-2.5 rounded-full bg-slate-800/50"><Twitter className="w-4 h-4"/></a>
                              <a href="#" className="hover:text-white hover:bg-slate-800 transition-all p-2.5 rounded-full bg-slate-800/50"><Instagram className="w-4 h-4"/></a>
                            </div>
                        </div>

                        {/* Links */}
                        <div>
                          <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-6">Company</h3>
                          <ul className="space-y-4">
                            <li><Link to="/about" className="text-sm text-slate-400 hover:text-primary-400 transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="text-sm text-slate-400 hover:text-primary-400 transition-colors">Contact Support</Link></li>
                            <li><Link to="/privacy" className="text-sm text-slate-400 hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/admin" className="text-sm text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-2"><ShieldCheck className="w-3 h-3"/> Admin Access</Link></li>
                          </ul>
                        </div>

                        {/* Services */}
                        <div>
                          <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-6">Services</h3>
                          <ul className="space-y-4">
                            <li><Link to="/find-workers?category=Electrician" className="text-sm text-slate-400 hover:text-primary-400 transition-colors">Electricians</Link></li>
                            <li><Link to="/find-workers?category=Plumber" className="text-sm text-slate-400 hover:text-primary-400 transition-colors">Plumbers</Link></li>
                            <li><Link to="/find-workers?category=Painter" className="text-sm text-slate-400 hover:text-primary-400 transition-colors">Painters</Link></li>
                            <li><Link to="/ai-visualizer" className="text-sm text-slate-400 hover:text-primary-400 transition-colors">AI Job Visualizer</Link></li>
                          </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                          <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-6">Stay Updated</h3>
                          <p className="text-sm text-slate-400 mb-4">Join our newsletter for the latest updates and offers.</p>
                          <form className="flex flex-col gap-3">
                            <input type="email" placeholder="Email address" className="bg-slate-800/50 text-white px-4 py-3 rounded-xl w-full text-sm outline-none focus:ring-2 focus:ring-primary-500 placeholder-slate-500 border border-slate-700 focus:border-transparent transition-all" />
                            <button className="bg-primary-600 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-primary-500 transition-all shadow-lg shadow-primary-900/20">
                              Subscribe
                            </button>
                          </form>
                        </div>

                      </div>
                      
                      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                        <p>&copy; {new Date().getFullYear()} WorkNearby. All rights reserved.</p>
                        <p className="flex items-center gap-1">Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in Yavatmal</p>
                      </div>
                    </div>
                  </footer>
                </div>
              </HashRouter>
            </BookingProvider>
          </UserProvider>
        </WorkerProvider>
      </AuthProvider>
    </PreferencesProvider>
  );
};

export default App;
