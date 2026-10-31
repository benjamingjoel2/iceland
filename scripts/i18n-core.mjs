// Shared i18n tooling (string extraction + translated source generation) for the Next.js brand sites.
// Uses the repo's own `typescript` package to find user-visible strings in .ts/.tsx/.mjs files.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(path.join(process.cwd(), 'package.json'));
const ts = require('typescript');

// JSX attributes whose string values are never copy.
const SKIP_ATTRS = new Set(['className', 'class', 'id', 'key', 'src', 'srcSet', 'type', 'name', 'htmlFor', 'rel', 'target', 'role', 'method',
  'autoComplete', 'inputMode', 'd', 'viewBox', 'fill', 'stroke', 'transform', 'xmlns', 'sizes', 'loading', 'decoding', 'fetchPriority', 'as',
  'media', 'lang', 'hrefLang', 'dir', 'pattern', 'accept', 'enterKeyHint', 'strokeLinecap', 'strokeLinejoin', 'strokeWidth', 'preserveAspectRatio',
  'textAnchor', 'dominantBaseline', 'fontFamily', 'clipPath', 'mask', 'style', 'data-testid', 'property', 'charSet', 'encType', 'tabIndex', 'kind', 'srcLang']);
// Object property names whose string values are never copy.
const SKIP_PROPS = new Set(['className', 'slug', 'id', 'key', 'src', 'href', 'icon', 'image', 'images', 'gallery', 'video', 'poster', 'captions', 'type',
  'variant', 'tone', 'size', 'color', 'colour', 'bg', 'theme', 'priceCurrency', '@type', '@context', '@id', 'url', 'path', 'region', 'category',
  'destination', 'destinationSlug', 'loader', 'loaderFile', 'source', 'destination', 'hostname', 'protocol', 'format', 'locale', 'currency', 'code', 'symbol']);
const SKIP_CALLS = new Set(['cn', 'clsx', 'twMerge', 'cva', 'require', 'fetch', 'import', 'readFileSync', 'join', 'resolve', 'existsSync', 'readdirSync',
  'getElementById', 'querySelector', 'querySelectorAll', 'matchMedia', 'addEventListener', 'removeEventListener', 'setItem', 'getItem', 'removeItem',
  'log', 'warn', 'error', 'info', 'debug', 'split', 'replace', 'startsWith', 'endsWith', 'includes', 'indexOf', 'test', 'match', 'createElement',
  'setAttribute', 'getAttribute', 'dispatchEvent', 'CustomEvent', 'Intl', 'NumberFormat', 'DateTimeFormat', 'toLocaleString', 'toLocaleDateString',
  'localeCompare', 'useTranslations', 'getTranslations', 'notFound', 'Date', 'RegExp', 'URL', 'URLSearchParams', 'get', 'has', 'set', 'append']);

