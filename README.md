### Terminal 1: Backend (FastAPI)

Activate the Python virtual environment and start the FastAPI server:

```bash
# Activate virtual environment
venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn app:app --reload
```

The API will be available at `http://localhost:8000`

### Terminal 2: Hardhat Node

Start a local Hardhat blockchain node:

```bash
npx hardhat node
```

This will start a local Ethereum network for testing smart contracts.

### Terminal 3: Deploy Smart Contracts

Deploy your smart contracts to the local Hardhat network:

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

### Terminal 4: Frontend

Start the frontend development server:

```bash
npm run dev
```

The frontend will typically be available at `http://localhost:3000`