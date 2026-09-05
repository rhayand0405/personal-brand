# Editor de videos verticales con Remotion

Pipeline para montar reels y TikToks en formato 1080x1920 a 30fps.
Editas un solo archivo de configuración y sale el mp4.

## Uso

```bash
npm install

# 1. Mete tus clips en public/scenes/
# 2. Lístalos en src/scenes.ts
# 3. Renderiza

npm run render        # -> out/final.mp4
npm run studio        # preview en vivo, con timeline
npm run thumbnail     # -> out/thumbnail.png (portada)
```

## El archivo que editas: `src/scenes.ts`

Cada escena es un objeto. El orden de la lista es el orden del video.

```ts
scenes: [
  {kind: 'video', src: 'gym-01.mp4', trimStart: 2, durationInSeconds: 3.5,
   hook: 'Día 1 de 90', caption: 'Empezamos en 94 kilos'},

  {kind: 'image', src: 'before.jpg', durationInSeconds: 2,
   caption: 'Foto del primer día'},

  {kind: 'title', durationInSeconds: 2.5, gradient: ['#0F0F0F', '#3A2E00'],
   hook: 'Sígueme\ny lo vemos\njuntos'},
]
```

| Campo | Qué hace |
|---|---|
| `kind` | `video`, `image` o `title` (tarjeta sin footage) |
| `src` | Nombre del archivo dentro de `public/scenes/` |
| `durationInSeconds` | Cuánto dura en pantalla. Si lo omites en un video, se usa el clip completo |
| `trimStart` | Segundos que se saltan del inicio del clip |
| `hook` | Línea grande arriba. Usa `\n` para cortar líneas a mano |
| `caption` | Subtítulo abajo, se ilumina palabra por palabra |
| `kenBurns` | Zoom lento. Activo por defecto en video e imagen |
| `volume` | Audio del clip, de 0 a 1 |
| `gradient` | Dos colores hex, solo para escenas `title` |

Ajustes globales en el mismo archivo: `handle` (la marca de agua),
`music` + `musicVolume`, `transition` (`fade`, `slide`, `wipe`, `none`),
`transitionFrames` y `showProgressBar`.

## Cómo se calcula la duración

`src/Root.tsx` mide cada escena antes de renderizar. Si un clip de video no
trae `durationInSeconds`, lee la duración real del archivo y le resta el
`trimStart`. Si el archivo falta o no se puede leer, usa 3 segundos en vez de
tumbar el render completo.

El total resta los frames que se comen las transiciones, porque
`TransitionSeries` solapa cada par de escenas.

## Tipografías

Inter y Anton viven en `public/fonts/`. Van dentro del repo a propósito: el
render no depende de la red ni de lo que tengas instalado, así sale igual en
cualquier máquina.

## Nota sobre este entorno

En un contenedor sin acceso al CDN de Remotion hay que apuntarle a un Chromium
ya instalado:

```bash
npx remotion render src/index.ts ShortVideo out/final.mp4 \
  --browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
```

En tu Mac no hace falta: `npm run render` se baja Chrome solo la primera vez.
