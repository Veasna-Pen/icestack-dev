export type RoadmapId =
  'web-developer' | 'frontend-developer' | 'backend-developer' | 'mobile-developer' | 'ux-ui-designer' | 'devops';

export interface RoadmapStage {
  id: string;
  related: string[];
}

export interface Roadmap {
  id: RoadmapId;
  stages: RoadmapStage[];
}

export interface RoadmapSkill {
  name: string;
  note: string;
}

export interface RoadmapStageCopy {
  title: string;
  goal: string;
  skills: RoadmapSkill[];
  decision: string;
  advice: string;
  project: string;
}
