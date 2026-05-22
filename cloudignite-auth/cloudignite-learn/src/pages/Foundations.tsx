import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
  ArrowLeft,
  ChevronRight,
  Database,
  Boxes,
  Network,
  Server,
  Cpu,
  FolderTree
} from 'lucide-react';

const API_BASE = 'https://api.learn.cloudignite.in';

// =========================================
// TYPES
// =========================================

interface Topic {
  id: string;
  slug: string;
  title: string;

  short_description: string;
  hero_description: string;

  category: string;

  difficulty_level: string;

  topic_level: number;

  path: string;

  is_category: boolean;
}

interface TopicTreeNode {
  topic: Topic;
  children?: TopicTreeNode[];
}

// =========================================
// ICONS
// =========================================

function getTopicIcon(slug: string) {

  if (slug.includes('database')) {
    return Database;
  }

  if (
    slug.includes('network') ||
    slug.includes('internet') ||
    slug.includes('dns')
  ) {
    return Network;
  }

  if (
    slug.includes('backend') ||
    slug.includes('server')
  ) {
    return Server;
  }

  if (
    slug.includes('operating') ||
    slug.includes('linux')
  ) {
    return Cpu;
  }

  return Boxes;
}

// =========================================
// HERO
// =========================================

function HeroSection() {

  return (
    <section className="relative min-h-[58vh] border-b border-white/5 overflow-hidden bg-black flex flex-col">

      {/* BACKGROUND */}

      <div className="absolute inset-0">

        <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />

      </div>

      {/* HEADER */}

      <header className="relative z-20 border-b border-white/5">

        <div className="container mx-auto px-6 h-[76px] flex items-center justify-between">

          <div className="flex items-center gap-4">

            <Link
              to="/"
              className="w-11 h-11 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center hover:bg-white/[0.06] transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
            </Link>

            <div>

              <div className="text-white font-black tracking-tight text-lg">
                CloudIgnite Learn
              </div>

              <div className="text-[10px] uppercase tracking-[0.35em] text-slate-500 font-bold">
                Foundations
              </div>

            </div>

          </div>

          <div className="hidden lg:flex items-center gap-3">

            {[
              'Networking',
              'Databases',
              'System Design',
              'Operating Systems'
            ].map((item) => (

              <div
                key={item}
                className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-xs text-slate-400"
              >
                {item}
              </div>

            ))}

          </div>

        </div>

      </header>

      {/* HERO */}

      <div className="relative z-10 flex-1 flex items-center">

        <div className="container mx-auto px-6 py-16">

          <div className="max-w-5xl">

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs uppercase tracking-[0.25em] font-bold mb-8">

              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />

              Engineering Foundations

            </div>

            <h1 className="text-[54px] md:text-[88px] leading-[0.9] font-black tracking-tight mb-8">

              MASTER <br />

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-cyan-400">
                COMPUTER <br />
                SYSTEMS
              </span>

            </h1>

            <p className="max-w-3xl text-lg md:text-2xl text-slate-400 leading-relaxed">

              Learn how modern internet systems actually work.
              Explore networking, DNS, operating systems,
              databases, caching, containers, cloud infrastructure,
              backend engineering, and distributed systems.

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

// =========================================
// CARD
// =========================================

function FoundationCard({
  node,
  index
}: {
  node: TopicTreeNode;
  index: number;
}) {

  const topic = node.topic;

  const Icon = getTopicIcon(topic.slug);

  const children =
    node.children || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >

      <Link to={`/topic/${topic.path}`}>

        <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] hover:from-white/[0.07] hover:to-white/[0.03] transition-all duration-500 min-h-[460px]">

          {/* GLOW */}

          <div className="absolute top-[-80px] right-[-80px] w-[220px] h-[220px] bg-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* CONTENT */}

          <div className="relative z-10 p-9 flex flex-col h-full">

            {/* ICON */}

            <div className="w-16 h-16 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 flex items-center justify-center mb-10">

              <Icon className="w-8 h-8 text-indigo-400" />

            </div>

            {/* META */}

            <div className="flex items-center gap-3 mb-6 flex-wrap">

              <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] uppercase tracking-widest font-bold">
                {topic.category || 'Engineering'}
              </div>

              <div className="flex items-center gap-1 text-slate-500 text-xs font-semibold">
                <FolderTree className="w-3 h-3" />
                Level {topic.topic_level}
              </div>

            </div>

            {/* TITLE */}

            <h2 className="text-4xl font-black tracking-tight text-white mb-5 group-hover:text-indigo-300 transition-colors">

              {topic.title}

            </h2>

            {/* DESCRIPTION */}

            <p className="text-slate-400 leading-relaxed text-lg mb-10">

              {
                topic.short_description ||
                topic.hero_description ||
                'Explore engineering concepts.'
              }

            </p>

            {/* KEY TOPICS */}

            {children.length > 0 && (

              <div className="mb-10">

                <div className="text-[11px] uppercase tracking-[0.25em] text-slate-500 font-bold mb-5">

                  Key Topics

                </div>

                <div className="space-y-3">

                  {children.slice(0, 4).map((child) => (

                    <div
                      key={child.topic.id}
                      className="flex items-center gap-3 text-slate-300"
                    >

                      <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />

                      <span className="text-lg">
                        {child.topic.title}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            )}

            {/* FOOTER */}

            <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">

              <div className="text-indigo-400 text-sm uppercase tracking-[0.2em] font-bold">

                Explore Topic

              </div>

              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-indigo-500/30 transition-all">

                <ChevronRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />

              </div>

            </div>

          </div>

        </div>

      </Link>

    </motion.div>
  );
}

// =========================================
// SECTION
// =========================================

function FoundationsSection() {

  const [topics, setTopics] =
    useState<TopicTreeNode[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchTopics = async () => {

      try {

        const response = await axios.get(
          `${API_BASE}/api/topic-tree/foundations`
        );

        setTopics(
          response.data.tree?.children || []
        );

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

    fetchTopics();

  }, []);

  return (
    <section className="py-24 bg-[#02040a]">

      <div className="container mx-auto px-6">

        <div className="flex items-center justify-between mb-16 flex-wrap gap-6">

          <div>

            <div className="text-xs uppercase tracking-[0.3em] text-slate-500 font-bold mb-4">
              Knowledge Categories
            </div>

            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
              Foundations Tree
            </h2>

          </div>

          <div className="text-slate-500 text-sm max-w-md leading-relaxed">
            Start from fundamentals and navigate infinitely deep into engineering systems.
          </div>

        </div>

        {loading ? (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[460px] rounded-[32px] bg-white/[0.03] border border-white/10 animate-pulse"
              />
            ))}

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {topics.map((node, index) => (
              <FoundationCard
                key={node.topic.id}
                node={node}
                index={index}
              />
            ))}

          </div>

        )}

      </div>

    </section>
  );
}

// =========================================
// PAGE
// =========================================

export function Foundations() {

  useEffect(() => {

    document
      .getElementById('scroll-container')
      ?.scrollTo({
        top: 0,
        behavior: 'instant'
      });

  }, []);

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">

      <HeroSection />

      <FoundationsSection />

    </div>
  );
}