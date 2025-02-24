from fastapi import APIRouter, HTTPException, Depends
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from sqlalchemy.orm import Session
from app.core.config import settings
from app.api import deps
from app.crud import user as crud_user

email_router = APIRouter()

conf = ConnectionConfig(
    MAIL_USERNAME=settings.SMTP_USERNAME,
    MAIL_PASSWORD=settings.SMTP_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.SMTP_PORT,
    MAIL_SERVER=settings.SMTP_SERVER,
    MAIL_FROM_NAME=settings.MAIL_FROM_NAME,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
)

async def send_confirmation_email(email: str, token: str):
    confirmation_link = f"http://localhost:8000/utils/email/confirm-email?token={token}"
    email_body = f"""
    <html>
        <body>
            <p>Please verify your account on TFC by clicking the link below:</p>
            <a href="{confirmation_link}">Verify your account on TFC click here</a>
        </body>
    </html>
    """
    message = MessageSchema(
        subject="Email Confirmation",
        recipients=[email],
        body=email_body,
        subtype="html"
    )
    fm = FastMail(conf)
    await fm.send_message(message)

@email_router.get("/confirm-email")
def confirm_email(token: str, db: Session = Depends(deps.get_db)):
    user = crud_user.get_user_by_confirmation_token(db, token)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired token")
    
    user.is_active = True
    user.email_confirmation_token = None  # Clear the token
    db.commit()
    return {"msg": "Email confirmed successfully"}
