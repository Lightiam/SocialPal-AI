from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import stripe
from social_media_manager_backend.database import database
import os

router = APIRouter()

# Set up Stripe API key (replace with your actual key)
stripe.api_key = os.getenv("STRIPE_API_KEY")

class Payment(BaseModel):
    id: Optional[int]
    user_id: int
    amount: float
    currency: str
    payment_method: str
    status: str
    created_at: datetime

@router.post("/create-payment-intent", response_model=dict)
async def create_payment_intent(amount: float, currency: str):
    try:
        intent = stripe.PaymentIntent.create(
            amount=int(amount * 100),  # Stripe expects amount in cents
            currency=currency,
        )
        return {"client_secret": intent.client_secret}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/manual-payment", response_model=Payment)
async def create_manual_payment(payment: Payment):
    try:
        query = """
        INSERT INTO payments (user_id, amount, currency, payment_method, status, created_at)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING *
        """
        values = (payment.user_id, payment.amount, payment.currency, payment.payment_method, payment.status, payment.created_at)
        result = database.execute_query(query, values)
        if result:
            return Payment(**result[0])
        else:
            raise HTTPException(status_code=500, detail="Failed to create manual payment")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/payments", response_model=List[Payment])
async def get_payments():
    try:
        query = "SELECT * FROM payments ORDER BY created_at DESC"
        result = database.execute_query(query)
        return [Payment(**payment) for payment in result]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/payments/{payment_id}", response_model=Payment)
async def get_payment(payment_id: int):
    try:
        query = "SELECT * FROM payments WHERE id = %s"
        result = database.execute_query(query, (payment_id,))
        if result:
            return Payment(**result[0])
        else:
            raise HTTPException(status_code=404, detail="Payment not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
