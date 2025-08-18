import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
});

// Custom renderer untuk styling yang konsisten
md.renderer.rules.heading_open = (tokens, idx) => {
  const token = tokens[idx];
  const level = token.tag;
  
  const baseClasses = "font-bold leading-tight";
  let sizeClasses = "";
  let colorClasses = "";
  let marginClasses = "";
  
  switch (level) {
    case 'h1':
      sizeClasses = "text-3xl tablet:text-4xl desktop:text-5xl";
      colorClasses = "bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700 dark:from-white dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent";
      marginClasses = "mb-8 mt-0";
      break;
    case 'h2':
      sizeClasses = "text-2xl tablet:text-3xl";
      colorClasses = "bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent";
      marginClasses = "mb-6 mt-12";
      break;
    case 'h3':
      sizeClasses = "text-xl tablet:text-2xl";
      colorClasses = "text-slate-800 dark:text-slate-200";
      marginClasses = "mb-4 mt-8";
      break;
    case 'h4':
      sizeClasses = "text-lg tablet:text-xl";
      colorClasses = "text-slate-700 dark:text-slate-300";
      marginClasses = "mb-3 mt-6";
      break;
    default:
      sizeClasses = "text-base tablet:text-lg";
      colorClasses = "text-slate-600 dark:text-slate-400";
      marginClasses = "mb-2 mt-4";
  }
  
  return `<${level} class="${baseClasses} ${sizeClasses} ${colorClasses} ${marginClasses}">`;
};

md.renderer.rules.paragraph_open = () => {
  return '<p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-base tablet:text-lg">';
};

md.renderer.rules.bullet_list_open = () => {
  return '<ul class="space-y-3 my-6">';
};

md.renderer.rules.list_item_open = () => {
  return '<li class="flex items-start gap-3"><div class="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mt-2.5 flex-shrink-0"></div><div class="flex-1">';
};

md.renderer.rules.list_item_close = () => {
  return '</div></li>';
};

md.renderer.rules.strong_open = () => {
  return '<strong class="font-semibold text-slate-800 dark:text-slate-200">';
};

md.renderer.rules.code_inline = (tokens, idx) => {
  const token = tokens[idx];
  return `<code class="px-2 py-1 text-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-md font-mono">${md.utils.escapeHtml(token.content)}</code>`;
};

md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  const lang = token.info.trim();
  const content = md.utils.escapeHtml(token.content);
  
  return `
    <div class="bg-slate-900 dark:bg-slate-950 rounded-xl p-6 my-8 border border-slate-700/50 overflow-x-auto">
      ${lang ? `<div class="text-xs text-slate-400 mb-2 font-medium uppercase tracking-wide">${lang}</div>` : ''}
      <pre class="text-sm text-slate-300"><code>${content}</code></pre>
    </div>
  `;
};

md.renderer.rules.blockquote_open = () => {
  return '<blockquote class="border-l-4 border-indigo-500 pl-6 my-6 italic text-slate-600 dark:text-slate-400">';
};

// Table rendering rules
md.renderer.rules.table_open = () => {
  return '<div class="overflow-x-auto my-8"><table class="min-w-full border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">';
};

md.renderer.rules.table_close = () => {
  return '</table></div>';
};

md.renderer.rules.thead_open = () => {
  return '<thead class="bg-slate-50 dark:bg-slate-800">';
};

md.renderer.rules.tbody_open = () => {
  return '<tbody class="divide-y divide-slate-200 dark:divide-slate-700">';
};

md.renderer.rules.tr_open = (tokens, idx) => {
  const isHeader = tokens.some((t, i) => i > idx && t.type === 'th_open' && i < tokens.findIndex((tok, j) => j > idx && tok.type === 'tr_close'));
  
  if (isHeader) {
    return '<tr>';
  } else {
    return '<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200">';
  }
};

md.renderer.rules.th_open = () => {
  return '<th class="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">';
};

md.renderer.rules.td_open = () => {
  return '<td class="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">';
};

export const renderMarkdown = (content: string): string => {
  return md.render(content);
};

export const renderMarkdownInline = (content: string): string => {
  return md.renderInline(content);
};
