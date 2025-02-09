# API GESTION ACADEMICA

ESTA API ESTA DISEÑADA PARA GESTIONAR UN CENTRO EDUCATIVO. INCLUYE FUNCIONALIDADES PARA ESTUDIANTES Y PROFESORES, ESTUDIANTES: ASIGNACIONES A CURSOS, VISUALIZAR CURSOS, ELIMINAR Y EDITAR PERFIL, INICIO SESION COMO STUDENT_ROLE
MAESTRO: CREAR, EDITAR, ELIMINAR Y VISUALIZAR CURSOS, EDITAR CURSO A ALUMNOS ASIGNADOS, ELIMINAR CURSOS A ALUMNOS ASIGNADOS, INICIO DE SESION COMO TEACHER_ROLE.

## VARIABLES DE ENTORNO

CREE UN ARCHIVO `.env` EN EL DIRECTORIO RAIZ Y AÑADA LAS SIGUIENTES VARIABLES:

```
MONGO_URI=<tu_cadena_de_conexión_mongodb>
PORT=<tu_puerto_del_servidor>
JWT_SECRET=<tu_secreto_jwt>
```

## ENDPOINTS DE LA API

### AUTENCICACIÓN

- **Registrar usuarios**
  - **URL:** `/sistemaGestionAcademica/v1/auth/registrarUsuario`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
  "email":"string",
  "username":"string",
  "password":"string",
  "role":"string"
    }
    ```

    - **INICIO SESION**
  - **URL:** `/sistemaGestionAcademica/v1/auth/login`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
     "email":"string",
     "username":"string",
    "password":"string"
    }
    ```

    ### ESTUDIANTES

- **VALIDACION DE NO MAS DE 3 CURSOS ASIGNADOS**
  - **URL:** `/sistemaGestionAcademica/v1/student/registerStudent`
  - **Método:** `POST`
 - **Cuerpo:**
    ```json
    {
  "name":"string",
  "password":"string",
  "asignatura":["string", "string", "string"]
    }
    ```

- **VALIDACION NO ASIGNARSE A UN MISMO CURSO**
  - **URL:** `/sistemaGestionAcademica/v1/student/asignaturaStudent/:uid`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
   "name":"string",
    "asignatura":["string"]
    }
    ```

- **LISTAR ESTUDIANTES Y SUS CURSOS YA ASIGNADOS**
  - **URL:** `/sistemaGestionAcademica/v1/student/`
  - **Método:** `GET`

- **EDITAR PERFIL ESTUDIANTE**
  - **URL:** `/sistemaGestionAcademica/v1/student/editProfile/:uid`
  - **Método:** `PUT`
   - **Cuerpo:**
    ```json
    {
   "name":"string",
  "correo":"string",
  "password":"string",
  "asignatura":["string"]
    }
    ```
    - **ELIMINAR PERFIL ESTUDIANTE**
  - **URL:** `/sistemaGestionAcademica/v1/student/deleteProfile/:uid`
  - **Método:** `DELETE`

    ### MAESTRO

    - **CREAR CURSOS**
  - **URL:** `/sistemaGestionAcademica/v1/teacher/registerCourses`
  - **Método:** `POST`
   - **Cuerpo:**
    ```json
    {
   "name":"string",
  "password":"string",
  "cursos":["string", "string"]
    }
    ```

   - **EDITAR CURSOS**
  - **URL:** `/sistemaGestionAcademica/v1/teacher/actualizarCursos/:uid`
  - **Método:** `PUT`
   - **Cuerpo:**
    ```json
    {
  "name":"string",
  "password":"string",
  "cursos":["string", "string"]
    }
    ```
 - **ELIMINAR CURSOS**
  - **URL:** `/sistemaGestionAcademica/v1/teacher/eliminarCursos/:uid`
  - **Método:** `DELETE`

- **VISUALIZAR CURSOS**
  - **URL:** `/sistemaGestionAcademica/v1/teacher/visualizar`
  - **Método:** `GET`

 - **EDITAR CURSOS ALUMNOS ASIGNADOS**
  - **URL:** `/sistemaGestionAcademica/v1/teacher/editarCursoAA/:uid`
  - **Método:** `PUT`
   - **Cuerpo:**
    ```json
    {
  "name":"string",
  "password":"string",
  "alumnosAsignados":"string, string, string",
  "cursos":["string", "string"]
 }
    ```

 - **ELIMINAR CURSOS ALUMNOS ASIGNADOS**
  - **URL:** `/sistemaGestionAcademica/v1/teacher/eliminarCursoAA/:uid`
  - **Método:** `DELETE`

## RUTAS GENERALES DE LA API
- **Registrar usuarios**
  - **URL:** `http://127.0.0.1:3001/sistemaGestionAcademica/v1/auth/registrarUsuario`
     - **INICIO SESION**
  - **URL:** `http://127.0.0.1:3001/sistemaGestionAcademica/v1/auth/login`
  - **VALIDACION DE NO MAS DE 3 CURSOS ASIGNADOS**
  - **URL:** `http://127.0.0.1:3001/sistemaGestionAcademica/v1/student/registerStudent`
  - **VALIDACION NO ASIGNARSE A UN MISMO CURSO**
  - **URL:** `http://127.0.0.1:3001/sistemaGestionAcademica/v1/student/asignaturaStudent/:uid`
  - **LISTAR ESTUDIANTES Y SUS CURSOS YA ASIGNADOS**
  - **URL:** `http://127.0.0.1:3001/sistemaGestionAcademica/v1/student/`
  - **EDITAR PERFIL ESTUDIANTE**
  - **URL:** `http://127.0.0.1:3001/sistemaGestionAcademica/v1/student/editProfile/:uid`
   - **ELIMINAR PERFIL ESTUDIANTE**
  - **URL:** `http://127.0.0.1:3001/sistemaGestionAcademica/v1/student/deleteProfile/:uid`
   - **CREAR CURSOS**
  - **URL:** `http://127.0.0.1:3001/sistemaGestionAcademica/v1/teacher/registerCourses`
   - **EDITAR CURSOS**
  - **URL:** `http://127.0.0.1:3001/sistemaGestionAcademica/v1/teacher/actualizarCursos/:uid`
   - **ELIMINAR CURSOS**
  - **URL:** `http://127.0.0.1:3001/sistemaGestionAcademica/v1/teacher/eliminarCursos/:uid`
  - **VISUALIZAR CURSOS**
  - **URL:** `http://127.0.0.1:3001/sistemaGestionAcademica/v1/teacher/visualizar`
  - **EDITAR CURSOS ALUMNOS ASIGNADOS**
  - **URL:** `http://127.0.0.1:3001/sistemaGestionAcademica/v1/teacher/editarCursoAA/:uid`
   - **ELIMINAR CURSOS ALUMNOS ASIGNADOS**
  - **URL:** `http://127.0.0.1:3001/sistemaGestionAcademica/v1/teacher/eliminarCursoAA/:uid`
