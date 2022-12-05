import fs from 'node:fs';
import path from 'node:path';
import { default as matter } from 'gray-matter';

fs.readdir('./_posts', (err, files) => {
    if (err) {
        return console.error('Read file error:', err);
    }
    console.log('Current directory filenames:');
    const posts = [];
    const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}/;
    files.forEach(filename => {
        const parsed = matter.read(`./_posts/${filename}`);
        const meta = parsed.data;
        const content = parsed.content.trim();
        const basename = path.basename(parsed.path, '.md');
        const item = { filepath: parsed.path, content, ...meta };
        if (DATE_PATTERN.test(filename)) {
            const [publishAt] = DATE_PATTERN.exec(filename);
            const slug = basename.replace(`${publishAt}-`, '');
            Object.assign(item, { kind: 'post', publishAt, slug });
        } else {
            Object.assign(item, { kind: 'page', slug: basename });
        }
        posts.push(item);
    });
    fs.writeFileSync('./public/posts.json', JSON.stringify(posts, null, 4));
    // console.log(posts);
})
