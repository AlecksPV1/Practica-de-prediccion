# 📈 Simulador y Comparador de Predicción de Ventas

Una aplicación Full Stack interactiva diseñada para demostrar capacidades avanzadas en **Data Science** y **Software Engineering**. Este proyecto permite visualizar, analizar y comparar múltiples algoritmos de Machine Learning y Deep Learning aplicados al problema clásico de forecasting de ventas (Series Temporales).

## 🎯 Objetivo del Proyecto

El objetivo de esta herramienta no es solo mostrar que un modelo "funciona", sino educar al usuario sobre **por qué** y **cuándo** usar cada algoritmo dependiendo del contexto de negocio, los datos disponibles y los recursos computacionales.

## 🛠️ Stack Tecnológico

La arquitectura está claramente separada para mantener escalabilidad y buenas prácticas:

**Frontend (React.js + Vite)**
- UI construida con **TailwindCSS** usando una paleta de colores personalizada y estética premium.
- Gráficos interactivos fluidos creados con **Recharts**.
- Componentización modular e integración de íconos con **Lucide React**.

**Backend (Python + FastAPI)**
- **FastAPI**: API RESTful ultrarrápida para servir datos y ejecutar predicciones.
- **Scikit-Learn**: Para modelos Baseline (Regresión Lineal).
- **Statsmodels**: Para modelado estadístico clásico univariado (ARIMA).
- **XGBoost**: Para ensambles basados en árboles con excelente manejo de relaciones no lineales.
- **PyTorch**: Implementación de Redes Neuronales Recurrentes (LSTM) para capturar patrones secuenciales a largo plazo.

---

## 🧠 Modelos Implementados y Casos de Uso

1. **Regresión Lineal (Baseline)**
   - *Rol:* Establecer un suelo de rendimiento rápido y altamente interpretable.

2. **ARIMA (Estadístico Clásico)**
   - *Rol:* Modelado matemático robusto que descompone explícitamente la tendencia y la estacionalidad anual/mensual.

3. **XGBoost (Machine Learning)**
   - *Rol:* El estándar de la industria para datos tabulares no lineales. Excelente para incorporar variables exógenas como clima, precios o promociones.

4. **LSTM (Deep Learning)**
   - *Rol:* Arquitectura avanzada ideal para detectar dependencias temporales sutiles y complejas en datasets masivos donde los enfoques clásicos fallan.

---

## 🚀 Cómo Ejecutar Localmente

### 1. Iniciar el Backend (API)

```bash
cd backend
python -m venv venv
# Activar entorno (Windows)
.\venv\Scripts\activate
# Activar entorno (macOS/Linux)
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```
La API estará corriendo en `http://localhost:8000`.

### 2. Iniciar el Frontend (UI)

Abre una nueva terminal en la raíz del proyecto:

```bash
cd frontend
npm install
npm run dev
```
La interfaz estará disponible típicamente en `http://localhost:5173`.

---

## 👨‍💻 Acerca del Autor

Este proyecto fue desarrollado para demostrar un entendimiento profundo del ciclo de vida completo de un producto de datos: desde la generación y análisis de los datos (EDA), la selección y entrenamiento algorítmico, hasta el despliegue del modelo detrás de una API moderna y su consumo en una interfaz de usuario reactiva orientada a producto.