const isTailwindish = (s) => {
  const toks = s.trim().split(/\s+/);
  return toks.length > 0 && toks.every((t) => /^[a-z0-9!:\-\[\]\/#.%_()&>~=,@*+]+$/.test(t)) && toks.some((t) => /[-:\[]/.test(t));
};

/** Heuristic: does this string look like human-facing copy? */
export function isCandidate(s) {
  const t = s.trim();
  if (!t || !/\p{L}/u.test(t)) return false;
  if (/^(https?:|mailto:|tel:|\/|\.\/|\.\.\/|@\/|#|data:)/.test(t)) return false;
  if (/^[\w.-]+\.(png|jpe?g|webp|avif|svg|mp4|webm|vtt|css|json|mdx?|tsx?|js)$/i.test(t)) return false;
  if (isTailwindish(t)) return false;
  if (/^[a-z0-9_.:\-\/]+$/.test(t)) return false; // ids, slugs, keys, single lowercase words
  if (/^[A-Z0-9_]+$/.test(t) && t.length <= 4) return false; // short codes: USD, EN
  if (/^[a-z]+[A-Z][A-Za-z]*$/.test(t)) return false; // camelCase identifiers
  return true;
}

// Attributes / properties whose values are always copy, even single lowercase words (split giant headings).
const FORCE = new Set(['accent', 'lead', 'lines', 'titleLines', 'label', 'title', 'text', 'eyebrow', 'kicker', 'heading', 'caption', 'h', 'q', 'a', 'name', 'alt', 'aria-label', 'placeholder', 'intro', 'description']);
function forced(node) {
  let q = node.parent;
  for (let i = 0; i < 5 && q; i++) {
    if (ts.isJsxAttribute(q)) return FORCE.has(q.name.getText());
    if (ts.isPropertyAssignment(q)) return FORCE.has(q.name.getText().replace(/['"]/g, ''));
    if (ts.isCallExpression(q) || ts.isVariableDeclaration(q) || ts.isReturnStatement(q)) return false;
    q = q.parent;
  }
  return false;
}

const attrName = (n) => (ts.isJsxAttribute(n) ? n.name.getText() : null);

/** Classify a string-ish node: returns {kind:'skip'} or {kind:'copy'}. */
function context(node) {
  let p = node.parent;
  // JSX attribute value
  if (ts.isJsxAttribute(p)) return SKIP_ATTRS.has(attrName(p)) ? 'skip' : 'attr';
  if (ts.isJsxExpression(p) && ts.isJsxAttribute(p.parent)) return SKIP_ATTRS.has(attrName(p.parent)) ? 'skip' : 'attr';
  if (ts.isImportDeclaration(p) || ts.isExportDeclaration(p) || ts.isExternalModuleReference(p)) return 'skip';
  if (ts.isLiteralTypeNode(p)) return 'skip';
  if (ts.isExpressionStatement(p)) return 'skip'; // 'use client'
  if ((ts.isPropertyAssignment(p) || ts.isPropertyDeclaration(p)) && p.name === node) return 'skip'; // object key
  if (ts.isPropertyAssignment(p)) {
    const k = p.name.getText().replace(/['"]/g, '');
    if (SKIP_PROPS.has(k)) return 'skip';
  }
  if (ts.isElementAccessExpression(p) && p.argumentExpression === node) return 'skip';
  if (ts.isCaseClause(p)) return 'skip';
  if (ts.isBinaryExpression(p) && [ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken, ts.SyntaxKind.EqualsEqualsToken].includes(p.operatorToken.kind)) return 'compare';
  // walk up through arrays/conditionals to a call
  let q = p;
  for (let i = 0; i < 3 && q; i++) {
    if (ts.isCallExpression(q) || ts.isNewExpression(q)) {
      const e = q.expression;
      const name = ts.isIdentifier(e) ? e.text : ts.isPropertyAccessExpression(e) ? e.name.text : '';
      if (SKIP_CALLS.has(name)) return 'skip';
      break;
    }
    if (ts.isJsxAttribute(q) && SKIP_ATTRS.has(attrName(q))) return 'skip';
    q = q.parent;
  }
  return 'copy';
}

function templatePattern(node) {
  // `a ${x} b ${y}` -> "a {0} b {1}"
  let s = node.head.text;
  node.templateSpans.forEach((sp, i) => { s += `{${i}}` + sp.literal.text; });
  return s;
}

/** Walk a file and yield {node, text, kind} for strings. */
function* strings(sf) {
  const stack = [sf];
  while (stack.length) {
    const n = stack.pop();
    if (ts.isJsxText(n)) {
      const t = n.text;
      if (t.trim()) yield { node: n, kind: 'jsx', text: t.trim().replace(/\s+/g, ' ') };
    } else if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) {
      yield { node: n, kind: 'str', text: n.text, ctx: context(n) };
    } else if (ts.isTemplateExpression(n)) {
      yield { node: n, kind: 'tpl', text: templatePattern(n), ctx: context(n) };
    }
    n.forEachChild((c) => { stack.push(c); });
  }
}

export function parse(file) {
  const src = fs.readFileSync(file, 'utf8');
  const kind = /\.tsx$/.test(file) ? ts.ScriptKind.TSX : /\.jsx$/.test(file) ? ts.ScriptKind.JSX : /\.m?js$/.test(file) ? ts.ScriptKind.JS : ts.ScriptKind.TS;
  return ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, kind);
}

/** Extract candidate copy strings from files: Map text -> [{file, line}] */
export function extract(files) {
  const out = new Map();
  for (const f of files) {
    const sf = parse(f);
    for (const s of strings(sf)) {
      if (s.kind !== 'jsx' && s.ctx === 'skip') continue;
      const text = s.text;
      const probe = s.kind === 'tpl' ? text.replace(/\{\d+\}/g, '') : text;
      const force = s.kind === 'str' && /\p{L}/u.test(text) && !/^(https?:|\/|@\/|#)/.test(text) && !/[\/_]/.test(text) && forced(s.node);
      if (!isCandidate(probe) && !force) continue;
      const line = sf.getLineAndCharacterOfPosition(s.node.getStart()).line + 1;
      if (!out.has(text)) out.set(text, []);
      out.get(text).push(`${path.relative(process.cwd(), f)}:${line}`);
    }
  }
  return out;
}

const escJsx = (s) => s.replace(/[{}<>]/g, (c) => ({ '{': '&#123;', '}': '&#125;', '<': '&lt;', '>': '&gt;' }[c]));
const quote = (s, q) => q + s.replace(/\\/g, '\\\\').replace(new RegExp(q, 'g'), '\\' + q).replace(/\n/g, '\\n') + q;

/**
 * Translate a source file. opts: { dict, prefixRoute(str)->str|null, importRewrite(spec, file)->spec, special(text,node)->text|null }
 * Returns new source text.
 */
export function translateSource(file, opts) {
  const sf = parse(file);
  const src = sf.getFullText();
  const edits = [];
  const base = opts.dict;
  const fk = opts.fileKey ? opts.fileKey + '::' : null;
  const dict = new Proxy(base, { get: (t, k) => (fk && t[fk + k] != null ? t[fk + k] : t[k]) });
  // import specifiers
  sf.forEachChild(function visit(n) {
    if ((ts.isImportDeclaration(n) || ts.isExportDeclaration(n)) && n.moduleSpecifier && ts.isStringLiteral(n.moduleSpecifier)) {
      const spec = n.moduleSpecifier.text;
      const ns = opts.importRewrite ? opts.importRewrite(spec, file) : spec;
      if (ns !== spec) edits.push([n.moduleSpecifier.getStart(), n.moduleSpecifier.getEnd(), quote(ns, '"')]);
    }
    if (ts.isCallExpression(n) && n.expression.kind === ts.SyntaxKind.ImportKeyword && n.arguments[0] && ts.isStringLiteral(n.arguments[0])) {
      const spec = n.arguments[0].text; const ns = opts.importRewrite ? opts.importRewrite(spec, file) : spec;
      if (ns !== spec) edits.push([n.arguments[0].getStart(), n.arguments[0].getEnd(), quote(ns, '"')]);
    }
    n.forEachChild(visit);
  });
  // Whole arrays of short strings (split giant headings) can be translated as one phrase:
  // dict["classic|peninsula"] = "la péninsule|classique".
  const arrayRanges = [];
  (function visitArrays(n) {
    if (ts.isArrayLiteralExpression(n) && n.elements.length > 1 && n.elements.every((e) => ts.isStringLiteral(e))) {
      const key = n.elements.map((e) => e.text).join('|');
      const tr = dict[key];
      if (tr != null && tr !== key) {
        edits.push([n.getStart(), n.getEnd(), '[' + tr.split('|').map((x) => JSON.stringify(x)).join(', ') + ']']);
        arrayRanges.push([n.getStart(), n.getEnd()]);
      }
    }
    n.forEachChild(visitArrays);
  })(sf);
  const inArray = (node) => arrayRanges.some(([a, b]) => node.getStart() >= a && node.getEnd() <= b);
  for (const s of strings(sf)) {
    const n = s.node;
    if (inArray(n)) continue;
    if (s.kind === 'jsx') {
      const tr = dict[s.text];
      if (tr != null && tr !== s.text) {
        const raw = n.text; const lead = raw.match(/^\s*/)[0]; const trail = raw.match(/\s*$/)[0];
        const keepLead = lead.includes('\n') ? lead : lead ? ' ' : ''; const keepTrail = trail.includes('\n') ? trail : trail ? ' ' : '';
        edits.push([n.getStart(), n.getEnd(), keepLead + escJsx(tr) + keepTrail]);
      }
      continue;
    }
    if (ts.isImportDeclaration(n.parent) || ts.isExportDeclaration(n.parent) || ts.isLiteralTypeNode(n.parent)) continue;
    const special = opts.special ? opts.special(s.text, n, s) : null;
    if (special != null) { edits.push([n.getStart(), n.getEnd(), special]); continue; }
    if (n.parent && ts.isCallExpression(n.parent) && n.parent.expression.kind === ts.SyntaxKind.ImportKeyword) continue;
    // route prefixing (string or template head)
    if (s.kind === 'str') {
      const pr = opts.prefixRoute ? opts.prefixRoute(s.text, n, s.ctx) : null;
      if (pr != null) { edits.push([n.getStart(), n.getEnd(), quote(pr, '"')]); continue; }
    } else if (s.kind === 'tpl') {
      const head = n.head.text;
      const pr = opts.prefixRoute ? opts.prefixRoute(head, n, s.ctx, true) : null;
      if (pr != null) {
        // replace only the head text, keep the rest
        const start = n.head.getStart() + 1; // after backtick
        edits.push([start, start + n.head.getText().length - 3, pr.replace(/`/g, '\\`')]);
        continue;
      }
    }
    if (s.ctx === 'skip' || s.ctx === 'compare') {
      // compared strings are translated too when they are copy, to stay consistent with translated values
      if (s.ctx === 'skip') continue;
    }
    const tr = dict[s.text];
    if (tr == null || tr === s.text) continue;
    if (s.kind === 'str') {
      const q = n.getText()[0] === "'" ? "'" : n.getText()[0] === '`' ? '`' : '"';
      edits.push([n.getStart(), n.getEnd(), q === '`' ? '`' + tr.replace(/`/g, '\\`').replace(/\$\{/g, '\\${') + '`' : quote(tr, q)]);
    } else {
      // template: rebuild with translated pattern, keeping expressions by index
      const exprs = n.templateSpans.map((sp) => sp.expression.getText());
      const body = tr.replace(/`/g, '\\`').replace(/\$\{/g, '\\${').replace(/\{(\d+)\}/g, (_, i) => '${' + exprs[+i] + '}');
      edits.push([n.getStart(), n.getEnd(), '`' + body + '`']);
    }
  }
  edits.sort((a, b) => b[0] - a[0]);
  let out = src;
  let last = Infinity;
  for (const [a, b, t] of edits) {
    if (b > last) continue; // overlapping (nested) edit: keep the outer-most already applied
    out = out.slice(0, a) + t + out.slice(b);
    last = a;
  }
  return out;
}

export function walk(dir, filter = () => true, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!['node_modules', '.next', '.git'].includes(e.name)) walk(p, filter, acc); }
    else if (filter(p)) acc.push(p);
  }
  return acc;
}
