import logging
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from social_media_manager_backend.database import database

# Configure logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class UserCreate(BaseModel):
    username: str
    email: str
    full_name: str
    password: str

class User(BaseModel):
    username: str
    email: str
    full_name: str
    disabled: Optional[bool] = None

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(username: str):
    query = "SELECT * FROM users WHERE username = %s"
    result = database.execute_query(query, (username,))
    if result:
        user_dict = result[0]
        return UserInDB(**user_dict)

def authenticate_user(username: str, password: str) -> Optional[User]:
    user = get_user(username)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return User(username=user.username, email=user.email, full_name=user.full_name)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not isinstance(user, User):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/signup", response_model=User)
async def signup(user: UserCreate):
    logger.info(f"Signup attempt for username: {user.username}")

    # Check if user already exists
    existing_user = get_user(user.username)
    if existing_user:
        logger.warning(f"Signup failed: Username {user.username} already registered")
        raise HTTPException(status_code=400, detail="Username already registered")

    # Ensure full_name is provided
    if not user.full_name:
        logger.warning(f"Signup failed for {user.username}: Full name is required")
        raise HTTPException(status_code=400, detail="Full name is required")

    # Hash the password
    hashed_password = get_password_hash(user.password)

    # Store the user in the database with the hashed password
    query = """
    INSERT INTO users (username, email, full_name, hashed_password)
    VALUES (%s, %s, %s, %s)
    RETURNING username, email, full_name
    """
    values = (user.username, user.email, user.full_name, hashed_password)

    try:
        result = database.execute_query(query, values)
        if isinstance(result, list) and result:
            logger.info(f"User {user.username} successfully created")
            return User(**result[0])  # Return user without password
        elif result is True:
            logger.info(f"User {user.username} successfully created, but no data returned")
            return User(username=user.username, email=user.email, full_name=user.full_name)
        else:
            logger.error(f"Failed to create user {user.username}: Unexpected result from database")
            raise HTTPException(status_code=500, detail="Failed to create user")
    except Exception as e:
        logger.error(f"Error creating user {user.username}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create user")

@router.post("/forgot-password")
async def forgot_password(email: str):
    # TODO: Implement password reset logic
    # This would typically involve:
    # 1. Verifying the email exists in the database
    # 2. Generating a password reset token
    # 3. Sending an email with a link to reset the password
    # For now, we'll just return a placeholder response
    return {"message": "Password reset email sent. Please check your inbox."}

@router.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
