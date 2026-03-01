![FileMind logo](/filemind-logo.png)
**FileMind** is a file manager that ships top search possibilities. Metadata analysis, exhaustive filtering and searching, AI-generated file summaries... Welcome to the next generation of file managers.



## 📦 Installing the necessary packages
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

4. Configure the OpenAI API key.
````
export OPENAI_API_KEY="<your_api_key>"
````

5. Install npm from inside the [frontend folder](/frontend/).
```
npm install
```



## 🚀 Running the app locally
- Run the backend from inside the [backend folder](/backend/).
```
uvicorn app.main:app --reload --port 8000
```

- Run the frontend from inside the [frontend folder](/frontend/).
```
npm run dev
```



## 🌐 Deployed app
This application is deployed with Vercel through 
[this link](https://file-mind-lx56.vercel.app/).
