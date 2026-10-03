# Fútbol Hub

Mini-directorio web de enlaces oficiales del fútbol internacional.

## Estado

- 211 asociaciones miembro de FIFA como objetivo de la base.
- 6 confederaciones continentales.
- Buscador y filtros.
- Enlaces oficiales y perfiles FIFA.
- Diseño responsive.
- Sitio estático, sin backend.
- Publicación mediante GitHub Pages + GitHub Actions.

FIFA confirma actualmente 211 asociaciones miembro en seis continentes: https://inside.fifa.com/es/associations

## Arquitectura reutilizable

El proyecto está pensado como plantilla para otros directorios web.

```text
src/
├── app-fixed.js          # motor de presentación e interacción
├── styles.css            # sistema visual
├── data.js               # datos específicos del directorio
├── fifa-missing.js       # complementos/verificación del caso FIFA
└── directory-config.js   # configuración reutilizable
```

Para crear otro directorio, conserva el motor y sustituye la configuración y los datos.

Campos recomendados:

- id
- name
- official_name
- country
- country_code
- region
- category
- subcategory
- organization
- website
- source_url
- description
- status
- last_verified

## Publicación

GitHub Pages puede publicar directamente el sitio estático mediante GitHub Actions.

Repositorio: https://github.com/lucas266i/futbol-hub
