// ============================================================
// CONFIG.JS · Aquí editas los datos de CURIOSITY EVA sin tocar la lógica.
// Guarda y recarga la página (Ctrl+F5) para ver los cambios.
// ============================================================

// ---- PAISAJE (gráficos) ----
const SCENE={heading:15,sun:40,rocks:70,
  sky:["#76574d","#c68d68","#ecbf8f"],
  ridges:[["#bd8260",.09,.06,1,1,0],["#a2603f",.06,.14,1.6,4,.01],["#8a4a2f",.035,.3,2.4,9,.04]],
  ground:["#b3643a","#5a2917"],
  rock:["#3f1d11","#7a3f26"]};

// ---- MARCADORES AR (sin distancias). b: dirección en grados; k: color (w turquesa, s ámbar, h rojo); s: escenario ----
const M=[{b:70,n:"Dust front",k:"h",s:"dust"}];

// ---- REGLAS DEL PARCHE ----
// glu: aviso si baja de este valor; lacHi / h2Hi: límites; need: lecturas
// El índice de H₂O₂ es una escala experimental de la simulación, no una concentración ni un diagnóstico de daño.
const RULES={glu:70,lacHi:5,h2Hi:150,need:1};
// noise: variación de cada lectura; invalid: probabilidad de lectura inválida (se ignora); tick: ms entre lecturas
const ST={noise:{glu:2,lac:.2,h2o2:4},invalid:.15,tick:1500};
// Recuperación tras el tratamiento: glucosa objetivo y subida por lectura
const RC={target:90,glucagon:6,gel:3};
// [nombre, unidad, texto pequeño]
const LABELS={glu:["Glucose","mg/dL","alert if below 70"],lac:["Lactate","mmol/L","usual 2–5"],h2o2:["H₂O₂ index","idx","usual 120"]};

// ---- ESCENARIOS ----
// v: valores base; hist: historial que usa la tendencia; unresp: Alex no reacciona (protocolo de emergencia)
const SCEN={
nominal:{v:{glu:92,lac:3.4,h2o2:120},hist:"stable",dust:0},
gluc:{v:{glu:62,lac:3.8,h2o2:122},hist:"stable",dust:0},
crit:{v:{glu:41,lac:6.4,h2o2:165},hist:"drift",dust:0,unresp:true},
alerts:{v:{glu:88,lac:5.8,h2o2:160},hist:"drift",dust:0},
dust:{v:{glu:92,lac:3.4,h2o2:120},hist:"stable",dust:1,guide:"dust"}
};

// ---- BASE DE DATOS DE HoloConnect: promedio por EVA de las últimas 8 salidas ----
const HIST={stable:{lac:[3.3,3.4,3.2,3.5,3.3,3.4,3.3,3.4],h2o2:[119,121,120,120,122,119,121,120]},
            drift:{lac:[3.3,3.4,3.6,3.8,4.0,4.3,4.5,4.8],h2o2:[120,121,123,127,131,136,141,146]}};

// ---- PROTECCIÓN AUTOMÁTICA CONTRA POLVO [nombre, efecto] ----
const PROT=[["Visor dust shield","shield"],["Joint covers",""],["Sealed air filter",""]];

// ---- GUÍA HOLOGRÁFICA DE DESCONTAMINACIÓN ----
const GAUGE=`<path d="M70 70a34 34 0 0 1 60 0" fill="none" stroke="#ffb347" stroke-width="3"/><circle class="pulse" cx="100" cy="42" r="4" fill="#ffb347"/>`;
const GUIDES={
dust:{doneTitle:"Decontamination complete",doneMsg:"Dust load is back to normal. You can enter the airlock.",
 base:`<g fill="none" stroke="#5fe3d0" stroke-width="2" opacity=".85"><rect x="55" y="80" width="90" height="85" rx="22"/><rect x="58" y="22" width="16" height="68" rx="8"/><rect x="80" y="12" width="16" height="78" rx="8"/><rect x="102" y="16" width="16" height="74" rx="8"/><rect x="124" y="28" width="16" height="62" rx="8"/><path d="M58 130l-24-22 10-10 20 14"/></g><g fill="#c97a4a" opacity=".9"><circle cx="70" cy="60" r="3"/><circle cx="92" cy="50" r="2.5"/><circle cx="112" cy="70" r="3"/><circle cx="132" cy="58" r="2.5"/><circle cx="80" cy="120" r="3"/><circle cx="120" cy="135" r="3"/><circle cx="100" cy="105" r="2.5"/></g>`,
 steps:[["Let the suit blow it off","Hold your arms out. The suit releases an electrostatic pulse that lifts loose dust.",`<path class="pulse" d="M50 60l-18-12M150 60l18-12M40 120H18M160 120h22" stroke="#ffb347" stroke-width="3" fill="none" stroke-linecap="round"/>`],
 ["Brush the wrist seals","Use the airlock brush on the glove and wrist seals, where dust hides.",`<rect class="pulse" x="55" y="140" width="90" height="26" rx="6" fill="rgba(95,227,208,.25)" stroke="#5fe3d0" stroke-width="2"/>`],
 ["Check the dust sensor","Wait until your dust load reads under 10% in the visor.",GAUGE],
 ["Enter the airlock","The hologram marks the door. HoloConnect AI tells the habitat you are in.",`<rect class="pulse" x="70" y="40" width="60" height="100" rx="6" fill="none" stroke="#5fe3d0" stroke-width="3"/><path d="M100 40v100" stroke="#5fe3d0"/>`]]}
};
