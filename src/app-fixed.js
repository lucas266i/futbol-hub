import { confederations, federations } from "./data.js";
import { missingFifaMembers, nonFifaEntries } from "./fifa-missing.js";
import { directoryConfig } from "./directory-config.js";

const app = document.querySelector("#app");
const state = { search: "", continent: "Todos" };
const FIFA_MEMBERS = directoryConfig.primarySource.url;
const FIFA_TOTAL = 211;
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
const allMembers = [...federations.filter(x => !nonFifaEntries.has(x.country)), ...missingFifaMembers]
  .filter((x,i,a)=>a.findIndex(y=>y.country===x.country)===i);

function fifaUrl(x) {
  return x.code && /^[A-Z]{3}$/.test(x.code) ? `https://inside.fifa.com/associations/${x.code}/organisation` : (x.fifa || FIFA_MEMBERS);
}

function goHome() {
  history.pushState({}, "", "./");
  state.search = "";
  state.continent = "Todos";
  render();
}

function profile(country) {
  const x = allMembers.find(m => m.country === country);
  if (!x) { goHome(); return; }
  const fifa = fifaUrl(x);
  app.innerHTML = `<div class="shell"><aside class="sidebar"><div class="brand"><div class="ball">⚽</div><div><strong>FÚTBOL HUB</strong><span>DIRECTORIO MUNDIAL</span></div></div><nav><button class="nav active" id="back">⌂ <span>Directorio</span></button><a class="nav link" href="https://www.fifa.com/" target="_blank" rel="noopener">FIFA ↗</a>${confederations.map(c=>`<a class="nav link" href="${c.url}" target="_blank" rel="noopener"><b>${esc(c.code)}</b><span>${esc(c.region)}</span></a>`).join("")}</nav><div class="sidebar-foot">Una sola pasión.<br><b>Todos los países.</b></div></aside><main><header class="hero"><p class="kicker">FICHA DE FEDERACIÓN</p><h1>${esc(x.country)}</h1><p class="lead">${esc(x.name)}</p></header><section class="profile-card"><div class="profile-top"><div class="profile-mark">⚽</div><div><p class="kicker">ASOCIACIÓN FIFA</p><h2>${esc(x.name)}</h2><p>${esc(x.country)} · ${esc(x.confederation)}${x.code ? ` · ${esc(x.code)}` : ""}</p></div></div><div class="profile-grid"><div><span>PAÍS / TERRITORIO</span><strong>${esc(x.country)}</strong></div><div><span>CONFEDERACIÓN</span><strong>${esc(x.confederation)}</strong></div><div><span>CÓDIGO FIFA</span><strong>${esc(x.code || "—")}</strong></div></div><div class="profile-actions">${x.website ? `<a class="primary-action" href="${x.website}" target="_blank" rel="noopener">Sitio oficial ↗</a>` : ""}<a class="secondary-action" href="${fifa}" target="_blank" rel="noopener">Perfil FIFA ↗</a><button class="secondary-action" id="back2">← Volver al directorio</button></div></section><footer>${directoryConfig.shortTitle} · ${allMembers.length}/${FIFA_TOTAL} miembros cargados · fuente maestra: FIFA · ${new Date().getFullYear()}</footer></main></div>`;
  document.querySelector("#back").addEventListener("click", goHome);
  document.querySelector("#back2").addEventListener("click", goHome);
}

function render() {
  const filtered = allMembers.filter(x => state.continent === "Todos" || x.continent === state.continent).filter(x => (x.country + " " + x.name).toLowerCase().includes(state.search.toLowerCase())).sort((a,b)=>a.country.localeCompare(b.country,"es"));
  const coverage = Math.min(100, Math.round(allMembers.length / FIFA_TOTAL * 100));
  app.innerHTML = `<div class="shell"><aside class="sidebar"><div class="brand"><div class="ball">⚽</div><div><strong>FÚTBOL HUB</strong><span>DIRECTORIO MUNDIAL</span></div></div><nav><button class="nav ${state.continent === "Todos" ? "active" : ""}" data-cont="Todos">⌂ <span>Inicio</span></button><a class="nav link" href="https://www.fifa.com/" target="_blank" rel="noopener">FIFA ↗</a>${confederations.map(c=>`<button class="nav ${state.continent === c.region ? "active" : ""}" data-cont="${esc(c.region)}"><b>${esc(c.code)}</b><span>${esc(c.region)}</span></button>`).join("")}</nav><div class="sidebar-foot">Una sola pasión.<br><b>Todos los países.</b></div></aside><main><header class="hero"><p class="kicker">DIRECTORIO OFICIAL DE ENLACES</p><h1>${directoryConfig.title}</h1><p class="lead">${esc(directoryConfig.description)}</p></header><section class="stats"><div><strong>${allMembers.length}</strong><span>Miembros cargados</span></div><div><strong>${confederations.length}</strong><span>Confederaciones</span></div><div><strong>${FIFA_TOTAL}</strong><span>Miembros FIFA oficiales</span></div></section><section class="quick">${confederations.map(c=>`<a href="${c.url}" target="_blank" rel="noopener" class="quick-card"><b>${esc(c.code)}</b><span>${esc(c.region)}</span>↗</a>`).join("")}</section><section class="sourcebar"><span>Fuente maestra: FIFA · Cobertura ${coverage}%</span><a href="${FIFA_MEMBERS}" target="_blank" rel="noopener">Ver directorio oficial ↗</a></section><section class="toolbar"><input id="search" placeholder="Buscar país o federación…" value="${esc(state.search)}" /><select id="continent"><option>Todos</option>${confederations.map(c=>`<option ${state.continent===c.region?"selected":""}>${esc(c.region)}</option>`).join("")}</select><div class="count">${filtered.length} resultados <button id="clear" class="clear">Limpiar</button></div></section><section class="table-card"><div class="table-head"><span>PAÍS</span><span>FEDERACIÓN</span><span>CONFEDERACIÓN</span><span>ENLACES</span></div><div>${filtered.map(x=>`<div class="row"><div><strong>${esc(x.country)}</strong><small>${esc(x.code || "Sin código")}</small></div><div>${esc(x.name)}</div><div>${esc(x.confederation)}</div><div class="actions">${x.website?`<a href="${x.website}" target="_blank" rel="noopener">Sitio oficial ↗</a>`:"—"}<a href="${fifaUrl(x)}" target="_blank" rel="noopener">FIFA ↗</a><a href="?country=${encodeURIComponent(x.country)}">Ficha</a></div></div>`).join("")}</div></section><footer>${directoryConfig.shortTitle} · ${allMembers.length}/${FIFA_TOTAL} miembros · directorio de enlaces oficiales · ${new Date().getFullYear()}</footer></main></div>`;
  document.querySelector("#search").addEventListener("input", e => { state.search=e.target.value; render(); });
  document.querySelector("#continent").addEventListener("change", e => { state.continent=e.target.value; render(); });
  document.querySelectorAll("[data-cont]").forEach(b=>b.addEventListener("click",()=>{state.continent=b.dataset.cont;render();}));
  document.querySelector("#clear").addEventListener("click",()=>{state.search="";state.continent="Todos";render();});
}

window.addEventListener("popstate", () => { const c = new URLSearchParams(location.search).get("country"); if (c) profile(c); else render(); });
const country = new URLSearchParams(location.search).get("country");
if (country) profile(country); else render();
