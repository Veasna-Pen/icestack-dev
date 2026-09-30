export type StageId =
  'problem' | 'context' | 'diagnose' | 'alternatives' | 'tradeoffs' | 'decision' | 'implement' | 'verify' | 'learn';

export type SectionKey =
  | 'context'
  | 'symptoms'
  | 'diagnose'
  | 'options'
  | 'trade-offs'
  | 'decision'
  | 'implementation'
  | 'verification'
  | 'why'
  | 'when-not-to-use'
  | 'common-mistakes';

export interface TemplateSection {
  key: SectionKey;
  stage: StageId;
  aliases?: string[];
}
