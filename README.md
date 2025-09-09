# 🚀 Portafolio Dinámico de Desarrollador

Un portafolio web moderno y dinámico que detecta automáticamente tus habilidades y proyectos desde GitHub. Construido con React, TypeScript, Vite, TailwindCSS y Framer Motion.

## ✨ Características

- **🎯 Detección Automática de Habilidades**: Analiza tus repositorios de GitHub para detectar tecnologías y frameworks
- **📊 Proyectos Dinámicos**: Muestra tus repositorios públicos con filtros y búsqueda en tiempo real
- **🎨 Diseño Responsivo**: Interfaz moderna y minimalista que se adapta a todos los dispositivos
- **⚡ Animaciones Fluidas**: Transiciones elegantes con Framer Motion
- **🔍 SEO Optimizado**: Meta tags y structured data para mejor posicionamiento
- **🌐 PWA Ready**: Optimizado para rendimiento y experiencia de usuario

## 🛠️ Tecnologías

- **Frontend**: React 18, TypeScript, Vite
- **Estilos**: TailwindCSS, Framer Motion
- **Routing**: React Router v6
- **APIs**: Axios para GitHub API
- **SEO**: React Helmet Async
- **Iconos**: React Icons
- **Deploy**: GitHub Pages, Vercel

## 🚀 Configuración Rápida

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/porfolio.git
cd porfolio
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura las variables de entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Edita el archivo `.env` y agrega tu información:

```env
# REQUERIDO: Tu nombre de usuario de GitHub
VITE_GITHUB_USERNAME=tu-usuario-github

# OPCIONAL: Token de GitHub para mayor límite de API
VITE_GITHUB_TOKEN=ghp_tu_token_personal_aqui
```

### 4. Personaliza tu configuración

Edita el archivo `config.json` con tu información personal:

```json
{
  "name": "Tu Nombre",
  "role": "Tu Rol Profesional",
  "bio": "Tu biografía profesional",
  "location": "Tu Ciudad, País",
  "email": "tu.email@ejemplo.com",
  "social": {
    "github": "https://github.com/tu-usuario",
    "linkedin": "https://linkedin.com/in/tu-perfil",
    "twitter": "https://twitter.com/tu-usuario",
    "website": "https://tu-sitio-web.com"
  }
}
```

### 5. Ejecuta en desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 🏗️ Construcción y Deploy

### Construcción local

```bash
npm run build
```

Los archivos se generan en la carpeta `dist/`.

### Preview de producción

```bash
npm run preview
```

### Deploy en GitHub Pages

1. **Configuración del repositorio**:
   - Ve a Settings > Pages en tu repositorio
   - Selecciona "GitHub Actions" como source

2. **Variables de entorno**:
   - Ve a Settings > Secrets and variables > Actions
   - Agrega `VITE_GITHUB_USERNAME` con tu usuario de GitHub
   - Opcionalmente agrega `VITE_GITHUB_TOKEN` con un token personal

3. **Deploy automático**:
   - Cada push a `main` desplegará automáticamente
   - El workflow está en `.github/workflows/deploy.yml`

### Deploy en Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/porfolio)

1. Importa tu repositorio en Vercel
2. Agrega las variables de entorno en la configuración del proyecto
3. Deploy automático en cada push

## 🎨 Personalización

### Colores

Modifica los colores en `config.json`:

```json
{
  "primaryColor": "blue",
  "accentColor": "emerald"
}
```

Colores soportados: `blue`, `emerald`, `purple`, `red`, `yellow`, `green`.

### Estilos

Los estilos están en `src/styles.css` y `tailwind.config.cjs`. El tema está optimizado para modo oscuro con acentos de color configurables.

### Componentes

Los componentes están organizados en:

- `src/components/`: Componentes reutilizables
- `src/pages/`: Páginas de la aplicación
- `src/hooks/`: Custom hooks
- `src/utils/`: Utilidades y helpers

## 📊 Detección de Habilidades

El sistema analiza automáticamente:

- **Lenguajes principales** de cada repositorio
- **Distribución de código** por lenguaje
- **Topics y etiquetas** del repositorio
- **Palabras clave** en descripción y nombre
- **Actividad reciente** y popularidad

La puntuación se calcula considerando:
- Frecuencia de uso
- Recencia del proyecto
- Popularidad (stars, forks)
- Porcentaje de código en cada lenguaje

## 🔧 Configuración Avanzada

### Límites de API

Sin token: 60 requests/hora
Con token: 5000 requests/hora

Para obtener un token:
1. Ve a [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Genera un token con permisos de lectura de repositorios públicos
3. Agrega `VITE_GITHUB_TOKEN=tu_token` a tu `.env`

### Filtros de Repositorios

El sistema automáticamente excluye:
- Repositorios forkeados
- Repositorios archivados
- Repositorios deshabilitados
- Repositorios privados

### Cache y Performance

- Los datos se cargan una vez por sesión
- Las búsquedas están debounced (300ms)
- Las imágenes tienen lazy loading
- El bundle está optimizado con Vite

## 🚀 Futuras Mejoras

- [ ] **Blog integrado**: Markdown posts desde GitHub repos
- [ ] **Modo claro**: Toggle entre tema claro y oscuro
- [ ] **Internacionalización**: Soporte multi-idioma
- [ ] **Analytics**: Integración con Google Analytics
- [ ] **Backend**: Formulario de contacto funcional
- [ ] **CMS**: Panel de administración para contenido
- [ ] **API propia**: Cache de datos de GitHub
- [ ] **Métricas**: Dashboard de estadísticas

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Soporte

¿Necesitas ayuda? Puedes:

- Abrir un [issue](https://github.com/tu-usuario/porfolio/issues)
- Contactarme en [tu.email@ejemplo.com](mailto:tu.email@ejemplo.com)
- Seguirme en [Twitter](https://twitter.com/tu-usuario)

---

⭐ ¡No olvides dar una estrella si te gustó el proyecto!

Hecho con ❤️ y mucho ☕
