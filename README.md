# Mini-CRM MVP
Mini-CRM web para gestionar clientes y oportunidades de negocio, desarrollado como MVP.

## Requisitos
- Node.js
- SQLite (no requiere instalación adicional, la DB se crea automáticamente)

## Instalación
1. Clona el repositorio:
git clone https://github.com/amaiavaz/MVP-miniCRM.git
cd MVP-miniCRM

2. Instala dependencias del backend (server):
cd server
npm install

3. Arranca el backend:
npm run dev

4. Instala dependencias del frontend (client):
Abre otra terminal en la raíz del proyecto y:
cd client
npm install

5. Arranca el frontend:
npm run dev


API Endpoints principales
Clientes
POST /api/clients - Crear cliente
GET /api/clients - Listar clientes
GET /api/clients/export - Exportar clientes en CSV

Oportunidades
POST /api/opportunities/addOpportunity - Crear oportunidad
GET /api/opportunities/client/:clientId - Listar oportunidades de un cliente
GET /api/opportunities/export - Exportar oportunidades en CSV

Pruebas con Postman
En la raíz del repo encontrarás el archivo:
MiniCRM.postman_collection.json
Puedes importarlo en Postman y tendrás todos los endpoints listos para probar.