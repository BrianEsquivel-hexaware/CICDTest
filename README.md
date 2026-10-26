# OrangeHRM: pruebas con Playwright

Proyecto de ejemplo para validar el formulario de acceso de OrangeHRM y ejecutar
las pruebas automáticamente con GitHub Actions.

## Pruebas incluidas

- El formulario muestra los campos y el botón de acceso.
- El acceso correcto lleva al Dashboard.
- Las credenciales inválidas muestran el mensaje de error.

Las pruebas usan selectores accesibles (`getByRole`) y no crean ni modifican
registros de negocio en el sitio.

## Ejecutar localmente

Requisitos: Node.js 20 o superior.

```powershell
npm ci
npx playwright install chromium
npm test
```

La configuración carga automáticamente las variables del archivo `.env` en la
raíz del proyecto. Copia `.env.example` como `.env` y ajusta sus valores para
usar otro sitio o credenciales. `.env` está excluido de Git; no subas
credenciales privadas al repositorio.

Para abrir el reporte HTML después de la ejecución:

```powershell
npm run report
```

Otros modos útiles:

```powershell
npm run test:headed
npm run test:ui
npm run test:debug
```

Por defecto, se usa el sitio demo y sus credenciales publicadas:
`Admin` / `admin123`. Para cambiarlas sin editar los tests, define
`ORANGEHRM_USERNAME`, `ORANGEHRM_PASSWORD` y, opcionalmente,
`ORANGEHRM_BASE_URL` en el entorno.

## Flujo de CI en GitHub

El workflow `.github/workflows/playwright.yml` ejecuta las pruebas cuando:

- Se hace `push` a `main` o `master`.
- Se abre o actualiza un Pull Request hacia `main` o `master`.
- Se inicia manualmente desde **Actions > Playwright tests > Run workflow**.
- Se activa la programación diaria, a las 12:00 UTC.

Para usar credenciales propias, configura `ORANGEHRM_USERNAME` y
`ORANGEHRM_PASSWORD` como **Actions secrets** del repositorio, y
`ORANGEHRM_BASE_URL` como **Actions variable** si se usará otro sitio.
Si no se configuran, los tests usan las credenciales públicas del demo y la URL
predeterminada del proyecto.

El reporte y los resultados de Playwright se publican como artefacto de cada
ejecución, incluso si algún test falla. En GitHub, se descargan desde el
resumen de la ejecución del workflow.

## Secuencia para ponerlo en marcha

1. Crear un repositorio en GitHub y subir este proyecto, incluyendo
   `package-lock.json`.
2. Confirmar que **Actions** esté habilitado en el repositorio.
3. Revisar o cambiar las credenciales y la URL en **Settings > Secrets and
   variables > Actions**.
4. Ejecutar `npm test` localmente para comprobar el acceso al sitio.
5. Hacer push a `main`/`master` o abrir un Pull Request; Actions ejecutará el
   workflow y mostrará el resultado y el artefacto del reporte.
6. Para ejecutarlo bajo demanda, usar **Actions > Playwright tests > Run
   workflow**.
7. Para ajustar la programación, editar la expresión `cron` del workflow. GitHub
   interpreta estos horarios en UTC y puede retrasar ejecuciones programadas.

## Siguientes pasos recomendados

- Si el flujo se adopta como protección de cambios, configurar una regla de
  protección de rama que requiera el job **End-to-end tests**.
- Añadir navegadores o dispositivos adicionales cuando el alcance de pruebas lo
  requiera; por ahora, CI instala solo Chromium.
- Usar un entorno de pruebas propio para mayor estabilidad: el sitio demo es
  externo, compartido y puede cambiar o no estar disponible.
- Si se necesita CD, definir primero el entorno y el proceso de despliegue;
  este ejemplo implementa CI y no despliega la aplicación.
