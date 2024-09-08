from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from social_media_manager_backend.config import SUPPORTED_CURRENCIES

router = APIRouter()

class CurrencyConversion(BaseModel):
    amount: float
    from_currency: str
    to_currency: str

# Mock exchange rates (in a real application, these would be fetched from an external API)
EXCHANGE_RATES = {
    'USD': 1.0,
    'EUR': 0.85,
    'GBP': 0.73,
    'JPY': 110.14,
    'CNY': 6.47
}

@router.post("/convert", response_model=float)
async def convert_currency(conversion: CurrencyConversion):
    if conversion.from_currency not in SUPPORTED_CURRENCIES or conversion.to_currency not in SUPPORTED_CURRENCIES:
        raise HTTPException(status_code=400, detail="Unsupported currency")

    # Convert to USD first (if not already in USD)
    usd_amount = conversion.amount / EXCHANGE_RATES[conversion.from_currency]

    # Convert from USD to target currency
    converted_amount = usd_amount * EXCHANGE_RATES[conversion.to_currency]

    return round(converted_amount, 2)

@router.get("/supported-currencies", response_model=List[str])
async def get_supported_currencies():
    return SUPPORTED_CURRENCIES
