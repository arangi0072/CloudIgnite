import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { 
  Plus, Search, MoreVertical, Globe, Box, X, Loader2, CheckCircle2, 
  Fingerprint, Database, Zap, Mail, Activity, Users, HardDrive, Send 
} from 'lucide-react';

// Service Definitions
const AVAILABLE_SERVICES = [
  { id: 'auth', name: 'Authentication', icon: Fingerprint, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
  { id: 'storage', name: 'Edge Storage', icon: Database, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
  { id: 'functions', name: 'Serverless Functions', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
  { id: 'smtp', name: 'SMTP Mesh', icon: Mail, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
];

// Mock data
const initialProjects = [
  { id: 1, name: 'acme-corp-web', lastDeploy: '2m ago', status: 'ready', url: 'acme-corp.cloudignite.app', env: 'Production', services: ['auth', 'storage', 'functions'] },
  { id: 2, name: 'api-gateway', lastDeploy: '1h ago', status: 'ready', url: 'api.acme-corp.com', env: 'Production', services: ['functions', 'smtp'] },
  { id: 3, name: 'internal-dashboard', lastDeploy: '3d ago', status: 'error', url: 'internal.acme-corp.com', env: 'Preview', services: ['auth', 'storage'] }
];

export default function Dashboard() {
  const [projects, setProjects] = useState(initialProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(['auth', 'functions']);
  const [isCreating, setIsCreating] = useState(false);

  const filteredProjects = projects.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    
    setIsCreating(true);
    // Simulate API call
    setTimeout(() => {
      setProjects([
        {
          id: Date.now(),
          name: newProjectName.toLowerCase().replace(/\s+/g, '-'),
          lastDeploy: 'Just now',
          status: 'building',
          url: `${newProjectName.toLowerCase().replace(/\s+/g, '-')}.cloudignite.app`,
          env: 'Production',
          services: selectedServices
        },
        ...projects
      ]);
      setIsCreating(false);
      setIsCreateModalOpen(false);
      setNewProjectName('');
      setSelectedServices(['auth', 'functions']);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary selection:text-surface">
      {/* Top Navigation */}
      <nav className="border-b border-white/5 bg-surface-container-low/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <Logo className="h-6" textClass="text-xl" />
            </Link>
            <div className="hidden md:flex items-center gap-1 text-sm font-medium text-on-surface-variant">
              <span className="px-2 py-1 rounded-md bg-white/5 text-white">arpitrangi94</span>
              <span className="text-outline">/</span>
              <span className="px-2 py-1 rounded-md hover:bg-white/5 transition-colors cursor-pointer text-white">Projects</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:text-white transition-colors">
              <Globe size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-surface font-bold text-sm shadow-[0_0_15px_rgba(186,158,255,0.2)] cursor-pointer">
              A
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Platform Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-surface-container-low border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-400/10 text-blue-400"><Users size={18} /></div>
              <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Active Users</h3>
            </div>
            <p className="text-3xl font-black text-white tracking-tight">124.5K</p>
            <p className="text-xs text-emerald-400 mt-2 font-medium">+12% this month</p>
          </div>
          <div className="bg-surface-container-low border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-400/10 text-emerald-400"><HardDrive size={18} /></div>
              <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Storage Used</h3>
            </div>
            <p className="text-3xl font-black text-white tracking-tight">842 GB</p>
            <p className="text-xs text-emerald-400 mt-2 font-medium">+45 GB this month</p>
          </div>
          <div className="bg-surface-container-low border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400"><Activity size={18} /></div>
              <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Invocations</h3>
            </div>
            <p className="text-3xl font-black text-white tracking-tight">2.4M</p>
            <p className="text-xs text-emerald-400 mt-2 font-medium">+800K this month</p>
          </div>
          <div className="bg-surface-container-low border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-purple-400/10 text-purple-400"><Send size={18} /></div>
              <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Emails Sent</h3>
            </div>
            <p className="text-3xl font-black text-white tracking-tight">89.2K</p>
            <p className="text-xs text-emerald-400 mt-2 font-medium">+5.2K this month</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white mb-1">Your Projects</h1>
            <p className="text-sm text-on-surface-variant">Manage your applications and active services.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 bg-surface-container-low border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline"
              />
            </div>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 bg-white text-surface px-4 py-2 rounded-lg font-bold text-sm hover:bg-white/90 transition-colors whitespace-nowrap"
            >
              <Plus size={16} />
              New Project
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Link 
                key={project.id}
                to={`/project/${project.name}/auth`}
                className="group bg-surface-container-low border border-white/5 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(186,158,255,0.05)] cursor-pointer flex flex-col"
              >
                <div className="p-6 border-b border-white/5 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center border border-white/5 group-hover:border-primary/20 transition-colors">
                        <Box size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors">{project.name}</h3>
                        <p className="text-xs text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                          <Globe size={12} />
                          {project.url}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => e.preventDefault()} 
                      className="text-outline hover:text-white transition-colors p-1"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  
                  {/* Active Services Badges */}
                  <div className="mt-6">
                    <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-3">Active Services</p>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map(serviceId => {
                        const service = AVAILABLE_SERVICES.find(s => s.id === serviceId);
                        if (!service) return null;
                        const Icon = service.icon;
                        return (
                          <div key={serviceId} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${service.bg} ${service.color} ${service.border} border`}>
                            <Icon size={10} />
                            {service.name}
                          </div>
                        );
                      })}
                      {project.services.length === 0 && (
                        <span className="text-xs text-on-surface-variant italic">No services enabled</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-surface-container-lowest/50 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      {project.status === 'building' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>}
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${
                        project.status === 'ready' ? 'bg-emerald-500' : 
                        project.status === 'building' ? 'bg-amber-400' : 'bg-red-500'
                      }`}></span>
                    </span>
                    <span className="text-xs font-medium text-on-surface-variant capitalize">
                      {project.status === 'building' ? 'Provisioning...' : project.status}
                    </span>
                  </div>
                  <span className="text-xs text-outline">{project.lastDeploy}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-surface-container-low/30">
            <div className="w-16 h-16 rounded-2xl bg-surface border border-white/5 flex items-center justify-center mx-auto mb-6">
              <Search size={24} className="text-outline" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
            <p className="text-on-surface-variant mb-6 max-w-md mx-auto">
              We couldn't find any projects matching "{searchQuery}". Try adjusting your search or create a new project.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setIsCreateModalOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-white/20 transition-colors"
            >
              <Plus size={16} />
              Create New Project
            </button>
          </div>
        )}
      </main>

      {/* Create Project Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-surface border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
                <div>
                  <h2 className="text-xl font-bold text-white">Create New Project</h2>
                  <p className="text-sm text-on-surface-variant mt-1">Provision a new environment and select your services.</p>
                </div>
                <button 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-outline hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              
              <form onSubmit={handleCreateProject} className="p-6 overflow-y-auto">
                <div className="space-y-8">
                  <div>
                    <label htmlFor="projectName" className="block text-sm font-bold text-white mb-2">Project Name</label>
                    <input 
                      id="projectName"
                      type="text" 
                      required
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      placeholder="e.g. my-awesome-app" 
                      className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-white mb-3">Enable Services</label>
                    <p className="text-xs text-on-surface-variant mb-4">Select the CloudIgnite services you want to provision for this project. You can always change this later.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {AVAILABLE_SERVICES.map((service) => {
                        const isSelected = selectedServices.includes(service.id);
                        const Icon = service.icon;
                        return (
                          <div 
                            key={service.id} 
                            onClick={() => toggleService(service.id)}
                            className={`border rounded-xl p-4 cursor-pointer transition-all flex items-start gap-3 ${isSelected ? 'border-primary bg-primary/5 shadow-[0_0_15px_rgba(186,158,255,0.1)]' : 'border-white/10 hover:border-white/30 bg-surface-container-low'}`}
                          >
                            <div className={`p-2.5 rounded-lg shrink-0 ${isSelected ? service.bg + ' ' + service.color : 'bg-white/5 text-outline'}`}>
                              <Icon size={18} />
                            </div>
                            <div className="flex-1 pt-0.5">
                              <span className={`text-sm font-bold block mb-1 ${isSelected ? 'text-white' : 'text-on-surface-variant'}`}>{service.name}</span>
                            </div>
                            <div className="shrink-0 pt-1">
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-primary bg-primary' : 'border-white/20'}`}>
                                {isSelected && <CheckCircle2 size={12} className="text-surface" strokeWidth={3} />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-sm font-bold text-on-surface-variant hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isCreating || !newProjectName.trim()}
                    className="flex items-center gap-2 px-6 py-2 rounded-lg bg-white text-surface text-sm font-bold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCreating ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Provisioning...
                      </>
                    ) : (
                      'Create Project'
                    )}
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
