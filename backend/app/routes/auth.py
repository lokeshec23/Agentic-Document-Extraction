from fastapi import APIRouter, HTTPException
from datetime import datetime
from bson import ObjectId
from app.models.auth import SignupIn, LoginIn, TokenOut
from app.models.user import UserOut
from app.core.security import hash_password, verify_password, create_access_token
from app.db.mongo import users

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup", response_model=TokenOut)
def signup(data: SignupIn):
    if users.find_one({"email": data.email}):
        raise HTTPException(400, "Email already exists")
    res = users.insert_one({
        "username": data.username,
        "email": data.email,
        "password_hash": hash_password(data.password),
        "created_at": datetime.utcnow()
    })
    token = create_access_token(str(res.inserted_id))
    return {"access_token": token}

@router.post("/login", response_model=TokenOut)
def login(data: LoginIn):
    u = users.find_one({"email": data.email})
    if not u or not verify_password(data.password, u["password_hash"]):
        raise HTTPException(401, "Invalid credentials")
    token = create_access_token(str(u["_id"]))
    return {"access_token": token}
