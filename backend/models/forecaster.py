import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error
from statsmodels.tsa.arima.model import ARIMA
import xgboost as xgb
import torch
import torch.nn as nn

class LSTMModel(nn.Module):
    def __init__(self, input_size=1, hidden_layer_size=50, output_size=1):
        super().__init__()
        self.hidden_layer_size = hidden_layer_size
        self.lstm = nn.LSTM(input_size, hidden_layer_size)
        self.linear = nn.Linear(hidden_layer_size, output_size)

    def forward(self, input_seq):
        lstm_out, _ = self.lstm(input_seq.view(len(input_seq), 1, -1))
        predictions = self.linear(lstm_out.view(len(input_seq), -1))
        return predictions[-1]

class SalesForecaster:
    def __init__(self):
        self.data = self._generate_synthetic_data()

    def _generate_synthetic_data(self):
        """Genera un dataset de ventas de 48 meses (36 train, 12 test)"""
        months = np.arange(1, 49)
        base_sales = 1000
        trend = months * 10
        seasonality = np.sin(months * np.pi / 6) * 200
        noise = np.random.normal(0, 50, 48)
        
        sales = base_sales + trend + seasonality + noise
        
        df = pd.DataFrame({
            'month': months,
            'sales': np.maximum(0, sales) # prevent negative sales
        })
        return df

    def get_eda_data(self):
        """Devuelve los primeros 36 meses para el panel EDA"""
        train_data = self.data.iloc[:36]
        return [{"month": f"Mes {row['month']}", "sales": round(row['sales'])} for _, row in train_data.iterrows()]

    def run_predictions(self, selected_models):
        """Ejecuta los modelos seleccionados y devuelve las predicciones para los meses 37-48"""
        train = self.data['sales'].values[:36]
        test = self.data['sales'].values[36:]
        
        results = {
            'chart_data': [],
            'metrics': {}
        }
        
        predictions = {}
        
        if 'linear' in selected_models:
            X_train = np.arange(36).reshape(-1, 1)
            y_train = train
            X_test = np.arange(36, 48).reshape(-1, 1)
            
            model = LinearRegression()
            model.fit(X_train, y_train)
            predictions['linear'] = model.predict(X_test)
            
        if 'arima' in selected_models:
            # Using SARIMA to capture the 12-month seasonality
            model = ARIMA(train, order=(1,1,1), seasonal_order=(1,0,0,12))
            model_fit = model.fit()
            predictions['arima'] = model_fit.forecast(steps=12)
            
        if 'xgboost' in selected_models:
            # Feature engineering for XGBoost: use previous month (lag 1) and month index (seasonality)
            month_indices = np.arange(1, 36) % 12
            X_train = np.column_stack((month_indices, train[:-1]))
            y_train = train[1:]
            
            model = xgb.XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=3)
            model.fit(X_train, y_train)
            
            xgb_preds = []
            last_val = train[-1]
            for i in range(36, 48):
                pred = model.predict(np.array([[(i % 12), last_val]]))[0]
                xgb_preds.append(pred)
                last_val = pred
            predictions['xgboost'] = np.array(xgb_preds)
            
        if 'lstm' in selected_models:
            # Simple LSTM training loop
            scaler_max = np.max(train)
            train_scaled = train / scaler_max
            
            # create sequences
            seq_len = 3
            X_lstm, y_lstm = [], []
            for i in range(len(train_scaled) - seq_len):
                X_lstm.append(train_scaled[i:i+seq_len])
                y_lstm.append(train_scaled[i+seq_len])
            
            X_tensor = torch.FloatTensor(np.array(X_lstm))
            y_tensor = torch.FloatTensor(np.array(y_lstm))
            
            model = LSTMModel()
            loss_function = nn.MSELoss()
            optimizer = torch.optim.Adam(model.parameters(), lr=0.01)
            
            epochs = 50
            for i in range(epochs):
                for seq, labels in zip(X_tensor, y_tensor):
                    optimizer.zero_grad()
                    y_pred = model(seq)
                    single_loss = loss_function(y_pred, labels.unsqueeze(0))
                    single_loss.backward()
                    optimizer.step()
            
            # Predict
            lstm_preds = []
            current_seq = train_scaled[-seq_len:].tolist()
            model.eval()
            with torch.no_grad():
                for _ in range(12):
                    seq = torch.FloatTensor(current_seq)
                    pred = model(seq).item()
                    lstm_preds.append(pred * scaler_max)
                    current_seq.pop(0)
                    current_seq.append(pred)
            predictions['lstm'] = np.array(lstm_preds)

        # Build chart data
        for i in range(12):
            row = {
                'month': f"Test M{i+1}",
                'real': round(test[i])
            }
            for m in selected_models:
                row[m] = round(predictions[m][i])
            results['chart_data'].append(row)
            
        # Build metrics
        for m in selected_models:
            results['metrics'][m] = {
                'rmse': float(np.sqrt(mean_squared_error(test, predictions[m]))),
                'mae': float(mean_absolute_error(test, predictions[m]))
            }
            
        return results
