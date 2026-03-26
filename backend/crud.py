from sqlalchemy.orm import Session
from models import User, Lesson, EngagementEvent, Experiment
import schemas
from datetime import datetime

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_lesson(db: Session, lesson_id: int):
    return db.query(Lesson).filter(Lesson.id == lesson_id).first()

def get_lessons(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Lesson).offset(skip).limit(limit).all()

def create_lesson(db: Session, lesson: schemas.LessonCreate):
    db_lesson = Lesson(title=lesson.title, content=lesson.content)
    db.add(db_lesson)
    db.commit()
    db.refresh(db_lesson)
    return db_lesson

def get_engagement_event(db: Session, event_id: int):
    return db.query(EngagementEvent).filter(EngagementEvent.id == event_id).first()

def get_engagement_events(db: Session, skip: int = 0, limit: int = 100):
    return db.query(EngagementEvent).offset(skip).limit(limit).all()

def create_engagement_event(db: Session, event: schemas.EngagementEventCreate):
    db_event = EngagementEvent(
        user_id=event.user_id,
        lesson_id=event.lesson_id,
        channel=event.channel,
        interacted=event.interacted,
        interaction_time=event.interaction_time,
        sent_at=datetime.utcnow()
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

def get_experiment(db: Session, experiment_id: int):
    return db.query(Experiment).filter(Experiment.id == experiment_id).first()

def get_experiments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Experiment).offset(skip).limit(limit).all()

def create_experiment(db: Session, experiment: schemas.ExperimentCreate):
    db_experiment = Experiment(
        name=experiment.name,
        strategy=experiment.strategy,
        result=experiment.result
    )
    db.add(db_experiment)
    db.commit()
    db.refresh(db_experiment)
    return db_experiment
