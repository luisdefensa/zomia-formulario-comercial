# ZomIA · Formulario de briefing comercial

Formulario de captación de una sola página. El cliente lo rellena, los datos se
envían a Google Sheets mediante una Web App de Apps Script y se descarga un PDF
con el resumen.

Repositorio independiente de `zomia-briefing`.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La página completa: HTML, CSS, JS y logo. Sin dependencias externas salvo jsPDF, que se carga desde CDN solo al pulsar Enviar. |
| `apps-script/Codigo.gs` | `doGet()` mínimo para servir `index.html` desde Apps Script. Ver más abajo. |

## Cómo funciona

- **Borrador automático.** Lo escrito se guarda en IndexedDB y en localStorage
  (350 ms tras dejar de teclear). Al recargar, se restaura la copia más reciente
  de las dos.
- **Envío.** `POST` con `Content-Type: text/plain` y `mode: 'no-cors'` al
  endpoint de Apps Script. Es una petición simple, así que no hay preflight.
- **PDF.** Se genera en el navegador con jsPDF y se descarga automáticamente
  tras el envío.
- **Adjuntos.** Máximo 5 archivos, 8 MB por archivo, 20 MB en total. Se envían
  en base64 dentro del mismo JSON.

## Configuración

La única línea que hay que tocar está en `index.html`, dentro de `CONFIG`:

```js
SERVER_ENDPOINT: 'https://script.google.com/macros/s/AKfycb.../exec',
```

Debe ser la URL `/exec` de tu Web App de Apps Script desplegada con acceso
«Cualquier persona».

## Desplegar en Google Apps Script

Apps Script no sirve archivos `.html` sueltos: necesita una función `doGet()`.

1. En tu proyecto de Apps Script, crea un archivo HTML nuevo llamado `index`
   (menú **+ > HTML**). Apps Script le pone la extensión `.html` solo.
2. Pega dentro el contenido completo de `index.html`.
3. Crea o edita `Codigo.gs` con el contenido de `apps-script/Codigo.gs`.
4. **Implementar > Nueva implementación > Aplicación web**, ejecutar como tú,
   con acceso para «Cualquier persona».

### Dos avisos sobre este despliegue

**La descarga del PDF puede fallar.** Apps Script sirve la página dentro de un
iframe con `sandbox`. Si el sandbox de tu navegador no permite descargas,
`doc.save()` de jsPDF no hará nada visible. Pruébalo antes de darlo por bueno;
si falla, lo habitual es servir la página desde GitHub Pages o un hosting normal
y dejar Apps Script solo para recibir el `POST`.

**El envío no confirma nada.** Con `mode: 'no-cors'` el navegador no puede leer
la respuesta: el código espera 1,2 s y asume que fue bien. Si Apps Script falla
al guardar, el usuario verá igualmente «✅ Completado». Para saberlo de verdad
hay que devolver cabeceras CORS desde el servidor y quitar el `no-cors`.

## Alternativa: hosting estático

Si lo sirves desde GitHub Pages, Netlify o cualquier hosting, basta con subir
`index.html` tal cual. El `SERVER_ENDPOINT` sigue apuntando a Apps Script, que
en ese caso solo hace de backend.
