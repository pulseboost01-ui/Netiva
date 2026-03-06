import fs from 'fs';
import path from 'path';

export default function Home() {
  // read the static HTML file containing the full markup
  const htmlPath = path.join(process.cwd(), 'app/home/full.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
