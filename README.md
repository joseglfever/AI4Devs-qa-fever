# LTI - Sistema de Seguimiento de Talento

Este proyecto es una aplicación full-stack para el seguimiento de candidatos en procesos de contratación. Permite gestionar posiciones abiertas, candidatos y el flujo de entrevistas.

## Estructura del proyecto

```
.
├── backend/                 # Servidor Express con API REST
│   ├── prisma/              # Configuración de Prisma ORM
│   └── src/                 # Código fuente del backend
│       ├── domain/          # Lógica de dominio
│       ├── infrastructure/  # Implementaciones de interfaces
│       ├── presentation/    # Controladores y rutas
│       └── index.ts         # Punto de entrada
├── frontend/                # Cliente React
│   ├── cypress/             # Pruebas end-to-end
│   │   ├── e2e/             # Especificaciones de pruebas E2E
│   │   ├── fixtures/        # Datos de prueba
│   │   └── support/         # Comandos y configuración
│   ├── public/              # Archivos estáticos
│   └── src/                 # Código fuente del frontend
│       ├── components/      # Componentes React
│       ├── services/        # Servicios para comunicación con API
│       └── App.js           # Componente principal
└── README.md                # Este archivo
```

## Tecnologías utilizadas

- **Frontend**: React, Bootstrap, React Router, React Beautiful DnD
- **Backend**: Node.js, Express, Prisma ORM
- **Base de datos**: PostgreSQL
- **Pruebas**: Cypress

## Configuración del Proyecto

### Requisitos previos

- Node.js (v16+)
- PostgreSQL
- npm o yarn

### Instalación

1. Clonar el repositorio:
   ```bash
   git clone <repositorio>
   cd <directorio-del-proyecto>
   ```

2. Instalar las dependencias:
   ```bash
   # Instalar dependencias del backend
   cd backend
   npm install

   # Instalar dependencias del frontend
   cd ../frontend
   npm install
   ```

3. Configurar la base de datos:
   ```bash
   # En el directorio backend
   cp .env.example .env
   # Editar el archivo .env con tus credenciales de PostgreSQL

   # Inicializar la base de datos
   npx prisma migrate dev
   ```

4. Ejecutar el seed para cargar datos iniciales:
   ```bash
   # En el directorio backend
   npm run seed
   ```

### Ejecución

1. Iniciar el backend:
   ```bash
   # En el directorio backend
   npm run dev
   ```

2. Iniciar el frontend:
   ```bash
   # En el directorio frontend
   npm start
   ```

## Funcionalidades principales

- Visualización de posiciones abiertas
- Gestión de candidatos
- Sistema de arrastrar y soltar para mover candidatos entre etapas del proceso
- Calificación de candidatos

## Pruebas end-to-end con Cypress

Hemos implementado pruebas E2E utilizando Cypress para verificar el correcto funcionamiento de la aplicación. Las pruebas incluyen:

### 1. Carga de la página de posición

Verifica que:
- El título de la posición se muestra correctamente
- Se muestran las columnas de cada fase del proceso de contratación
- Los candidatos aparecen en las columnas correctas según su fase actual

### 2. Cambio de fase de un candidato

Verifica que:
- Los candidatos pueden ser movidos entre fases del proceso
- La UI se actualiza correctamente después del movimiento
- Se pueden realizar múltiples movimientos en una sesión

### Ejecución de pruebas

```bash
# En el directorio frontend
npm run cypress:run    # Ejecutar todas las pruebas en modo headless
npm run cypress:open   # Abrir la interfaz gráfica de Cypress
```

Para más detalles sobre las pruebas, ver [frontend/cypress/README.md](frontend/cypress/README.md).

## Características de la implementación

- **Arquitectura limpia**: Separación de responsabilidades en el backend
- **API RESTful**: Endpoints bien definidos para interactuar con el frontend
- **Drag & Drop**: Interfaz intuitiva para mover candidatos entre fases
- **Tests automatizados**: Pruebas E2E para garantizar la funcionalidad

## Mejoras futuras

- Implementación de autenticación y autorización
- Notificaciones en tiempo real
- Más pruebas unitarias y de integración
- Mejora de la interfaz de usuario
- Filtros avanzados para posiciones y candidatos
