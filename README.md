# Portafolio Angular

Portafolio profesional construido con Angular 21, TailwindCSS y Firebase. Un SPA completo donde muestro mis proyectos reales, mi perfil como desarrollador y los servicios que ofrezco, con autenticación real y base de datos en tiempo real.

## Stack

| Tecnología | Versión | Uso |
|---|---|---|
| Angular | 21 | Framework principal |
| TypeScript | 5.9 | Lenguaje, modo estricto |
| TailwindCSS | v3 | Estilos utilitarios |
| DaisyUI | v3 | Componentes UI |
| Firebase Authentication | — | Login / registro de usuarios |
| Cloud Firestore | — | Base de datos en tiempo real |
| @angular/fire | v20 | Integración Angular + Firebase |
| pnpm | 10 | Gestor de paquetes |

## Páginas

- **Inicio** — presentación general con servicios y proyectos destacados
- **Perfil de programador** — bio pública, tecnologías, proyectos y links
- **Proyectos** — listado completo con filtro por tipo (personal, académico, laboral)
- **Detalle de proyecto** — descripción, tecnologías y link al repositorio
- **Login** — autenticación con email/contraseña o Google; redirige según rol
- **Registro** — crea cuenta en Firebase Auth y perfil en Firestore
- **Solicitud de contacto** — formulario protegido que guarda en Firestore
- **Dashboard programador** — gestión de solicitudes en tiempo real, cambio de estado y observaciones
- **Dashboard usuario** — seguimiento de solicitudes enviadas en tiempo real

Los proyectos que aparecen son los reales de mi GitHub ([macobosf](https://github.com/macobosf)).

## Arquitectura

```
src/
├── environments/
│   ├── environment.ts          # Config Firebase (desarrollo)
│   └── environment.prod.ts     # Config Firebase (producción)
├── app/
│   ├── core/
│   │   ├── auth.service.ts     # Firebase Auth con signals
│   │   ├── firestore.service.ts# CRUD Cloud Firestore
│   │   ├── auth.guard.ts       # Guards: authGuard, programmerGuard
│   │   ├── auth-mock.service.ts# Servicio mock (referencia)
│   │   └── mock-data.ts        # Interfaces y datos estáticos
│   ├── pages/
│   │   ├── home/
│   │   ├── programmer-profile/
│   │   ├── projects/
│   │   ├── project-detail/
│   │   ├── login/
│   │   ├── register/
│   │   ├── contact-request/
│   │   ├── dashboard-programmer/
│   │   └── dashboard-user/
│   └── shared/
│       └── components/         # navbar, footer, cards, badges
└── styles.css
```

## Autenticación y roles

| Rol | Acceso |
|---|---|
| **Programador** | Dashboard con todas las solicitudes recibidas + gestión de estado |
| **Usuario** | Formulario de solicitud + seguimiento de sus solicitudes |
| **Visitante** | Páginas públicas (home, perfil, proyectos) |

La detección del rol programador se hace consultando la colección `programadores` en Firestore por email al iniciar sesión. Los guards `authGuard` y `programmerGuard` esperan a que se resuelva el estado de autenticación antes de decidir la navegación (usando `toObservable` sobre el signal `isLoading`).

## Firestore — Colecciones

### `solicitudes`
```ts
{
  uid: string;              // UID del usuario que envía
  nombreSolicitante: string;
  correo: string;
  descripcion: string;
  programadorId: string;    // ID del programador destinatario
  programadorEmail: string; // Para las reglas de seguridad
  fechaCreacion: string;    // YYYY-MM-DD
  estado: 'Pendiente' | 'Respondida';
  observacion: string;
}
```

### `usuarios`
```ts
{
  uid: string;
  nombre: string;
  email: string;
  rol: 'usuario';
  createdAt: string;
}
```

### `programadores`
```ts
{
  id: string;     // '1', '2', ...
  nombre: string;
  email: string;
}
```

> Esta colección debe crearse manualmente en Firebase Console para que el sistema de roles funcione.

## Reglas de seguridad Firestore

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    match /solicitudes/{solicitudId} {
      allow create: if request.auth != null;
      allow read, update: if request.auth != null &&
        (resource.data.uid == request.auth.uid ||
         resource.data.programadorEmail == request.auth.token.email);
    }
    match /programadores/{docId} {
      allow read: if request.auth != null;
    }
  }
}
```

## Correr el proyecto localmente

```bash
pnpm install
pnpm start
```

Abre [http://localhost:4200](http://localhost:4200).

## Build de producción

```bash
pnpm build
```

El build reemplaza automáticamente `environment.ts` por `environment.prod.ts`.

## Patrones de Angular utilizados

- **Signals** (`signal`, `computed`, `effect`) para estado reactivo
- **`toSignal`** para convertir Observables de Firestore a signals
- **`toObservable`** en los guards para esperar resolución de auth
- **Standalone components** sin NgModules
- **Lazy loading** en todas las rutas
- **`ChangeDetectionStrategy.OnPush`** en todos los componentes
- **Reactive Forms** con validadores personalizados (ej. coincidencia de contraseñas)
- **`inject()`** en lugar de constructor injection

---

Hecho con Angular y Firebase para tener algo propio y funcional en internet.
