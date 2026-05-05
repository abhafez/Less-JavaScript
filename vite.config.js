import {readdirSync, readFileSync} from 'fs';
import {join} from 'path';
import {defineConfig} from 'vite';

const THEME_SCRIPT = `<script>const t=localStorage.theme;document.documentElement.dataset.theme=t||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')</script>`;

const THEME_BUTTON = `<button id="theme-toggle" aria-label="Toggle theme">
      <svg class="icon-moon" viewBox="0 0 16 16" fill="currentColor"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/></svg>
      <svg class="icon-sun" viewBox="0 0 16 16" fill="currentColor"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/></svg>
    </button>`;

const THEME_MODULE = `<script type="module" src="/src/theme.js"></script>`;

function themePlugin() {
    return {
        name: 'theme',
        transformIndexHtml: {
            order: 'pre',
            handler(html, ctx) {
                if (!ctx.filename.includes('src/less-javascript')) return html;
                return html
                    .replace('</head>', `  ${THEME_SCRIPT}\n  </head>`)
                    .replace(/(<body[^>]*>)/, `$1\n    ${THEME_BUTTON}\n`)
                    .replace('</body>', `    ${THEME_MODULE}\n  </body>`);
            },
        },
    };
}

function demosPlugin() {
    return {
        name: 'demos',
        transformIndexHtml(html) {
            const dir = join(process.cwd(), 'src/less-javascript');
            const cards = readdirSync(dir, {withFileTypes: true})
                .filter((e) => e.isDirectory())
                .map((e) => {
                    const file = join(dir, e.name, `${e.name}.html`);
                    const src = readFileSync(file, 'utf-8');
                    const title = src.match(/<title>(.+?)(?:\s*—[^<]*)?\s*<\/title>/i)?.[1] ?? e.name;
                    const desc = src.match(/<meta\s+name="description"\s+content="([^"]+)"/i)?.[1] ?? '';
                    const href = `/src/less-javascript/${e.name}/${e.name}.html`;
                    return `
                            <a href="${href}" class="demo-card">
                              <span class="demo-card__title">${title}</span>
                              <span class="demo-card__desc">${desc}</span>
                              <span class="demo-card__arrow">→</span>
                            </a>
                    `;
                })
                .join('');

            return html.replace(/(<section id="demos">)[\s\S]*?(<\/section>)/, `$1${cards}\n      $2`);
        },
    };
}

export default defineConfig({
    plugins: [themePlugin(), demosPlugin()],
});
