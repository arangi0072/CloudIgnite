import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '../components/Logo';
import { 
  Fingerprint, Database, Zap, Mail, ArrowLeft, Globe, 
  Users, Key, Plus, Search, MoreVertical, Trash2, Ban, 
  CheckCircle2, Copy, X, ShieldCheck, Clock, Eye, EyeOff, 
  RefreshCw, Shield, Github, Smartphone, AlertCircle,
  Check, ChevronRight, Activity, BookOpen
} from 'lucide-react';

// Mock Data
const initialUsers = [
  { id: 'usr_9f8a7b6c', email: 'sarah.connor@example.com', name: 'Sarah Connor', created: 'Oct 24, 2023', status: 'active', lastSignIn: '2 mins ago', role: 'Owner', providers: ['google', 'email'], mfa: true },
  { id: 'usr_1e2d3c4b', email: 'john.doe@example.com', name: 'John Doe', created: 'Nov 12, 2023', status: 'active', lastSignIn: '5 hours ago', role: 'User', providers: ['github'], mfa: false },
  { id: 'usr_5a6b7c8d', email: 'jane.smith@example.com', name: 'Jane Smith', created: 'Jan 05, 2024', status: 'disabled', lastSignIn: '1 month ago', role: 'User', providers: ['email'], mfa: false },
];

const initialKeys = [
  { id: 'key_prod_1', name: 'Production API Key', description: 'Main key for production environment', notes: 'Do not share this key.', key: 'pk_live_8f92a3b1c4d5e6f7g8h9i0j1k2l3m4n5', created: 'Oct 20, 2023', lastUsed: 'Just now', env: 'Production' },
  { id: 'key_test_1', name: 'Development API Key', description: 'Key for local development and testing', notes: 'Safe to use in local env.', key: 'pk_test_4a1f2b3c4d5e6f7g8h9i0j1k2l3m4n5', created: 'Oct 20, 2023', lastUsed: '2 days ago', env: 'Preview' },
];

