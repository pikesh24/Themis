Open the **first terminal** and run the following commands:

Activate virtual environment
`venv\Scripts\activate`

Install Python dependencies
`pip install -r requirements.txt`

Start FastAPI server
`uvicorn app:app --reload`

Open the **second terminal** and start a local Hardhat node:
`npx hardhat node`

Open the **third terminal** and run:
`npx hardhat run scripts/deploy.ts --network localhost`

Open the **fourth terminal** and start the frontend:
`npm run dev`