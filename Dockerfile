# Stage 1: build the app
FROM eclipse-temurin:22-jdk as build
WORKDIR /app

COPY pom.xml .
RUN apt-get update && apt-get install -y maven
RUN mvn dependency:go-offline -B

COPY src ./src

RUN mvn package -DskipTests

# Stage 2: runtime image
FROM eclipse-temurin:22-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
