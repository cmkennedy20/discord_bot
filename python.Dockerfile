# Use an official Python runtime as the base image
FROM python:3.11-slim
# Set the working directory in the container to /app
WORKDIR /app
# Copy the requirements file into the working directory
COPY ./bot-container/requirements.txt .
# Install the dependencies listed in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
# Copy the application code into the working directory
COPY . .
# Expose the port on which the container will listen for incoming requests
EXPOSE 80

# Run the command to start the development server when the container launches
CMD ["python", "app.py"]
