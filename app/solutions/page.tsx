import fs from 'fs';
import path from 'path';

export default function SolutionsPage() {
  const htmlPath = path.join(process.cwd(), 'app/solutions/full.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}