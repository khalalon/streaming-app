# app/api/v1/payment.py
from fastapi import APIRouter, HTTPException, Depends
import stripe
from app.core.config import settings

router = APIRouter()

stripe.api_key = "sk_test_51QmcPF042ZMAkxckoFaaBfuBL1YMN2KCHuunsfpiZ9WAwMUsZdnEg3MnWRiTO1LGE8mK5zUmyAq1i1rVTBMqq26Z00I9rPjIKn"

@router.post("/create-payment-intent")
async def create_payment_intent(amount: int):
    try:
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='usd',
        )
        return {"clientSecret": intent['client_secret']}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
