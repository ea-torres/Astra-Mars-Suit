# CURIOSITY EVA · Helmet view

Simulación web de un traje EVA para Marte con HoloConnect AI y un parche que propone medir 3 analitos
(glucosa, lactato y un índice experimental de H₂O₂) en Alex, un astronauta ficticio.

## Estados
1. Normal. 2. Glucosa baja (pide autorización: glucagón o gel). 3. Sin respuesta (protocolo de emergencia preautorizado).
Además: alertas de lactato y H₂O₂, y tormenta de polvo.

## Archivos
- `config.js`: **datos editables** (reglas, escenarios, historial, perfil de Alex, paisaje).
- `index.html`, `style.css`: estructura y diseño.
- `app.js`: lógica (no hace falta tocarla para cambiar datos).

## Publicar en GitHub Pages
1. Sube los archivos a un repositorio (por ejemplo `curiosity-eva`).
2. Settings > Pages > Deploy from a branch > main > /(root) > Save.
3. Tu sitio queda en https://TU-USUARIO.github.io/curiosity-eva/
