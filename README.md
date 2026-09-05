# personal-brand

Video content workspace for Rhayan's personal brand (training, transformation, business, lifestyle), built with [Remotion](https://www.remotion.dev) — programmatic video creation in React.

## Remotion Agent Skills

This repo has the official [Remotion Agent Skills](https://www.remotion.dev/docs/ai/skills) installed for Claude Code, vendored from [`remotion-dev/skills`](https://github.com/remotion-dev/skills) (pinned to Remotion `4.0.520`).

They live in `.agents/skills/`, with `.claude/skills` symlinked to it so Claude Code picks them up automatically. No Remotion project needs to exist yet for these to work — the `remotion-create` skill scaffolds one on demand.

Available skills:

| Skill | Use it for |
|---|---|
| `/remotion-best-practices` | Router — use when unsure which skill applies |
| `/remotion-create` | Scaffold a new project or composition |
| `/remotion-markup` | Compositions, animation, layout, typography, audio, fonts, timing |
| `/remotion-studio` | Launch the local preview |
| `/remotion-render` | Render to video/still |
| `/remotion-maps` | Map animations (Mapbox/MapLibre/CesiumJS) |
| `/remotion-captions` | Captions & subtitles |
| `/remotion-saas` | `<Player>`, Lambda/Vercel/Cloudflare rendering, app architecture |
| `/remotion-interactivity` | Make Studio edits write back to code |
| `/remotion-docs` | Search/fetch current Remotion docs |
| `/remotion-upgrade` | Upgrade Remotion, Mediabunny, and these skills |
| `/remotion-multimedia` | Video/audio metadata in the browser |

### Getting started

No video project exists in this repo yet. To create one, just ask Claude Code — e.g.:

```
/remotion-create Make a training-progress reel for my personal brand
```

This scaffolds the project (`npx create-video@latest`), and from there `/remotion-studio` previews it and `/remotion-render` exports it.

### Keeping skills up to date

Once a Remotion project exists here, run `/remotion-upgrade` (or `npx remotion skills update`) to pull the latest skill content and matching Remotion version.

### License

Remotion is free to use for individuals, including commercial use — see the [License FAQ](https://www.remotion.dev/docs/license/faq). A paid Company License is only required for for-profit orgs above ~3 employees.
