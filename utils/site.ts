import { REPO_BRANCH, REPO_URL } from '../constants/site';

export const repoFileUrl = (path: string): string => `${REPO_URL}/blob/${REPO_BRANCH}/${path}`;

export const repoEditUrl = (path: string): string => `${REPO_URL}/edit/${REPO_BRANCH}/${path}`;

export const repoNewFileUrl = (dir: string, filename: string): string =>
  `${REPO_URL}/new/${REPO_BRANCH}/${dir}?filename=${encodeURIComponent(filename)}`;

export const newIssueUrl = (template?: string): string =>
  template ? `${REPO_URL}/issues/new?template=${encodeURIComponent(template)}` : `${REPO_URL}/issues/new/choose`;

export const PROPOSE_TOPIC_URL = newIssueUrl('new-topic.yml');

export const CONTRIBUTING_URL = repoFileUrl('CONTRIBUTING.md');
export const TEMPLATE_URL = repoFileUrl('knowledge/TEMPLATE.md');
export const LESSON_TEMPLATE_URL = repoFileUrl('courses/TEMPLATE.md');
