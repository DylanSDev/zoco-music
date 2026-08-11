# 🎵 ZOCO Music

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Spotify API](https://img.shields.io/badge/Spotify_API-Integration-1DB954?logo=spotify&logoColor=white)](https://developer.spotify.com/documentation/web-api)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**ZOCO Music** es una aplicación web SPA (*Single Page Application*) inspirada en Spotify, desarrollada como parte de un desafío técnico de 48 horas. Está diseñada con una estética visual **Glassmorphism**, experiencia de usuario altamente fluida y navegación sin recargas de página.

---

## 📑 Tabla de Contenidos

- [Visión General y Objetivo](#-visión-general-y-objetivo)
- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura y Persistencia](#-arquitectura-y-persistencia)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Iniciativas y Extras](#-iniciativas-y-extras)
- [Deuda Técnica y Oportunidades de Mejora](#-deuda-técnica-y-oportunidades-de-mejora)
- [Autor](#%EF%B8%8F-autor)

---

## 🎯 Visión General y Objetivo

* **Meta principal:** Construir una SPA interactiva y moderna de streaming de música en menos de 48 horas.
* **Enfoque UX/UI:** Garantizar cero recargas visuales durante la reproducción de audio y navegación entre vistas, ofreciendo animaciones fluidas, estados de carga elegantes (*skeletons*) e interfaces responsivas (*Mobile First*).
* **Prototipado:** Basado en mockups previos diseñados en Figma.

---

## ✨ Características Principales

* **🔍 Buscador de Catálogo:** Búsqueda en tiempo real de canciones, artistas y álbumes consumiendo la API oficial de Spotify.
* **🎧 Reproductor Inferior Persistente:** Player global que se mantiene activo en toda la app sin interrumpir la música al navegar. Utiliza las `preview_url` (30 segundos de reproducción real de Spotify) con controles completos (*Play*, *Pause*, barra de progreso, pista anterior y siguiente).
* **👤 Detalle de Artistas y Álbumes:** Vistas específicas con discografía, listas de temas y métricas clave del artista.
* **⭐ Favoritos e Historial Reciente:** Guardado persistente de canciones preferidas y reproducciones recientes en el navegador.
* **🔒 Autenticación Simulada:** Módulo de Login para proteger vistas exclusivas y funciones del reproductor.
* **🎨 Glassmorphism & UI Responsive:** Interfaz moderna con fondos translúcidos, desenfoques dinámicos y adaptación cuidadosa a pantallas móviles y de escritorio.
* **🤖 Asistente Inteligente (Extra):** Bot de recomendaciones musicales integrado mediante Webhook a un flujo automatizado en **n8n**.

---

## 🛠️ Stack Tecnológico

| Tecnología | Descripción / Uso |
| :--- | :--- |
| **React 19** | Biblioteca principal para la creación de componentes declarativos en la SPA. |
| **Vite** | Bundler de nueva generación para desarrollo ultrarrápido y builds optimizados. |
| **Tailwind CSS** | Framework de estilos utilitarios para maquetado responsivo ágil. |
| **shadcn/ui** | Componentes UI accesibles, limpios y altamente personalizables. |
| **Zustand / Context API** | Gestor de estado global para mantener viva la música y el reproductor. |
| **Spotify Web API** | Fuente oficial de datos musicales (autenticación mediante *Client Credentials Flow*). |
| **LocalStorage API** | Almacenamiento local para favoritos e historial sin necesidad de backend. |

---

## 📐 Arquitectura y Persistencia

```text
zoco-music/
├── public/                # Assets estáticos y favicon
├── src/
│   ├── assets/            # Imágenes, íconos y recursos visuales
│   ├── components/        # Componentes UI reutilizables (Player, Navbar, Cards, Skeletons)
│   ├── context/           # Contextos / Stores (Audio Player State, Auth State)
│   ├── hooks/             # Custom Hooks (useSpotify, useLocalStorage, useAudio)
│   ├── services/          # Cliente API y helpers (Spotify Client Credentials, Axios/Fetch interceptors)
│   ├── views/             # Vistas de la SPA (Home, Search, ArtistDetail, AlbumDetail, Favorites)
│   ├── App.jsx            # Enrutamiento y layout principal
│   ├── main.jsx           # Punto de entrada de la aplicación
│   └── index.css          # Configuración global de estilos y efectos Glassmorphism
├── package.json           # Dependencias y scripts
└── vite.config.js         # Configuración de Vite
```

### Flujo de Datos y Estado Global
1. **Autenticación Spotify:** Interceptor de peticiones HTTP para gestionar la obtención y renovación automática del *Access Token* mediante *Client Credentials*.
2. **Reproductor Global:** El estado del reproductor (canción en reproducción, tiempo transcurrido, lista de reproducción y estado play/pause) reside en un store global que se mantiene montado independientemente de la vista activa.
3. **Persistencia Local:** Los datos de favoritos e historial se sincronizan reactivamente con el `localStorage` del cliente.

---

## 🚀 Instalación y Configuración

### Prerrequisitos
* Node.js versión **18.0.0** o superior.
* Gestor de paquetes `npm` o `yarn`.
* Credenciales de Desarrollador en [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/DylanSDev/zoco-music.git
   cd zoco-music
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto basándote en la siguiente estructura:
   ```env
   VITE_SPOTIFY_CLIENT_ID=tu_client_id_aqui
   VITE_SPOTIFY_CLIENT_SECRET=tu_client_secret_aqui
   VITE_N8N_WEBHOOK_URL=tu_webhook_n8n_aqui (Opcional)
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

5. **Comandos disponibles:**
   * `npm run dev` - Arranca el entorno de desarrollo con HMR.
   * `npm run build` - Compila la aplicación para producción en `/dist`.
   * `npm run preview` - Previsualiza localmente el build de producción.
   * `npm run lint` - Ejecuta el linter ESLint.



---

## 💡 Iniciativas y Extras

* **Bot de Recomendaciones n8n:** Integración de un asistente virtual vía Webhook conectado a un flujo de automatización en n8n para sugerir playlists y canciones personalizadas según el estado de ánimo o género seleccionado.

---

## 💬 Deuda Técnica y Oportunidades de Mejora

* **Migración a Next.js (App Router):** Implementar Server-Side Rendering (SSR) o Server Components para optimizar el indexado SEO y reducir la carga inicial del bundle.
* **Backend Dedicated & Base de Datos Real:** Sustituir la autenticación simulada y `localStorage` por un servicio backend (Node.js/Express o Supabase) con PostgreSQL para usuarios, sincronización multiplataforma y listas personalizadas.

---

## ✒️ Autor

Desarrollado con ❤️ por [**DylanSDev**](https://github.com/DylanSDev) para la prueba técnica de **ZOCO**.

