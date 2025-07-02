
# Use an official Node.js 14 image as a base
FROM node:14


# Set the working directory to /app
WORKDIR /app


# Copy the package*.json files to the working directory
COPY package*.json ./


# Install the dependencies
RUN npm install


# Copy the application code to the working directory
COPY . .


# Build the TypeScript code
RUN npm run build


# Expose the port that the application will run on
EXPOSE 3000


# Run the command to start the application when the container launches
CMD ["npm", "start"]

