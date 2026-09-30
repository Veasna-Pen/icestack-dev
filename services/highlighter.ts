import type { HighlighterCore } from 'shiki/core';
import { CODE_THEME, PLAIN_LANGUAGE } from '../constants/code';
import { dropThemeBackground } from '../utils/code';

let highlighter: Promise<HighlighterCore> | undefined;

const loadHighlighter = (): Promise<HighlighterCore> =>
  (highlighter ??= (async () => {
    const [{ createHighlighterCore }, { createJavaScriptRegexEngine }, { bundledThemes }] = await Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
      import('shiki/themes')
    ]);
    return createHighlighterCore({
      themes: [bundledThemes[CODE_THEME]],
      langs: [],
      // Forgiving: a grammar pattern the JS engine cannot compile degrades that token instead of throwing.
      engine: createJavaScriptRegexEngine({ forgiving: true })
    });
  })());

/** Returns Shiki's HTML. Tokens are text-escaped, so it is safe for untrusted input. */
export const highlightCode = async (code: string, language?: string): Promise<string> => {
  const [instance, { bundledLanguages }] = await Promise.all([loadHighlighter(), import('shiki/langs')]);

  // hasOwn, not `in`: the language name can come from an AI answer, and `'constructor' in {}` is true.
  const requested = language?.toLowerCase();
  const lang = requested && Object.hasOwn(bundledLanguages, requested) ? requested : PLAIN_LANGUAGE;

  if (lang !== PLAIN_LANGUAGE && !instance.getLoadedLanguages().includes(lang)) {
    await instance.loadLanguage(bundledLanguages[lang as keyof typeof bundledLanguages]);
  }

  return instance.codeToHtml(code, { lang, theme: CODE_THEME, transformers: [dropThemeBackground] });
};
