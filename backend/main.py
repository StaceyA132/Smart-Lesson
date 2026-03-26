from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas, crud

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Smart Lesson backend is running."}

# User endpoints
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user)

@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_users(db, skip=skip, limit=limit)

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# Lesson endpoints
@app.post("/lessons/", response_model=schemas.Lesson)
def create_lesson(lesson: schemas.LessonCreate, db: Session = Depends(get_db)):
    return crud.create_lesson(db, lesson)

@app.get("/lessons/", response_model=list[schemas.Lesson])
def read_lessons(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_lessons(db, skip=skip, limit=limit)

@app.get("/lessons/{lesson_id}", response_model=schemas.Lesson)
def read_lesson(lesson_id: int, db: Session = Depends(get_db)):
    db_lesson = crud.get_lesson(db, lesson_id=lesson_id)
    if db_lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return db_lesson

# EngagementEvent endpoints
@app.post("/events/", response_model=schemas.EngagementEvent)
def create_event(event: schemas.EngagementEventCreate, db: Session = Depends(get_db)):
    return crud.create_engagement_event(db, event)

@app.get("/events/", response_model=list[schemas.EngagementEvent])
def read_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_engagement_events(db, skip=skip, limit=limit)

@app.get("/events/{event_id}", response_model=schemas.EngagementEvent)
def read_event(event_id: int, db: Session = Depends(get_db)):
    db_event = crud.get_engagement_event(db, event_id=event_id)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return db_event

# Experiment endpoints
@app.post("/experiments/", response_model=schemas.Experiment)
def create_experiment(experiment: schemas.ExperimentCreate, db: Session = Depends(get_db)):
    return crud.create_experiment(db, experiment)

@app.get("/experiments/", response_model=list[schemas.Experiment])
def read_experiments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_experiments(db, skip=skip, limit=limit)

@app.get("/experiments/{experiment_id}", response_model=schemas.Experiment)
def read_experiment(experiment_id: int, db: Session = Depends(get_db)):
    db_experiment = crud.get_experiment(db, experiment_id=experiment_id)
    if db_experiment is None:
        raise HTTPException(status_code=404, detail="Experiment not found")
    return db_experiment