const SERVICES = [
  { id: 'auth', name: 'Authentication', icon: Fingerprint, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 'storage', name: 'Edge Storage', icon: Database, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { id: 'functions', name: 'Serverless Functions', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  { id: 'smtp', name: 'SMTP Mesh', icon: Mail, color: 'text-purple-400', bg: 'bg-purple-400/10' },
];

export default function Project() {
  const { projectId, serviceId = 'auth' } = useParams();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'users' | 'keys'>('users');
  const [users, setUsers] = useState(initialUsers);
  const [keys, setKeys] = useState(initialKeys);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals State
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddKeyOpen, setIsAddKeyOpen] = useState(false);
  
  // Form State
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyDescription, setNewKeyDescription] = useState('');
  const [newKeyNotes, setNewKeyNotes] = useState('');
  const [newKeyEnv, setNewKeyEnv] = useState('Production');

  // UI State
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [keyEnvFilter, setKeyEnvFilter] = useState('All');
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredKeys = keys.filter(k => keyEnvFilter === 'All' || k.env === keyEnvFilter);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail || !newUserPassword) return;
    
    const newUser = {
      id: `usr_${Math.random().toString(16).slice(2, 10)}`,
      email: newUserEmail,
      name: newUserName || 'Unknown User',
      created: 'Just now',
      status: 'active',
      lastSignIn: 'Never',
      role: 'User',
      providers: ['email'],
      mfa: false
    };
    
    setUsers([newUser, ...users]);
    setIsAddUserOpen(false);
    setNewUserEmail('');
    setNewUserName('');
    setNewUserPassword('');
    showToast('User created successfully');
  };

  const handleAddKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;
    
    const prefix = newKeyEnv === 'Production' ? 'pk_live_' : newKeyEnv === 'Preview' ? 'pk_test_' : 'pk_dev_';
    const newKey = {
      id: `key_${Math.random().toString(16).slice(2, 10)}`,
      name: newKeyName,
      description: newKeyDescription,
      notes: newKeyNotes,
      key: `${prefix}${Math.random().toString(16).slice(2, 34)}`,
      created: 'Just now',
      lastUsed: 'Never',
      env: newKeyEnv
    };
    
    setKeys([newKey, ...keys]);
    setIsAddKeyOpen(false);
    setNewKeyName('');
    setNewKeyDescription('');
    setNewKeyNotes('');
    showToast('API Key generated successfully');
  };

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const newStatus = u.status === 'active' ? 'disabled' : 'active';
        showToast(`User ${newStatus === 'active' ? 'enabled' : 'disabled'}`);
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
    showToast('User deleted permanently');
  };

  const revokeKey = (id: string) => {
    setKeys(keys.filter(k => k.id !== id));
    showToast('API Key revoked', 'error');
  };

  const toggleKeyVisibility = (id: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderProviderIcon = (provider: string) => {
    switch(provider) {
      case 'google': return <Globe size={12} className="text-red-400" />;
      case 'github': return <Github size={12} className="text-white" />;
      case 'email': return <Mail size={12} className="text-blue-400" />;
      default: return <Fingerprint size={12} />;
    }
  };

  const renderAuthService = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Authentication
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-400/10 text-blue-400 uppercase tracking-wider border border-blue-400/20">Active</span>
          </h2>
          <p className="text-on-surface-variant text-sm mt-1">Manage your users, identities, and security keys.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-white/5">
        <button 
          onClick={() => setActiveTab('users')}
          className={`pb-4 text-sm font-bold transition-colors relative flex items-center gap-2 ${activeTab === 'users' ? 'text-white' : 'text-on-surface-variant hover:text-white'}`}
        >
          <Users size={16} className={activeTab === 'users' ? 'text-primary' : ''} />
          Users
          <span className="bg-white/10 text-xs px-1.5 py-0.5 rounded-md ml-1">{users.length}</span>
          {activeTab === 'users' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('keys')}
          className={`pb-4 text-sm font-bold transition-colors relative flex items-center gap-2 ${activeTab === 'keys' ? 'text-white' : 'text-on-surface-variant hover:text-white'}`}
        >
          <Key size={16} className={activeTab === 'keys' ? 'text-primary' : ''} />
          Service Keys
          <span className="bg-white/10 text-xs px-1.5 py-0.5 rounded-md ml-1">{keys.length}</span>
          {activeTab === 'keys' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      </div>

      {activeTab === 'users' ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative group w-full sm:w-80">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search users by email, name, or ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-lowest border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline shadow-inner"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button 
              onClick={() => setIsAddUserOpen(true)}
              className="flex items-center justify-center gap-2 bg-white text-surface px-4 py-2 rounded-lg font-bold text-sm hover:bg-white/90 transition-all active:scale-95 shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <Plus size={16} />
              Add User
            </button>
          </div>

          <div className="bg-surface-container-low border border-white/5 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-surface-container/50">
                    <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Security</th>
                    <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Created</th>
                    <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Last Sign In</th>
                    <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence>
                    {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                      <motion.tr 
                        key={user.id}
                        initial={{ opacity: 0, backgroundColor: 'rgba(186,158,255,0)' }}
                        animate={{ opacity: 1, backgroundColor: 'rgba(186,158,255,0)' }}
                        exit={{ opacity: 0, x: -20, backgroundColor: 'rgba(239,68,68,0.1)' }}
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold text-sm border border-primary/20 shadow-inner">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white flex items-center gap-2">
                                {user.name}
                                {user.role === 'Owner' && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/20">Owner</span>
                                )}
                              </div>
                              <div className="text-xs text-on-surface-variant flex items-center gap-2 mt-0.5">
                                {user.email}
                                <div className="flex items-center gap-1 group/copy cursor-pointer" onClick={() => copyToClipboard(user.id, user.id)}>
                                  <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-outline font-mono group-hover/copy:text-white transition-colors">{user.id}</span>
                                  {copiedId === user.id ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} className="text-outline opacity-0 group-hover/copy:opacity-100 transition-opacity" />}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-1">
                              {user.providers.map((p, i) => (
                                <div key={i} className="w-5 h-5 rounded-full bg-surface border border-white/10 flex items-center justify-center z-10" title={`Signed in via ${p}`}>
                                  {renderProviderIcon(p)}
                                </div>
                              ))}
                            </div>
                            {user.mfa && (
                              <div className="w-5 h-5 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400" title="MFA Enabled">
                                <Smartphone size={10} />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                            user.status === 'active' 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                              : 'bg-red-500/10 text-red-400 border-red-500/20'
                          }`}>
                            {user.status === 'active' ? <CheckCircle2 size={10} /> : <Ban size={10} />}
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-on-surface-variant">{user.created}</td>
                        <td className="px-6 py-4 text-sm text-on-surface-variant">{user.lastSignIn}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => toggleUserStatus(user.id)}
                              className="p-2 rounded-lg hover:bg-white/10 text-on-surface-variant hover:text-white transition-colors relative group/btn"
                            >
                              {user.status === 'active' ? <Ban size={16} /> : <CheckCircle2 size={16} />}
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-highest text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                                {user.status === 'active' ? 'Disable User' : 'Enable User'}
                              </span>
                            </button>
                            <button 
                              onClick={() => deleteUser(user.id)}
                              disabled={user.role === 'Owner'}
                              className="p-2 rounded-lg hover:bg-red-500/20 text-on-surface-variant hover:text-red-400 transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-on-surface-variant relative group/btn"
                            >
                              <Trash2 size={16} />
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-highest text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                                {user.role === 'Owner' ? 'Cannot delete owner' : 'Delete User'}
                              </span>
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    )) : (
                      <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <td colSpan={6} className="px-6 py-16 text-center">
                          <div className="w-16 h-16 rounded-full bg-surface-container border border-white/5 flex items-center justify-center mx-auto mb-4">
                            <Search size={24} className="text-outline" />
                          </div>
                          <h3 className="text-white font-bold mb-1">No users found</h3>
                          <p className="text-sm text-on-surface-variant mb-4">No users match your current search criteria.</p>
                          <button 
                            onClick={() => setSearchQuery('')}
                            className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                          >
                            Clear search
                          </button>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      ) : activeTab === 'keys' ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-on-surface-variant">Use these keys to authenticate API requests from your application.</p>
            <div className="flex items-center gap-3">
              <select 
                value={keyEnvFilter}
                onChange={(e) => setKeyEnvFilter(e.target.value)}
                className="bg-surface-container-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
              >
                <option value="All">All Environments</option>
                <option value="Production">Production</option>
                <option value="Preview">Preview</option>
                <option value="Development">Development</option>
              </select>
              <button 
                onClick={() => setIsAddKeyOpen(true)}
                className="flex items-center justify-center gap-2 bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-white/20 transition-all active:scale-95 shrink-0"
              >
                <Plus size={16} />
                Create Key
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {filteredKeys.map((key) => {
                const isVisible = visibleKeys.has(key.id);
                const maskedKey = `${key.key.substring(0, 8)}••••••••••••••••••••••••••••`;
                
                return (
                  <motion.div 
                    key={key.id} 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98, height: 0, marginBottom: 0, overflow: 'hidden' }}
                    className="p-5 rounded-xl border border-white/10 bg-surface-container-low flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-white/20 transition-colors group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <ShieldCheck size={18} className={key.env === 'Production' ? 'text-emerald-400' : key.env === 'Preview' ? 'text-amber-400' : 'text-blue-400'} />
                        <span className="text-base font-bold text-white">{key.name}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                          key.env === 'Production' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' : 
                          key.env === 'Preview' ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' :
                          'bg-blue-400/10 text-blue-400 border-blue-400/20'
                        }`}>
                          {key.env}
                        </span>
                      </div>
                      {key.description && (
                        <p className="text-sm text-on-surface-variant mb-2">{key.description}</p>
                      )}
                      {key.notes && (
                        <div className="mb-3 p-3 rounded-lg bg-surface border border-white/5 text-xs text-on-surface-variant">
                          <span className="font-bold text-white/70 block mb-1">Notes:</span>
                          {key.notes}
                        </div>
                      )}
                      <div className="text-xs text-on-surface-variant flex items-center gap-4">
                        <span className="flex items-center gap-1.5"><Clock size={12} /> Created {key.created}</span>
                        <span className="flex items-center gap-1.5"><Activity size={12} /> Last used {key.lastUsed}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-surface p-2 rounded-lg border border-white/5">
                      <code className="px-3 py-1.5 text-sm text-primary font-mono select-all min-w-[300px]">
                        {isVisible ? key.key : maskedKey}
                      </code>
                      <div className="flex items-center gap-1 border-l border-white/10 pl-2">
                        <button 
                          onClick={() => toggleKeyVisibility(key.id)}
                          className="p-2 rounded-md hover:bg-white/10 transition-colors text-on-surface-variant hover:text-white"
                          title={isVisible ? "Hide Key" : "Reveal Key"}
                        >
                          {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button 
                          onClick={() => copyToClipboard(key.key, key.id)}
                          className="p-2 rounded-md hover:bg-white/10 transition-colors text-on-surface-variant hover:text-white relative"
                          title="Copy to clipboard"
                        >
                          {copiedId === key.id ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                        </button>
                        <button 
                          onClick={() => revokeKey(key.id)}
                          className="p-2 rounded-md hover:bg-red-500/20 transition-colors text-on-surface-variant hover:text-red-400"
                          title="Revoke Key"
                        >
                          <RefreshCw size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {filteredKeys.length === 0 && (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-surface-container-low/30">
                <Shield size={24} className="text-outline mx-auto mb-3" />
                <h3 className="text-white font-bold mb-1">No API Keys</h3>
                <p className="text-sm text-on-surface-variant mb-4">
                  {keys.length === 0 ? 'Create an API key to authenticate your application requests.' : 'No API keys match the selected environment filter.'}
                </p>
                {keys.length === 0 ? (
                  <button 
                    onClick={() => setIsAddKeyOpen(true)}
                    className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    Create your first key
                  </button>
                ) : (
                  <button 
                    onClick={() => setKeyEnvFilter('All')}
                    className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    Clear filter
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      ) : null}
    </div>
  );

  const renderComingSoon = (serviceName: string) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-white/10 rounded-2xl bg-surface-container-low/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50 pointer-events-none"></div>
      <div className="w-20 h-20 rounded-2xl bg-surface border border-white/5 flex items-center justify-center mb-6 shadow-2xl relative z-10">
        <Clock size={32} className="text-primary animate-pulse" />
      </div>
      <h2 className="text-3xl font-black text-white mb-3 relative z-10">{serviceName}</h2>
      <p className="text-on-surface-variant max-w-md mx-auto mb-8 relative z-10 leading-relaxed">
        We are crafting a beautiful experience for this service. It will be available in an upcoming platform update.
      </p>
      <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 relative z-10 flex items-center gap-2">
        <Mail size={16} />
        Notify Me When Available
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary selection:text-surface flex flex-col font-sans">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-bold text-white border ${
              toast.type === 'success' 
                ? 'bg-surface-container-highest border-emerald-500/20 shadow-emerald-500/10' 
                : 'bg-surface-container-highest border-red-500/20 shadow-red-500/10'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 size={18} className="text-emerald-400" />
            ) : (
              <AlertCircle size={18} className="text-red-400" />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation */}
      <nav className="border-b border-white/5 bg-surface-container-low/80 backdrop-blur-xl sticky top-0 z-40 shrink-0">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <Logo className="h-6" textClass="text-xl" />
            </Link>
            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-on-surface-variant border-l border-white/10 pl-6">
              <Link to="/dashboard" className="hover:text-white transition-colors">Projects</Link>
              <ChevronRight size={14} className="text-outline" />
              <div 
                className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                onClick={() => copyToClipboard(projectId || '', 'project-id')}
                title="Copy Project ID"
              >
                <span className="text-white">{projectId}</span>
                {copiedId === 'project-id' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} className="text-outline group-hover:text-white transition-colors" />}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Production
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-surface font-bold text-sm shadow-[0_0_15px_rgba(186,158,255,0.2)] cursor-pointer hover:scale-105 transition-transform">
              A
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 max-w-[1600px] mx-auto w-full flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/5 p-6 shrink-0 bg-surface/50">
          <Link to="/dashboard" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-white transition-colors mb-8 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
          </Link>
          
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-3 px-3">Services</p>
            {SERVICES.map((service) => {
              const isActive = serviceId === service.id;
              const Icon = service.icon;
              return (
                <Link 
                  key={service.id}
                  to={`/project/${projectId}/${service.id}`}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative overflow-hidden ${
                    isActive 
                      ? 'bg-primary/10 text-white font-bold' 
                      : 'text-on-surface-variant hover:bg-white/5 hover:text-white font-medium'
                  }`}
                >
                  {isActive && <motion.div layoutId="activeSidebar" className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                  <Icon size={18} className={isActive ? 'text-primary' : ''} />
                  <span className="text-sm">{service.name}</span>
                </Link>
              );
            })}
          </div>
          
          <div className="mt-8 space-y-1">
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-3 px-3">Settings</p>
            <Link to={`/project/${projectId}/settings`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-white transition-all font-medium">
              <Globe size={18} />
              <span className="text-sm">General</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {serviceId === 'auth' ? renderAuthService() : renderComingSoon(SERVICES.find(s => s.id === serviceId)?.name || 'Service')}
          </div>
        </main>
      </div>

      {/* Add User Modal */}
      <AnimatePresence>
        {isAddUserOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddUserOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-surface border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-surface-container-lowest/50">
                <div>
                  <h2 className="text-xl font-bold text-white">Add New User</h2>
                  <p className="text-sm text-on-surface-variant mt-1">Create a new user account manually.</p>
                </div>
                <button 
                  onClick={() => setIsAddUserOpen(false)}
                  className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-outline hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              
              <form onSubmit={handleAddUser} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Email Address <span className="text-red-400">*</span></label>
                  <input 
                    type="email" 
                    required
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="user@example.com" 
                    className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="John Doe" 
                    className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Password <span className="text-red-400">*</span></label>
                  <input 
                    type="password" 
                    required
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline"
                  />
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsAddUserOpen(false)}
                    className="px-4 py-2 rounded-lg text-sm font-bold text-on-surface-variant hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={!newUserEmail || !newUserPassword}
                    className="px-6 py-2 rounded-lg bg-white text-surface text-sm font-bold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Key Modal */}
      <AnimatePresence>
        {isAddKeyOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddKeyOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-surface border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-surface-container-lowest/50">
                <div>
                  <h2 className="text-xl font-bold text-white">Create API Key</h2>
                  <p className="text-sm text-on-surface-variant mt-1">Generate a new key for application access.</p>
                </div>
                <button 
                  onClick={() => setIsAddKeyOpen(false)}
                  className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-outline hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              
              <form onSubmit={handleAddKey} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Key Name <span className="text-red-400">*</span></label>
                  <input 
                    type="text" 
                    required
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g. Mobile App Production" 
                    className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Description</label>
                  <input 
                    type="text" 
                    value={newKeyDescription}
                    onChange={(e) => setNewKeyDescription(e.target.value)}
                    placeholder="e.g. Main key for production environment" 
                    className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Notes</label>
                  <textarea 
                    value={newKeyNotes}
                    onChange={(e) => setNewKeyNotes(e.target.value)}
                    placeholder="Any additional notes or warnings..." 
                    rows={3}
                    className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Environment</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Production', 'Preview', 'Development'].map((env) => (
                      <div 
                        key={env} 
                        onClick={() => setNewKeyEnv(env)}
                        className={`border rounded-lg p-3 cursor-pointer transition-all ${newKeyEnv === env ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-white/30 bg-surface-container-low'}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white">{env}</span>
                          {newKeyEnv === env && <CheckCircle2 size={14} className="text-primary" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsAddKeyOpen(false)}
                    className="px-4 py-2 rounded-lg text-sm font-bold text-on-surface-variant hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={!newKeyName}
                    className="px-6 py-2 rounded-lg bg-white text-surface text-sm font-bold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  >
                    Generate Key
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
