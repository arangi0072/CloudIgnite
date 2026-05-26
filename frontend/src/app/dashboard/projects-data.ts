import { ShieldCheck, Mail, Database, Cpu } from "lucide-react";

export const projects = [
    {
        name: 'cloudignite-website',
        environment: 'Production',
        region: 'us-west-2',
        services: [
            { name: 'Auth', icon: ShieldCheck },
            { name: 'SMTP', icon: Mail },
            { name: 'Storage', icon: Database },
            { name: 'Functions', icon: Cpu },
        ],
        lastUpdated: '2 hours ago',
        status: 'ok'
    },
    {
        name: 'analytics-pipeline',
        environment: 'Staging',
        region: 'eu-central-1',
        services: [
            { name: 'Functions', icon: Cpu },
            { name: 'Storage', icon: Database },
        ],
        lastUpdated: '1 day ago',
        status: 'ok'
    },
    {
        name: 'mobile-api-gateway',
        environment: 'Production',
        region: 'ap-southeast-1',
        services: [
            { name: 'Auth', icon: ShieldCheck },
            { name: 'Functions', icon: Cpu },
        ],
        lastUpdated: '5 days ago',
        status: 'ok'
    }
];

export type Project = typeof projects[0];
