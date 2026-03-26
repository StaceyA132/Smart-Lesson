from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

class LessonBase(BaseModel):
    title: str
    content: str

class LessonCreate(LessonBase):
    pass

class Lesson(LessonBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

class EngagementEventBase(BaseModel):
    user_id: int
    lesson_id: int
    channel: str
    interacted: Optional[bool] = False
    interaction_time: Optional[datetime] = None

class EngagementEventCreate(EngagementEventBase):
    pass

class EngagementEvent(EngagementEventBase):
    id: int
    sent_at: datetime
    class Config:
        orm_mode = True

class ExperimentBase(BaseModel):
    name: str
    strategy: str
    result: Optional[str] = None

class ExperimentCreate(ExperimentBase):
    pass

class Experiment(ExperimentBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True
