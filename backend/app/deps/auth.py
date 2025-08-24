from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from bson import ObjectId
from app.core.config import settings
from app.db.mongo import users

auth_scheme = HTTPBearer()

def get_current_user(token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    try:
        payload = jwt.decode(token.credentials, settings.JWT_SECRET, algorithms=[settings.JWT_ALGO])
        sub = payload.get("sub")
        if not sub:
            raise HTTPException(401, "Invalid token")
        user = users.find_one({"_id": ObjectId(sub)})
        if not user:
            raise HTTPException(401, "User not found")
        return user
    except JWTError:
        raise HTTPException(401, "Invalid token")
