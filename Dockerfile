# Fase de construcción
FROM node:18 AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración del proyecto
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el código fuente de la app
COPY . .

# Construir la aplicación de React
RUN npm run build

# Depuración: Verificar si la carpeta build existe y tiene archivos
RUN ls -l /app/dist

# Fase de servidor
FROM nginx:alpine

# Copiar los archivos generados por React al directorio público de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]
