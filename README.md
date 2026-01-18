# PRUEBA TÉCNICA – BACKEND DEVELOPER SENIOR (Node.js / NestJS o Express + AWS + MongoDB)

Backend desarrollado con Node.js, Express y MongoDB, que implementa:
-Gestión de usuarios, productos y órdenes
-Flujo completo de pagos con gateway simulado
-Webhooks firmados
-Estados de pago
-Envío de correos de confirmación (sandbox)


Variables de entorno. Crear un archivo .env en la raíz del proyecto:
PORT = 5000
JWT_SECRET = PHVQQ2pJw2rbBIxvS4bExOtl0LggtPpi
MONGODB_URI = mongodb://localhost:27017/prueba
WEBHOOK_SECRET = 6ZMJKEUVsgPwKasa4bL4SPEUVkI$aGg*

Email (Ethereal - sandbox)
MAIL_USER = okku2au64nym2sm4@ethereal.email
MAIL_PASS = Wq1FrsjaRcqcGJbxdq
-Para MAIL_USER y MAIL_PASS se usa Ethereal Email (sandbox). Los correos no se envían a usuarios reales.


Ejecutar el proyecto localmente

1️⃣ Instalar dependencias
-npm install

2️⃣ Levantar MongoDB
Asegúrate de tener MongoDB corriendo localmente:
-mongod

3️⃣ Ejecutar el servidor
-npm run dev

Servidor disponible en: http://localhost:5000

====================================

AUTENTICACIÓN
El sistema implementa autenticación basada en JWT y permite registrar y autenticar usuarios con roles (USER, ADMIN).

📝Registro de usuario

Endpoint = POST /auth/register

Descripción
Crea un nuevo usuario en el sistema.
Todos los campos son obligatorios.

📤 Request body (JSON)
{
  "name": "Juan",
  "lastName": "Pérez",
  "email": "juan.perez@test.com",
  "phone": "3001234567",
  "address": "Calle 123 #45-67",
  "password": "123456",
  "role": "USER"
}


📌 Notas importantes
-email debe ser único
-phone debe ser único
-role admite valores USER o ADMIN
-El password se almacena hasheado (bcrypt)

📥 Respuesta exitosa (201)
{
  "error": false,
  "status": 201,
  "body": {
    "message": "El registro se ha realizado correctamente",
    "user": {
      "id": "696ad158100189fdbf3ef5eb",
      "name": "Juan",
      "lastName": "Pérez",
      "email": "juan.perez@test.com",
      "phone": "3001234567",
      "address": "Calle 123 #45-67",
      "role": "user",
      "createdAt": "2026-01-17T00:01:28.114Z"
    }
  }
}

❌ Posibles errores
Código	Mensaje
400	Todos los campos son obligatorios
400	El email ya está registrado
400	El numero de teléfono ya está registrado

===============================================

🔑 Login de usuario

Endpoint = POST /auth/login

Descripción
Autentica un usuario y retorna un JWT válido por 1 día.

📤 Request body (JSON)
{
  "email": "juan.perez@test.com",
  "password": "123456"
}

