// Plantilla reutilizable para futuros directorios.
// Cambia estos valores y reutiliza el mismo motor visual.
export const directoryConfig = {
  id: "futbol-hub",
  title: "Directorio Mundial del Fútbol",
  shortTitle: "Fútbol Hub",
  description: "Directorio de enlaces oficiales de FIFA, confederaciones y federaciones.",
  primarySource: {
    name: "FIFA",
    url: "https://inside.fifa.com/es/associations"
  },
  fields: [
    "country",
    "code",
    "name",
    "confederation",
    "website",
    "fifa"
  ],
  features: [
    "search",
    "filters",
    "responsive",
    "official-links",
    "source-links"
  ]
};

// Para crear otro directorio, duplica este objeto y cambia solamente
// la configuración y el archivo de datos. El motor de presentación
// puede permanecer igual.
