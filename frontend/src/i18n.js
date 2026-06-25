export const translations = {
  es: {
    app: {
      title: "Simulador de Predicción de Ventas",
      subtitle: "Análisis y Forecasting Interactivo de Series de Tiempo",
      datasetLabel: "Dataset:",
      datasetName: "Retail Sales 2020-2023"
    },
    sidebar: {
      brand: "Forecaster Pro",
      eda: "Análisis Exploratorio (EDA)",
      comparison: "Comparador de Modelos",
      modelsTitle: "Modelos a Evaluar",
      portfolioLabel: "Pieza de portfolio por",
      author: "Alejandro Peña",
      models: {
        linear: { name: "Regresión Lineal", desc: "Baseline simple" },
        arima: { name: "ARIMA", desc: "Estadístico Clásico" },
        xgboost: { name: "XGBoost", desc: "Ensemble Basado en Árboles" },
        lstm: { name: "Red Neuronal LSTM", desc: "Deep Learning (Series Temporales)" }
      }
    },
    eda: {
      title: "Análisis Exploratorio de Ventas Históricas",
      desc: "Comprender la naturaleza de la serie temporal es el primer paso antes de modelar. Aquí observamos la estacionalidad, tendencia y posibles valores atípicos.",
      trend: "Tendencia",
      trendDesc: "Alcista constante en los últimos 36 meses, indicando crecimiento orgánico.",
      seasonality: "Estacionalidad",
      seasonalityDesc: "Patrón anual marcado con picos de ventas cada 12 meses.",
      variance: "Varianza",
      varianceDesc: "La volatilidad incrementa proporcionalmente con el volumen de ventas."
    },
    comparison: {
      title: "Comparativa de Predicciones vs Datos Reales (Test Set)",
      realSales: "Ventas Reales",
      analysisTitle: "Análisis por Modelo",
      noSelectionTitle: "Selecciona al menos un modelo",
      noSelectionDesc: "Usa el panel izquierdo para seleccionar los modelos a comparar."
    },
    card: {
      pros: "Ventajas",
      cons: "Desventajas",
      useCase: "Caso de Uso en Negocio",
      models: {
        linear: {
          title: "Regresión Lineal",
          badge: "Baseline",
          pros: ["Rápido de entrenar y muy interpretable.", "No requiere ajuste complejo de hiperparámetros."],
          cons: ["Asume relación lineal; falla si hay patrones complejos.", "No captura estacionalidad por sí solo."],
          businessCase: "Usar para establecer un 'suelo' de rendimiento rápido. Si un modelo complejo no supera a la Regresión Lineal significativamente, quédate con la simplicidad de la Lineal."
        },
        arima: {
          title: "ARIMA / SARIMA",
          badge: "Estadístico Clásico",
          pros: ["Modela explícitamente la estacionalidad y tendencia.", "Sólido fundamento matemático para series univariadas."],
          cons: ["Asume estacionariedad (requiere transformaciones previas).", "No maneja bien múltiples variables externas."],
          businessCase: "Ideal para predecir demanda de productos maduros con fuerte estacionalidad (ej. helados en verano) donde la historia se repite de forma predecible."
        },
        xgboost: {
          title: "XGBoost",
          badge: "Machine Learning Avanzado",
          pros: ["Excelente manejando relaciones no lineales.", "Fácil integración de variables externas (clima, festivos)."],
          cons: ["Es un modelo 'codicioso'; no extrapola bien tendencias fuera del rango de entrenamiento.", "Requiere feature engineering (crear lags, extraer mes/día)."],
          businessCase: "El estándar de oro para retail cuando se tienen múltiples variables predictoras (promociones, precio, competidores) junto con el historial de ventas."
        },
        lstm: {
          title: "Red Neuronal LSTM",
          badge: "Deep Learning",
          pros: ["Captura dependencias a largo plazo en secuencias complejas.", "Aprende características automáticamente (menos feature engineering)."],
          cons: ["Caja negra: muy baja interpretabilidad para negocio.", "Requiere gran cantidad de datos y es costoso de entrenar."],
          businessCase: "Recomendado para datos masivos (ej. ventas por hora de miles de tiendas) donde los patrones secuenciales son sutiles y complejos para modelos estadísticos."
        }
      }
    }
  },
  en: {
    app: {
      title: "Sales Prediction Simulator",
      subtitle: "Interactive Time Series Analysis & Forecasting",
      datasetLabel: "Dataset:",
      datasetName: "Retail Sales 2020-2023"
    },
    sidebar: {
      brand: "Forecaster Pro",
      eda: "Exploratory Data Analysis",
      comparison: "Model Comparison",
      modelsTitle: "Models to Evaluate",
      portfolioLabel: "Portfolio piece by",
      author: "Alejandro Peña",
      models: {
        linear: { name: "Linear Regression", desc: "Simple Baseline" },
        arima: { name: "ARIMA", desc: "Classical Statistical" },
        xgboost: { name: "XGBoost", desc: "Tree-based Ensemble" },
        lstm: { name: "LSTM Neural Network", desc: "Deep Learning (Time Series)" }
      }
    },
    eda: {
      title: "Historical Sales Exploratory Analysis",
      desc: "Understanding the nature of the time series is the first step before modeling. Here we observe seasonality, trend, and potential outliers.",
      trend: "Trend",
      trendDesc: "Constant upward trend over the last 36 months, indicating organic growth.",
      seasonality: "Seasonality",
      seasonalityDesc: "Marked annual pattern with sales peaks every 12 months.",
      variance: "Variance",
      varianceDesc: "Volatility increases proportionally with sales volume."
    },
    comparison: {
      title: "Predictions vs Actual Data Comparison (Test Set)",
      realSales: "Actual Sales",
      analysisTitle: "Model Analysis",
      noSelectionTitle: "Select at least one model",
      noSelectionDesc: "Use the left panel to select the models to compare."
    },
    card: {
      pros: "Pros",
      cons: "Cons",
      useCase: "Business Use Case",
      models: {
        linear: {
          title: "Linear Regression",
          badge: "Baseline",
          pros: ["Fast to train and highly interpretable.", "Requires no complex hyperparameter tuning."],
          cons: ["Assumes linear relationship; fails on complex patterns.", "Cannot capture seasonality on its own."],
          businessCase: "Use to establish a quick performance floor. If a complex model doesn't significantly beat Linear Regression, stick with the simple one."
        },
        arima: {
          title: "ARIMA / SARIMA",
          badge: "Classical Statistical",
          pros: ["Explicitly models seasonality and trend.", "Solid mathematical foundation for univariate series."],
          cons: ["Assumes stationarity (requires prior transformations).", "Does not handle multiple external variables well."],
          businessCase: "Ideal for predicting demand of mature products with strong seasonality (e.g., ice cream in summer) where history repeats predictably."
        },
        xgboost: {
          title: "XGBoost",
          badge: "Advanced Machine Learning",
          pros: ["Excellent at handling non-linear relationships.", "Easy integration of external variables (weather, holidays)."],
          cons: ["It is a 'greedy' model; does not extrapolate trends well outside the training range.", "Requires feature engineering (creating lags, extracting month/day)."],
          businessCase: "The gold standard for retail when you have multiple predictor variables (promotions, price, competitors) along with the sales history."
        },
        lstm: {
          title: "LSTM Neural Network",
          badge: "Deep Learning",
          pros: ["Captures long-term dependencies in complex sequences.", "Learns features automatically (less feature engineering)."],
          cons: ["Black box: very low interpretability for business.", "Requires massive amounts of data and is expensive to train."],
          businessCase: "Recommended for massive data (e.g., hourly sales of thousands of stores) where sequential patterns are subtle and too complex for statistical models."
        }
      }
    }
  }
};
