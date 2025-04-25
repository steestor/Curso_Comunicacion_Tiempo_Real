# Chat con Long Polling en Angular

Aplicación de chat en tiempo real utilizando Angular y técnica de Long Polling para la comunicación.

## Demostración en vivo

Puedes ver la aplicación funcionando en GitHub Pages: [https://tu-usuario.github.io/angular-chat-long-polling/](https://tu-usuario.github.io/angular-chat-long-polling/)

## Características

- Chat en tiempo real usando Long Polling
- Interfaz de usuario con Angular 17
- Servidor Node.js simple para manejar la comunicación
- Estilos con Bootstrap y DevExtreme

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/angular-chat-long-polling.git
cd angular-chat-long-polling

# Instalar dependencias
npm install
```

## Uso

Para iniciar tanto el servidor como la aplicación Angular, debes ejecutar los siguientes comandos en terminales separadas:

```bash
# Terminal 1: Iniciar el servidor de Node.js (requiere nodemon instalado)
cd server
nodemon server.js  # O node server.js si no tienes nodemon

# Terminal 2: Iniciar la aplicación Angular
npm start
```

La aplicación estará disponible en `http://127.0.0.1:4200/` y el servidor en `http://localhost:3000/`.

## Cómo funciona el Long Polling

1. El cliente hace una solicitud al servidor y mantiene la conexión abierta
2. El servidor espera hasta que haya un nuevo mensaje disponible
3. Cuando hay un mensaje, el servidor responde y la conexión se cierra
4. El cliente inmediatamente abre una nueva conexión
5. Este ciclo proporciona una experiencia en "tiempo real" sin usar WebSockets

## Desarrollado con

- [Angular](https://angular.io/) - Framework frontend
- [Express](https://expressjs.com/) - Framework Node.js para el servidor
- [Bootstrap](https://getbootstrap.com/) - Framework CSS
- [DevExtreme](https://js.devexpress.com/) - Componentes UI

## Estructura del proyecto

- `/src` - Código fuente de la aplicación Angular
- `/server` - Servidor Express para manejar mensajes
- `/.github/workflows` - Configuración para despliegue automático en GitHub Pages

## Desarrollo

```bash
# Generar un nuevo componente
ng generate component nombre-componente

# Ejecutar pruebas unitarias
ng test

# Construir el proyecto para producción
ng build
```

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
