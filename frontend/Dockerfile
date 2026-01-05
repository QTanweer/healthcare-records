# Use the official Node.js 18 image as the base image 
FROM node:18-alpine 
 
# Set the working directory inside the container 
WORKDIR /app 
 
# Copy package.json and package-lock.json (if available) to the working directory 
COPY package*.json ./ 
 
# Install dependencies 
RUN npm install --legacy-peer-deps 
 
# Copy the rest of the application code to the working directory 
COPY . . 
 
# Build the Next.js application 
RUN npm run build 
 
# Expose port 3000 to allow communication to/from the application 
EXPOSE 3000 
 
CMD ["npm", "start"] 
