# Ufo chat

Chat realtime mediante websockets creado con Angular 11 y socket.io.

## Demo

Puedes acceder a una demo a través de Heroku: https://ufo-chat.herokuapp.com/

## Frontend

Para la realización de esta parte de la aplicación se ha utilizado Angular 11, así como la librería tailwind para realizar el diseño.

(Para la comunicación realtime con el servidor se ha utilizado socket.io.)

Se ha habilitado la opcion de introducir emojis en el chat usando la librería https://www.npmjs.com/package/@ctrl/ngx-emoji-mart

Además, se ha utilizado la API de Notification para mostrar notificaciones de escritorio cuando recibes un mensaje nuevo.

## Uso

### Página de inicio.

Introduce tu nombre para acceder al chat.

![Pagina de inicio](https://imgur.com/5rXZEKw.png)

### Mensajes y eventos del chat

Una vez dentro te aparecerá un mensaje de bienvenida, junto con el número de usuarios conectados.

Podrás comunicarte con otros usuarios a tiempo real.

Cada vez que se conecte un nuevo usuario te saldrá un mensaje con su nombre y cuando este se desconecte también serás avisado.

![mensajes](https://imgur.com/iiSM8yM.png)

### Emojis

Puedes hacer uso de una gran variedad de emojis pinchando en el icono "ufo".

![](https://imgur.com/vIJmWUu.png)

## Backend

Para el backend de la aplicación se ha utilizado express y socket.io.

El fichero server.js escucha en el puerto 3000 mediante express. Este servidor por una parte proporciona la spa que ha sido previamente compilada y guardada en ./spa/dist/chat y por otra parte sirve como servidor Http para la librería socket.io.

Esta libreria recibe los mensajes de los usuarios conectados y los retrasmite al resto de usuarios y gestiona los eventos del chat avisando cuando se conectan y desconectan los usuarios.

## Ejecutar en local

Para ejecutar en local hay que seguir los siguientes pasos:

1. Clonar el proyecto e instalar las dependencias del servidor (Express y Socket.io)

```
git clone
cd ufo-chat
npm install
```

2. Compilar la SPA

```
cd spa
npm install
npm run build
```

3. Lanzar el servidor

```
node server.js
```

Acceder a http://localhost:3000

Por defecto el servidor se inicia el puerto 3000.
