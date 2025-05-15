Paso cero: Clonar el repositorio de github al local.

Se puede clonar el repositorio desde una terminal:
    git clone https://github.com/XinXZP/kresco_aplic_web.git

O desde la opción de clonar un repositorio que tiene las aplicaciones como Visual Studio Code o WebStorm. En este caso solo hace falta indicar el URL de HTTPS del repositorio: https://github.com/XinXZP/kresco_aplic_web.git . 



Paso uno: Correr el proyecto

- Abrir una terminal y acceder al directorio donde está el repositorio clonado.
- Ejecutar el siguiente comando para correr el proyecto localmente:
    npm run dev
- Abrir en un buscador el URL de http que se muestra después al ejecutar el anterior comando.
    Ejemplo: http://localhost:3000.
- Añadir '/ideas' a final del URL para acceder al pantalla de la lista de ideas.
    Ejemplo: http://localhost:3000/ideas.



Paso dos: Probar las funcionalidades 

- En la pantalla principal se muestra la lista de ideas, tiene un botón de color azul en la parte superior derecha para acceder al formulario que se usa para publicar una nueva idea.

- En la parte superior derecha también está un desplegable para seleccionar la ordenación de las ideas, hay 3 opciones de ordenación: fecha de publicación, orden alfabético, número de votos.

- En cada idea de la lista hay un icono para votar. Si se clica encima del icono, se suma un voto a la idea. Como no está implementado el multi-usuario, tampoco se ha implementado el control de un usuario solo puede votar una vez a una idea. 