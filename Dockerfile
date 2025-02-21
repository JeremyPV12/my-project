# Usa la imagen oficial de Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json (si existe) al contenedor
COPY package*.json ./

# Instala las dependencias de Node.js
RUN npm install

# Copia todo el código fuente del proyecto al contenedor
COPY . .

# Expon el puerto en el que tu aplicación Express estará escuchando (usualmente 3000)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "index"]
