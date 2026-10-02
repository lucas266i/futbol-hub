import "./styles.css";
import { confederations, federations } from "./data.js";

const app = document.querySelector("#app");
const state = { search: "", continent: "Todos" };

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));

function render() {
  const filtered = federations
    .filter(x => state.continent === "Todos" || x.continent === state.continent)
    .filter(x => (x.country + " " + x.name).toLowerCase().includes(state.search.toLowerCase()))
    .sort((a,b)=>a.country.localeCompare(b.country,"es"));

  app.innerHTML = `
  <div class="shell">
    <aside class="sidebar">
      <div class="brand"><div class="ball">⚽</div><div><strong>FÚTBOL HUB</strong><span>DIRECTORIO MUNDIAL</span></div></div>
      <nav>
        <button class="nav active" data-cont="Todos">⌂ <span>Inicio</span></button>
        <a class="nav link" href="https://www.fifa.com/" target="_blank" rel="noopener">FIFA ↗</a>
        ${confederations.map(c=>`<button class="nav" data-cont="${esc(c.region)}"><b>${esc(c.code)}</b><span>${esc(c.name)}</span></button>`).join("")}
      </nav>
      <div class="sidebar-foot">Una sola pasión.<br><b>Todos los países.</b></div>
    </aside>
    <main>
      <header class="hero">
        <div><p class="kicker">DIRECTORIO OFICIAL DE ENLACES</p><h1>Directorio Mundial del Fútbol</h1><p class="lead">Accede rápidamente a FIFA, confederaciones y federaciones nacionales.</p></div>
      </header>
      <section class="stats">
        <div><strong>211</strong><span>Asociaciones FIFA</span></div><div><strong>6</strong><span>Confederaciones</span></div><div><strong>1</strong><span>Federación mundial</span></div>
      </section>
      <section class="quick">${confederations.map(c=>`<a href="${c.url}" target="_blank" rel="noopener" class="quick-card"><b>${esc(c.code)}</b><span>${esc(c.region)}</span>↗</a>`).join("")}</section>
      <section class="toolbar">
        <input id="search" placeholder="Buscar país o federación…" value="${esc(state.search)}" />
        <select id="continent"><option>Todos</option>${confederations.map(c=>`<option ${state.continent===c.region?"selected":""}>${esc(c.region)}</option>`).join("")}</select>
        <div class="count">${filtered.length} resultados</div>
      </section>
      <section class="table-card">
        <div class="table-head"><span>PAÍS</span><span>FEDERACIÓN</span><span>CONFEDERACIÓN</span><span>SITIO</span></div>
        <div>${filtered.map(x=>`<div class="row">
          <div><strong>${esc(x.country)}</strong><small>${esc(x.code)}</small></div>
          <div>${esc(x.name)}</div>
          <div>${esc(x.confederation)}</div>
          <div class="actions">${x.website?`<a href="${x.website}" target="_blank" rel="noopener">Sitio oficial ↗</a>`:"—"}<a href="${x.fifa}" target="_blank" rel="noopener">FIFA ↗</a></div>
        </div>`).join("")}</div>
      </section>
      <footer>Fútbol Hub · directorio de enlaces oficiales · ${new Date().getFullYear()}</footer>
    </main>
  </div>`;

  document.querySelector("#search").addEventListener("input", e => { state.search=e.target.value; render(); });
  document.querySelector("#continent").addEventListener("change", e => { state.continent=e.target.value; render(); });
  document.querySelectorAll("[data-cont]").forEach(b=>b.addEventListener("click",()=>{state.continent=b.dataset.cont;render();}));
}

render();