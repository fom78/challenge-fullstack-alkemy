<a name="top"></a>
# Indice

- [Consigna dada por Alkemy](#consigna)
- [Como correr en local](#runlocal)
- [Sobre el frontend](#frontend)
- [Sobre el backend](#backend)


<a name="consigna"></a>
[Volver al Indice](#top)

# CHALLENGE FULL STACK - JavaScript 🚀

## Objetivo

Desarrollar una aplicación para administración de presupuesto personal. La misma debe
permitir crear y editar ingresos y egresos de dinero, y mostrar un balance resultante de las
operaciones registradas.

## Requerimientos Técnicos

Deberás desarrollar una API en Node.js junto a cualquiera de los siguientes frameworks,
en sus versiones estables:

- Express
- Adonis
- Koa


En el caso de querer utilizar otro framework es posible, pero debe consultarse con
anterioridad.

Los datos mostrados deben ser persistidos en una base de datos relacional. El esquema de
datos puede armarse según se considere apropiado en base a los requerimientos del
negocio. La API deberá exponer URLS que devuelvan datos en JSON.
Estos datos en JSON deberán ser consumidos por un cliente, a través de peticiones AJAX.
El cliente puede ser armado con React.js.
El trabajo realizado se subirá a un repositorio.

## Secciones

## Home
La pantalla de inicio deberá mostrar el balance actual, es decir, el resultante de los
ingresos y egresos de dinero cargados, y un listado de los últimos 10 registrados.

## ABM de operaciones (ingresos y egresos)
La aplicación deberá contener:
- Formulario de registro de operación. El mismo deberá contener:
    - Concepto
    - Monto
    - Fecha
    - Tipo (ingreso o egreso)
- Listado de operaciones registradas según su tipo (ingreso o egreso).
- Desde el listado, se debe poder modificar o eliminar una operación registrada
previamente. No debe ser posible modificar el tipo de operación (ingreso o
egreso) una vez creada.

## Bonus

De forma adicional, puede
### Autenticación de usuarios
Agregar un formulario de registro y login para permitir identificar al usuario que utiliza la
aplicación, y vincular las operaciones registradas al usuario autenticado en el sistema,
tanto para el listado y creación de nuevos registros. Los datos indispensables para permitir
el ingreso deben ser un email y contraseña, pudiendo agregar los que se deseen.
### Categorías de operaciones
Agregar la funcionalidad de categorizar las operaciones registradas en el gestor, como por
ejemplo, una categoría “comida” para categorizar egresos. Adicionalmente, agregar la
posibilidad de listar operaciones por categoría.

##  Criterios a Evaluar
- El diseño debe ser responsive, pudiendo utilizarse CSS puro o algún framework
de Frontend
- Código limpio, buenas prácticas de programación, en idioma inglés
- Correcto diseño de la base de datos
- Buenas prácticas de GIT: Commits declarativos y atomizados
- Buenas prácticas para el nombre de rutas

# Personal Finance
autor: Fernando Masino
<br />
[Volver al Indice](#top)

<a name="runlocal"></a>
## Correr en local
- Clonar el repositorio e instalar dependecias
```bash
git clone git@github.com:fom78/challenge-fullstack-alkemy.git
cd backend/
npm run install
cd ../frontend/
npm run install
```
- Crear la base de datos y tablas segun el archivo ubicado en backend/database.sql
- Colocar las credenciales de acceso en el archivo backend/.env.
- Acceso a firebase, deberas crear un proyecto de autenticacion y permitir login con google y colocar las credenciales en el frontend/.env

- Una vez todo esto realizado, en el archivo frontend/src/config.js comentar el host remoto y descomentar el local.

- Ahora ya podemos correr la app en local
```bash
cd backend/
npm run dev
cd ../frontend/
npm start
```

<a name="backend"></a>
## El backend
- El repositorio es este mismo
- api desarrollada en NodeJS y servidor express. Desplegada en heroku
- [Link a la API](https://personal-finance-alkemy.herokuapp.com/api/v1)
- Base de datos relacional MySql, desplegada en AWS.

<a name="frontend"></a>
## El frontend
- El repositorio es este mismo
- Desarrollado en React y estilado con Styled components. Desplegado en Vercel.
- [Link a la App](https://challenge-fullstack-alkemy.vercel.app)
- Autenticacion de usuarios con Firebase

<br />
[Volver al Indice](#top)