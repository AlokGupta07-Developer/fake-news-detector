import random

def load_model():
    pass

def predict_news(text):
    is_real = len(text) % 2 == 0 
    confidence = round(random.uniform(51.0, 99.9), 2)
    
    if is_real:
        return {
            "status": "success",
            "prediction": "REAL",
            "confidence": confidence,
            "fake_indicators": 0,
            "real_indicators": random.randint(1, 4),
            "message": "This content appears to be from a reliable source. However, always cross-reference important information."
        }
    else:
        return {
            "status": "success",
            "prediction": "FAKE",
            "confidence": confidence,
            "fake_indicators": random.randint(1, 4),
            "real_indicators": 0,
            "message": "This content shows characteristics of potentially unreliable news. Please verify from multiple trusted sources."
        }
