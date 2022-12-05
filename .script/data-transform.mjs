import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { default as matter } from 'gray-matter';

const POSTS_ROOT = './res/_markdown';

const DATASETS_ROOT = './res/_data';

fs.readdir(POSTS_ROOT, (err, files) => {
    if (err) {
        return console.error('Read file error:', err);
    }
    console.log('Transform markdown files...');
    const posts = [];
    const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}/;
    files.forEach(filename => {
        if (!/\.md$/.test(filename)) {
            return console.warn('Not a valid markdown file:', filename);
        }
        const parsed = matter.read(`${POSTS_ROOT}/${filename}`);
        const meta = parsed.data;
        const content = parsed.content.trim();
        const basename = path.basename(parsed.path, '.md');
        const item = { filepath: parsed.path, content, ...meta };
        if (DATE_PATTERN.test(filename)) {
            const [publishAt] = DATE_PATTERN.exec(filename);
            const slug = basename.replace(`${publishAt}-`, '');
            Object.assign(item, { slug, publishAt, kind: 'post', source: 'markdown' });
        } else {
            Object.assign(item, { kind: 'page', source: 'markdown', slug: basename });
        }
        posts.push(item);
    });
    fs.writeFileSync('./public/assets/posts.json', JSON.stringify(posts));
});

fs.readdir(DATASETS_ROOT, (err, files) => {
    if (err) {
        return console.error('Read file error:', err);
    }
    console.log('Transform dataset files...');
    files.forEach(filename => {
        if (!/\.yaml$/.test(filename)) {
            return console.warn('Not a valid yaml file:', filename);
        }
        const data = fs.readFileSync(`${DATASETS_ROOT}/${filename}`, 'utf8');
        yaml.loadAll(data, (doc) => {
            fs.writeFileSync(`./public/assets/${path.basename(filename, '.yaml')}.json`, JSON.stringify(doc));
        });
    });
});