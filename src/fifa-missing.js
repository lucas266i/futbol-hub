// Federaciones que faltaban en la primera carga del directorio.
// La pertenencia se contrasta con el directorio oficial de FIFA.
export const missingFifaMembers = [
  ["Arabia Saudí","AFC","https://www.saff.com.sa/","SAU"],
  ["Bután","AFC","https://www.bhutanfootball.org/","BHU"],
  ["Chad","CAF","https://www.ftfa.td/","CHA"],
  ["Guinea Ecuatorial","CAF","https://www.feguifut.com/","EQG"],
  ["Guam","AFC","https://guamfa.org/","GUM"],
  ["Islas Feroe","UEFA","https://www.fsf.fo/","FRO"],
  ["Mali","CAF","https://www.femafoot.ml/","MLI"],
  ["Macedonia del Norte","UEFA","https://ffm.mk/","MKD"],
  ["RDP de Corea","AFC","https://www.kfa-dprk.com/","PRK"],
  ["República de Corea","AFC","https://www.kfa.or.kr/","KOR"],
  ["Sri Lanka","AFC","https://www.football.lk/","SRI"],
  ["Yibuti","CAF","https://www.fdf.dj/","DJI"]
].map(([country, confederation, website, code]) => ({
  country, confederation, website, code,
  name: `Federación de fútbol de ${country}`,
  continent: ({AFC:"Asia",CAF:"África",UEFA:"Europa"})[confederation],
  fifa: `https://inside.fifa.com/associations/${code.toLowerCase()}`
}));

// Estos territorios aparecen en la primera base, pero no forman parte
// de las 211 asociaciones miembro que muestra actualmente FIFA.
export const nonFifaEntries = new Set(["Guadalupe","Martinica","San Martín"]);
