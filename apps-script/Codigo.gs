/**
 * Sirve el formulario. Requiere un archivo HTML llamado "index" en este mismo
 * proyecto de Apps Script con el contenido de index.html.
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('ZomIA · Briefing comercial')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * doPost() no se incluye aquí a propósito: ya tienes uno desplegado y
 * funcionando en el endpoint que usa CONFIG.SERVER_ENDPOINT. Si algún día
 * unificas ambos en el mismo proyecto, este archivo es donde iría.
 *
 * El formulario envía un JSON con esta forma:
 *
 *   {
 *     empresa, contacto, telefono, email, localidad, web,
 *     servicios: [...], clientes: [...], objetivo: [...],
 *     zona_trabajo, zona_busqueda, marcas, frecuentes, diferencia,
 *     garantia, cliente_ideal, volumen, captacion, seguimiento,
 *     problemas, herramientas, promocionar, observaciones, material,
 *     submissionId,
 *     attachments: [{ name, type, base64 }]
 *   }
 *
 * Llega como text/plain, así que se lee con JSON.parse(e.postData.contents).
 * submissionId permite descartar duplicados si el usuario reenvía.
 */
