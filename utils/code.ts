import type { ShikiTransformer } from 'shiki';

/** Drops the theme background so `surface.code` shows through. Shared by build and runtime highlighting. */
export const dropThemeBackground: ShikiTransformer = {
  name: 'icestack:code-surface',
  pre(node) {
    delete node.properties.style;
  }
};