📥 Respuesta exitosa (200)
{
  "error": false,
  "status": 200,
  "body": {
    "message": "Login exitoso",
    "user": {
      "_id": "696ad158100189fdbf3ef5eb",
      "name": "Juan",
      "lastName": "Pérez",
      "email": "juan.perez@test.com",
      "phone": "3001234567",
      "address": "Calle 123 #45-67",
      "role": "user",
      "createdAt": "2026-01-17T00:01:28.114Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}


📌 El campo password nunca se devuelve en la respuesta.

❌ Posibles errores
Código	Mensaje
400	Email y password son obligatorios
401	Credenciales inválidas

======================================================

Como funcionalidad adicional, se implementaron **endpoints de gestión de usuarios** accesibles únicamente para usuarios con rol **ADMIN**. 
Estas rutas permiten listar todos los usuarios registrados, consultar un usuario por su identificador, actualizar parcialmente su información y eliminar usuarios del sistema. 
Todas las operaciones están protegidas mediante autenticación JWT y un middleware de autorización por roles, garantizando que solo administradores puedan ejecutar acciones de administración sobre los usuarios.

router.get('/users', authenticate, authorize(["admin"]), getUsers);
router.get('/users/:id', authenticate, authorize(["admin"]), getUserById);
router.delete('/users/:id', authenticate, authorize(["admin"]), deleteUser);
router.patch('/users/:id', authenticate, authorize(["admin"]), updateUser);

=========================================================

📦 Productos

El sistema incluye un módulo de gestión de productos, el cual permite crear, consultar, actualizar, desactivar y eliminar productos.
Todas las operaciones requieren autenticación JWT, y las acciones de administración están restringidas a usuarios con rol ADMIN.

➕ Registro de producto (solo ADMIN)

Endpoint = POST /products

Autorización

Requiere token JWT válido
Rol requerido: ADMIN

Descripción
Crea un nuevo producto en el sistema. Todos los campos son obligatorios y se validan mediante un DTO antes de ser persistidos.

📥 Request body (JSON)
{
  "name": "Teclado mecánico",
  "description": "Teclado mecánico retroiluminado",
  "price": 250000,
  "currency": "COP",
  "stock": 15,
  "isActive": true,
  "category": "Periféricos"
}

Validaciones aplicadas

Todos los campos son obligatorios
price y stock no pueden ser negativos
currency debe tener exactamente 3 caracteres (ISO 4217)
currency se almacena en mayúsculas
name, description y category se guardan sin espacios extra

📤 Response (201 Created)
{
    "error": false,
    "status": 201,
    "body": {
        "message": "El registro se ha realizado correctamente",
        "product": {
            "id": "696c5ac6250e0b3c89861bc7",
            "name": "Teclado mecánico",
            "description": "Teclado mecánico retroiluminado",
            "price": 250000,
            "currency": "COP",
            "stock": 15,
            "isActive": true,
            "category": "Periféricos",
            "createdAt": "2026-01-18T04:00:06.098Z"
        }
    }
}

🔐 Errores comunes

Campos faltantes
{
  "error": true,
  "message": "Todos los campos son obligatorios"
}

Datos inválidos
{
  "error": true,
  "message": "El precio no puede ser negativo"
}

Otros Endpoints:
router.get('/products', authenticate, getProducts);
router.delete('/products/:id', authenticate, authorize(["admin"]), deleteProduct);
router.get('/products/:id', authenticate, authorize(["admin"]), getProductById);
router.patch('/products/:id', authenticate, authorize(["admin"]), updateProduct);
router.patch('/products/:id/deactivate', authenticate, authorize(["admin"]), deactivateProduct);

=====================================================

🧾 Órdenes de compra

El sistema permite a los usuarios autenticados crear órdenes de compra a partir de los productos disponibles.
Cada orden calcula automáticamente el subtotal, total y se crea con estado inicial CREATED.

➕ Crear orden (USER)

Endpoint = POST /orders

Autorización

Requiere token JWT válido
Rol requerido: USER

📥 Request body (JSON)
{
  "items": [
    {
      "productId": "696b173b379d27dc293e8fce",
      "quantity": 3
    },
    {
      "productId": "696be3e126c75d222590b300",
      "quantity": 3
    }
  ]
}

Reglas y validaciones
items debe ser un arreglo no vacío
Cada item debe contener:
productId
quantity (mayor a 0)

El producto debe:
Existir
Estar activo (isActive = true)
Tener stock suficiente
El userId se obtiene automáticamente desde el token JWT
El subtotal y total se calculan automáticamente en el backend

⚙️ Lógica de negocio aplicada
Se valida disponibilidad y stock de cada producto
Se calcula el subtotal por producto (price * quantity)
Se calcula el subtotal general y total de la orden
La orden se crea con estado inicial:

CREATED

📤 Response (201 Created)
{
  "error": false,
  "status": 201,
  "body": {
    "message": "Orden creada correctamente",
    "order": {
      "id": "696c4b9e12a2a5c7570829b8",
      "userId": "696ad158100189fdbf3ef5eb",
      "status": "CREATED",
      "items": [
        {
          "productId": "696b173b379d27dc293e8fce",
          "name": "coca-cola",
          "quantity": 3,
          "subtotal": 15000
        },
        {
          "productId": "696be3e126c75d222590b300",
          "name": "PONQUÉ RAMO",
          "quantity": 3,
          "subtotal": 9000
        }
      ],
      "subtotal": 24000,
      "total": 24000,
      "createdAt": "2026-01-18T02:55:26.019Z"
    }
  }
}

❌ Errores comunes

Orden sin productos
{
  "error": true,
  "message": "La orden debe tener al menos un producto"
}

Producto no disponible
{
  "error": true,
  "message": "Producto no disponible"
}

Stock insuficiente
{
  "error": true,
  "message": "Stock insuficiente para coca-cola"
}

Otros Endpoints:
router.get("/orders/user/:id", authenticate, authorize(["user", "admin"]), OrdersByUser);
router.get("/orders", authenticate, authorize(["admin"]), allOrders);
router.get("/orders/:id", authenticate, authorize(["admin"]), oneOrder);

=======================================================

💳 Pagos

El sistema incluye un flujo de pago simulado (mock/sandbox).
El pago se inicia a partir de una orden previamente creada y genera un transactionId que luego será utilizado por el gateway simulado para confirmar o rechazar el pago mediante un webhook.

▶️ Iniciar pago de una orden

Endpoint = POST /payments/init

Autorización

Requiere token JWT válido
Rol permitido: USER

📥 Request body (JSON)
{
  "orderId": "696c4b9e12a2a5c7570829b8"
}

Reglas y validaciones

La orden debe existir
La orden debe estar en estado: CREATED
Si la orden ya fue pagada o está en otro estado, el pago no puede iniciarse

⚙️ Lógica de negocio aplicada
Se valida la existencia de la orden
Se valida que la orden esté en estado CREATED
Se genera un transactionId único (simulación de gateway)
Se crea un registro de pago con estado inicial PENDING

La orden cambia automáticamente a estado: PAYMENT_PENDING

📤 Response (201 Created)
{
  "error": false,
  "status": 201,
  "body": {
    "message": "Proceso de pago iniciado",
    "payment": {
      "transactionId": "3b3d181f-1463-423a-9631-955e65dce477",
      "amount": 24000,
      "status": "PENDING"
    }
  }
}

❌ Errores comunes

Orden no encontrada
{
  "error": true,
  "message": "Orden no encontrada"
}

Orden en estado inválido
{
  "error": true,
  "message": "La orden no puede pagarse en este estado"
}

==========================================================

🔔 Webhook de pagos

El endpoint de webhook simula la notificación enviada por un gateway de pagos externo para confirmar o rechazar una transacción.
Este endpoint NO es llamado por el frontend, sino por el proveedor de pagos (en este caso, un gateway simulado).

📡 Endpoint webhook
POST /payments/webhook

Autenticación

No usa JWT
Protegido mediante firma HMAC (x-webhook-signature)

📥 Request body (JSON)
{
  "eventId": "evt_001",
  "transactionId": "3b3d181f-1463-423a-9631-955e65dce477",
  "status": "SUCCEEDED"
}

Campos
eventId: identificador único del evento (usado para idempotencia)
transactionId: identificador de la transacción generada al iniciar el pago
status: resultado del pago

SUCCEEDED
FAILED

🔐 Validación de firma del webhook
El backend valida que la petición provenga de una fuente confiable usando una firma HMAC SHA-256.
Header requerido
x-webhook-signature: <hash>
La firma se genera a partir del payload crudo (rawBody) y una clave secreta compartida (WEBHOOK_SECRET).

⚙️ Lógica de negocio aplicada
Se valida la firma del webhook
Se verifica idempotencia:
Un mismo eventId no puede procesarse dos veces
Se busca el pago por transactionId
Se obtiene la orden y el usuario asociado

Según el estado recibido:

SUCCEEDED

El pago pasa a SUCCEEDED
La orden pasa a PAID
Se ejecuta la lógica post-pago (handlePaidPayment)

FAILED

El pago pasa a FAILED
La orden pasa a FAILED
Se guarda el evento procesado para evitar duplicados

📤 Response (200 OK)

Webhook procesado correctamente
{
  "error": false,
  "status": 200,
  "body": "Webhook procesado"
}

Evento duplicado (idempotencia)
{
  "error": false,
  "status": 200,
  "body": "Evento ya procesado"
}

❌ Errores comunes

Firma faltante
401 Firma faltante

Firma inválida
401 Firma inválida

Pago no encontrado
{
  "error": true,
  "message": "Pago no encontrado"
}

ℹ️ Notas importantes
El webhook debe enviarse con el body sin modificar (raw body)
El mismo evento no debe procesarse más de una vez
El flujo de negocio no depende del frontend
El sistema es tolerante a reintentos del gateway


======================================================


🧪 Simulación de gateway de pagos (Mock)

Para efectos de desarrollo y pruebas, el proyecto incluye un gateway de pagos simulado que permite confirmar o rechazar pagos sin depender de un proveedor externo real.

Este gateway se encarga de:
Generar un evento de pago
Firmar el payload con un secreto compartido
Disparar el webhook interno del sistema

▶️ Simular pago

Endpoint = POST /mock/pay

Descripción
Simula la respuesta de un proveedor de pagos enviando un evento firmado al endpoint /payments/webhook.

📥 Request body (JSON)
{
  "transactionId": "3b3d181f-1463-423a-9631-955e65dce477",
  "status": "PAID"
}

Campos
transactionId: ID de la transacción generado al iniciar el pago
status: PAID → simula pago exitoso
cualquier otro valor → simula pago fallido

⚙️ Lógica de simulación
Se genera un eventId único
Se normaliza el estado del pago:
PAID → SUCCEEDED
otro → FAILED
Se construye el evento de pago
Se firma el payload usando HMAC SHA-256
Se envía automáticamente el evento al endpoint: POST /payments/webhook

📤 Response (200 OK)
{
  "error": false,
  "status": 200,
  "body": {
    "message": "Pago simulado",
    "event": {
      "eventId": "8e8c9b28-5c91-4a34-8f5f-9e5a1d9c8c2a",
      "transactionId": "3b3d181f-1463-423a-9631-955e65dce477",
      "status": "SUCCEEDED"
    }
  }
}

🔄 Resultado esperado en el sistema
Estado simulado	Estado del pago	Estado de la orden
PAID	SUCCEEDED	PAID
FAILED	FAILED	FAILED

📝 Flujo completo de prueba

Crear productos
Crear una orden (POST /orders)
Iniciar el pago (POST /payments/init)
Copiar el transactionId
Simular el pago (POST /mock/pay)

Verificar:
Orden actualizada
Pago confirmado o rechazado

⚠️ Notas importantes
Este endpoint es solo para desarrollo
En un entorno real, el webhook sería llamado por el gateway externo
La firma del webhook evita ejecuciones no autorizadas
El sistema es idempotente ante eventos duplicados
