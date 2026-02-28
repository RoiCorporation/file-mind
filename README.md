# FileMind
HackUDC 2026 project repository.



## Instructions
1. Create virtual environment.
```
python3 -m venv .venv
```

2. Activate environment.
```
source .venv/bin/activate
```

3. Install all necessary dependencies.
```
pip install -e .
```

4. Run the backend from inside the [backend folder](backend).
```
uvicorn app.main:app --reload --port 8000
```
