# personal-brand

Video content workspace for Rhayan's personal brand (training, transformation, business, lifestyle), built with [Remotion](https://www.remotion.dev) — programmatic video creation in React.

## Adding scenes

Drop your raw clips/images into `public/` (see `public/README.md`), then ask Claude to build/update the composition — it sequences them into a video using the scenes skill.

## Commands

```bash
npm i              # install dependencies
npm run dev        # start the Studio preview
npx remotion render # render the final video
npm run upgrade    # upgrade Remotion
```

## Remotion Agent Skills

This repo has the official [Remotion Agent Skills](https://www.remotion.dev/docs/ai/skills) installed for Claude Code, vendored from [`remotion-dev/skills`](https://github.com/remotion-dev/skills) (pinned to Remotion `4.0.520`).

They live in `.agents/skills/`, with `.claude/skills` symlinked to it so Claude Code picks them up automatically.

| Skill | Use it for |
|---|---|
| `/remotion-best-practices` | Router — use when unsure which skill applies |
| `/remotion-create` | Scaffold a project or composition |
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

### Keeping skills up to date

Run `/remotion-upgrade` (or `npx remotion skills update`) to pull the latest skill content and matching Remotion version.

### License

Remotion is free to use for individuals, including commercial use — see the [License FAQ](https://www.remotion.dev/docs/license/faq). A paid Company License is only required for for-profit orgs above ~3 employees.
