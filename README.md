# Portafolio Angular

Este es mi portafolio profesional, construido con Angular 21. La idea era tener un lugar propio donde mostrar mis proyectos reales, mi perfil y los servicios que ofrezco, sin depender de plantillas genéricas ni plataformas de terceros.

## ¿Qué tiene hasta ahora?

La aplicación está estructurada como un SPA completo con varias páginas:

- **Inicio** — presentación general con servicios ofrecidos y proyectos destacados
- **Perfil de programador** — página pública con bio, tecnologías y proyectos
- **Proyectos** — listado completo con filtros por tipo (personal, académico, laboral)
- **Detalle de proyecto** — vista individual con descripción, tecnologías y link al repo
- **Contacto** — formulario de solicitud de servicios
- **Login y registro** — autenticación simulada con roles (programador / usuario)
- **Dashboard de programador** — gestión de solicitudes recibidas
- **Dashboard de usuario** — seguimiento de solicitudes enviadas

Los proyectos que aparecen son los reales de mi GitHub ([macobosf](https://github.com/macobosf)), no datos de relleno.

## Stack

- **Angular 21** — componentes standalone, signals, lazy loading, OnPush
- **TailwindCSS v4** + **DaisyUI v5** — para los estilos y componentes UI
- **TypeScript** en modo estricto
- **Reactive Forms** para los formularios

## Estructura del proyecto

```
src/
├── app/
│   ├── core/          # Servicios y datos mock
│   ├── pages/         # Páginas de la aplicación
│   └── shared/        # Componentes reutilizables (navbar, footer, cards)
└── styles.css
public/
└── assets/images/     # Foto de perfil y recursos estáticos
```

## Correr el proyecto localmente

```bash
pnpm install
pnpm start
```

Abre [http://localhost:4200](http://localhost:4200) en el navegador.

## Estado actual

El proyecto usa datos locales (mock) mientras no hay un backend conectado. La autenticación es simulada y permite probar los dos roles disponibles directamente desde la pantalla de login.

---

Hecho con Angular y muchas ganas de tener algo propio en internet.
