from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    engagement_events = relationship('EngagementEvent', back_populates='user')

class Lesson(Base):
    __tablename__ = 'lessons'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    engagement_events = relationship('EngagementEvent', back_populates='lesson')

class EngagementEvent(Base):
    __tablename__ = 'engagement_events'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    lesson_id = Column(Integer, ForeignKey('lessons.id'))
    sent_at = Column(DateTime, default=datetime.datetime.utcnow)
    interacted = Column(Boolean, default=False)
    interaction_time = Column(DateTime, nullable=True)
    channel = Column(String, nullable=False)  # e.g., push, email, sms
    user = relationship('User', back_populates='engagement_events')
    lesson = relationship('Lesson', back_populates='engagement_events')

class Experiment(Base):
    __tablename__ = 'experiments'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    strategy = Column(String, nullable=False)
    result = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
