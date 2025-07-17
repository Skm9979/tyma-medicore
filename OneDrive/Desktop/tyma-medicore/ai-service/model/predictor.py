import pandas as pd

def predict_outbreak(data):
    if not data:
        return {"error": "No data provided"}
    df = pd.DataFrame(data)
    if df.empty or 'disease' not in df or 'location' not in df or 'cases' not in df:
        return {"error": "Invalid data format"}
    # Group by disease and location, sum cases
    summary = df.groupby(['disease', 'location'])['cases'].sum().reset_index()
    # Simple rule: if cases > 100, flag as high risk
    summary['risk'] = summary['cases'].apply(lambda x: 'High' if x > 100 else 'Low')
    # Convert to list of dicts
    result = summary.to_dict(orient='records')
    return {"predictions": result} 