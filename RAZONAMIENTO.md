1. Persistencia de datos 

Prisma + SQLite guarda los datos en un fichero local y se pueden definir los modelos en el fichero llamado shcema.prisma. Tiene la ventaja de ser fácil de configurar porque no hacen falta programar las bases de datos, hace la migración y la validación de restricciones automáticamente y SQLite no requiere un servidor externo (que podría ser el caso de MySQL). SQLite no es ideal para aplicaciones con muchas escrituras simultáneas, cosa que no puede mantener un proyecto de gran escala.

La opción de usar archivos .fs se basa en escribir y leer archivos JSON o de texto directamente desde el sistema de archivos usando el módulo fs de Node.js. Puede ser fácil de implementar sin tener que configurar la base de datos, pero tiene el inconveniente de leer y escribir datos a gran escala. Se tiene que implementar manualmente las restricciones de los datos y requiere más trabajo en el control de la creación, la actualización y la eliminación de los datos. También puede surgir el caso que se interrumpe una escritura al archivo .fs y el contenido del archivo no se queda bien estructurado.

El almacenamiento en memoria se mantienen los datos en variables, rápido para las lecturas y escrituras de datos, pero puede perder todos los datos si se reinicia la máquina.

Para esta prueba técnica se puede usar cualquiera de las anteriores opciones, ya que solo hay un modelo de datos. Prisma + SQLite es la opción se ha implementado, me ha facilitado mucho en la configuración de la base de datos. Si hubiera sido la opción de usar archivos .fs necesitaría trabajar más en la gestión de los datos. Si fuera la opción de almacenamiento en memoria, necesitaría crear ideas y votar cada vez que inicie o reinicie la ejecución del proyecto.

2. Evitar votos duplicados por usuario

Cookies no es una buena solución porque un mismo usuario podría votar más de una vez a una misma idea usando diferentes navegadores o borrar cookies y volver a acceder. 

LocalStorage pasa algo similar como Cookies, un mismo usuario podría usar diferentes dispositivos para votar a una misma idea.

La identificación por IP tampoco es buena, porque pueden haber IPs compartidas, entonces podrían haber usuarios que no podrán votar.

Las 3 anteriores opciones tienen la ventaja de que no haría falta implementar la autenticación para acceder ni implementar un modelo de usuario.

Autenticación de usuario es una buena solución, habría que implementar el modelo de datos para identificar a los usuarios y cada usuario tendría un identificador único. Así se podría garantizar perfectamente que un mismo usuario solo vote como mucho una vez a una misma idea. 


3. Diseño de la API 

REST tiene 4 métodos HTTP (GET, POST, PUT, DELETE) y se pueden aplicar varios métodos para un mismo endpoint (ej.: /ideas/:id). En cambio, RPC solo tiene 2 métodos (GET, POST) y se puede implementar el PUT y el DELETE. Pero los métodos de RPC no se usan como los de REST, en RPC se crean las 'acciones' que el cliente llama. 

Por ejemplo: 

    - En REST:  GET .../api/ideas/15
                PUT .../api/ideas/15
                DELETE .../api/ideas/15

    - En RPC:   POST .../api/obtenerIdea
                POST .../api/actualizarIdea
                POST .../api/eliminarIdea
 
Como este proyecto es pequeño y sirve de prueba técnica, se podría intentar usar una API RPC. Pero si el proyecto fuera grande y complejo, API REST ofrece rutas de api más entendedoras y RPC podría complicar al manejar muchas rutas de api con nombres distintos (porque es una acción una ruta de api).

4. Feedback visual tras votar 

Se puede usar librerías como react-toast para mostrar un mensaje emergente al usuario y así el usuario puede visualizar claramente la respuesta después de votar. Pero puede tener el problema de que el usuario no haya visto el mensaje porque el mensaje fuera muy pequeño o estuviera en una parte donde el usuario no esté fijando.

Otra opción puede ser actualizar el estado de la interfaz antes de la confirmación del servidor. Pero si sucediera un error en el servidor se tendría que revertir el cambio de la interfaz. Y puede provocar inconsistencia porque el usuario habría visto el cambio y pensaba que se había efectuado exitosamente la operación y cerró la aplicación.

También se puede aplicar loaders o reproducir una animación con otros iconos para informar que se está procesando la operación y se está esperando el resultado. 

Es mejor actualizar el estado de la interfaz para dar el feedback rápido al usuario tras votar. Porque hacer un voto no es una operación costosa y si hay algún error se daría una respuesta inmediatamente al usuario.


5. A. Quieres evitar que un usuario vote más de una vez por la misma idea. 

- prompts: 
    "Quieres evitar que un usuario vote más de una vez por la misma idea." Cómo puedo garantizar esto en un proyecto?

- respuesta de DeepSeek: 
    1. Autenticación de Usuarios: Asocia cada voto a un usuario único en tu base de datos.

    2. Identificación Anónima (si no hay registro): 

        Cookies del navegador: 
            Almacena una cookie única en el navegador del usuario tras votar.
            Verifica la cookie antes de permitir otro voto.
            Limitación: Los usuarios pueden borrar cookies o usar otro navegador/dispositivo.

        Dirección IP:
            Registra la dirección IP junto con el voto.
            Base de datos: Añade restricción UNIQUE (ip, idea_id).
            Limitación: IPs dinámicas o compartidas (ej. redes públicas) pueden causar falsos positivos.

        Huella digital del dispositivo:
            Combina datos como User-Agent, resolución de pantalla, y otros parámetros del navegador para generar un identificador único.
            Librerías como FingerprintJS pueden ayudar (https://fingerprintjs.com/).

    3. Códigos Únicos (para sistemas físicos o híbridos):
        Si el proyecto incluye votación presencial: Genera códigos QR o tokens únicos para cada usuario, que se invalidan tras su uso.




DeepSeek me ha generado 8 técnicas y he escogido las 3 que tienen más sentido.

Me ofrece como la primera opción la autenticación de usuarios, porque es la manera más segura y eficiente para garantizar que un usuario solo pueda votar una vez a una idea. Y después son alternativas que se pueden usar si no hay registro de usuario: cookies, dirección IP y huella digital. El código único (uso de QR) es una solución que necesita la autenticación de usuarios, porque sino, no se sabría cuantos códigos se tendrían que generar ni a quienes enviar, como dice DeepSeek, es una alternativa para una votación presencial. 

Me parece que la solución de autenticación de usuario es la única buena y que puede garantizar al 100% que cada usuario registrado solo puede votar una vez a una idea. Cuando se registra un usuario, se tendría que pedir el DNI y el escaneo facial para garantizar que una persona no se registra varias cuentas en la aplicación. 
