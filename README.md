# testAzurianFront
Front para ingreso empresa Azurian

### Instrucciones preparación  
Abrir terminal en la carpeta principal y ejecutar el comando npm install

### Instrucciones despliegue
configurar la ruta de la api a consumir, para esto editar el archivo src/environments/environment.ts, constante environment.api_url. 
Tomar en cuenta que si desea consumir la api de laravel habra variaciones cuando se haga la prueba en local o en hosting. En local despues del dominio o url de prueba debera agregar el texto "/api/" ejemplo: "http://localhost:8000/api/", y en el hosting despues del dominio agregar el texto "/public/api/" ejemplo: "http://dominio.com/public/api/".
Actualmente las peticiones se estan realizando a la dirección: "http://localhost:8000/api/" que es donde se ejecuta localmente el backend realizado en laravel: "testAzurianBack" repositorio: https://github.com/Edwar531/testAzurianBack.git.
Para ejecutar localmente solo utilice el comando "ng serve -o" en el terminal.
Para compilar y ejecutar en el servidor utilice el comando "ng build" en el terminal, agregue el archivo ".htaccess_servidor" que esta en la carpeta principal del repositorio en el compilado, y cambie el nombre a ".htaccess".


