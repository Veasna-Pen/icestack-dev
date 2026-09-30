import type { SectionKey, StageId, TemplateSection } from '../types';
import { messages } from '../i18n/resources';

export const WORKFLOW: readonly StageId[] = [
  'problem',
  'context',
  'diagnose',
  'alternatives',
  'tradeoffs',
  'decision',
  'implement',
  'verify',
  'learn'
];

export const stageIndex = (id: StageId): number => WORKFLOW.indexOf(id) + 1;

type StageField = 'label' | 'short' | 'question' | 'output' | 'trap';

export const stageKey = <F extends StageField>(id: StageId, field: F) => `method.stages.${id}.${field}` as const;

export const TEMPLATE_SECTIONS: TemplateSection[] = [
  { key: 'context', stage: 'context' },
  { key: 'symptoms', stage: 'context' },
  { key: 'diagnose', stage: 'diagnose', aliases: ['diagnosis'] },
  { key: 'options', stage: 'alternatives', aliases: ['alternatives'] },
  { key: 'trade-offs', stage: 'tradeoffs' },
  { key: 'decision', stage: 'decision' },
  { key: 'implementation', stage: 'implement', aliases: ['implement'] },
  { key: 'verification', stage: 'verify', aliases: ['verify'] },
  { key: 'why', stage: 'learn' },
  { key: 'when-not-to-use', stage: 'learn' },
  { key: 'common-mistakes', stage: 'learn', aliases: ['mistakes'] }
];

type SectionField = 'heading' | 'hint';

export const sectionKey = <F extends SectionField>(key: SectionKey, field: F) =>
  `method.sections.${key}.${field}` as const;

export const englishHeading = (key: SectionKey): string => messages.en.method.sections[key].heading;

const normalizeHeading = (text: string): string => text.toLowerCase().replace(/[^\p{L}\p{M}\p{N}]+/gu, '');

const SECTION_LOOKUP = new Map<string, TemplateSection>();
TEMPLATE_SECTIONS.forEach(section => {
  [
    section.key,
    messages.en.method.sections[section.key].heading,
    messages.km.method.sections[section.key].heading,
    ...(section.aliases || [])
  ].forEach(label => SECTION_LOOKUP.set(normalizeHeading(label), section));
});

export const resolveSection = (headingText: string): TemplateSection | undefined =>
  SECTION_LOOKUP.get(normalizeHeading(headingText));

export const getSection = (key: string): TemplateSection | undefined => TEMPLATE_SECTIONS.find(s => s.key === key);
