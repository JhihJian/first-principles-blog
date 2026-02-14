export const siteConfig = {
  title: 'JhihJian',
  tagline: 'think from scratch, keep only what matters',
  url: 'https://jhihjian.com',
  author: 'JhihJian',
  description: 'A first-principles blog about systems, engineering, and clear thinking.',

  footer: {
    links: [
      { label: 'GitHub', url: 'https://github.com/jhihjian' },
      { label: 'Email', url: 'mailto:hi@jhihjian.com' },
    ],
  },

  explore: {
    enabled: true,
    sections: [
      {
        key: 'opensource',
        label: 'Open Source',
        icon: '◈',
        items: [
          { title: 'Redis Internals', desc: 'Memory database design philosophy and implementation details', count: '12 notes', status: 'active' },
          { title: 'SQLite Architecture', desc: 'How an embedded database handles SQL parsing and storage', count: '8 notes', status: 'active' },
          { title: 'Nginx Event Model', desc: 'Event-driven architecture in high-concurrency scenarios', count: '6 notes', status: 'done' },
          { title: 'LevelDB Storage Engine', desc: 'LSM Tree optimizations in production environments', count: '10 notes', status: 'done' },
        ],
      },
      {
        key: 'cs',
        label: 'Computer Science',
        icon: '△',
        items: [
          { title: 'Data Structures & Algorithms', desc: 'Core structures, their principles and typical applications', count: '15 notes', status: 'updating' },
          { title: 'Design Patterns', desc: 'Modern interpretations of the classic GoF patterns', count: '23 notes', status: 'done' },
          { title: 'Operating Systems', desc: 'Processes, memory management, and file systems', count: '12 notes', status: 'done' },
          { title: 'Computer Networks', desc: 'From physical layer to application layer protocols', count: '18 notes', status: 'done' },
        ],
      },
      {
        key: 'inspirations',
        label: 'Inspirations',
        icon: '✦',
        items: [
          { title: 'Dev Tools', desc: 'CLI tools and editor configurations for productivity', count: '24 items', status: '' },
          { title: 'Design Resources', desc: 'Color, typography, and UI design references', count: '36 items', status: '' },
          { title: 'Tech Blogs', desc: 'High-quality technical writing worth following', count: '18 links', status: '' },
          { title: 'Hidden Gems', desc: 'Niche but genuinely useful open source discoveries', count: '42 items', status: '' },
        ],
      },
      {
        key: 'projects',
        label: 'Projects',
        icon: '◉',
        items: [
          { title: 'KB-Engine', desc: 'Personal knowledge base system built on the file system', count: 'Rust', status: 'building' },
          { title: 'TinyKV', desc: 'Educational key-value store with persistence and transactions', count: 'Go', status: 'done' },
          { title: 'StaticGen', desc: 'Minimal static site generator with Markdown support', count: 'Python', status: 'done' },
        ],
      },
    ],
  },
};
