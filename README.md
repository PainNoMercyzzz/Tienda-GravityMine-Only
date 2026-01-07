
# GravityMine - Guía de Despliegue en Vercel

Para que el sitio funcione correctamente en Vercel y no muestre una pantalla negra, sigue estos pasos:

1. Importa tu repositorio en **Vercel**.
2. Ve a la pestaña **Settings** > **Environment Variables**.
3. Añade una nueva variable:
   - **Key**: `API_KEY`
   - **Value**: `TU_GEMINI_API_KEY_AQUÍ`
4. Haz clic en **Add** y luego realiza un **Redeploy** de tu proyecto.

La aplicación detectará la llave y cargará el contenido correctamente.
