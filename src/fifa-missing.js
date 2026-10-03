// Complemento de la primera base: asociaciones que faltaban en la carga inicial.
// La lista maestra de pertenencia se contrasta con FIFA.
export const missingFifaMembers = [
  ["Arabia Saudí","AFC","https://www.saff.com.sa/","KSA","Saudi Arabian Football Federation"],
  ["Bután","AFC","https://www.bhutanfootball.org/","BHU","Bhutan Football Federation"],
  ["Chad","CAF","https://www.ftfa.td/","CHA","Fédération Tchadienne de Football"],
  ["Guinea Ecuatorial","CAF","https://www.feguifut.com/","EQG","Federación Ecuatoguineana de Fútbol"],
  ["Guam","AFC","https://www.guamfa.com/","GUM","Guam Football Association"],
  ["Islas Feroe","UEFA","https://www.fsf.fo/","FRO","The Faroe Islands Football Association"],
  ["Mali","CAF","https://www.femafoot.ml/","MLI","Fédération Malienne de Football"],
  ["Macedonia del Norte","UEFA","https://www.ffm.mk/","MKD","Football Federation of North Macedonia"],
  ["RDP de Corea","AFC","https://www.kfa-dprk.com/","PRK","DPR Korea Football Association"],
  ["República de Corea","AFC","https://www.kfa.or.kr/","KOR","Korea Football Association"],
  ["Sri Lanka","AFC","https://www.football.lk/","SRI","Football Federation of Sri Lanka"],
  ["Yibuti","CAF","https://www.fdf.dj/","DJI","Djibouti Football Federation"]
].map(([country, confederation, website, code, name]) => ({
  country, confederation, website, code, name,
  continent: ({AFC:"Asia",CAF:"África",UEFA:"Europa"})[confederation],
  fifa: `https://inside.fifa.com/associations/${code}`
}));

// Territorios que aparecían en la base inicial pero no forman parte
// de las 211 asociaciones miembro que FIFA muestra actualmente.
export const nonFifaEntries = new Set(["Guadalupe","Martinica","San Martín","Sint Maarten"]);
