![Alt Text](https://github.com/KrzysztofSobol/krzysztofsobol.xyz/blob/master/src/main/resources/title.png)
# 🌐 CV Website

A personal CV website built with **Java Spring Boot** and **React**, featuring a **pure CSS design** (no libraries) and a **dynamic map generation algorithm** (wave function collapse) running on the backend.

## 🎯 Highlights
- 💻 Fullstack application with Spring Boot and React
- 🖌️ Pure CSS styling (no frameworks or libraries)
- 🗺️ Dynamic map generation using a custom wave function collapse algorithm
- 🎨 Canvas-based map painting and smooth animation
- 🐳 Docker Compose for easy deployment

---

## 🛠️ Tech Stack
- **Backend**: Java Spring Boot
- **Frontend**: React + CSS

---

## 🌄 Hero Section
The `Heropage` component generates the map and handles the canvas-based animation. It dynamically paints the map, simulates water waves, and allows users to generate new map configurations.

### Key Functionalities:
- Observes canvas visibility to control animation performance
- Pre-renders static terrain on an offscreen canvas
- Animates water tiles with a sine wave effect

---

## 🚀 Local Deployment

1. Clone the repository:
```bash
git clone https://github.com/KrzysztofSobol/krzysztofsobol.dev.git
```

2. Navigate to the project directory:
```bash
cd krzysztofsobol.dev
```

3. Run Docker Compose:
```bash
docker-compose up
```

Make sure Docker is running on your system.

---

## 📄 License
The GNU General Public License v3.0
