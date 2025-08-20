> --------------------------Spanish
# Sibérie

## Un proyecto de práctica, un sitio web para vender ropa de segunda mano.

Sibérie es un sitio web donde se pueden publicar prendas que no se usarán más para poder así venderlas, así como poder comprar ropa
de segunda mano.

Como se mencionó, es un proyecto para practicar hecho para implementar nuevas cosas para el desarrollador, como por ejemplo:

* Autentificación de usuarios y uso de tokens
* Manejo de múltiples imágenes
* Validación de formularios complejos
* Almacenamiento basado en sesiones (reflejado en el componente del carrito de compras)
* La creación del primer readme.md del usuario

# Cómo empezar a usarlo.
El primer paso sería clonar el proyecto desde github y seguir:
* Instalar Node js: https://nodejs.org/es
* Instalar Python: https://www.python.org/downloads/
* Instalar y configurar appServ y con phpmyadmin crear una base de datos llamada clothes
* Crear un entorno virtual de python dentro de la carpeta backend
* Ir a la carpeta Scripts del entorno virtual y ejecutar activate
* Regresar a la carpeta backend y ejecutar pip install -r requirements.txt, después ejecutar python manage.py makemigrations y python manage.py migrate
* Ejecutar python manage.py runserver
* Ir a frontend>clothing y ejecutar npm install y luego npm run dev
* Ir a http://localhost:5173 en un navegador

# Trabajo en progreso y problemas conocidos.
* Se sigue trabajando en la posibilidad de actualizar un producto
* Hay ciertos bugs como que no se muestran las imágenes al crear un nuevo producto
* Si un bug es encontrado, mandar un issue en el la sección correspondiente

# Segundo commit:
* Un chat para la interacción entre comprador y vendedor
* Implementación de rutas protegidas

> --------------------------English
# Sibérie

## A practice project, a website to sell second hand clothes.

Sibérie is a website where you can post clothes you don't want to use anymore and want to sell, as well as buying second-hand clothes. 

As menctioned, this is a practice project ment to include new things for the developer, such as:

* User authentification and use of tokens
* Multiple images management
* Complex form validation
* Session based storage (reflected in the basket component)
* As well as the creation of the developer's first read.md

# How to start using it.
The first step is to clone this proyect and follow these steps:
* Install Node js: https://nodejs.org/en
* Install Python: https://www.python.org/downloads/
* Install and configure appServ and, with phpmyadmin, create a database called clothes
* Create a virtual enviroment inside backend folder
* Go to Scripts folder in the virtual enviroment and execute activate
* Go back to backend folder and execute pip install -r requirements.
* Regresar a la carpeta backend y ejecutar pip install -r requirements.txt, then execute python manage.py makemigrations and python manage.
* Execute python manage.py runserver
* Go to frontend>clothing and execute npm install and then npm run dev
* Go to http://localhost:5173 in a browser.

# Work in progress and known issues.
* As of today, the developer is working in the possibility of updating a product.
* There are some bugs like images not showing while creating a publication or the searchbar showing duplicates of products.
* If you've found a bug, please, submit an issue in the corresponding tab.

# Second commit:
* A chat for the interaction between seller and buyer was implemented
* Protected routes were implemented