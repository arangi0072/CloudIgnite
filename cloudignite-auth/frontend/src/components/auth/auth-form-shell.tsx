import { ReactNode } from 'react';

type AuthFormShellProps = {
  title: string;
  children: ReactNode;
};

export function AuthFormShell({ title, children }: AuthFormShellProps) {
  return (
    <div className="w-full max-w-md">
      <div className="glass-card">
        <h2 className="font-headline text-2xl font-bold text-center mb-6 text-foreground">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
