from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1 import auth, user,payment
from app.utils.email import email_router  # Import the email router

app = FastAPI()

# CORS settings
origins = [
    "http://localhost:8000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(user.router, prefix="/api/v1/user", tags=["user"])
app.include_router(payment.router, prefix="/api/v1/payment", tags=["payment"])
app.include_router(email_router, prefix="/utils/email", tags=["email"])  # Include the email router
