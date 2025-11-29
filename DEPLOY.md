# Guía de Instalación: Porra del Sanedrín (Temporada 2025/26)

¡Tu App está lista! Aquí tienes los pasos para instalarla en tu móvil.

## Novedades de esta versión
- **Temporada 2025/26**: Conectada a 1ª y 2ª División.
- **Actualización Automática**: Botones en "Admin" para descargar resultados de La Liga.
- **Champions League**: Se debe actualizar manualmente (aún no disponible en automático).
- **Persistencia**: Tus datos no se borran al cerrar la app.

## Paso 1: Subir el código a GitHub

Ese error aparece porque **el repositorio está vacío**. Tienes que subir los archivos primero.

### Opción A: Desde la web (Muy fácil)
1.  Ve a la página principal de tu repositorio (pestaña **Code**).
2.  Si está vacío, verás un enlace que dice **"uploading an existing file"**. Púlsalo.
3.  Arrastra **TODOS** los archivos y carpetas que hay DENTRO de `porra-sanedrin-app` (`index.html`, carpeta `css`, carpeta `js`, `manifest.json`, etc.) al navegador.
4.  Espera a que se carguen y pulsa el botón verde **"Commit changes"**.
5.  Ahora sí, ve al **Paso 2**.

### Opción B: Desde la terminal (Si tienes Git instalado)
Si prefieres usar comandos, abre la terminal en la carpeta `porra-sanedrin-app` y ejecuta:

```bash
git init
git add .
git commit -m "Subida inicial"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

## Paso 2: Activar GitHub Pages
2.  Ve a la pestaña **Settings** del repositorio.
3.  En el menú lateral, busca **Pages**.
4.  En "Source", elige `Deploy from a branch`, selecciona la rama `main` (o `master`) y la carpeta `/root`.
5.  Dale a **Save**.
6.  Espera unos minutos y GitHub te dará un link (ej: `https://tu-usuario.github.io/porra-sanedrin-app`).

## Paso 2: Instalar en el Móvil

Abre ese link en el navegador de tu móvil.

### En Android (Chrome)
1.  Abre el link en Chrome.
2.  Toca los **3 puntos** (menú) arriba a la derecha.
3.  Busca y toca **"Instalar aplicación"** o **"Añadir a pantalla de inicio"**.
4.  Confirma la instalación.
5.  ¡Listo! Aparecerá como una App más en tu menú.

### En iPhone (Safari)
1.  Abre el link en Safari.
2.  Toca el botón **Compartir** (cuadrado con flecha hacia arriba).
3.  Baja y busca **"Añadir a la pantalla de inicio"**.
4.  Dale a "Añadir".
5.  ¡Listo!

## Notas Importantes
- **Datos Locales**: Los datos se guardan en TU móvil. Si borras la caché del navegador, se pueden perder.
- **Admin**: Tú eres el administrador desde tu móvil. Usa el panel "Admin" para actualizar jornadas.dos deben introducir los resultados manualmente.
