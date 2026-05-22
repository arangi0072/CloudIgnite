import GithubIcon from '@/components/icons/github';
import GoogleIcon from '@/components/icons/google';

export const users = [
  {
    id: 'usr_1a2b3c4d5e6f',
    name: 'Elena Rodriguez',
    email: 'elena@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    providers: ['google'],
    createdAt: '2024-07-10T10:00:00Z',
    lastLogin: '2024-07-15T14:30:00Z',
    status: 'Active',
  },
  {
    id: 'usr_f1e2d3c4b5a6',
    name: 'David Chen',
    email: 'david.chen@work.co',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop',
    providers: ['github', 'email'],
    createdAt: '2024-07-09T11:20:00Z',
    lastLogin: '2024-07-14T09:05:00Z',
    status: 'Active',
  },
  {
    id: 'usr_a6b5c4d3e2f1',
    name: 'Marcus Johnson',
    email: 'marcus@startup.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    providers: ['email'],
    createdAt: '2024-07-05T18:00:00Z',
    lastLogin: '2024-07-05T18:01:00Z',
    status: 'Invited',
  },
    {
    id: 'usr_9h8g7f6e5d4c',
    name: 'Sophie Dubois',
    email: 'sophie.d@mail.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop',
    providers: ['google'],
    createdAt: '2024-06-28T09:15:00Z',
    lastLogin: '2024-07-12T11:45:00Z',
    status: 'Suspended',
  },
];

export type User = typeof users[0];

export const providers = [
    { id: 'email', name: 'Email / Password', enabled: true },
    { id: 'google', name: 'Google', enabled: true },
    { id: 'github', name: 'GitHub', enabled: false },
    { id: 'magic_link', name: 'OTP / Magic Link', enabled: false },
]

export const policies = [
    { title: 'Password Rules', description: 'Define complexity and expiry for passwords.', configured: true },
    { title: 'MFA Enforcement', description: 'Require multi-factor authentication for all users.', configured: false },
    { title: 'Session Duration', description: 'Set how long user sessions remain active.', configured: true },
    { title: 'IP Restrictions', description: 'Allow or block sign-ins from specific IP addresses.', configured: false },
]

export const sessions = [
    { id: 'ses_1', user: users[0], device: 'Chrome on macOS', location: 'Madrid, Spain', ip: '85.57.120.198', lastActive: '5 minutes ago'},
    { id: 'ses_2', user: users[1], device: 'iPhone', location: 'San Francisco, US', ip: '24.12.180.221', lastActive: '1 hour ago'},
    { id: 'ses_3', user: users[0], device: 'Safari on macOS', location: 'Madrid, Spain', ip: '85.57.120.198', lastActive: '3 hours ago'},
]

export const webhooks = [
    { id: 'wh_1', url: 'https://api.example.com/webhooks/users', events: ['user.created', 'user.updated'], status: 'Active' },
    { id: 'wh_2', url: 'https://api.example.com/webhooks/sessions', events: ['session.created'], status: 'Failing' },
]
