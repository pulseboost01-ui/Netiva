'use client';

const frameworks = [
  'Next.js', 'Tanstack Start', 'React Router', 'React', 'Vite', 'Svelte',
  'Nuxt', 'Angular', 'Astro', 'Remix', 'Bun', 'Laravel', '.NET', 'Electron',
  'Hydrogen', 'Vue', 'Eleventy', 'Ember', 'Express', 'Fresh', 'Gatsby',
  'htmx', 'Typescript', 'Meteor', 'Nest', 'Node', 'React Native', 'Redwood',
];

const platforms = [
  'Vercel', 'Netlify', 'Cloudflare', 'Deno Deploy', 'Forge', 'Azure', 'AWS', 'Google Cloud',
];

export function SanityFrameworks() {
  return (
    <section className="w-full bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl w-full px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Works where you work</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Query, mutate, and render Netiva content with Your framework <code className="bg-muted px-2 py-1 rounded text-sm">`${'your_favorite_framework'}`</code>
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-16">
            {frameworks.map((framework) => (
              <div
                key={framework}
                className="p-4 rounded-lg border bg-background hover:border-primary/50 transition-colors text-center"
              >
                <span className="text-sm font-medium">{framework}</span>
              </div>
            ))}
          </div>
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground mb-4">
              …or whichever one is coming next.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Our JavaScript client uses web standards to run anywhere
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              …and it comes in other flavors too.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4">
            {platforms.map((platform) => (
              <div
                key={platform}
                className="p-4 rounded-lg border bg-background hover:border-primary/50 transition-colors text-center"
              >
                <span className="text-sm font-medium">{platform}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            deploy content-driven apps and functions anywhere
          </p>
        </div>
      </div>
    </section>
  );
}
