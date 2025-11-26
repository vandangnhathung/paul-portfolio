"use client";

import React from 'react';

type CodeBlockCommandProps = {
    pnpmCommand: string;
    npmCommand: string;
    yarnCommand: string;
    bunCommand: string;
};

export function CodeBlockCommand({
    pnpmCommand,
    npmCommand,
    yarnCommand,
    bunCommand,
}: CodeBlockCommandProps) {
    const [activeTab, setActiveTab] = React.useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm');

    const commands = {
        pnpm: pnpmCommand,
        npm: npmCommand,
        yarn: yarnCommand,
        bun: bunCommand,
    };

    return (
        <div className="my-4">
            <div className="flex gap-2 mb-2">
                {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((pkgManager) => (
                    <button
                        key={pkgManager}
                        onClick={() => setActiveTab(pkgManager)}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${
                            activeTab === pkgManager
                                ? 'bg-zinc-800 text-zinc-200'
                                : 'bg-zinc-900/50 text-zinc-400 hover:text-zinc-200'
                        }`}
                    >
                        {pkgManager}
                    </button>
                ))}
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <pre className="text-sm text-zinc-200 overflow-x-auto">
                    <code>{commands[activeTab]}</code>
                </pre>
            </div>
        </div>
    );
}

