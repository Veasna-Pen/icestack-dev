import type { Roadmap, RoadmapId } from '../types';

export const ROADMAPS: readonly Roadmap[] = [
  {
    id: 'web-developer',
    stages: [
      { id: 'how-the-web-works', related: [] },
      { id: 'html-css', related: [] },
      { id: 'javascript', related: [] },
      { id: 'frontend-framework', related: ['tradeoffs/client-side-vs-server-side-rendering'] },
      {
        id: 'backend-and-data',
        related: [
          'tradeoffs/jwt-vs-session-tokens',
          'problems/n-plus-one-queries',
          'problems/cors-errors-in-production'
        ]
      },
      { id: 'ship-it', related: ['patterns/health-check', 'problems/slow-first-request'] }
    ]
  },
  {
    id: 'frontend-developer',
    stages: [
      { id: 'foundations', related: [] },
      { id: 'javascript-deep', related: [] },
      { id: 'framework', related: ['implementations/nextjs'] },
      {
        id: 'data-fetching',
        related: ['problems/cors-errors-in-production', 'problems/pagination-performance', 'patterns/caching']
      },
      {
        id: 'rendering-performance',
        related: ['tradeoffs/client-side-vs-server-side-rendering', 'problems/slow-first-request']
      },
      { id: 'testing-shipping', related: ['patterns/feature-flags'] }
    ]
  },
  {
    id: 'backend-developer',
    stages: [
      { id: 'language', related: ['implementations/nodejs', 'implementations/python', 'implementations/golang'] },
      { id: 'http-apis', related: ['patterns/idempotency', 'patterns/rate-limiting'] },
      {
        id: 'databases',
        related: ['problems/database-is-slow', 'problems/n-plus-one-queries', 'problems/database-deadlocks']
      },
      { id: 'auth-security', related: ['tradeoffs/jwt-vs-session-tokens', 'problems/jwt-revocation'] },
      {
        id: 'caching-async',
        related: ['problems/should-i-use-redis', 'patterns/caching', 'patterns/retry', 'problems/should-i-use-kafka']
      },
      {
        id: 'production',
        related: [
          'tradeoffs/monolith-vs-microservices',
          'patterns/graceful-shutdown',
          'problems/running-out-of-connections'
        ]
      }
    ]
  },
  {
    id: 'mobile-developer',
    stages: [
      { id: 'programming-basics', related: [] },
      { id: 'choose-approach', related: [] },
      { id: 'screens', related: [] },
      { id: 'state-data', related: ['patterns/retry', 'patterns/caching', 'tradeoffs/eventual-vs-strong-consistency'] },
      { id: 'device-features', related: ['problems/slow-file-uploads'] },
      { id: 'publish', related: ['patterns/feature-flags'] }
    ]
  },
  {
    id: 'ux-ui-designer',
    stages: [
      { id: 'ux-foundations', related: [] },
      { id: 'flows-wireframes', related: [] },
      { id: 'visual-design', related: [] },
      { id: 'prototyping', related: [] },
      { id: 'accessibility-systems', related: [] },
      { id: 'testing-handoff', related: ['patterns/feature-flags'] }
    ]
  },
  {
    id: 'devops',
    stages: [
      { id: 'linux-networking', related: [] },
      { id: 'scripting-git', related: [] },
      { id: 'containers', related: ['patterns/health-check', 'patterns/sidecar'] },
      { id: 'ci-cd', related: ['patterns/feature-flags', 'patterns/graceful-shutdown'] },
      {
        id: 'cloud-iac',
        related: ['tradeoffs/horizontal-vs-vertical-scaling', 'tradeoffs/edge-computing-vs-centralized-cloud']
      },
      {
        id: 'observability',
        related: ['problems/database-disk-full', 'problems/memory-leak-in-production', 'patterns/circuit-breaker']
      }
    ]
  }
];

export const ROADMAP_IDS: readonly RoadmapId[] = ROADMAPS.map(roadmap => roadmap.id);

export const isRoadmapId = (value: string | undefined): value is RoadmapId =>
  !!value && ROADMAP_IDS.includes(value as RoadmapId);

export const getRoadmap = (id: RoadmapId): Roadmap => ROADMAPS.find(roadmap => roadmap.id === id)!;
